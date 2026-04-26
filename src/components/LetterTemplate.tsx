"use client";

import { useState } from "react";
import { Copy, Check, Download, Mail } from "lucide-react";
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
        {/* Header avec titre + actions */}
        <div className="flex flex-col gap-3 border-b border-neutral-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
            <Mail className="h-5 w-5 text-primary-600" />
            Le modèle de lettre
          </h2>
          <div className="flex items-center gap-2">
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
              <span className="hidden sm:inline">Compléter et télécharger</span>
              <span className="sm:hidden">Télécharger</span>
            </button>
          </div>
        </div>

        {/* Template body */}
        <div className="p-5 sm:p-6">
          <div className="letter-template">{renderTemplate(template)}</div>
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
