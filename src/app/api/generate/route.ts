import { NextRequest, NextResponse } from "next/server";

// Phase 2 — AI letter generation endpoint
// Will use Anthropic API (Claude Sonnet) to generate personalized letters

export async function POST(request: NextRequest) {
  // TODO: Phase 2
  // 1. Authenticate user (Supabase)
  // 2. Check user plan / credits
  // 3. Get letter template + context
  // 4. Call Anthropic API with system prompt + user data
  // 5. Log generation to database
  // 6. Return generated letter

  return NextResponse.json(
    { error: "Le générateur IA sera disponible prochainement." },
    { status: 501 }
  );
}
