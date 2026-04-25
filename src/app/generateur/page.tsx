import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Générateur de lettres IA",
  description:
    "Personnalisez n'importe quel modèle de lettre en quelques secondes grâce à notre générateur propulsé par l'intelligence artificielle.",
};

export default function GenerateurPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Générateur IA" },
        ]}
      />

      <div className="mt-16 flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50">
          <Sparkles className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-neutral-900">
          Générateur de lettres IA
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
          Notre générateur intelligent adapte chaque modèle de lettre à votre
          situation personnelle. Remplissez quelques champs, et recevez une
          lettre prête à envoyer.
        </p>
        <p className="mt-6 rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-700">
          Cette fonctionnalité sera disponible très prochainement.
        </p>
        <Link
          href="/lettres"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voir les modèles gratuits
        </Link>
      </div>
    </div>
  );
}
