"use client";

import { useI18n } from "@/lib/i18n";
import { ArrowRight, Sparkles, Play, Zap } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  const { t, lang } = useI18n();

  return (
    <section className="relative py-16 md:py-24 lg:py-32 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--lime)]/15 border-2 border-[var(--lime)]/30 mb-6">
            <Sparkles size={14} className="text-[var(--foreground)]" />
            <span className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
              {t("hero.badge")}
            </span>
          </div>

          {/* H1 — Ana baslik */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] leading-tight mb-6">
            <span className="text-[var(--lime)] inline-block relative">
              Vibe Marketing
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8c40-6 80-6 120-2s56 4 76 0"
                  stroke="var(--lime)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Aciklama */}
          <p className="text-base md:text-lg text-[var(--gray)] max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("hero.desc")}
          </p>

          {/* CTA Butonlari */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] text-[var(--dark-blue)] text-base font-black hover:shadow-[3px_3px_0px_var(--dark-blue)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              {lang === "en" ? "Select Your Need" : "İhtiyacını Seç"}
              <ArrowRight size={18} />
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-transparent border-3 border-[var(--dark-blue)] text-[var(--dark-blue)] text-base font-bold hover:bg-[var(--lime)]/10 hover:border-[var(--lime)] transition-all"
            >
              <Play size={16} />
              {t("nav.portfolio")}
            </Link>
          </div>

          {/* Hizli istatistikler */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-[var(--foreground)]">%70</div>
              <div className="text-[10px] md:text-xs text-[var(--gray)] font-bold uppercase tracking-wider">
                {lang === "en" ? "Cost Savings" : "Maliyet Tasarrufu"}
              </div>
            </div>
            <div className="text-center border-x-2 border-[var(--electric-blue)]/15">
              <div className="flex items-center justify-center gap-1">
                <Zap size={18} className="text-[var(--lime)]" />
                <span className="text-2xl md:text-3xl font-black text-[var(--foreground)]">3-5</span>
              </div>
              <div className="text-[10px] md:text-xs text-[var(--gray)] font-bold uppercase tracking-wider">
                {lang === "en" ? "Day Delivery" : "Gün Teslimat"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-[var(--foreground)]">48+</div>
              <div className="text-[10px] md:text-xs text-[var(--gray)] font-bold uppercase tracking-wider">
                {lang === "en" ? "Projects" : "Proje"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
