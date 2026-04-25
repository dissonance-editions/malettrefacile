import { NextRequest, NextResponse } from "next/server";
import { getMailingProvider } from "@/lib/mailing";
import type { MailType } from "@/lib/mailing/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type = body.type as MailType;
    const pages = Number(body.pages) || 1;

    if (!["simple", "recommande", "recommande_ar"].includes(type)) {
      return NextResponse.json(
        { error: "Type d'envoi invalide" },
        { status: 400 }
      );
    }

    const provider = getMailingProvider();
    const quote = await provider.quote({ type, pages });
    return NextResponse.json(quote);
  } catch (err) {
    console.error("quote error:", err);
    return NextResponse.json(
      { error: "Erreur lors du calcul du tarif" },
      { status: 500 }
    );
  }
}
