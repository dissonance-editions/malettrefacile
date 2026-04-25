"use client";

import Link from "next/link";
import { FileText, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const { user, loading } = useAuth();

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
            href="/generateur"
            className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
          >
            Générateur IA
          </Link>
          <Link
            href="/tarifs"
            className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
          >
            Tarifs
          </Link>

          {/* Auth area */}
          {!loading && !user && (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
            >
              <UserIcon className="h-4 w-4" />
              Se connecter
            </Link>
          )}
          {!loading && user && (
            <Link
              href="/compte"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:border-primary-300 transition-colors"
            >
              <UserIcon className="h-4 w-4" />
              Mon compte
            </Link>
          )}

          <Link
            href="/generateur"
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
          >
            Personnaliser ✨
          </Link>
        </nav>
      </div>
    </header>
  );
}
