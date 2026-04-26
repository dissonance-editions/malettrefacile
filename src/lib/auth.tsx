"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "./supabase";

type Plan = "free" | "premium";

interface SignUpOptions {
  cgvAccepted: boolean;
  marketingOptIn: boolean;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  /** Plan de l'utilisateur courant (free/premium). null si pas connecte ou pas charge. */
  plan: Plan | null;
  /** Connexion avec email + mot de passe */
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  /** Creation de compte avec email + mot de passe + consentements */
  signUp: (
    email: string,
    password: string,
    options: SignUpOptions
  ) => Promise<{ error: string | null }>;
  /** Envoi du lien de reinitialisation de mot de passe par email */
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  /** Mise a jour du mot de passe (utilise sur /reset-password apres clic sur lien) */
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
  /** Deconnexion */
  signOut: () => Promise<void>;
  /** Recharge le plan depuis profiles (apres un upgrade par exemple) */
  refreshPlan: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Traduit les erreurs Supabase en messages utilisateur fr.
 * Garde le message brut pour les cas non mappes.
 */
function translateError(message: string): string {
  if (
    message.includes("already registered") ||
    message.includes("already been registered") ||
    message.includes("User already registered")
  ) {
    return "Ce compte existe déjà. Connectez-vous plutôt.";
  }
  if (message.includes("Invalid login")) {
    return "Email ou mot de passe incorrect.";
  }
  if (message.includes("Email not confirmed")) {
    return "Votre email n'est pas encore confirmé. Vérifiez votre boîte de réception.";
  }
  if (message.includes("Password should be at least")) {
    return "Le mot de passe doit contenir au moins 6 caractères.";
  }
  if (message.toLowerCase().includes("rate limit")) {
    return "Trop de tentatives. Patientez quelques minutes avant de réessayer.";
  }
  return message;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<Plan | null>(null);

  // Charge le plan de l'utilisateur depuis la table profiles
  async function loadPlan(userId: string) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", userId)
        .single();
      setPlan((data?.plan as Plan) ?? "free");
    } catch {
      setPlan("free");
    }
  }

  useEffect(() => {
    let mounted = true;
    let subscription: { unsubscribe: () => void } | null = null;

    try {
      const supabase = getSupabaseBrowserClient();

      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!mounted) return;
        const u = session?.user ?? null;
        setUser(u);
        setLoading(false);
        if (u) loadPlan(u.id);
      });

      const sub = supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return;
        const u = session?.user ?? null;
        setUser(u);
        if (u) {
          loadPlan(u.id);
        } else {
          setPlan(null);
        }
      });
      subscription = sub.data.subscription;
    } catch (err) {
      console.warn("Auth disabled:", err);
      if (mounted) setLoading(false);
    }

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error: error ? translateError(error.message) : null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Auth indisponible",
      };
    }
  }

  async function signUp(
    email: string,
    password: string,
    options: SignUpOptions
  ) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            cgv_accepted_at: options.cgvAccepted
              ? new Date().toISOString()
              : null,
            marketing_opt_in: options.marketingOptIn,
          },
        },
      });
      return { error: error ? translateError(error.message) : null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Auth indisponible",
      };
    }
  }

  async function resetPassword(email: string) {
    try {
      const supabase = getSupabaseBrowserClient();
      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/reset-password`
          : undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });
      return { error: error ? translateError(error.message) : null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Auth indisponible",
      };
    }
  }

  async function updatePassword(newPassword: string) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      return { error: error ? translateError(error.message) : null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Auth indisponible",
      };
    }
  }

  async function signOut() {
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signOut();
    } catch {
      /* ignore */
    }
    setUser(null);
    setPlan(null);
  }

  async function refreshPlan() {
    if (user) await loadPlan(user.id);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        plan,
        signIn,
        signUp,
        resetPassword,
        updatePassword,
        signOut,
        refreshPlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
