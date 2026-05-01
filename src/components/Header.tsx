"use client";

import Link from "next/link";
import Image from "next/image";
import AccountMenu from "./AccountMenu";

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="MaLettreFacile - Accueil"
        >
          <Image
            src="/logo.png"
            alt="MaLettreFacile"
            width={40}
            height={40}
            priority
            className="h-10 w-10 shrink-0"
          />
          <span className="text-xl font-semibold tracking-tight text-neutral-900">
            MaLettreFacile
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/lettres"
            className="hidden text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors sm:block"
          >
            Toutes les lettres
          </Link>
          <Link
            href="/blog"
            className="hidden text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors sm:block"
          >
            Blog
          </Link>
          <Link
            href="/tarifs"
            className="hidden text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors sm:block"
          >
            Tarifs
          </Link>
          <AccountMenu />
        </nav>
      </div>
    </header>
  );
}
