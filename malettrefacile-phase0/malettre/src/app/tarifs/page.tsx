import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Accédez gratuitement à tous nos modèles de lettres. Personnalisez-les avec l'IA à partir de 1,99€.",
};

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    period: "",
    description: "Accès aux modèles bruts",
    features: [
      "200+ modèles de lettres",
      "Contexte juridique détaillé",
      "FAQ par lettre",
      "Copier-coller du modèle",
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
      "Personnalisation IA",
      "Export PDF formaté",
      "Adapté à votre situation",
    ],
    cta: "Personnaliser une lettre",
    ctaHref: "/generateur",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "4,99€",
    period: "/ mois",
    description: "Lettres illimitées",
    features: [
      "Tout le plan À l'unité",
      "Lettres illimitées",
      "Historique de vos lettres",
      "Priorité de génération",
    ],
    cta: "Passer au Premium",
    ctaHref: "/generateur",
    highlighted: true,
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
          Accédez gratuitement à tous les modèles. Payez uniquement pour la
          personnalisation IA.
        </p>
      </div>

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
                Populaire
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

      <p className="mt-8 text-center text-xs text-neutral-400">
        Paiement sécurisé par Stripe. Annulation à tout moment. Sans
        engagement.
      </p>
    </div>
  );
}
