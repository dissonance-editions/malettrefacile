import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  slug: string;
  name: string;
  description: string;
  icon: string;
  letterCount: number;
}

export default function CategoryCard({
  slug,
  name,
  description,
  icon,
  letterCount,
}: Props) {
  return (
    <Link
      href={`/lettres/${slug}`}
      className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <span className="text-2xl">{icon}</span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500">
          {letterCount} modèles
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">
        {name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
        {description}
      </p>
      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
        Voir les modèles
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
