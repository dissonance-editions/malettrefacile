import { categories } from "@/data/categories";
import { getAllLetters } from "@/data/letters";
import CategoryCard from "@/components/CategoryCard";
import LetterCard from "@/components/LetterCard";
import { FileText, Sparkles, Download } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const popularLetters = getAllLetters()
    .sort((a, b) => b.estimatedSearchVolume - a.estimatedSearchVolume)
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Modèles de lettres gratuits
            <br />
            <span className="text-primary-600">prêts à envoyer</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-500">
            Résiliation, démission, contestation, mise en demeure… Trouvez le
            bon modèle, comprenez vos droits, personnalisez votre lettre en
            quelques clics.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/lettres"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Voir tous les modèles
            </Link>
            <Link
              href="/generateur"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Générateur IA
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-12 sm:grid-cols-3 sm:px-6">
          {[
            {
              icon: <FileText className="h-5 w-5 text-primary-600" />,
              title: "200+ modèles",
              desc: "Toutes les situations de la vie courante couvertes, avec le contexte juridique.",
            },
            {
              icon: <Sparkles className="h-5 w-5 text-primary-600" />,
              title: "Personnalisation IA",
              desc: "Notre générateur adapte chaque lettre à votre situation en quelques secondes.",
            },
            {
              icon: <Download className="h-5 w-5 text-primary-600" />,
              title: "Export PDF",
              desc: "Téléchargez votre lettre mise en page, prête à imprimer ou à envoyer.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                {item.icon}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-neutral-800">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-neutral-900">
          Parcourir par catégorie
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} />
          ))}
        </div>
      </section>

      {/* Popular letters */}
      {popularLetters.length > 0 && (
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <h2 className="text-xl font-bold text-neutral-900">
              Lettres les plus recherchées
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {popularLetters.map((letter) => (
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
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <p className="text-center text-xs leading-relaxed text-neutral-400">
            Les modèles de lettres sont fournis à titre informatif et ne
            constituent pas un conseil juridique. En cas de situation complexe,
            consultez un avocat.
          </p>
        </div>
      </section>
    </>
  );
}
