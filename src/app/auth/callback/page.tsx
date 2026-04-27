"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";

/**
 * Page de callback OAuth.
 *
 * Le client Supabase est configure avec `detectSessionInUrl: true` ;
 * il lit automatiquement le hash `#access_token=...` retourne par Supabase
 * et etablit la session. On attend que l'event SIGNED_IN se declenche
 * puis on redirige vers la destination finale.
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/compte";

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    // Si la session est deja active (auto-detection a deja fini),
    // on redirige immediatement.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace(next);
        router.refresh();
        return;
      }
    });

    // Sinon on ecoute l'event SIGNED_IN qui sera declenche par
    // detectSessionInUrl quand le hash sera traite.
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          router.replace(next);
          router.refresh();
        } else if (event === "TOKEN_REFRESHED" && session) {
          router.replace(next);
          router.refresh();
        }
      }
    );

    // Fallback : si rien ne se passe au bout de 5 secondes, redirige vers login
    const timeout = setTimeout(() => {
      router.replace("/login?error=oauth_failed&reason=timeout");
    }, 5000);

    return () => {
      subscription.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [router, next]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      <p className="mt-4 text-sm text-neutral-500">
        Connexion en cours...
      </p>
    </div>
  );
}