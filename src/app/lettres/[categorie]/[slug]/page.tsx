import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  ExternalLink,
  Scale,
  Send,
  AlertTriangle,
} from "lucide-react";
import { getCategoryBySlug } from "@/data/categories";
import {
  getAllLetters,
  getLetterBySlug,
  getRelatedLetters,
} from "@/data/letters";
import Breadcrumbs from "@/components/Breadcrumbs";
import LetterTemplate from "@/components/LetterTemplate";
import FaqAccordion from "@/components/FaqAccordion";
import LetterCard from "@/components/LetterCard";

interface Props {
  params: Promise<{ categorie: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllLetters().map((l) => ({
    categorie: l.category,
    slug: l.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie, slug } = await params;
  const letter = getLetterBySlug(categorie, slug);
  if (!letter) return {};
  return {
    title: letter.metaTitle,
    description: letter.metaDescription,
    alternates: {
      canonical: `/lettres/${categorie}/${slug}`,
    },
  };
}

export default async function LetterPage({ params }: Props) {
  const { categorie, slug } = await params;
  const letter = getLetterBySlug(categorie, slug);
  if (!letter) notFound();

  const cat = getCategoryBySlug(categorie);
  const related = getRelatedLetters(slug, categorie, 4);

  // HowTo schema for sending procedure
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Comment envoyer : ${letter.title}`,
    step: [
      {
        "@type": "HowToStep",
        name: "Personnalisez le modèle",
        text: "Remplacez les champs entre crochets par vos informations personnelles.",
      },
      {
        "@type": "HowToStep",
        name: "Imprimez ou copiez la lettre",
        text: "Imprimez la lettre ou copiez-la dans un email selon le mode d'envoi choisi.",
      },
      {
        "@type": "HowToStep",
        name: "Envoyez votre courrier",
        text: letter.sendingMethod,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Lettres", href: "/lettres" },
          { label: cat?.name || categorie, href: `/lettres/${categorie}` },
          { label: letter.title },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Header */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-0.5 text-xs font-medium text-primary-700">
            Gratuit
          </span>
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-0.5 text-xs font-medium text-neutral-600">
            Personnalisable
          </span>
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-0.5 text-xs font-medium text-neutral-600">
            2026
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {letter.title}
        </h1>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Main column */}
        <div className="space-y-10">
          {/* Legal context */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-900">
              <Scale className="h-5 w-5 text-primary-600" />
              Contexte juridique
            </h2>
            <div className="mt-3 text-sm leading-relaxed text-neutral-600 whitespace-pre-line">
              {letter.context}
            </div>
            {letter.legalBasis && (
              <p className="mt-3 text-xs text-neutral-400">
                <strong>Base légale :</strong> {letter.legalBasis}
              </p>
            )}
          </section>

          {/* Template */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-900">
              <Mail className="h-5 w-5 text-primary-600" />
              Le modèle de lettre
            </h2>
            <div className="mt-3">
              <LetterTemplate
                template={letter.template}
                letterSlug={`${categorie}/${slug}`}
                letterTitle={letter.title}
                variables={letter.variables}
              />
            </div>
          </section>

          {/* Sending instructions */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-900">
              <Send className="h-5 w-5 text-primary-600" />
              Comment envoyer cette lettre
            </h2>
            <ol className="mt-4 space-y-4">
              {[
                {
                  step: "1",
                  title: "Personnalisez le modèle",
                  desc: "Remplacez les champs entre crochets [Nom], [Adresse], etc. par vos informations. Vous pouvez aussi utiliser notre générateur IA pour une personnalisation complète.",
                },
                {
                  step: "2",
                  title: "Imprimez ou copiez",
                  desc: "Imprimez la lettre sur papier blanc A4, ou copiez-la dans un email si l'envoi dématérialisé est accepté.",
                },
                {
                  step: "3",
                  title: "Envoyez votre courrier",
                  desc: letter.sendingMethod,
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-neutral-500">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          {letter.faq.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-neutral-900">
                Questions fréquentes
              </h2>
              <div className="mt-4">
                <FaqAccordion items={letter.faq} />
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <div className="flex gap-3 rounded-lg border border-warning-500/20 bg-warning-50 p-4">
            <AlertTriangle className="h-5 w-5 shrink-0 text-warning-500" />
            <p className="text-xs leading-relaxed text-neutral-600">
              Ce modèle est fourni à titre informatif et ne constitue pas un
              conseil juridique. En cas de situation complexe, consultez un
              avocat.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* CTA */}
          <div className="rounded-xl border border-primary-200 bg-primary-50 p-5">
            <p className="text-sm font-semibold text-primary-800">
              Besoin d'une lettre sur mesure ?
            </p>
            <p className="mt-1 text-xs leading-relaxed text-primary-600">
              Notre générateur IA adapte ce modèle à votre situation exacte en
              quelques secondes.
            </p>
            <Link
              href={`/generateur?lettre=${categorie}/${slug}`}
              className="mt-4 block rounded-lg bg-primary-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
            >
              Personnaliser avec l'IA ✨
            </Link>
          </div>

          {/* Related links */}
          {letter.relatedLinks.length > 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-sm font-semibold text-neutral-800">
                Liens utiles
              </p>
              <ul className="mt-3 space-y-2">
                {letter.relatedLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Related letters */}
      {related.length > 0 && (
        <section className="mt-12 border-t border-neutral-200 pt-10">
          <h2 className="text-lg font-bold text-neutral-900">
            Lettres similaires
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((l) => (
              <LetterCard
                key={l.slug}
                title={l.title}
                category={l.category}
                slug={l.slug}
                description={l.context.slice(0, 120) + "…"}
                volume={l.estimatedSearchVolume}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
