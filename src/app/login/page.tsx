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

function GoogleLogo() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/compte";
  const oauthError = searchParams.get("error");
  const {
    user,
    loading: authLoading,
    signIn,
    signUp,
    signInWithGoogle,
    resetPassword,
  } = useAuth();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptCgv, setAcceptCgv] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      router.push(next);
    }
  }, [authLoading, user, router, next]);

  // Affiche une erreur si on revient du callback OAuth en echec
  useEffect(() => {
    if (oauthError === "oauth_failed") {
      setError(
        "La connexion avec Google a échoué. Veuillez réessayer ou utiliser votre email."
      );
    }
  }, [oauthError]);

  async function handleGoogleClick() {
    setError(null);
    setGoogleSubmitting(true);
    const { error: googleError } = await signInWithGoogle();
    if (googleError) {
      setError(googleError);
      setGoogleSubmitting(false);
    }
    // Pas de else : le navigateur va etre redirige vers Google.
  }

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

  const showGoogleSection = mode === "login" || mode === "signup";

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

            {/* === BOUTON GOOGLE + SEPARATEUR === */}
            {showGoogleSection && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleClick}
                  disabled={googleSubmitting || submitting}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 disabled:opacity-60 transition-colors"
                >
                  {googleSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
                  ) : (
                    <GoogleLogo />
                  )}
                  {mode === "signup"
                    ? "S'inscrire avec Google"
                    : "Continuer avec Google"}
                </button>

                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-neutral-200" />
                  <span className="text-xs text-neutral-400">ou</span>
                  <div className="h-px flex-1 bg-neutral-200" />
                </div>
              </>
            )}

            <form
              onSubmit={handleSubmit}
              className={`${showGoogleSection ? "mt-5" : "mt-6"} space-y-4`}
            >
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
                disabled={submitting || googleSubmitting}
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