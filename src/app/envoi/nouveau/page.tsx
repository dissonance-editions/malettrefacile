import type { Metadata } from "next";
import Link from "next/link";
import { Send, ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Envoi postal",
  description:
    "L'envoi postal automatisé de vos lettres sera bientôt disponible. En attendant, téléchargez votre modèle gratuitement en PDF ou DOCX.",
  robots: { index: false, follow: false },
};

export default function NewMailPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Envoi postal" },
        ]}
      />

      <div className="mt-16 flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success-50">
          <Send className="h-8 w-8 text-success-500" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-neutral-900">
          Envoi postal automatisé
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
          Bientôt, vous pourrez faire poster votre lettre simple ou
          recommandée directement depuis le site, sans imprimer ni vous
          déplacer.
        </p>
        <p className="mt-6 rounded-lg border border-success-200 bg-success-50 px-4 py-3 text-sm text-success-700">
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
