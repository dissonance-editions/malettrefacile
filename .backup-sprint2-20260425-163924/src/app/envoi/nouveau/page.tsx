"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Send,
  Mail,
  Lock,
  Loader2,
  Check,
  Info,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { MailType, MailAddress } from "@/lib/mailing";
import { MAIL_TYPE_LABELS, MAIL_TYPE_DESCRIPTIONS } from "@/lib/mailing/pricing";

interface Quote {
  type: MailType;
  finalPriceTTC: number;
  estimatedDeliveryDays: number;
}

function NewMailContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const letterParam = searchParams.get("lettre"); // e.g. "resiliation/mutuelle-sante"

  const [step, setStep] = useState<"type" | "addresses" | "review">("type");
  const [mailType, setMailType] = useState<MailType>("recommande_ar");
  const [pages, setPages] = useState(1);
  const [sender, setSender] = useState<MailAddress>({
    fullName: "",
    addressLine1: "",
    postalCode: "",
    city: "",
    country: "FR",
  });
  const [recipient, setRecipient] = useState<MailAddress>({
    fullName: "",
    addressLine1: "",
    postalCode: "",
    city: "",
    country: "FR",
  });
  const [quote, setQuote] = useState<Quote | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      const redirect = `/envoi/nouveau${letterParam ? `?lettre=${letterParam}` : ""}`;
      router.push(`/login?next=${encodeURIComponent(redirect)}`);
    }
  }, [user, loading, router, letterParam]);

  // Fetch quote when type or pages change
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function fetchQuote() {
      try {
        const r = await fetch("/api/mailing/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: mailType, pages }),
        });
        if (!r.ok) throw new Error("Quote failed");
        const data = (await r.json()) as Quote;
        if (!cancelled) setQuote(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchQuote();
    return () => {
      cancelled = true;
    };
  }, [mailType, pages, user]);

  if (loading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  function isAddressValid(addr: MailAddress) {
    return (
      addr.fullName.trim() &&
      addr.addressLine1.trim() &&
      addr.postalCode.trim() &&
      addr.city.trim()
    );
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const r = await fetch("/api/mailing/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: mailType,
          pages,
          sender,
          recipient,
          letterSlug: letterParam || "custom",
        }),
      });
      const data = await r.json();

      if (!r.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      // If payment required, Stripe checkout URL is returned
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      // Otherwise redirect to tracking page
      if (data.mailingId) {
        router.push(`/envoi/suivi/${data.mailingId}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Mon compte", href: "/compte" },
          { label: "Nouvel envoi" },
        ]}
      />

      <h1 className="mt-6 text-2xl font-bold text-neutral-900">
        Envoyer une lettre par voie postale
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        On imprime, on met sous pli, on poste. Vous suivez le tout en ligne.
      </p>

      {/* Steps indicator */}
      <div className="mt-8 flex items-center gap-2">
        {[
          { key: "type", label: "Type d'envoi" },
          { key: "addresses", label: "Adresses" },
          { key: "review", label: "Récapitulatif" },
        ].map((s, i) => {
          const order = ["type", "addresses", "review"] as const;
          const currentIndex = order.indexOf(step);
          const stepIndex = order.indexOf(s.key as (typeof order)[number]);
          const done = stepIndex < currentIndex;
          const active = stepIndex === currentIndex;
          return (
            <div key={s.key} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  done
                    ? "bg-success-500 text-white"
                    : active
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-200 text-neutral-500"
                }`}
              >
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <span
                className={`text-xs font-medium ${
                  active ? "text-neutral-900" : "text-neutral-400"
                }`}
              >
                {s.label}
              </span>
              {i < 2 && <span className="mx-1 h-px w-8 bg-neutral-200" />}
            </div>
          );
        })}
      </div>

      {/* === STEP 1 — TYPE === */}
      {step === "type" && (
        <div className="mt-8 space-y-3">
          {(["simple", "recommande", "recommande_ar"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setMailType(t)}
              className={`flex w-full items-start gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                mailType === t
                  ? "border-primary-500 bg-primary-50"
                  : "border-neutral-200 bg-white hover:border-neutral-300"
              }`}
            >
              <Mail
                className={`mt-1 h-5 w-5 shrink-0 ${
                  mailType === t ? "text-primary-600" : "text-neutral-400"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-900">
                  {MAIL_TYPE_LABELS[t]}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                  {MAIL_TYPE_DESCRIPTIONS[t]}
                </p>
              </div>
              {quote && mailType === t && (
                <div className="text-right">
                  <p className="text-sm font-bold text-primary-600">
                    {quote.finalPriceTTC.toFixed(2).replace(".", ",")} €
                  </p>
                  <p className="text-xs text-neutral-400">
                    ~{quote.estimatedDeliveryDays} j ouvrés
                  </p>
                </div>
              )}
            </button>
          ))}

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
            <p>
              Pour une résiliation, mise en demeure ou contestation, le
              recommandé avec accusé de réception est fortement recommandé : il
              fait foi en cas de litige.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setStep("addresses")}
              className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* === STEP 2 — ADDRESSES === */}
      {step === "addresses" && (
        <div className="mt-8 space-y-8">
          <AddressForm
            title="Expéditeur (vous)"
            address={sender}
            onChange={setSender}
          />
          <AddressForm
            title="Destinataire"
            address={recipient}
            onChange={setRecipient}
          />

          <div className="flex justify-between">
            <button
              onClick={() => setStep("type")}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-800"
            >
              Retour
            </button>
            <button
              onClick={() => setStep("review")}
              disabled={!isAddressValid(sender) || !isAddressValid(recipient)}
              className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* === STEP 3 — REVIEW === */}
      {step === "review" && (
        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
              Type d'envoi
            </p>
            <p className="mt-1 text-base font-semibold text-neutral-900">
              {MAIL_TYPE_LABELS[mailType]}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AddressSummary title="Expéditeur" address={sender} />
            <AddressSummary title="Destinataire" address={recipient} />
          </div>

          <div className="rounded-xl border border-primary-200 bg-primary-50 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-primary-800">
                Total à payer (TVA incluse)
              </p>
              <p className="text-2xl font-bold text-primary-700">
                {quote
                  ? `${quote.finalPriceTTC.toFixed(2).replace(".", ",")} €`
                  : "—"}
              </p>
            </div>
            {quote && (
              <p className="mt-2 text-xs text-primary-600">
                Livraison estimée sous {quote.estimatedDeliveryDays} jours
                ouvrés.
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setStep("addresses")}
              disabled={submitting}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-800"
            >
              Retour
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 disabled:opacity-60 transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Payer et envoyer
                </>
              )}
            </button>
          </div>

          <p className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Lock className="h-3 w-3" />
            Paiement 100% sécurisé via Stripe.
          </p>
        </div>
      )}
    </div>
  );
}

function AddressForm({
  title,
  address,
  onChange,
}: {
  title: string;
  address: MailAddress;
  onChange: (a: MailAddress) => void;
}) {
  const update = (patch: Partial<MailAddress>) =>
    onChange({ ...address, ...patch });

  return (
    <div>
      <h3 className="text-sm font-semibold text-neutral-800">{title}</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label="Nom complet *" full>
          <input
            type="text"
            value={address.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            placeholder="Jean Dupont"
            className="input"
          />
        </Field>
        <Field label="Société (optionnel)" full>
          <input
            type="text"
            value={address.company || ""}
            onChange={(e) => update({ company: e.target.value })}
            placeholder=""
            className="input"
          />
        </Field>
        <Field label="Adresse *" full>
          <input
            type="text"
            value={address.addressLine1}
            onChange={(e) => update({ addressLine1: e.target.value })}
            placeholder="12 rue de la Paix"
            className="input"
          />
        </Field>
        <Field label="Complément d'adresse" full>
          <input
            type="text"
            value={address.addressLine2 || ""}
            onChange={(e) => update({ addressLine2: e.target.value })}
            placeholder="Bât. A, Apt. 3B"
            className="input"
          />
        </Field>
        <Field label="Code postal *">
          <input
            type="text"
            value={address.postalCode}
            onChange={(e) => update({ postalCode: e.target.value })}
            placeholder="75002"
            className="input"
          />
        </Field>
        <Field label="Ville *">
          <input
            type="text"
            value={address.city}
            onChange={(e) => update({ city: e.target.value })}
            placeholder="Paris"
            className="input"
          />
        </Field>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #d4d4d4;
          background: white;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: #262626;
          outline: none;
        }
        .input:focus {
          border-color: #3b6ef4;
          box-shadow: 0 0 0 1px #3b6ef4;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-medium text-neutral-700">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function AddressSummary({
  title,
  address,
}: {
  title: string;
  address: MailAddress;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
        {title}
      </p>
      <div className="mt-2 space-y-0.5 text-sm leading-snug text-neutral-700">
        <p className="font-semibold">{address.fullName}</p>
        {address.company && <p>{address.company}</p>}
        <p>{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>
          {address.postalCode} {address.city}
        </p>
      </div>
    </div>
  );
}

export default function NewMailPage() {
  return (
    <Suspense fallback={null}>
      <NewMailContent />
    </Suspense>
  );
}
