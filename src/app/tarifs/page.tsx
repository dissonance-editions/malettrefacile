import type { Metadata } from "next";
import Link from "next/link";
import { Check, Send, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Modèles gratuits, personnalisation IA à l'unité ou Premium illimité avec envoi postal inclus.",
};

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    period: "",
    description: "Pour copier ou télécharger un modèle",
    features: [
      "200+ modèles de lettres",
      "Contexte juridique détaillé",
      "FAQ par lettre",
      "Téléchargement PDF / DOCX",
    ],
    cta: "Commencer gratuitement",
    ctaHref: "/lettres",
    highlighted: false,
  },
  {
    name: "À l'unité",
    price: "1,99€",
    period: "par lettre",
    description: "Personnalisation IA ponctuelle",
    features: [
      "Tout le plan Gratuit",
      "Personnalisation IA d'une lettre",
      "Export PDF formaté",
      "Adapté à votre situation",
    ],
    cta: "Personnaliser une lettre",
    ctaHref: "/generateur",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "9,99€",
    period: "/ mois",
    description: "Pour gérer toutes vos démarches",
    features: [
      "Personnalisation IA illimitée",
      "2 lettres simples postées / mois",
      "1 recommandé / mois",
      "-20 % sur les envois supplémentaires",
      "Historique de vos courriers",
      "Suivi des envois en temps réel",
    ],
    cta: "Passer au Premium",
    ctaHref: "/login?next=/compte",
    highlighted: true,
  },
];

const mailPrices = [
  { type: "Lettre simple", price: "1,99 €", desc: "Envoi standard, sans suivi" },
  {
    type: "Recommandé",
    price: "7,99 €",
    desc: "Avec preuve d'envoi et suivi",
  },
  {
    type: "Recommandé AR",
    price: "9,99 €",
    desc: "Preuve d'envoi + de réception (valeur juridique)",
  },
];

export default function TarifsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Accueil", href: "/" }, { label: "Tarifs" }]}
      />

      <div className="mt-8 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          Des tarifs simples et transparents
        </h1>
        <p className="mt-3 text-base text-neutral-500">
          Téléchargez gratuitement, personnalisez avec l'IA, ou faites poster
          votre lettre par nos soins.
        </p>
      </div>

      {/* Plans */}
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-xl border p-6 ${
              plan.highlighted
                ? "border-primary-300 bg-white shadow-lg ring-1 ring-primary-100"
                : "border-neutral-200 bg-white shadow-sm"
            }`}
          >
            {plan.highlighted && (
              <span className="mb-4 inline-flex self-start rounded-full bg-primary-600 px-3 py-0.5 text-xs font-medium text-white">
                Recommandé
              </span>
            )}
            <p className="text-sm font-semibold text-neutral-800">
              {plan.name}
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-neutral-900">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm text-neutral-500">{plan.period}</span>
              )}
            </div>
            <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-500" />
                  <span className="text-sm text-neutral-600">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.ctaHref}
              className={`mt-6 block rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                plan.highlighted
                  ? "bg-primary-600 text-white shadow-sm hover:bg-primary-700"
                  : "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Postal mail pricing */}
      <section className="mt-16 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50">
            <Send className="h-5 w-5 text-success-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-neutral-900">
              Envoi postal à la carte
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Pour les non-Premium ou en complément du quota inclus.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {mailPrices.map((m) => (
            <div
              key={m.type}
              className="rounded-xl border border-neutral-200 p-4"
            >
              <p className="text-sm font-semibold text-neutral-800">{m.type}</p>
              <p className="mt-1 text-2xl font-bold text-primary-600">
                {m.price}
              </p>
              <p className="mt-1 text-xs text-neutral-500">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-neutral-400">
        Paiement sécurisé par Stripe. Annulation à tout moment. Sans
        engagement.
      </p>
    </div>
  );
}
