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
        <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4" >
          {t("congrats.title")}
        </h1>

        <p className="text-[var(--foreground)] mb-8">
          <strong>{serviceName}</strong> {t("congrats.subtitle")}
        </p>

        {/* Savings hero badge */}
        {savings > 0 && (
          <div className="savings-badge inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--lime)]/20 border-2 border-[var(--lime)]/40 mb-6 animate-glow-pulse">
            <TrendingDown size={18} className="text-[var(--foreground)]" />
            <span className="text-lg font-black text-[var(--foreground)]">
              %{savingsPercent} TASARRUF
            </span>
          </div>
        )}

        {/* Price comparison cards */}
        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-md bg-[var(--card)] border-3 border-[var(--gray)]/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--gray)]/50 to-transparent" />
            <div className="text-xs text-[var(--gray)] uppercase tracking-wider font-bold">{t("congrats.traditional_cost")}</div>
            <div className="text-2xl font-black text-[var(--gray)] line-through mt-1">
              {formatPrice(totalTraditional)}
            </div>
            <p className="text-[10px] text-[var(--gray)]/60 mt-1">{t("checkout.comparison_note")}</p>
          </div>

          <div className="p-4 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[6px_6px_0px_var(--dark-blue)] relative overflow-hidden animate-shimmer">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--dark-blue)] to-transparent" />
            <div className="text-xs text-[var(--dark-blue)] uppercase tracking-wider font-bold">{t("congrats.ai_cost")}</div>
            <div className="text-3xl font-black text-[var(--dark-blue)] mt-1">
              {formatPrice(totalAI)}
            </div>
            <p className="text-[10px] text-[var(--dark-blue)]/60 mt-1 font-medium">{t("checkout.smart_move")}</p>
          </div>

          <div className="p-5 rounded-md bg-[var(--electric-blue)] border-3 border-[var(--lime)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--lime)] to-transparent" />
            <div className="flex items-center justify-center gap-2">
              <TrendingDown size={20} className="text-[var(--lime)]" />
              <span className="text-xs text-[var(--lime)] uppercase tracking-wider font-bold">{t("congrats.profit")}</span>
            </div>
            <div className="text-3xl font-black text-[var(--lime)] mt-1 animate-glow-pulse">
              {formatPrice(savings)}
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="p-5 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/30 mb-8 text-left">
          <h3 className="font-bold text-[var(--foreground)] mb-3" >
            Siradaki Adimlar
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-[var(--foreground)] mt-0.5 shrink-0" />
              <p className="text-sm text-[var(--gray)]">24 saat icinde sizinle iletisime gececegiz.</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-[var(--foreground)] mt-0.5 shrink-0" />
              <p className="text-sm text-[var(--gray)]">Detayli brief ve proje plani e-posta ile paylasilacak.</p>
            </div>
          </div>
        </div>

        {/* MindID info */}
        <div className="text-xs text-[var(--gray)] mb-6">
          <p className="font-bold text-[var(--foreground)]">MindID - AI Video Produksiyon Ajansi</p>
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
