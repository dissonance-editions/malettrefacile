import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Fil d'ariane" className="text-sm text-neutral-500">
        <ol className="flex flex-wrap items-center gap-0">
          {items.map((item, i) => (
            <li key={i} className="flex items-center">
              {i > 0 && <span className="breadcrumb-sep" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-neutral-700 font-medium">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
