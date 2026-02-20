"use client";

import { useI18n } from "@/lib/i18n";
import { TrendingDown, Zap } from "lucide-react";

export const Hero = () => {
  const { t } = useI18n();

  return (
    <section className="relative py-16 md:py-24 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] mb-8 animate-kinetic-slide">
          <Zap size={16} className="text-[var(--dark-blue)]" />
          <span className="text-sm font-bold text-[var(--dark-blue)]">
            {t("hero.badge")}
          </span>
        </div>

        {/* Title with kinetic animation */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
          <span className="block text-[var(--lime)] animate-kinetic-expand" style={{ animationDelay: "0.2s" }}>
            {t("hero.title1")}
          </span>
          <span className="block text-[var(--cream)] animate-kinetic-expand" style={{ animationDelay: "0.5s" }}>
            {t("hero.title2")}
          </span>
        </h1>

        {/* Cost comparison box */}
        <div className="max-w-2xl mx-auto mt-10 p-6 rounded-lg bg-[var(--dark-blue)] border-3 border-[var(--lime)] shadow-[6px_6px_0px_var(--lime)] animate-kinetic-slide" style={{ animationDelay: "0.8s" }}>
          <p className="text-[var(--cream)] text-sm md:text-base leading-relaxed">
            {t("hero.desc")}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <TrendingDown size={20} className="text-[var(--lime)]" />
            <span className="text-lg font-bold text-[var(--lime)]">
              {t("hero.savings")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
