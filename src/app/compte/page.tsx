"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  Crown,
  FileText,
  LogOut,
  Loader2,
  Mail,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import Breadcrumbs from "@/components/Breadcrumbs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type Plan = "free" | "premium";

interface Lead {
  id: string;
  letter_slug: string;
  format: string;
  created_at: string;
}

export default function ComptePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [plan, setPlan] = useState<Plan>("free");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  // Redirect si non connecté
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?next=/compte");
    }
  }, [authLoading, user, router]);

  // Fetch profile + leads
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      setLoadingData(true);

      const [{ data: profile }, { data: leadsData }] = await Promise.all([
        supabase.from("profiles").select("plan").eq("id", user.id).single(),
        supabase
          .from("leads")
          .select("id, letter_slug, format, created_at")
          .eq("email", user.email)
          .order("created_at", { ascending: false })
          .limit(50),
      ]);

      if (cancelled) return;

      if (profile?.plan) setPlan(profile.plan as Plan);
      if (leadsData) setLeads(leadsData as Lead[]);
      setLoadingData(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (authLoading || !user) {
    return (
      <div className="mx-auto flex min-h-[40vh] max-w-5xl items-center justify-center px-4">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  const isPremium = plan === "premium";
  const initial = (user.email ?? "?").charAt(0).toUpperCase();

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatLetterSlug(slug: string) {
    // "resiliation/mutuelle-sante" -> "Résiliation - Mutuelle santé"
    const parts = slug.split("/");
    return parts
      .map((p) =>
        p
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      )
      .join(" — ");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Accueil", href: "/" }, { label: "Mon compte" }]}
      />

      {/* En-tête compte */}
      <header className="mt-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white shadow-sm ${
              isPremium
                ? "bg-gradient-to-br from-amber-400 to-orange-500"
                : "bg-primary-600"
            }`}
          >
            {initial}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Mon compte</h1>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-neutral-500">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors disabled:opacity-60"
        >
          {signingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">Se déconnecter</span>
        </button>
      </header>

      {/* Statut du plan */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Votre formule
        </h2>

        {isPremium ? (
          <div className="mt-3 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              <span className="rounded-full bg-amber-500 px-3 py-0.5 text-xs font-semibold text-white">
                Premium
              </span>
            </div>
            <p className="mt-3 text-sm text-amber-900">
              Vous bénéficiez de la personnalisation IA illimitée, de l&apos;envoi
              postal automatisé et du support prioritaire.
            </p>
            <Link
              href="/tarifs"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-900"
            >
              Gérer mon abonnement
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="mt-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-neutral-500" />
              <span className="rounded-full bg-neutral-100 px-3 py-0.5 text-xs font-semibold text-neutral-700">
                Compte gratuit
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-600">
              Vous avez accès à tous les modèles de lettres en téléchargement
              libre. Les fonctionnalités avancées (personnalisation IA, envoi
              postal automatisé) arriveront prochainement.
            </p>
            <div
              title="Bientôt disponible"
              className="mt-4 inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white opacity-60"
            >
              <Sparkles className="h-4 w-4" />
              Passer au Premium
              <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                Bientôt
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Historique des lettres */}
      <section id="historique" className="mt-12 scroll-mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Mes lettres téléchargées
        </h2>

        {loadingData ? (
          <div className="mt-4 flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
          </div>
        ) : leads.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
            <FileText className="mx-auto h-8 w-8 text-neutral-400" />
            <p className="mt-3 text-sm font-medium text-neutral-700">
              Aucune lettre téléchargée pour le moment
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Parcourez notre catalogue et téléchargez votre première lettre
              gratuitement.
            </p>
            <Link
              href="/lettres"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
            >
              Parcourir les lettres
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
            <ul className="divide-y divide-neutral-100">
              {leads.map((lead) => (
                <li
                  key={lead.id}
                  className="flex items-center justify-between gap-3 px-5 py-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                      <FileText className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-neutral-800">
                        {formatLetterSlug(lead.letter_slug)}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {formatDate(lead.created_at)} ·{" "}
                        {lead.format.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/lettres/${lead.letter_slug}`}
                    className="shrink-0 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Voir
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
