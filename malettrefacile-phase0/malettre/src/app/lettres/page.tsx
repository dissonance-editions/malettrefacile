import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { getAllLetters } from "@/data/letters";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryCard from "@/components/CategoryCard";
import LetterCard from "@/components/LetterCard";

export const metadata: Metadata = {
  title: "Tous les modèles de lettres gratuits",
  description:
    "Parcourez nos 200+ modèles de lettres gratuits : résiliation, emploi, immobilier, administratif, consommation. Personnalisables en ligne.",
};

export default function LettresIndexPage() {
  const allLetters = getAllLetters();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Toutes les lettres" },
        ]}
      />

      <h1 className="mt-6 text-2xl font-bold text-neutral-900 sm:text-3xl">
        Tous les modèles de lettres
      </h1>
      <p className="mt-2 text-base leading-relaxed text-neutral-500">
        Trouvez le modèle adapté à votre situation parmi nos{" "}
        {categories.reduce((sum, c) => sum + c.letterCount, 0)}+ lettres types.
        Chaque modèle est accompagné du contexte juridique et d'une FAQ.
      </p>

      {/* Categories grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} {...cat} />
        ))}
      </div>

      {/* All letters flat list */}
      {allLetters.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-neutral-900">
            Derniers modèles ajoutés
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {allLetters.map((letter) => (
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
        </section>
      )}
    </div>
  );
}
