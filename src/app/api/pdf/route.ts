import { NextRequest, NextResponse } from "next/server";

// Phase 2 — PDF generation endpoint
// Uses @react-pdf/renderer or jsPDF to create formatted letter PDFs

export async function POST(request: NextRequest) {
  // TODO: Phase 2
  // 1. Authenticate user + check premium/credits
  // 2. Receive letter content
  // 3. Generate PDF with professional layout
  // 4. Return PDF blob

  return NextResponse.json(
    { error: "L'export PDF sera disponible prochainement." },
    { status: 501 }
  );
}
