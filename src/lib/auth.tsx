"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "./supabase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let subscription: { unsubscribe: () => void } | null = null;

    try {
      const supabase = getSupabaseBrowserClient();

      supabase.auth.getSession().then(({ data: { session } }) => {
        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      });

      const sub = supabase.auth.onAuthStateChange((_event, session) => {
        if (mounted) setUser(session?.user ?? null);
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

  async function signInWithEmail(email: string) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/compte`
              : undefined,
        },
      });
      return { error: error?.message || null };
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
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithEmail, signOut }}
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