"use client";

import { useI18n } from "@/lib/i18n";
import { useFAQ } from "@/lib/hooks/use-firestore";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

// Fallback i18n keys when Firestore has no data
const FAQ_KEYS = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
  { q: "faq.q8", a: "faq.a8" },
  { q: "faq.q9", a: "faq.a9" },
  { q: "faq.q10", a: "faq.a10" },
  { q: "faq.q11", a: "faq.a11" },
  { q: "faq.q12", a: "faq.a12" },
  { q: "faq.q13", a: "faq.a13" },
  { q: "faq.q14", a: "faq.a14" },
  { q: "faq.q15", a: "faq.a15" },
  { q: "faq.q16", a: "faq.a16" },
  { q: "faq.q17", a: "faq.a17" },
  { q: "faq.q18", a: "faq.a18" },
  { q: "faq.q19", a: "faq.a19" },
  { q: "faq.q20", a: "faq.a20" },
  { q: "faq.q21", a: "faq.a21" },
];

const INITIAL_SHOW = 6;

export const FAQSection = () => {
  const { t, lang } = useI18n();
  const { data: firestoreFAQ } = useFAQ();
  const [showAll, setShowAll] = useState(false);

  const useFirestore = firestoreFAQ.length > 0;

  const faqItems = useFirestore
    ? firestoreFAQ.map((item) => ({
        question: lang === "en" ? item.questionEn || item.question : item.question,
        answer: lang === "en" ? item.answerEn || item.answer : item.answer,
      }))
    : FAQ_KEYS.map((faq) => ({
        question: t(faq.q),
        answer: t(faq.a),
      }));

  const visibleItems = showAll ? faqItems : faqItems.slice(0, INITIAL_SHOW);

  return (
    <section id="faq" className="relative py-12 z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-[var(--electric-blue)]/10 flex items-center justify-center">
            <HelpCircle size={18} className="text-[var(--electric-blue)]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[var(--foreground)] leading-tight">
              {t("faq.title")}
            </h2>
            <p className="text-xs text-[var(--gray)]">
              {lang === "en" ? `${faqItems.length} questions answered` : `${faqItems.length} soru cevaplandı`}
            </p>
          </div>
        </div>

        {/* Single column compact accordion */}
        <Accordion.Root type="multiple" aria-label="Sıkça sorulan sorular" className="space-y-1.5">
          {visibleItems.map((faq, i) => (
            <Accordion.Item
              key={i}
              value={`faq-${i}`}
              className="rounded-lg bg-[var(--card)] border border-[var(--electric-blue)]/10 overflow-hidden data-[state=open]:border-[var(--lime)]/50 data-[state=open]:bg-[var(--lime)]/5 transition-all"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex items-center justify-between w-full px-4 py-3 text-left cursor-pointer group">
                  <span className="font-bold text-sm text-[var(--foreground)] leading-snug pr-3">
                    {faq.question}
                  </span>
                  <ChevronDown size={16} aria-hidden="true" className="text-[var(--gray)] group-data-[state=open]:text-[var(--lime)] transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-kinetic-slide">
                <div className="px-4 pb-3">
                  <p className="text-xs text-[var(--foreground)]/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {/* Show more / less toggle */}
        {faqItems.length > INITIAL_SHOW && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 mx-auto flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/5 transition-colors cursor-pointer"
          >
            {showAll
              ? lang === "en" ? "Show less" : "Daha az göster"
              : lang === "en" ? `Show all ${faqItems.length} questions` : `Tüm ${faqItems.length} soruyu göster`}
            <ChevronDown size={14} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
    </section>
  );
};
