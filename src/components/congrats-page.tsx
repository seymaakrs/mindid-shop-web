"use client";

import { useI18n } from "@/lib/i18n";
import { PartyPopper, TrendingDown, Clock, Mail } from "lucide-react";
import Link from "next/link";

type CongratsPageProps = {
  totalAI: number;
  totalTraditional: number;
  savings: number;
  serviceName: string;
};

export const CongratsPage = ({ totalAI, totalTraditional, savings, serviceName }: CongratsPageProps) => {
  const { t, formatPrice } = useI18n();
  const savingsPercent = totalTraditional > 0 ? Math.round((savings / totalTraditional) * 100) : 0;

  return (
    <div className="min-h-screen relative z-10 flex items-center justify-center py-16">
      <div className="max-w-xl mx-auto px-4 text-center">
        {/* Party icon */}
        <div className="w-20 h-20 rounded-full bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[6px_6px_0px_var(--dark-blue)] flex items-center justify-center mx-auto mb-6 animate-float">
          <PartyPopper size={36} className="text-[var(--dark-blue)]" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--lime)] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
          {t("congrats.title")}
        </h1>

        <p className="text-[var(--cream)] mb-8">
          <strong>{serviceName}</strong> talepleriniz basariyla alindi.
        </p>

        {/* Price comparison cards */}
        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-md bg-[var(--card)] border-3 border-[var(--gray)]/30">
            <div className="text-xs text-[var(--gray)] uppercase tracking-wider font-bold">{t("congrats.traditional_cost")}</div>
            <div className="text-2xl font-extrabold text-[var(--gray)] line-through mt-1" style={{ fontFamily: "Syne, sans-serif" }}>
              {formatPrice(totalTraditional)}
            </div>
          </div>

          <div className="p-4 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[6px_6px_0px_var(--dark-blue)]">
            <div className="text-xs text-[var(--dark-blue)] uppercase tracking-wider font-bold">{t("congrats.ai_cost")}</div>
            <div className="text-3xl font-extrabold text-[var(--dark-blue)] mt-1" style={{ fontFamily: "Syne, sans-serif" }}>
              {formatPrice(totalAI)}
            </div>
          </div>

          <div className="p-4 rounded-md bg-[var(--electric-blue)] border-3 border-[var(--lime)]">
            <div className="flex items-center justify-center gap-2">
              <TrendingDown size={20} className="text-[var(--lime)]" />
              <span className="text-xs text-[var(--lime)] uppercase tracking-wider font-bold">{t("congrats.profit")}</span>
            </div>
            <div className="text-3xl font-extrabold text-[var(--lime)] mt-1" style={{ fontFamily: "Syne, sans-serif" }}>
              {formatPrice(savings)} ({savingsPercent}%)
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="p-5 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/30 mb-8 text-left">
          <h3 className="font-bold text-[var(--cream)] mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
            Siradaki Adimlar
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-[var(--lime)] mt-0.5 shrink-0" />
              <p className="text-sm text-[var(--gray)]">24 saat icinde sizinle iletisime gececegiz.</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-[var(--lime)] mt-0.5 shrink-0" />
              <p className="text-sm text-[var(--gray)]">Detayli brief ve proje plani e-posta ile paylasilacak.</p>
            </div>
          </div>
        </div>

        {/* MindID info */}
        <div className="text-xs text-[var(--gray)] mb-6">
          <p className="font-bold text-[var(--cream)]">MindID - AI Video Produksiyon Ajansi</p>
          <p className="mt-1">info@mindid.com | +90 XXX XXX XX XX</p>
        </div>

        <Link
          href="/"
          className="inline-flex px-6 py-3 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] font-bold hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          Ana Sayfaya Don
        </Link>
      </div>
    </div>
  );
};
