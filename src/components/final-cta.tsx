"use client";

import { useI18n } from "@/lib/i18n";
import { ArrowRight, Sparkles } from "lucide-react";

export const FinalCTA = () => {
  const { t } = useI18n();

  return (
    <section className="relative py-20 z-10 leopard-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Dekoratif üst çizgi */}
        <div className="w-16 h-1 bg-[var(--lime)] mx-auto mb-8 rounded-full" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-[var(--lime)]/10 border-2 border-[var(--lime)]/30 mb-6">
          <Sparkles size={14} className="text-[var(--lime)]" />
          <span className="text-xs font-bold text-[var(--lime)] uppercase tracking-wider">
            {t("cta.badge")}
          </span>
        </div>

        {/* Başlık */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--foreground)] mb-4 leading-tight">
          {t("cta.title")}
        </h2>

        {/* Açıklama */}
        <p className="text-sm md:text-base text-[var(--gray)] max-w-2xl mx-auto mb-8 leading-relaxed">
          {t("cta.desc")}
        </p>

        {/* CTA Butonları */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] text-[var(--dark-blue)] text-base font-black hover:shadow-[3px_3px_0px_var(--dark-blue)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            {t("cta.primary")}
            <ArrowRight size={18} />
          </a>

          <a
            href="https://wa.me/905419315550"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-transparent border-3 border-[var(--lime)] text-[var(--lime)] text-base font-bold hover:bg-[var(--lime)]/10 transition-all"
          >
            {t("cta.secondary")}
          </a>
        </div>

        {/* Güven notu */}
        <p className="text-[10px] text-[var(--gray)]/60 mt-6 uppercase tracking-wider">
          {t("cta.trust")}
        </p>
      </div>
    </section>
  );
};
