import { NextRequest, NextResponse } from "next/server";
import { getMailingProvider } from "@/lib/mailing";
import { computePrice } from "@/lib/mailing/pricing";
import type { MailType, MailAddress } from "@/lib/mailing/types";
import { getSupabaseServerClient } from "@/lib/supabase";

interface RequestBody {
  type: MailType;
  pages?: number;
  sender: MailAddress;
  recipient: MailAddress;
  letterSlug: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const { type, sender, recipient, letterSlug } = body;
    const pages = Number(body.pages) || 1;

    // === Auth: extract user from Authorization header ===
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace("Bearer ", "");
    if (!accessToken) {
      return NextResponse.json(
        { error: "Connexion requise" },
        { status: 401 }
      );
    }

    const supabase = getSupabaseServerClient();
    const { data: userData, error: userError } = await supabase.auth.getUser(
      accessToken
    );
    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "Session invalide" },
        { status: 401 }
      );
    }
    const user = userData.user;

    // === Validation ===
    if (!["simple", "recommande", "recommande_ar"].includes(type)) {
      return NextResponse.json(
        { error: "Type d'envoi invalide" },
        { status: 400 }
      );
    }
    if (!sender?.fullName || !recipient?.fullName) {
      return NextResponse.json(
        { error: "Adresses incomplètes" },
        { status: 400 }
      );
    }

    // === Compute price ===
    const price = computePrice(type, pages);

    // === Check user quota (Premium) ===
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, quota_simple_remaining, quota_recommande_remaining")
      .eq("id", user.id)
      .single();

    let usedQuota = false;
    if (profile?.plan === "premium") {
      if (
        type === "simple" &&
        (profile.quota_simple_remaining ?? 0) > 0
      ) {
        usedQuota = true;
      } else if (
        (type === "recommande" || type === "recommande_ar") &&
        (profile.quota_recommande_remaining ?? 0) > 0
      ) {
        usedQuota = true;
      }
    }

    // === Insert mailing record (pending) ===
    const { data: mailing, error: insertError } = await supabase
      .from("mailings")
      .insert({
        user_id: user.id,
        letter_slug: letterSlug,
        letter_title: letterSlug, // TODO: pass real title
        mail_type: type,
        pages,
        sender_address: sender,
        recipient_address: recipient,
        provider: getMailingProvider().name,
        status: usedQuota ? "paid" : "pending",
        price_cents: Math.round(price.finalPriceTTC * 100),
        used_quota: usedQuota,
      })
      .select()
      .single();

    if (insertError || !mailing) {
      throw new Error(insertError?.message || "DB insert failed");
    }

    // === If quota covers it, send immediately ===
    if (usedQuota) {
      // Decrement quota
      const updateField =
        type === "simple"
          ? "quota_simple_remaining"
          : "quota_recommande_remaining";
      await supabase.rpc("decrement_quota", {
        user_id: user.id,
        field: updateField,
      });

      // TODO: generate PDF from letterSlug + values
      // For now, send a placeholder PDF buffer
      const placeholderPdf = Buffer.from(
        "%PDF-1.4\n%placeholder\n",
        "utf-8"
      );

      const provider = getMailingProvider();
      const result = await provider.send({
        type,
        pdfBuffer: placeholderPdf,
        sender,
        recipient,
        externalRef: mailing.id,
      });

      await supabase
        .from("mailings")
        .update({
          status: "in_production",
          provider_ref: result.providerRef,
          tracking_url: result.trackingUrl,
          sent_at: result.acceptedAt.toISOString(),
        })
        .eq("id", mailing.id);

      return NextResponse.json({
        mailingId: mailing.id,
        status: "in_production",
      });
    }

    // === Otherwise, create Stripe Checkout session ===
    // TODO: integrate Stripe checkout for one-off payment
    // For now, return a placeholder
    return NextResponse.json({
      mailingId: mailing.id,
      checkoutUrl: `/api/stripe/checkout-mailing?mailing=${mailing.id}`,
    });
  } catch (err) {
    console.error("send error:", err);
    return NextResponse.json(
      {
        error: "Erreur lors de la création de l'envoi",
        detail: err instanceof Error ? err.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
