"use client";

import { useI18n } from "@/lib/i18n";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";

export const PortfolioPage = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--lime)] hover:underline mb-6 text-sm font-bold">
          <ArrowLeft size={16} />
          Ana Sayfa
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--lime)] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
          {t("portfolio.title")}
        </h1>
        <p className="text-[var(--gray)] mb-10">{t("portfolio.subtitle")}</p>

        {/* 48 video grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 48 }, (_, i) => (
            <div
              key={i}
              className="aspect-[9/16] rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex flex-col items-center justify-center gap-2 hover:border-[var(--lime)]/50 hover:shadow-[4px_4px_0px_var(--lime)] transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)]/20 flex items-center justify-center group-hover:bg-[var(--lime)]/20 transition-colors">
                <Play size={16} className="text-[var(--gray)] group-hover:text-[var(--lime)]" />
              </div>
              <span className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-wider">
                {t("portfolio.coming")}
              </span>
              <span className="text-[10px] text-[var(--electric-blue)]">#{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
