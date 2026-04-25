import Link from "next/link";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-semibold text-neutral-900">MaLettreFacile</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Modèles de lettres et courriers types gratuits.
              Personnalisables en ligne avec notre générateur IA.
            </p>
          </div>

          {/* Categories */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
              Catégories
            </p>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/lettres/${cat.slug}`}
                    className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                  >
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
              Informations
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/tarifs"
                  className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales#cgv"
                  className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  CGV
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales#confidentialite"
                  className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} MaLettreFacile — MARCANT SAS. Tous droits réservés.</p>
          <p className="mt-1">
            Les modèles sont fournis à titre informatif et ne constituent pas un conseil juridique.
          </p>
        </div>
      </div>
    </footer>
  );
}
