"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, Download, Send } from "lucide-react";
import Link from "next/link";
import FillAndDownloadModal from "./FillAndDownloadModal";

interface LetterVariable {
  name: string;
  label: string;
  placeholder: string;
}

interface Props {
  template: string;
  letterSlug: string;
  letterTitle: string;
  variables: LetterVariable[];
}

export default function LetterTemplate({
  template,
  letterSlug,
  letterTitle,
  variables,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
    <>
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        {/* Template body */}
        <div className="p-5 sm:p-6">
          <div className="letter-template">{renderTemplate(template)}</div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 border-t border-neutral-100 bg-neutral-50 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:px-6">
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-success-500" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copier
              </>
            )}
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            Compléter et télécharger
          </button>

          <Link
            href={`/envoi/nouveau?lettre=${letterSlug}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-success-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 transition-opacity"
          >
            <Send className="h-4 w-4" />
            Envoyer par La Poste
          </Link>

          <Link
            href={`/generateur?lettre=${letterSlug}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors sm:ml-auto"
          >
            <Sparkles className="h-4 w-4" />
            Personnaliser avec l'IA
          </Link>
        </div>
      </div>

      <FillAndDownloadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        letterTitle={letterTitle}
        letterSlug={letterSlug}
        template={template}
        variables={variables}
      />
    </>
  );
}
