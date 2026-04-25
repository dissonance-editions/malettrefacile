import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <FileQuestion className="h-12 w-12 text-neutral-300" />
      <h1 className="mt-4 text-xl font-bold text-neutral-900">
        Page introuvable
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l'accueil
      </Link>
    </div>
  );
}
