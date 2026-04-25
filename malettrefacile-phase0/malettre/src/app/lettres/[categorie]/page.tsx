import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getLettersByCategory } from "@/data/letters";
import Breadcrumbs from "@/components/Breadcrumbs";
import LetterCard from "@/components/LetterCard";

interface Props {
  params: Promise<{ categorie: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ categorie: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params;
  const cat = getCategoryBySlug(categorie);
  if (!cat) return {};
  return {
    title: `Modèles de lettres — ${cat.name}`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorie } = await params;
  const cat = getCategoryBySlug(categorie);
  if (!cat) notFound();

  const letters = getLettersByCategory(categorie);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Lettres", href: "/lettres" },
          { label: cat.name },
        ]}
      />

      <div className="mt-6">
        <span className="text-3xl">{cat.icon}</span>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">
          {cat.name}
        </h1>
        <p className="mt-2 text-base leading-relaxed text-neutral-500">
          {cat.description}
        </p>
      </div>

      {letters.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {letters
            .sort((a, b) => b.estimatedSearchVolume - a.estimatedSearchVolume)
            .map((letter) => (
              <LetterCard
                key={letter.slug}
                title={letter.title}
                category={letter.category}
                slug={letter.slug}
                description={letter.context.slice(0, 120) + "…"}
                volume={letter.estimatedSearchVolume}
              />
            ))}
        </div>
      ) : (
        <div className="mt-12 rounded-xl border border-neutral-200 bg-white p-8 text-center">
          <p className="text-sm text-neutral-500">
            Les modèles de cette catégorie arrivent bientôt.
          </p>
        </div>
      )}
    </div>
  );
}
