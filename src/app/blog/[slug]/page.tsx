import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/data/blog";
import Breadcrumbs from "@/components/Breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);
  const Content = post.Content;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "MaLettreFacile",
      logo: {
        "@type": "ImageObject",
        url: "https://malettrefacile.fr/logo.png",
      },
    },
    mainEntityOfPage: `https://malettrefacile.fr/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <header className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
            {post.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
            <span>Par {post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span>•</span>
            <span>{post.readingMinutes} min de lecture</span>
          </div>
        </header>

        <div className="prose-blog mt-8">
          <Content />
        </div>

        <div className="mt-12 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-500">
          Les informations de cet article sont fournies à titre informatif et ne
          constituent pas un conseil juridique personnalisé. Pour une situation
          spécifique, consultez un professionnel du droit.
        </div>

        {related.length > 0 && (
          <section className="mt-12 border-t border-neutral-200 pt-8">
            <h2 className="text-lg font-bold text-neutral-900">
              À lire également
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                    {p.category}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
