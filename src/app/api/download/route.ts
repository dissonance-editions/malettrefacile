import { NextRequest, NextResponse } from "next/server";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

interface LetterVariable {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
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
 * Detecte si une valeur correspond a "non applicable".
 * Doit rester aligne avec isNotApplicable() cote client (FillAndDownloadModal).
 */
function isNotApplicable(value: string): boolean {
  // Filtre points, espaces, slashes (pour N/A, N.A., n / a, etc.)
  const v = value.trim().toLowerCase().replace(/[./\\\s]/g, "");
  return (
    v === "" ||
    v === "na" ||
    v === "nonapplicable" ||
    v === "-" ||
    v === "sansobjet"
  );
}

/**
 * Resoud le template :
 *  - remplace [Label] par les valeurs reelles
 *  - les lignes dont la SEULE substance est un placeholder N/A sont supprimees
 *  - dans les lignes mixtes (texte + placeholder N/A), le placeholder est juste
 *    remplace par une chaine vide et la ligne est conservee si elle reste utile
 *  - les lignes vides consecutives sont compressees pour eviter les trous
 */
function fillTemplate(
  template: string,
  variables: LetterVariable[],
  values: Record<string, string>
): string {
  // Map label -> { value, isNa }
  const replacements = new Map<string, { value: string; isNa: boolean }>();
  for (const v of variables) {
    const raw = values[v.name] ?? "";
    const isNa = isNotApplicable(raw);
    replacements.set(v.label.toLowerCase(), {
      value: isNa ? "" : raw.trim(),
      isNa,
    });
  }

  const sourceLines = template.split("\n");
  const out: string[] = [];

  for (const line of sourceLines) {
    // Trouver tous les placeholders [xxx] de la ligne
    const placeholders = [...line.matchAll(/\[([^\]]+)\]/g)];

    if (placeholders.length === 0) {
      // Pas de placeholder = ligne fixe, on garde
      out.push(line);
      continue;
    }

    // Compter combien de placeholders sont N/A
    const naCount = placeholders.filter((m) => {
      const r = replacements.get(m[1].toLowerCase());
      return r?.isNa === true;
    }).length;

    // Si TOUS les placeholders de la ligne sont N/A,
    // on supprime la ligne entiere (pas juste son contenu)
    if (naCount === placeholders.length) {
      continue;
    }

    // Sinon, on remplace chaque placeholder
    let result = line;
    for (const match of placeholders) {
      const label = match[1];
      const r = replacements.get(label.toLowerCase());
      if (!r) continue;

      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\[${escaped}\\]`, "g");

      if (r.isNa) {
        // Placeholder N/A dans une ligne mixte -> remplacer par chaine vide
        result = result.replace(regex, "");
      } else if (r.value) {
        result = result.replace(regex, r.value);
      }
      // Si pas de valeur du tout (cas non cense arriver puisque tout est requis cote front),
      // on laisse [Label] tel quel par securite
    }

    // Nettoyer espaces multiples laisses par les substitutions vides
    result = result.replace(/[ \t]{2,}/g, " ").replace(/\s+([,;.!?])/g, "$1").trimEnd();

    // Si apres tout ca la ligne est vide / juste de la ponctuation, on la supprime aussi
    if (!result.trim() || /^[\s,;.:—-]+$/.test(result)) {
      continue;
    }

    out.push(result);
  }

  // Compresser les sauts de lignes multiples (max 1 ligne vide consecutive)
  const compressed: string[] = [];
  let prevEmpty = false;
  for (const l of out) {
    const empty = l.trim() === "";
    if (empty && prevEmpty) continue;
    compressed.push(l);
    prevEmpty = empty;
  }

  return compressed.join("\n");
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
          size: 22,
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

  const pageWidth = 595.28;
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

function buildEmailHtml(letterTitle: string, format: "pdf" | "docx"): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f7f7f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid #e5e5e5;">
          <tr>
            <td style="padding:32px 32px 8px;">
              <p style="margin:0;font-size:13px;font-weight:600;color:#2563eb;text-transform:uppercase;letter-spacing:0.05em;">MaLettreFacile</p>
              <h1 style="margin:12px 0 0;font-size:22px;font-weight:600;color:#111827;line-height:1.3;">Votre lettre est prête</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;font-size:15px;line-height:1.6;color:#374151;">
              <p style="margin:0 0 16px;">Bonjour,</p>
              <p style="margin:0 0 16px;">
                Vous trouverez en pièce jointe votre <strong>${letterTitle}</strong>
                au format <strong>${format.toUpperCase()}</strong>, prête à imprimer ou à modifier.
              </p>
              <p style="margin:0 0 16px;">
                Pensez à signer votre lettre avant de l'envoyer.
              </p>
              <p style="margin:0;">À bientôt,<br>L'équipe MaLettreFacile</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 32px;border-top:1px solid #e5e5e5;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.5;">
                Cet email vous a été envoyé suite à votre demande sur
                <a href="https://malettrefacile.fr" style="color:#9ca3af;text-decoration:underline;">malettrefacile.fr</a>.
                Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:11px;color:#9ca3af;">
          MaLettreFacile · MARCANT SAS · Paris, France
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  // Lazy init pour passer le build sans env vars
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Configuration Supabase manquante côté serveur." },
      { status: 500 }
    );
  }
  if (!resendApiKey) {
    return NextResponse.json(
      { error: "Configuration Resend manquante côté serveur." },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  const resend = new Resend(resendApiKey);

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

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (!template || !variables) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    // Lead persistance (non-bloquant)
    try {
      await supabaseAdmin.from("leads").insert({
        email,
        letter_slug: letterSlug,
        opt_in_marketing: emailOptIn,
        format,
      });
    } catch (leadErr) {
      console.error("Lead insert error (non-blocking):", leadErr);
    }

    const filled = fillTemplate(template, variables, values);
    let fileBuffer: Buffer;
    if (format === "docx") {
      fileBuffer = await generateDocx(letterTitle, filled);
    } else {
      const pdfBytes = await generatePdf(filled);
      fileBuffer = Buffer.from(pdfBytes);
    }

    const { error: sendError } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Votre lettre est prête : ${letterTitle}`,
      html: buildEmailHtml(letterTitle, format),
      attachments: [
        {
          filename: `${letterSlug}.${format}`,
          content: fileBuffer.toString("base64"),
        },
      ],
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json(
        {
          error:
            "L'email n'a pas pu être envoyé. Vérifiez votre adresse et réessayez.",
          detail: sendError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, email }, { status: 200 });
  } catch (err) {
    console.error("Send letter error:", err);
    return NextResponse.json(
      {
        error: "Erreur lors de la génération du document",
        detail: err instanceof Error ? err.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
