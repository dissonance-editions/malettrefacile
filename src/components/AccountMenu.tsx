"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  ChevronDown,
  LogOut,
  Crown,
  FileText,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type Plan = "free" | "premium";

export default function AccountMenu() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<Plan>("free");
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fetch plan depuis profiles
  useEffect(() => {
    if (!user) {
      setPlan("free");
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single();
      if (!cancelled && data?.plan) {
        setPlan(data.plan as Plan);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Click outside pour fermer
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    setOpen(false);
    setSigningOut(false);
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-lg bg-neutral-100" />
    );
  }

  // Déconnecté
  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:border-primary-300 hover:text-primary-600 transition-colors"
      >
        <UserIcon className="h-4 w-4" />
        Se connecter
      </Link>
    );
  }

  // Connecté
  const initial = (user.email ?? "?").charAt(0).toUpperCase();
  const isPremium = plan === "premium";

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2 py-1.5 hover:border-primary-300 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${
            isPremium
              ? "bg-gradient-to-br from-amber-400 to-orange-500"
              : "bg-primary-600"
          }`}
        >
          {initial}
        </span>
        <span className="hidden text-sm font-medium text-neutral-700 sm:inline">
          Mon compte
        </span>
        <ChevronDown
          className={`h-4 w-4 text-neutral-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 origin-top-right overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg"
        >
          {/* User info */}
          <div className="border-b border-neutral-100 px-4 py-3">
            <p className="truncate text-sm font-medium text-neutral-800">
              {user.email}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              {isPremium ? (
                <>
                  <Crown className="h-3.5 w-3.5 text-amber-500" />
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                    Premium
                  </span>
                </>
              ) : (
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                  Compte gratuit
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="py-1">
            <Link
              href="/compte"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              <UserIcon className="h-4 w-4 text-neutral-400" />
              Mon compte
            </Link>
            <Link
              href="/compte#historique"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              <FileText className="h-4 w-4 text-neutral-400" />
              Mes lettres
            </Link>
          </div>

          {/* Sign out */}
          <div className="border-t border-neutral-100 py-1">
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              {signingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
