"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Sparkles, ArrowRight, Zap, Rocket, Crown, Building2 } from "lucide-react";
import type { ComponentType } from "react";
import { useI18n } from "@/lib/i18n";
import { PLANS } from "@/lib/plans-data";

const PLAN_ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  free: Zap,
  starter: Rocket,
  growth: Crown,
  scale: Building2,
};

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
          <div className="inline-flex items-center gap-1 mt-6 p-1 rounded-full bg-white border border-[var(--dark-blue)]/10 shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                !yearly
                  ? "bg-[var(--dark-blue)] text-[var(--lime)] shadow-sm"
                  : "text-[var(--dark-blue)]/60"
              }`}
            >
              {isEn ? "Monthly" : "Aylık"}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                yearly
                  ? "bg-[var(--dark-blue)] text-[var(--lime)] shadow-sm"
                  : "text-[var(--dark-blue)]/60"
              }`}
            >
              {isEn ? "Yearly" : "Yıllık"}
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[var(--lime)] text-[var(--dark-blue)] text-[9px] font-black">
                {isEn ? "−2 mo" : "−2 ay"}
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid — popular plan moves to top on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan) => {
            const price = yearly ? plan.priceYearly : plan.priceMonthly;
            const isFree = plan.id === "free";
            const Icon = PLAN_ICONS[plan.id] ?? Sparkles;
            const monthlyTotal = plan.priceMonthly * 12;
            const yearlySavings = monthlyTotal - plan.priceYearly;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-[var(--dark-blue)] text-[var(--cream)] border-2 border-[var(--lime)] shadow-[0_12px_40px_rgba(0,0,0,0.15)] md:scale-[1.03] order-first md:order-none ring-4 ring-[var(--lime)]/20"
                    : "bg-white border-2 border-[var(--dark-blue)]/5 hover:border-[var(--lime)]/40 hover:-translate-y-1 hover:shadow-xl"
                }`}
              >
                {plan.badgeKey && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--lime)] text-[var(--dark-blue)] text-[10px] font-black uppercase tracking-wider shadow-md">
                    <Sparkles size={10} />
                    {t(plan.badgeKey)}
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-lg font-black ${plan.highlighted ? "text-[var(--lime)]" : "text-[var(--dark-blue)]"}`}>
                    {t(plan.nameKey)}
                  </h3>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    plan.highlighted ? "bg-[var(--lime)]/15 text-[var(--lime)]" : "bg-[var(--dark-blue)]/5 text-[var(--dark-blue)]"
                  }`}>
                    <Icon size={16} />
                  </div>
                </div>

                <p className={`text-xs mb-4 ${plan.highlighted ? "text-[var(--cream)]/60" : "text-[var(--dark-blue)]/55"}`}>
                  {t(plan.taglineKey)}
                </p>

                <div className="mb-4 min-h-[64px]">
                  {isFree ? (
                    <div className="text-3xl font-black">{isEn ? "Free" : "Ücretsiz"}</div>
                  ) : (
                    <>
                      <div>
                        <span className="text-3xl font-black">₺{price.toLocaleString("tr-TR")}</span>
                        <span className={`text-xs ml-1 ${plan.highlighted ? "text-[var(--cream)]/60" : "text-[var(--dark-blue)]/55"}`}>
                          /{yearly ? (isEn ? "year" : "yıl") : (isEn ? "month" : "ay")}
                        </span>
                      </div>
                      {yearly && yearlySavings > 0 && (
                        <p className={`text-[10px] font-bold mt-1 ${plan.highlighted ? "text-[var(--lime)]" : "text-[var(--lime)]"}`}>
                          {isEn ? "Save" : "Tasarruf"} ₺{yearlySavings.toLocaleString("tr-TR")}
                        </p>
                      )}
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
                        <Check size={14} className="shrink-0 mt-0.5 text-[var(--lime)]" />
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
                  className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-sm font-black transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-[var(--lime)] text-[var(--dark-blue)] hover:scale-[1.03] shadow-[0_6px_20px_rgba(173,233,79,0.4)]"
                      : "bg-[var(--dark-blue)] text-[var(--lime)] hover:bg-[var(--electric-blue)]"
                  }`}
                >
                  {t(plan.ctaKey)}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-[var(--dark-blue)]/55">
          <span className="inline-flex items-center gap-1.5">
            <Check size={12} className="text-[var(--lime)]" />
            {isEn ? "Cancel anytime" : "İstediğin zaman iptal"}
          </span>
          <span className="hidden sm:inline text-[var(--dark-blue)]/25">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Check size={12} className="text-[var(--lime)]" />
            {isEn ? "No credit card for Free" : "Ücretsiz planda kart gerekmez"}
          </span>
          <span className="hidden sm:inline text-[var(--dark-blue)]/25">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Check size={12} className="text-[var(--lime)]" />
            {isEn ? "Unlimited template access" : "Sınırsız şablon erişimi"}
          </span>
        </div>
      </div>
    </section>
  );
};
