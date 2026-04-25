import { NextRequest, NextResponse } from "next/server";

// Phase 2 — Create Stripe Checkout session
// Products:
//   - unit: 1,99€ one-time (1 letter generation + PDF)
//   - premium: 4,99€/month subscription (unlimited)

export async function POST(request: NextRequest) {
  // TODO: Phase 2
  // 1. Authenticate user
  // 2. Determine plan type from request body
  // 3. Create or retrieve Stripe customer
  // 4. Create Checkout Session
  // 5. Return session URL

  return NextResponse.json(
    { error: "Le paiement sera disponible prochainement." },
    { status: 501 }
  );
}
