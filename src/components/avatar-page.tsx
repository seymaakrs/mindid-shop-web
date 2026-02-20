"use client";

import { useI18n } from "@/lib/i18n";
import { ArrowLeft, Play, Bot } from "lucide-react";
import Link from "next/link";

export const AvatarPage = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--lime)] hover:underline mb-6 text-sm font-bold">
          <ArrowLeft size={16} />
          Ana Sayfa
        </Link>

        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[6px_6px_0px_var(--dark-blue)] flex items-center justify-center mx-auto mb-6 animate-float">
            <Bot size={36} className="text-[var(--dark-blue)]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--lime)] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
            {t("avatar.title")}
          </h1>
          <p className="text-[var(--gray)]">{t("avatar.subtitle")}</p>
        </div>

        {/* Video area */}
        <div className="aspect-video rounded-lg bg-[var(--card)] border-3 border-[var(--lime)] shadow-[6px_6px_0px_var(--lime)] flex items-center justify-center mb-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--lime)]/10 border-3 border-[var(--lime)] flex items-center justify-center mx-auto mb-3 cursor-pointer hover:bg-[var(--lime)]/20 transition-colors">
              <Play size={28} className="text-[var(--lime)] ml-1" />
            </div>
            <p className="text-sm text-[var(--gray)]">Video alani</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/#services"
            className="inline-flex px-8 py-4 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] font-extrabold hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Hizmetlere Don
          </Link>
        </div>
      </div>
    </div>
  );
};
