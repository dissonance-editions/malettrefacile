import { NextRequest, NextResponse } from "next/server";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

interface LetterVariable {
  name: string;
  label: string;
  placeholder: string;
}

interface RequestBody {
  letterTitle: string;
  letterSlug: string;
  template: string;
  variables: LetterVariable[];
  values: Record<string, string>;
  email: string;
  emailOptIn: boolean;
  format: "pdf" | "docx";
}

/**
 * Replace [Label] tokens in template with user values.
 * Tokens whose values are not provided remain as [Label] for the user.
 */
function fillTemplate(
  template: string,
  variables: LetterVariable[],
  values: Record<string, string>
): string {
  let result = template;
  for (const variable of variables) {
    const value = values[variable.name]?.trim();
    if (!value) continue;
    // Replace [Label] (case-insensitive) with the user's value
    const escaped = variable.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\[${escaped}\\]`, "g");
    result = result.replace(regex, value);
  }
  return result;
}

async function generateDocx(
  letterTitle: string,
  filledTemplate: string
): Promise<Buffer> {
  const paragraphs = filledTemplate.split("\n").map((line) => {
    if (line.trim() === "") {
      return new Paragraph({ children: [new TextRun("")] });
    }
    const isBold = /^Objet\s*:/i.test(line);
    return new Paragraph({
      children: [
        new TextRun({
          text: line,
          bold: isBold,
          font: "Calibri",
          size: 22, // 11pt
        }),
      ],
      spacing: { after: 120 },
    });
  });

  const doc = new Document({
    creator: "MaLettreFacile",
    title: letterTitle,
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children: paragraphs,
      },
    ],
  });

  return Packer.toBuffer(doc);
}

async function generatePdf(filledTemplate: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89;
  const marginTop = 70;
  const marginBottom = 70;
  const marginLeft = 70;
  const marginRight = 70;
  const fontSize = 11;
  const lineHeight = 16;
  const maxWidth = pageWidth - marginLeft - marginRight;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - marginTop;

  function wrapLine(text: string, useFont: typeof font): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = useFont.widthOfTextAtSize(testLine, fontSize);
      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines.length > 0 ? lines : [""];
  }

  const sourceLines = filledTemplate.split("\n");

  for (const sourceLine of sourceLines) {
    if (sourceLine.trim() === "") {
      y -= lineHeight;
      continue;
    }

    const isBold = /^Objet\s*:/i.test(sourceLine);
    const useFont = isBold ? fontBold : font;
    const wrappedLines = wrapLine(sourceLine, useFont);

    for (const line of wrappedLines) {
      if (y < marginBottom + lineHeight) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - marginTop;
      }
      page.drawText(line, {
        x: marginLeft,
        y,
        size: fontSize,
        font: useFont,
        color: rgb(0.13, 0.13, 0.13),
      });
      y -= lineHeight;
    }
  }

  return pdfDoc.save();
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const {
      letterTitle,
      letterSlug,
      template,
      variables,
      values,
      email,
      emailOptIn,
      format,
    } = body;

    // Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (!template || !variables) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    // === TODO Phase 1.5: persist lead to Supabase ===
    // await saveLeadToSupabase({ email, letterSlug, emailOptIn, format });
    // === TODO Phase 1.5: send email copy via Resend / Postmark ===
    // await sendLetterByEmail({ email, letterTitle, fileBuffer, format });

    const filled = fillTemplate(template, variables, values);

    let fileBuffer: Buffer | Uint8Array;
    let contentType: string;

    if (format === "docx") {
      fileBuffer = await generateDocx(letterTitle, filled);
      contentType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else {
      fileBuffer = await generatePdf(filled);
      contentType = "application/pdf";
    }

    return new NextResponse(fileBuffer as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${letterSlug}.${format}"`,
      },
    });
  } catch (err) {
    console.error("Download error:", err);
    return NextResponse.json(
      {
        error: "Erreur lors de la génération du document",
        detail: err instanceof Error ? err.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
