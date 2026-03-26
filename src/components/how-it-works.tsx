"use client";

import { useI18n } from "@/lib/i18n";
import { MessageSquareText, Clapperboard, RefreshCw, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquareText,
    titleKey: "hiw.step1.title",
    descKey: "hiw.step1.desc",
    accent: "var(--lime)",
  },
  {
    icon: Clapperboard,
    titleKey: "hiw.step2.title",
    descKey: "hiw.step2.desc",
    accent: "var(--electric-blue)",
  },
  {
    icon: RefreshCw,
    titleKey: "hiw.step3.title",
    descKey: "hiw.step3.desc",
    accent: "var(--lime)",
  },
  {
    icon: Rocket,
    titleKey: "hiw.step4.title",
    descKey: "hiw.step4.desc",
    accent: "var(--electric-blue)",
  },
];

export const HowItWorks = () => {
  const { t } = useI18n();

  return (
    <section id="how-it-works" className="relative py-20 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--cream)] mb-3">
            {t("hiw.title")}
          </h2>
          <p className="text-[var(--gray)] text-sm md:text-base max-w-2xl mx-auto">
            {t("hiw.subtitle")}
          </p>
          <div className="w-20 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Adım Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative group"
              >
                {/* Bağlantı çizgisi (son adım hariç) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-[var(--lime)]/40 to-[var(--electric-blue)]/40" />
                )}

                <div className="relative p-6 rounded-lg bg-[var(--dark-blue)] border-3 border-[var(--dark-blue)] hover:border-[var(--lime)] shadow-[5px_5px_0px_var(--dark-blue)] hover:shadow-[3px_3px_0px_var(--lime)] transition-all duration-300 hover:-translate-y-1 text-center">
                  {/* Adım numarası */}
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border-3"
                    style={{
                      backgroundColor: step.accent,
                      borderColor: "var(--dark-blue)",
                      color: "var(--dark-blue)",
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* İkon */}
                  <div
                    className="w-14 h-14 rounded-lg mx-auto mt-2 mb-4 flex items-center justify-center border-2"
                    style={{
                      borderColor: step.accent,
                      backgroundColor: `color-mix(in srgb, ${step.accent} 10%, transparent)`,
                    }}
                  >
                    <Icon size={24} style={{ color: step.accent }} />
                  </div>

                  {/* Başlık */}
                  <h3 className="text-base font-black text-[var(--cream)] mb-2">
                    {t(step.titleKey)}
                  </h3>

                  {/* Açıklama */}
                  <p className="text-xs text-[var(--gray)] leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
