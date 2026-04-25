import { NextRequest, NextResponse } from "next/server";

// Phase 2 — Stripe webhook handler
// Events to handle:
//   - checkout.session.completed → activate plan/credits
//   - customer.subscription.updated → update plan
//   - customer.subscription.deleted → downgrade to free

export async function POST(request: NextRequest) {
  // TODO: Phase 2
  // 1. Verify Stripe webhook signature
  // 2. Parse event
  // 3. Update user profile in Supabase

  return NextResponse.json({ received: true });
}
