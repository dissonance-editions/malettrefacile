"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Check, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import Breadcrumbs from "@/components/Breadcrumbs";

function LoginContent() {
  const { signInWithEmail } = useAuth();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }
    setStatus("loading");
    setError(null);

    const { error } = await signInWithEmail(email);
    if (error) {
      setError(error);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Accueil", href: "/" }, { label: "Connexion" }]}
      />

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        {status !== "sent" ? (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
              <Mail className="h-6 w-6 text-primary-600" />
            </div>
            <h1 className="mt-5 text-xl font-bold text-neutral-900">
              Connexion à votre compte
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Recevez un lien de connexion par email. Pas de mot de passe à
              retenir.
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

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 disabled:opacity-60 transition-colors"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  "Recevoir le lien de connexion"
                )}
              </button>
            </form>
            {next && (
              <p className="mt-4 text-xs text-neutral-400">
                Vous serez redirigé après connexion.
              </p>
            )}
          </>
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-50">
              <Check className="h-6 w-6 text-success-500" />
            </div>
            <h1 className="mt-5 text-xl font-bold text-neutral-900">
              Vérifiez votre boîte mail
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Un lien de connexion a été envoyé à <strong>{email}</strong>.
              Cliquez dessus pour vous connecter.
            </p>
            <p className="mt-4 text-xs text-neutral-400">
              💡 Pensez à vérifier vos spams si vous ne trouvez pas l'email.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
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
