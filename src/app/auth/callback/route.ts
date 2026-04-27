import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Endpoint OAuth callback.
 *
 * Recoit le `code` de Google via Supabase apres consentement,
 * l'echange contre une session Supabase, pose les cookies, puis redirige.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/compte";
  const errorParam = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Si Google/Supabase a renvoye une erreur en amont, on la log
  if (errorParam) {
    console.error("[OAuth Callback] Provider error:", {
      error: errorParam,
      description: errorDescription,
    });
    return NextResponse.redirect(
      `${origin}/login?error=oauth_failed&reason=${encodeURIComponent(errorParam)}`
    );
  }

  if (!code) {
    console.error("[OAuth Callback] No code in callback URL");
    return NextResponse.redirect(`${origin}/login?error=oauth_failed&reason=no_code`);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[OAuth Callback] Missing Supabase env vars", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
    });
    return NextResponse.redirect(
      `${origin}/login?error=oauth_failed&reason=config`
    );
  }

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          ),
      },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[OAuth Callback] exchangeCodeForSession failed:", {
        message: error.message,
        status: error.status,
        name: error.name,
      });
      return NextResponse.redirect(
        `${origin}/login?error=oauth_failed&reason=${encodeURIComponent(error.message)}`
      );
    }

    return NextResponse.redirect(`${origin}${next}`);
  } catch (err) {
    console.error("[OAuth Callback] Unexpected error:", err);
    return NextResponse.redirect(
      `${origin}/login?error=oauth_failed&reason=exception`
    );
  }
}