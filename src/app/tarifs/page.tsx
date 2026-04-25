import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles, Send } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Tous nos modèles de lettres sont gratuits. Téléchargez en PDF ou DOCX, sans inscription, sans engagement.",
};

const freeFeatures = [
  "Plus de 200 modèles de lettres en accès libre",
  "Contexte juridique détaillé pour chaque lettre",
  "FAQ et procédure d'envoi pas à pas",
  "Téléchargement immédiat en PDF ou DOCX",
  "Personnalisation des champs avant téléchargement",
  "Aucune inscription requise",
];

const upcomingFeatures = [
  {
    icon: Sparkles,
    title: "Personnalisation IA",
    desc: "Adaptez chaque lettre à votre situation en quelques secondes grâce à l'intelligence artificielle.",
  },
  {
    icon: Send,
    title: "Envoi postal automatisé",
    desc: "Faites poster votre lettre simple ou recommandée directement depuis le site, sans imprimer ni vous déplacer.",
  },
];

export default function TarifsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Accueil", href: "/" }, { label: "Tarifs" }]}
      />

      <div className="mt-8 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          100 % gratuit, sans inscription
        </h1>
        <p className="mt-3 text-base text-neutral-500">
          Téléchargez tous nos modèles de lettres librement, en PDF ou DOCX.
        </p>
      </div>

      {/* Plan Gratuit (hero) */}
      <div className="mt-10 rounded-2xl border border-primary-200 bg-white p-8 shadow-sm ring-1 ring-primary-100">
        <span className="inline-flex rounded-full bg-primary-600 px-3 py-0.5 text-xs font-medium text-white">
          Disponible maintenant
        </span>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-bold text-neutral-900">0 €</span>
          <span className="text-sm text-neutral-500">pour toujours</span>
        </div>
        <p className="mt-2 text-sm text-neutral-600">
          Tous les modèles, tous les téléchargements, sans limite.
        </p>

        <ul className="mt-6 space-y-3">
          {freeFeatures.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-500" />
              <span className="text-sm text-neutral-700">{f}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/lettres"
          className="mt-8 block rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
        >
          Parcourir les lettres
        </Link>
      </div>

      {/* Coming soon */}
      <section className="mt-12 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex rounded-full bg-neutral-900 px-3 py-0.5 text-xs font-medium text-white">
            Bientôt
          </span>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            Fonctionnalités à venir
          </p>
        </div>

        <h2 className="mt-3 text-lg font-bold text-neutral-900">
          De nouveaux services arrivent prochainement
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Nous travaillons sur des fonctionnalités complémentaires pour vous
          faciliter encore plus la vie.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {upcomingFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-xl border border-neutral-200 bg-white p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
                  <Icon className="h-4.5 w-4.5 text-primary-600" />
                </div>
                <p className="mt-3 text-sm font-semibold text-neutral-800">
                  {feat.title}
                </p>
                <p className="mt-1 text-sm text-neutral-500">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-neutral-400">
        En attendant, profitez librement de tous les modèles gratuits.
      </p>
    </div>
  );
}
