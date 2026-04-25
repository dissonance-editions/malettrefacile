"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Mail, Sparkles, FileText, Loader2, Send } from "lucide-react";
import { useAuth } from "@/lib/auth";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [recentMailings, setRecentMailings] = useState<unknown[]>([]);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?next=/compte");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      // TODO: fetch profile + recent mailings
      setProfileLoading(false);
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Accueil", href: "/" }, { label: "Mon compte" }]}
      />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Mon compte</h1>
          <p className="mt-1 text-sm text-neutral-500">{user.email}</p>
        </div>
        <button
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </button>
      </div>

      {/* Plan card */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Plan actuel
          </p>
          <p className="mt-2 text-lg font-bold text-neutral-900">Gratuit</p>
          <Link
            href="/tarifs"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Passer au Premium →
          </Link>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Lettres simples ce mois
          </p>
          <p className="mt-2 text-lg font-bold text-neutral-900">0 / 0</p>
          <p className="mt-2 text-xs text-neutral-500">
            Quota inclus dans le Premium.
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Recommandés ce mois
          </p>
          <p className="mt-2 text-lg font-bold text-neutral-900">0 / 0</p>
          <p className="mt-2 text-xs text-neutral-500">
            Quota inclus dans le Premium.
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/lettres"
          className="group flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm hover:border-primary-300 hover:shadow-md transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
            <FileText className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-800">
              Parcourir les lettres
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
              200+ modèles gratuits, classés par catégorie.
            </p>
          </div>
        </Link>
        <Link
          href="/envoi/nouveau"
          className="group flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm hover:border-primary-300 hover:shadow-md transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
            <Send className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-800">
              Envoyer une lettre
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
              On l'imprime et on la poste pour vous.
            </p>
          </div>
        </Link>
      </div>

      {/* Mailings history */}
      <div className="mt-10">
        <h2 className="text-base font-bold text-neutral-900">
          Mes envois récents
        </h2>
        {profileLoading ? (
          <div className="mt-4 flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
          </div>
        ) : recentMailings.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
            <Mail className="mx-auto h-8 w-8 text-neutral-300" />
            <p className="mt-2 text-sm text-neutral-500">
              Aucun envoi pour l'instant.
            </p>
            <Link
              href="/envoi/nouveau"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              <Sparkles className="h-4 w-4" />
              Envoyer ma première lettre
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
