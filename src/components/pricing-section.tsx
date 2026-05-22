"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PLANS } from "@/lib/plans-data";

export const PricingSection = () => {
  const { t, lang } = useI18n();
  const [yearly, setYearly] = useState(false);
  const isEn = lang === "en";

  return (
    <section
      id="pricing"
      className="relative py-20 z-10 bg-[var(--cream)]/40"
      aria-label={isEn ? "Pricing plans" : "Fiyatlandırma planları"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--lime)]/20 border border-[var(--lime)]/40 text-[var(--dark-blue)] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles size={12} />
            {isEn ? "Pricing" : "Planlar"}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--dark-blue)] mb-3">
            {t("plans.heading")}
          </h2>
          <p className="text-[var(--dark-blue)]/65 text-sm md:text-base max-w-2xl mx-auto">
            {t("plans.sub")}
          </p>

          {/* Monthly/Yearly toggle */}
          <div className="inline-flex items-center gap-1 mt-6 p-1 rounded-full bg-white border border-[var(--dark-blue)]/10">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                !yearly
                  ? "bg-[var(--dark-blue)] text-[var(--lime)]"
                  : "text-[var(--dark-blue)]/60"
              }`}
            >
              {isEn ? "Monthly" : "Aylık"}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                yearly
                  ? "bg-[var(--dark-blue)] text-[var(--lime)]"
                  : "text-[var(--dark-blue)]/60"
              }`}
            >
              {isEn ? "Yearly" : "Yıllık"}
              <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full bg-[var(--lime)] text-[var(--dark-blue)] text-[9px] font-black">
                -2 {isEn ? "mo" : "ay"}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan) => {
            const price = yearly ? plan.priceYearly : plan.priceMonthly;
            const isFree = plan.id === "free";
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 transition-all hover:-translate-y-1 ${
                  plan.highlighted
                    ? "bg-[var(--dark-blue)] text-[var(--cream)] border-2 border-[var(--lime)] shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
                    : "bg-white border-2 border-[var(--dark-blue)]/5 hover:border-[var(--lime)]/40"
                }`}
              >
                {plan.badgeKey && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--lime)] text-[var(--dark-blue)] text-[10px] font-black uppercase tracking-wider">
                    {t(plan.badgeKey)}
                  </div>
                )}

                <h3 className={`text-lg font-black mb-1 ${plan.highlighted ? "text-[var(--lime)]" : "text-[var(--dark-blue)]"}`}>
                  {t(plan.nameKey)}
                </h3>
                <p className={`text-xs mb-4 ${plan.highlighted ? "text-[var(--cream)]/60" : "text-[var(--dark-blue)]/55"}`}>
                  {t(plan.taglineKey)}
                </p>

                <div className="mb-4">
                  {isFree ? (
                    <div className="text-3xl font-black">{isEn ? "Free" : "Ücretsiz"}</div>
                  ) : (
                    <>
                      <span className="text-3xl font-black">₺{price.toLocaleString("tr-TR")}</span>
                      <span className={`text-xs ml-1 ${plan.highlighted ? "text-[var(--cream)]/60" : "text-[var(--dark-blue)]/55"}`}>
                        /{yearly ? (isEn ? "year" : "yıl") : (isEn ? "month" : "ay")}
                      </span>
                    </>
                  )}
                </div>

                <div className={`text-xs font-bold mb-5 px-3 py-2 rounded-lg ${
                  plan.highlighted
                    ? "bg-[var(--lime)]/15 text-[var(--lime)]"
                    : "bg-[var(--lime)]/15 text-[var(--dark-blue)]"
                }`}>
                  {plan.monthlyCredits.toLocaleString("tr-TR")} {isEn ? "credits / month" : "kredi / ay"}
                </div>

                <ul className="space-y-2 mb-6 min-h-[200px]">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      {f.included ? (
                        <Check size={14} className={`shrink-0 mt-0.5 ${plan.highlighted ? "text-[var(--lime)]" : "text-[var(--lime)]"}`} />
                      ) : (
                        <X size={14} className={`shrink-0 mt-0.5 ${plan.highlighted ? "text-[var(--cream)]/30" : "text-[var(--dark-blue)]/25"}`} />
                      )}
                      <span className={`${
                        f.included
                          ? plan.highlighted ? "text-[var(--cream)]" : "text-[var(--dark-blue)]"
                          : plan.highlighted ? "text-[var(--cream)]/40 line-through" : "text-[var(--dark-blue)]/40 line-through"
                      }`}>
                        {t(f.labelKey)}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={isFree ? "/register" : "/register?plan=" + plan.id}
                  className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-sm font-black transition-all ${
                    plan.highlighted
                      ? "bg-[var(--lime)] text-[var(--dark-blue)] hover:scale-[1.02]"
                      : "bg-[var(--dark-blue)] text-[var(--lime)] hover:bg-[var(--electric-blue)]"
                  }`}
                >
                  {t(plan.ctaKey)}
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-[var(--dark-blue)]/50 mt-8">
          {isEn
            ? "All plans include unlimited template access. Cancel anytime."
            : "Tüm planlar sınırsız şablon erişimi içerir. İstediğin zaman iptal et."}
        </p>
      </div>
    </section>
  );
};
