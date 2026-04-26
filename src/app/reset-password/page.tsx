"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import Breadcrumbs from "@/components/Breadcrumbs";

type Status = "checking" | "ready" | "invalid" | "submitting" | "success";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { updatePassword, signOut } = useAuth();
  const [status, setStatus] = useState<Status>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detection : si l'utilisateur arrive sur cette page, c'est qu'il vient
  // de cliquer sur le lien de reset. Supabase JS l'authentifie automatiquement
  // a l'arrivee. On verifie juste qu'une session existe.
  //
  // L'event PASSWORD_RECOVERY n'est plus emis avec le flow PKCE par defaut,
  // donc on s'appuie uniquement sur la presence d'une session valide.
  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseBrowserClient();

    // Petit delai pour laisser a Supabase le temps de parser l'URL
    const timer = setTimeout(async () => {
      if (!mounted) return;
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setStatus("ready");
      } else {
        setStatus("invalid");
      }
    }, 800);

    // Si jamais l'event PASSWORD_RECOVERY est emis (anciens flows),
    // on l'ecoute aussi par securite
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
          setStatus("ready");
        }
      }
    );

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setStatus("submitting");

    const { error: updateError } = await updatePassword(password);
    if (updateError) {
      setError(updateError);
      setStatus("ready");
      return;
    }

    // On deconnecte pour forcer une vraie reconnexion avec le nouveau mdp
    // (sinon l'utilisateur reste connecte avec la session du lien email,
    // ce qui peut induire en erreur)
    await signOut();
    setStatus("success");
    setTimeout(() => router.push("/login"), 3000);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Réinitialiser le mot de passe" },
        ]}
      />

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        {status === "checking" && (
          <div className="flex flex-col items-center py-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            <p className="mt-4 text-sm text-neutral-600">
              Vérification du lien...
            </p>
          </div>
        )}

        {status === "invalid" && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h1 className="mt-4 text-lg font-bold text-neutral-900">
              Lien invalide ou expiré
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500">
              Ce lien de réinitialisation n&apos;est plus valide. Les liens
              expirent après 1 heure pour des raisons de sécurité.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
            >
              Demander un nouveau lien
            </Link>
          </div>
        )}

        {(status === "ready" || status === "submitting") && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <Lock className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900">
                  Nouveau mot de passe
                </h1>
                <p className="text-sm text-neutral-500">
                  Choisissez un mot de passe sécurisé.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700">
                  Nouveau mot de passe
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="6 caractères minimum"
                    required
                    minLength={6}
                    autoFocus
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 pr-10 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700">
                  Confirmer le mot de passe
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Saisir à nouveau le mot de passe"
                  required
                  minLength={6}
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors disabled:opacity-60"
              >
                {status === "submitting" && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Enregistrer le nouveau mot de passe
              </button>
            </form>
          </>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50">
              <Check className="h-6 w-6 text-success-500" />
            </div>
            <h1 className="mt-4 text-lg font-bold text-neutral-900">
              Mot de passe mis à jour
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500">
              Votre mot de passe a été modifié avec succès. Vous pouvez
              maintenant vous connecter avec votre nouveau mot de passe.
            </p>
            <p className="mt-3 text-xs text-neutral-400">
              Redirection vers la connexion dans quelques secondes...
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
            >
              Se connecter maintenant
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
