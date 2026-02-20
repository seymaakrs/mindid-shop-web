"use client";

import { useI18n } from "@/lib/i18n";
import { useFAQ } from "@/lib/hooks/use-firestore";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

// Fallback i18n keys when Firestore has no data
const FAQ_KEYS = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
];

export const FAQSection = () => {
  const { t, lang } = useI18n();
  const { data: firestoreFAQ } = useFAQ();

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

  return (
    <section id="faq" className="relative py-16 z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-[var(--lime)] text-center mb-10">
          {t("faq.title")}
        </h2>

        <Accordion.Root type="single" collapsible className="space-y-3">
          {faqItems.map((faq, i) => (
            <Accordion.Item
              key={i}
              value={`faq-${i}`}
              className="rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 overflow-hidden data-[state=open]:border-[var(--lime)] data-[state=open]:shadow-[4px_4px_0px_var(--lime)] transition-all"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left cursor-pointer group">
                  <span className="font-bold text-sm text-[var(--cream)] group-data-[state=open]:text-[var(--lime)]">
                    {faq.question}
                  </span>
                  <ChevronDown size={18} className="text-[var(--gray)] group-data-[state=open]:text-[var(--lime)] transition-transform group-data-[state=open]:rotate-180 shrink-0 ml-2" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 data-[state=open]:animate-kinetic-slide">
                <p className="text-sm text-[var(--cream)]/70 leading-relaxed">
                  {faq.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
};
