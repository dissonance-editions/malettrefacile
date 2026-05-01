import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/data/blog";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog — Conseils, modèles et droit pratique",
  description:
    "Guides pratiques, obligations légales et modèles de lettres expliqués pas à pas : résiliation, emploi, immobilier, consommation. Par l'équipe MaLettreFacile.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const allPosts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Accueil", href: "/" }, { label: "Blog" }]}
      />

      <div className="mt-6 max-w-3xl">
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          Le blog MaLettreFacile
        </h1>
        <p className="mt-2 text-base leading-relaxed text-neutral-500">
          Guides pratiques, obligations légales et modèles de lettres expliqués
          pas à pas. Pour comprendre vos droits avant d&rsquo;envoyer le
          courrier.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {allPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
              {post.category}
            </p>
            <h2 className="mt-2 text-lg font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {post.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400">
              <span>Par {post.author}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span>•</span>
              <span>{post.readingMinutes} min de lecture</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
