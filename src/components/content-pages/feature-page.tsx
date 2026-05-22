"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Coins,
  type LucideIcon,
} from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";

const isEn = (lang: Lang) => lang === "en";

export type FeatureUseCase = {
  titleTr: string;
  titleEn: string;
  descTr: string;
  descEn: string;
  icon: LucideIcon;
};

export type FeatureBenefit = {
  titleTr: string;
  titleEn: string;
  descTr: string;
  descEn: string;
  icon: LucideIcon;
};

export type FeaturePageProps = {
  // Hero
  badgeTr: string;
  badgeEn: string;
  headlineTr: string;
  headlineEn: string;
  subTr: string;
  subEn: string;
  estimatedCredits: number;
  // Sections
  useCases: FeatureUseCase[];
  benefits: FeatureBenefit[];
  // CTA
  primaryHref?: string;
};

const T = ({ tr, en, lang }: { tr: string; en: string; lang: Lang }) =>
  <>{isEn(lang) ? en : tr}</>;

export const FeaturePage = ({
  badgeTr,
  badgeEn,
  headlineTr,
  headlineEn,
  subTr,
  subEn,
  estimatedCredits,
  useCases,
  benefits,
  primaryHref = "/register",
}: FeaturePageProps) => {
  const { lang } = useI18n();

  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--lime)]/20 border border-[var(--lime)]/40 text-[var(--dark-blue)] text-[11px] font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            <T tr={badgeTr} en={badgeEn} lang={lang} />
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-[var(--dark-blue)] leading-[1.05] tracking-tight">
            <T tr={headlineTr} en={headlineEn} lang={lang} />
          </h1>

          <p className="text-base md:text-lg text-[var(--dark-blue)]/70 max-w-2xl mx-auto leading-relaxed">
            <T tr={subTr} en={subEn} lang={lang} />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-[var(--dark-blue)]/60">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[var(--dark-blue)]/10">
              <Coins size={14} className="text-[var(--lime)]" />
              ~{estimatedCredits} {lang === "en" ? "credits per generation" : "kredi / üretim"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[var(--dark-blue)]/10">
              ⚡ {lang === "en" ? "Seconds to result" : "Saniyeler içinde sonuç"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[var(--dark-blue)]/10">
              🎁 {lang === "en" ? "50 free credits" : "50 kredi hediye"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
            <Link
              href={primaryHref}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[var(--lime)] text-[var(--dark-blue)] font-black text-sm md:text-base tracking-wide shadow-[0_8px_24px_rgba(173,233,79,0.45)] hover:scale-[1.03] transition-all"
            >
              {lang === "en" ? "Start Free" : "Ücretsiz Başla"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent text-[var(--dark-blue)] font-bold text-sm md:text-base border-2 border-[var(--dark-blue)]/25 hover:border-[var(--dark-blue)] hover:bg-[var(--dark-blue)]/5 transition-all"
            >
              {lang === "en" ? "Browse Templates" : "Şablonlara Bak"}
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--dark-blue)]">
              {lang === "en" ? "What you can create" : "Neler üretebilirsin"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-white border-2 border-[var(--dark-blue)]/5 hover:border-[var(--lime)]/40 transition-all hover:-translate-y-1"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--lime)]/15 text-[var(--dark-blue)] flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-black text-[var(--dark-blue)] mb-2">
                    <T tr={uc.titleTr} en={uc.titleEn} lang={lang} />
                  </h3>
                  <p className="text-xs text-[var(--dark-blue)]/60 leading-relaxed">
                    <T tr={uc.descTr} en={uc.descEn} lang={lang} />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-[var(--cream)]/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--dark-blue)]">
              {lang === "en" ? "Why MindID" : "Neden MindID"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-white">
                  <div className="w-11 h-11 rounded-xl bg-[var(--dark-blue)] text-[var(--lime)] flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-black text-[var(--dark-blue)] mb-2">
                    <T tr={b.titleTr} en={b.titleEn} lang={lang} />
                  </h3>
                  <p className="text-sm text-[var(--dark-blue)]/65 leading-relaxed">
                    <T tr={b.descTr} en={b.descEn} lang={lang} />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works — SaaS flow */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--dark-blue)]">
              {lang === "en" ? "How it works" : "Nasıl çalışır"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: "01",
                tr: "Kaydol",
                en: "Sign up",
                descTr: "30 saniyede ücretsiz hesap, 50 kredi hediye.",
                descEn: "Free account in 30 seconds, 50 credits gift.",
              },
              {
                num: "02",
                tr: "Şablon seç & özelleştir",
                en: "Pick & customize",
                descTr: "Hazır şablonlardan başla, kendi marka bilgini gir.",
                descEn: "Start from templates, drop in your brand details.",
              },
              {
                num: "03",
                tr: "AI üretsin, indir",
                en: "AI runs, you download",
                descTr: "Saniyeler içinde stüdyo kalitesinde sonuç. Anında indir.",
                descEn: "Studio-quality output in seconds. Download instantly.",
              },
            ].map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-white border-2 border-[var(--dark-blue)]/5">
                <div className="text-3xl font-black text-[var(--lime)] mb-2">{step.num}</div>
                <h3 className="text-base font-black text-[var(--dark-blue)] mb-2">
                  {lang === "en" ? step.en : step.tr}
                </h3>
                <p className="text-sm text-[var(--dark-blue)]/65 leading-relaxed">
                  {lang === "en" ? step.descEn : step.descTr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto rounded-3xl bg-[var(--dark-blue)] text-[var(--cream)] p-10 md:p-14 text-center">
          <CheckCircle2 size={32} className="text-[var(--lime)] mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            {lang === "en" ? "Try it free. No credit card." : "Ücretsiz dene. Kart gerekmez."}
          </h2>
          <p className="text-[var(--cream)]/70 mb-6 text-sm md:text-base">
            {lang === "en"
              ? "50 credits on signup. Cancel anytime."
              : "Kayıt olunca 50 kredi hediye. İstediğin zaman iptal et."}
          </p>
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--lime)] text-[var(--dark-blue)] font-black text-base hover:scale-[1.03] transition-transform"
          >
            {lang === "en" ? "Start Free" : "Ücretsiz Başla"}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};
