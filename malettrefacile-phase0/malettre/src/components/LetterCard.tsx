import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  title: string;
  category: string;
  slug: string;
  description?: string;
  volume?: number;
}

export default function LetterCard({
  title,
  category,
  slug,
  description,
  volume,
}: Props) {
  return (
    <Link
      href={`/lettres/${category}/${slug}`}
      className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
    >
      <h3 className="text-base font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2">
          {description}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-4">
        {volume && (
          <span className="text-xs text-neutral-400">
            {volume.toLocaleString("fr-FR")} recherches/mois
          </span>
        )}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
          Voir le modèle
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
