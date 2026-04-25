"use client";

import { useState, useEffect } from "react";
import { X, Download, Loader2, Check, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// Client browser Supabase pour signUp/signIn dans la modale.
// Partage le meme auth storage (localStorage) que l'AuthProvider.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

interface LetterVariable {
  name: string;
  label: string;
  placeholder: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  letterTitle: string;
  letterSlug: string;
  template: string;
  variables: LetterVariable[];
}

type Step = "form" | "account" | "format" | "downloading" | "done";
type Format = "pdf" | "docx";
type AuthMode = "signup" | "login";

export default function FillAndDownloadModal({
  open,
  onClose,
  letterTitle,
  letterSlug,
  template,
  variables,
}: Props) {
  const { user, loading: authLoading } = useAuth();

  const [step, setStep] = useState<Step>("form");
  const [values, setValues] = useState<Record<string, string>>({});
  const [format, setFormat] = useState<Format>("pdf");
  const [error, setError] = useState<string | null>(null);

  // Account step state
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptCgv, setAcceptCgv] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Reset state on open
  useEffect(() => {
    if (open) {
      setStep("form");
      setValues({});
      setEmail("");
      setPassword("");
      setAcceptCgv(false);
      setMarketingOptIn(false);
      setAuthMode("signup");
      setShowPassword(false);
      setError(null);
    }
  }, [open]);

  // Skip account step if already logged in
  useEffect(() => {
    if (step === "account" && !authLoading && user) {
      setEmail(user.email ?? "");
      setStep("format");
    }
  }, [step, user, authLoading]);

  // Block body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  function handleChange(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function isFormValid() {
    const filled = variables.filter((v) => values[v.name]?.trim()).length;
    return filled >= Math.ceil(variables.length / 2);
  }

  function handleNextFromForm() {
    if (!isFormValid()) {
      setError(
        "Merci de remplir au moins la moitié des champs pour générer votre lettre."
      );
      return;
    }
    setError(null);
    setStep("account");
  }

  async function handleAuth(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (authMode === "signup" && !acceptCgv) {
      setError(
        "Veuillez accepter les conditions générales pour créer votre compte."
      );
      return;
    }

    setAuthSubmitting(true);

    try {
      if (authMode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              cgv_accepted_at: new Date().toISOString(),
              marketing_opt_in: marketingOptIn,
            },
          },
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } =
          await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }

      setStep("format");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue.";

      if (message.includes("already registered") || message.includes("already been registered")) {
        setError("Ce compte existe déjà. Connectez-vous ci-dessous.");
        setAuthMode("login");
      } else if (message.includes("Invalid login")) {
        setError("Email ou mot de passe incorrect.");
      } else if (message.includes("Email not confirmed")) {
        setError(
          "Votre email n'est pas encore confirmé. Vérifiez votre boîte de réception."
        );
      } else {
        setError(message);
      }
    } finally {
      setAuthSubmitting(false);
    }
  }

  async function handleDownload() {
    setStep("downloading");

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          letterTitle,
          letterSlug,
          template,
          variables,
          values,
          email,
          emailOptIn: marketingOptIn,
          format,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la génération du document");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${letterSlug}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStep("done");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors du téléchargement"
      );
      setStep("format");
    }
  }

  function getStepLabel() {
    switch (step) {
      case "form":
        return "Étape 1/3 — Personnalisation";
      case "account":
        return "Étape 2/3 — Votre compte";
      case "format":
        return "Étape 3/3 — Format";
      case "downloading":
        return "Génération en cours...";
      case "done":
        return "Téléchargement réussi";
    }
  }

  function getBackAction() {
    switch (step) {
      case "form":
        return onClose;
      case "account":
        return () => setStep("form");
      case "format":
        return () => {
          // Si connecte on ne peut pas revenir a account
          if (user) setStep("form");
          else setStep("account");
        };
      default:
        return undefined;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary-600">
              {getStepLabel()}
            </p>
            <h2 className="mt-0.5 text-base font-semibold text-neutral-900">
              {letterTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* STEP 1 — FORM */}
          {step === "form" && (
            <>
              <p className="text-sm leading-relaxed text-neutral-600">
                Renseignez vos informations. Les champs marqués d'un astérisque
                sont les plus importants. Vous pouvez laisser certains champs
                vides — ils seront simplement omis dans la lettre finale.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {variables.map((variable) => (
                  <div key={variable.name}>
                    <label className="block text-xs font-medium text-neutral-700">
                      {variable.label}
                    </label>
                    <input
                      type="text"
                      value={values[variable.name] || ""}
                      onChange={(e) =>
                        handleChange(variable.name, e.target.value)
                      }
                      placeholder={variable.placeholder}
                      className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* STEP 2 — ACCOUNT */}
          {step === "account" && (
            <form onSubmit={handleAuth}>
              <p className="text-sm leading-relaxed text-neutral-600">
                {authMode === "signup"
                  ? "Créez votre compte gratuit pour télécharger votre lettre et retrouver vos documents."
                  : "Connectez-vous à votre compte pour télécharger votre lettre."}
              </p>

              <div className="mt-5 space-y-4">
                {/* Email */}
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

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700">
                    Mot de passe
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        authMode === "signup"
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

                {/* Checkboxes (signup only) */}
                {authMode === "signup" && (
                  <>
                    {/* CGV — obligatoire */}
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

                    {/* Marketing — optionnel, décochée par défaut */}
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
              </div>

              {/* Toggle signup/login */}
              <p className="mt-5 text-center text-xs text-neutral-500">
                {authMode === "signup" ? (
                  <>
                    Vous avez déjà un compte ?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("login");
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
                        setAuthMode("signup");
                        setError(null);
                      }}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      Créer un compte
                    </button>
                  </>
                )}
              </p>

              <p className="mt-3 text-center text-xs text-neutral-400">
                Vos données sont protégées et ne seront jamais revendues.
              </p>
            </form>
          )}

          {/* STEP 3 — FORMAT */}
          {step === "format" && (
            <>
              <p className="text-sm leading-relaxed text-neutral-600">
                Choisissez le format de téléchargement.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setFormat("pdf")}
                  className={`flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all ${
                    format === "pdf"
                      ? "border-primary-500 bg-primary-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                    PDF
                  </span>
                  <p className="mt-2 text-sm font-semibold text-neutral-900">
                    Document PDF
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                    Mise en page professionnelle, prêt à imprimer.
                  </p>
                </button>
                <button
                  onClick={() => setFormat("docx")}
                  className={`flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all ${
                    format === "docx"
                      ? "border-primary-500 bg-primary-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                    DOCX
                  </span>
                  <p className="mt-2 text-sm font-semibold text-neutral-900">
                    Document Word
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                    Modifiable dans Word, Pages ou Google Docs.
                  </p>
                </button>
              </div>
            </>
          )}

          {/* STEP 4 — DOWNLOADING */}
          {step === "downloading" && (
            <div className="flex flex-col items-center py-12">
              <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
              <p className="mt-4 text-sm font-medium text-neutral-700">
                Génération de votre lettre...
              </p>
            </div>
          )}

          {/* STEP 5 — DONE */}
          {step === "done" && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50">
                <Check className="h-6 w-6 text-success-500" />
              </div>
              <p className="mt-4 text-base font-semibold text-neutral-900">
                Téléchargement réussi !
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500">
                Votre lettre a été téléchargée. Votre compte est créé avec
                l&apos;adresse <strong>{email}</strong>.
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== "downloading" && step !== "done" && (
          <div className="flex items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50 px-6 py-4">
            <button
              onClick={getBackAction()}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              {step === "form" ? "Annuler" : "Retour"}
            </button>

            {step === "form" && (
              <button
                onClick={handleNextFromForm}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
              >
                Continuer
              </button>
            )}

            {step === "account" && (
              <button
                onClick={() => handleAuth()}
                disabled={authSubmitting}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors disabled:opacity-60"
              >
                {authSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {authMode === "signup" ? "Créer mon compte" : "Me connecter"}
              </button>
            )}

            {step === "format" && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Télécharger ({format.toUpperCase()})
              </button>
            )}
          </div>
        )}

        {step === "done" && (
          <div className="flex justify-end border-t border-neutral-200 bg-neutral-50 px-6 py-4">
            <button
              onClick={onClose}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
