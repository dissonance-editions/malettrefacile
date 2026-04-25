"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import Link from "next/link";

interface Props {
  template: string;
  letterSlug: string;
}

export default function LetterTemplate({ template, letterSlug }: Props) {
  const [copied, setCopied] = useState(false);

  // Highlight [variables] in the template
  function renderTemplate(text: string) {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, i) =>
      part.startsWith("[") && part.endsWith("]") ? (
        <span key={i} className="variable">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(template);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = template;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      {/* Template body */}
      <div className="p-5 sm:p-6">
        <div className="letter-template">{renderTemplate(template)}</div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t border-neutral-100 bg-neutral-50 px-5 py-4 sm:flex-row sm:px-6">
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-success-500" />
              Copié !
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copier le modèle
            </>
          )}
        </button>
        <Link
          href={`/generateur?lettre=${letterSlug}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          Personnaliser avec l'IA
        </Link>
      </div>
    </div>
  );
}
