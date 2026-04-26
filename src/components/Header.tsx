"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import AccountMenu from "./AccountMenu";

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
        >
          <FileText className="h-7 w-7" strokeWidth={1.8} />
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
