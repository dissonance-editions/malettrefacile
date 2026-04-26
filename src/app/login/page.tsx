"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Check,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import Breadcrumbs from "@/components/Breadcrumbs";

type Mode = "login" | "signup" | "forgot" | "forgot_sent";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/compte";
  const { user, loading: authLoading, signIn, signUp, resetPassword } =
    useAuth();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptCgv, setAcceptCgv] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      router.push(next);
    }
  }, [authLoading, user, router, next]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }

    if (mode === "forgot") {
      setSubmitting(true);
      const { error: resetError } = await resetPassword(email);
      if (resetError) {
        setError(resetError);
      } else {
        setMode("forgot_sent");
      }
      setSubmitting(false);
      return;
    }

    if (!password || password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (mode === "signup" && !acceptCgv) {
      setError(
        "Veuillez accepter les conditions générales pour créer votre compte."
      );
      return;
    }

    setSubmitting(true);

    const result =
      mode === "signup"
        ? await signUp(email, password, {
            cgvAccepted: acceptCgv,
            marketingOptIn,
          })
        : await signIn(email, password);

    if (result.error) {
      setError(result.error);
      // Si signup detecte que le compte existe deja, on bascule en login
      if (result.error.includes("existe déjà")) {
        setMode("login");
      }
    } else {
      router.push(next);
      router.refresh();
    }

    setSubmitting(false);
  }

  if (authLoading || user) {
    return (
      <div className="mx-auto flex min-h-[40vh] max-w-md items-center justify-center px-4">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          {
            label:
              mode === "signup"
                ? "Créer un compte"
                : mode === "forgot" || mode === "forgot_sent"
                  ? "Mot de passe oublié"
                  : "Connexion",
          },
        ]}
      />

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        {mode === "forgot_sent" && (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-50">
              <Check className="h-6 w-6 text-success-500" />
            </div>
            <h1 className="mt-5 text-xl font-bold text-neutral-900">
              Email envoyé
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Si un compte existe pour <strong>{email}</strong>, vous recevrez
              un lien de réinitialisation dans les prochaines minutes.
            </p>
            <p className="mt-4 text-xs text-neutral-400">
              💡 Pensez à vérifier votre dossier spam si vous ne trouvez pas
              l&apos;email.
            </p>
            <button
              type="button"
              onClick={() => {
                setError(null);
                setMode("login");
              }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à la connexion
            </button>
          </>
        )}

        {mode !== "forgot_sent" && (
          <>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                mode === "forgot" ? "bg-amber-50" : "bg-primary-50"
              }`}
            >
              {mode === "forgot" ? (
                <Lock className="h-6 w-6 text-amber-600" />
              ) : (
                <UserIcon className="h-6 w-6 text-primary-600" />
              )}
            </div>

            <h1 className="mt-5 text-xl font-bold text-neutral-900">
              {mode === "signup"
                ? "Créer un compte"
                : mode === "forgot"
                  ? "Mot de passe oublié"
                  : "Connexion à votre compte"}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              {mode === "signup"
                ? "Créez votre compte gratuit pour télécharger et retrouver vos lettres."
                : mode === "forgot"
                  ? "Indiquez votre adresse email. Nous vous enverrons un lien pour réinitialiser votre mot de passe."
                  : "Connectez-vous avec votre adresse email et votre mot de passe."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@email.fr"
                  required
                  autoFocus
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>

              {mode !== "forgot" && (
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-neutral-700">
                      Mot de passe
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => {
                          setError(null);
                          setMode("forgot");
                        }}
                        className="text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        Mot de passe oublié ?
                      </button>
                    )}
                  </div>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        mode === "signup"
                          ? "6 caractères minimum"
                          : "Votre mot de passe"
                      }
                      required
                      minLength={6}
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
              )}

              {mode === "signup" && (
                <>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptCgv}
                      onChange={(e) => setAcceptCgv(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-xs leading-relaxed text-neutral-600">
                      J&apos;accepte les{" "}
                      <Link
                        href="/mentions-legales"
                        target="_blank"
                        className="text-primary-600 underline hover:text-primary-700"
                      >
                        conditions générales d&apos;utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link
                        href="/confidentialite"
                        target="_blank"
                        className="text-primary-600 underline hover:text-primary-700"
                      >
                        politique de confidentialité
                      </Link>
                      . <span className="text-red-500">*</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-xs leading-relaxed text-neutral-500">
                      Je souhaite recevoir occasionnellement par email des
                      conseils pratiques et des nouveautés. Désabonnement à
                      tout moment.
                    </span>
                  </label>
                </>
              )}

              {mode === "forgot" && (
                <p className="text-xs text-neutral-500">
                  Vous recevrez un email contenant un lien sécurisé valable
                  pendant 1 heure.
                </p>
              )}

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 disabled:opacity-60 transition-colors"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "signup"
                  ? "Créer mon compte"
                  : mode === "forgot"
                    ? "Envoyer le lien"
                    : "Me connecter"}
              </button>

              {mode === "forgot" && (
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setMode("login");
                  }}
                  className="inline-flex w-full items-center justify-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-700"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Retour à la connexion
                </button>
              )}
            </form>

            {mode !== "forgot" && (
              <p className="mt-5 text-center text-xs text-neutral-500">
                {mode === "signup" ? (
                  <>
                    Vous avez déjà un compte ?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError(null);
                      }}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      Se connecter
                    </button>
                  </>
                ) : (
                  <>
                    Pas encore de compte ?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup");
                        setError(null);
                      }}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      Créer un compte
                    </button>
                  </>
                )}
              </p>
            )}

            {next !== "/compte" && (
              <p className="mt-3 text-center text-xs text-neutral-400">
                Vous serez redirigé après connexion.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
