"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

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

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="/lettres"
            className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
          >
            Toutes les lettres
          </Link>
          <Link
            href="/tarifs"
            className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
          >
            Tarifs
          </Link>
        </nav>
      </div>
    </header>
  );
}
