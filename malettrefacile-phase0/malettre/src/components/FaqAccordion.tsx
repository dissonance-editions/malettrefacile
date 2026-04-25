"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
        {items.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <span className="text-sm font-medium text-neutral-800">
                {item.q}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className="faq-answer"
              style={{
                maxHeight: openIndex === i ? "200px" : "0",
                opacity: openIndex === i ? 1 : 0,
              }}
            >
              <p className="px-5 pb-4 text-sm leading-relaxed text-neutral-600 sm:px-6">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
