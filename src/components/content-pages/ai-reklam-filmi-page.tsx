"use client";

import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import {
  ArrowRight,
  Video,
  Film,
  Clapperboard,
  Megaphone,
  Building2,
  Zap,
  Clock,
  RotateCcw,
  Globe,
  FileText,
  Sparkles,
  Scissors,
  Send,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Tv,
  Monitor,
  Smartphone,
  ScreenShare,
} from "lucide-react";

/* -- Hizmet tipleri -- */
const SERVICE_TYPES = [
  {
    icon: Smartphone,
    title: { tr: "Instagram Reels & TikTok", en: "Instagram Reels & TikTok" },
    price: "1.990",
    desc: {
      tr: "Kisa formatta dikkat cekici reklam videolari. 15-60 sn, dikey format, trend uyumlu.",
      en: "Attention-grabbing short-form ad videos. 15-60s, vertical format, trend-ready.",
    },
    href: "/configure/reels",
  },
  {
    icon: Film,
    title: { tr: "Urun Tanitim Filmi", en: "Product Promo Film" },
    price: "1.990",
    desc: {
      tr: "Urun ozelliklerini on plana cikaran profesyonel tanitim videolari. 30-90 sn.",
      en: "Professional product showcase videos highlighting key features. 30-90s.",
    },
    href: "/configure/product",
  },
  {
    icon: Megaphone,
    title: { tr: "Kampanya Filmi", en: "Campaign Film" },
    price: "1.990",
    desc: {
      tr: "Sezonluk kampanya ve lansman icin etkileyici reklam filmleri. 30-120 sn.",
      en: "Impactful ad films for seasonal campaigns and launches. 30-120s.",
    },
    href: "/configure/campaign",
  },
  {
    icon: Building2,
    title: { tr: "Kurumsal Tanitim", en: "Corporate Intro" },
    price: "1.990",
    desc: {
      tr: "Marka hikayenizi anlatan premium kurumsal tanitim filmleri. 60-180 sn.",
      en: "Premium corporate films telling your brand story. 60-180s.",
    },
    href: "/configure/corporate",
  },
];

/* -- Neden AI Reklam Filmi -- */
const BENEFITS = [
  {
    icon: Zap,
    title: { tr: "%70 Daha Ucuz", en: "70% Cheaper" },
    desc: {
      tr: "Geleneksel video produksiyona kiyasla dramatik maliyet avantaji. Ekipman, mekan ve ekip masrafi yok.",
      en: "Dramatic cost advantage over traditional video production. No equipment, location or crew costs.",
    },
  },
  {
    icon: Clock,
    title: { tr: "3-5 Gun Teslimat", en: "3-5 Day Delivery" },
    desc: {
      tr: "Haftalarca surmeyen produksiyon. Brief'ten teslimata 3-5 is gunu.",
      en: "No weeks-long production. From brief to delivery in 3-5 business days.",
    },
  },
  {
    icon: RotateCcw,
    title: { tr: "Sinirsiz Revizyon Imkani", en: "Unlimited Revisions" },
    desc: {
      tr: "Memnun kalana kadar revizyon hakki. Ek maliyet yok, bekleme yok.",
      en: "Revisions until you're satisfied. No extra cost, no waiting.",
    },
  },
  {
    icon: Globe,
    title: { tr: "Cok Dilli Produksiyon", en: "Multilingual Production" },
    desc: {
      tr: "Ayni reklam filmini 30+ dilde uretin. Farkli pazarlar, tek produksiyon.",
      en: "Produce the same ad film in 30+ languages. Different markets, one production.",
    },
  },
];

/* -- Nasil calisir adimlari -- */
const STEPS = [
  {
    step: 1,
    icon: FileText,
    title: { tr: "Brief", en: "Brief" },
    desc: {
      tr: "Markanizi, hedef kitlenizi ve mesajinizi anlatin. Form ile.",
      en: "Tell us about your brand, target audience and message. Via our form.",
    },
  },
  {
    step: 2,
    icon: Sparkles,
    title: { tr: "AI Uretim", en: "AI Production" },
    desc: {
      tr: "Yapay zeka senaryo, gorsel ve animasyon olusturur. Profesyonel kalite.",
      en: "AI generates script, visuals and animation. Professional quality.",
    },
  },
  {
    step: 3,
    icon: Scissors,
    title: { tr: "Post-Produksiyon", en: "Post-Production" },
    desc: {
      tr: "Ses, muzik, renk duzeltme ve son duzenleme. Her detay kontrol edilir.",
      en: "Audio, music, color grading and final editing. Every detail checked.",
    },
  },
  {
    step: 4,
    icon: Send,
    title: { tr: "Teslimat", en: "Delivery" },
    desc: {
      tr: "Platform boyutlarinda hazir dosyalar. Istediginiz formatta teslim.",
      en: "Files ready in platform dimensions. Delivered in your preferred format.",
    },
  },
];

/* -- Platform uyumlulugu -- */
const PLATFORMS = [
  { name: "Instagram", icon: Instagram, specs: "9:16 / 1:1 / 4:5" },
  { name: "TikTok", icon: Smartphone, specs: "9:16 / 1080x1920" },
  { name: "YouTube", icon: Youtube, specs: "16:9 / 1920x1080" },
  { name: "LinkedIn", icon: Linkedin, specs: "1:1 / 16:9 / 9:16" },
  { name: "Facebook", icon: Facebook, specs: "1:1 / 4:5 / 16:9" },
  { name: "TV & Yayın", icon: Tv, specs: "16:9 / 4K UHD" },
  { name: "Web", icon: Monitor, specs: "16:9 / 1920x1080" },
  { name: "Digital Signage", icon: ScreenShare, specs: "9:16 / 16:9 / Custom" },
];

export const AIReklamFilmiPage = () => {
  const { lang } = useI18n();

  const t = (obj: { tr: string; en: string }) =>
    lang === "en" ? obj.en : obj.tr;

  return (
    <>
      {/* -- HERO -- */}
      <section className="relative py-16 md:py-24 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--lime)]/15 border-2 border-[var(--lime)]/30 mb-6">
            <Video size={14} className="text-[var(--foreground)]" />
            <span className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
              {lang === "en"
                ? "AI Video Production Studio"
                : "AI Video Produksiyon Studyosu"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] leading-tight mb-6">
            {lang === "en"
              ? "Ad Film Production"
              : "Reklam Filmi Uretimi"}
            <br />
            <span className="text-[var(--lime)] relative inline-block">
              {lang === "en" ? "With AI" : "Yapay Zeka ile"}
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

          <p className="text-base md:text-lg text-[var(--gray)] max-w-2xl mx-auto mb-8 leading-relaxed">
            {lang === "en"
              ? "Professional ad films with AI — 70% less cost, 3-5 day delivery. Instagram Reels, TikTok, product promos, campaign films and more."
              : "Yapay zeka ile profesyonel reklam filmleri — %70 daha az maliyetle, 3-5 gunde teslim. Instagram Reels, TikTok, urun tanitim, kampanya filmleri ve dahasi."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#hizmetler"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] text-[var(--dark-blue)] text-base font-black hover:shadow-[3px_3px_0px_var(--dark-blue)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              {lang === "en" ? "Select Your Need" : "İhtiyacını Seç"}
              <ArrowRight size={18} />
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md border-3 border-[var(--dark-blue)] text-[var(--dark-blue)] text-base font-bold hover:bg-[var(--lime)]/10 transition-all"
            >
              {lang === "en" ? "View Portfolio" : "Portfolyoyu İncele"}
            </Link>
          </div>

          {/* Stat badges */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl font-black text-[var(--foreground)]">
                %70
              </div>
              <div className="text-[10px] text-[var(--gray)] font-bold uppercase tracking-wider">
                {lang === "en" ? "Savings" : "Tasarruf"}
              </div>
            </div>
            <div className="text-center border-x-2 border-[var(--electric-blue)]/15">
              <div className="text-3xl font-black text-[var(--foreground)]">
                3-5
              </div>
              <div className="text-[10px] text-[var(--gray)] font-bold uppercase tracking-wider">
                {lang === "en" ? "Day Delivery" : "Gun Teslimat"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-[var(--foreground)]">
                48+
              </div>
              <div className="text-[10px] text-[var(--gray)] font-bold uppercase tracking-wider">
                {lang === "en" ? "Projects" : "Proje"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- HIZMET TIPLERI -- */}
      <section id="hizmetler" className="relative py-16 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-3">
              {lang === "en" ? "Service Types" : "Hizmet Tipleri"}
            </h2>
            <p className="text-[var(--gray)] text-sm max-w-xl mx-auto">
              {lang === "en"
                ? "Choose the right format for your brand and budget"
                : "Markaniz ve butcenize uygun formati secin"}
            </p>
            <div className="w-20 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICE_TYPES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Link
                  key={i}
                  href={service.href}
                  className="group p-6 rounded-lg bg-[var(--card)] border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] hover:border-[var(--lime)] hover:shadow-[4px_4px_0px_var(--lime)] transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--lime)]/15 border-2 border-[var(--lime)]/30 flex items-center justify-center">
                      <Icon
                        size={24}
                        className="text-[var(--dark-blue)]"
                      />
                    </div>
                    <span className="text-xs font-black text-[var(--lime)] bg-[var(--dark-blue)] px-3 py-1 rounded">
                      {lang === "en" ? "from" : ""} {service.price}
                      {lang === "en" ? " TRY" : "₺'den"}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-[var(--foreground)] mb-2">
                    {t(service.title)}
                  </h3>
                  <p className="text-xs text-[var(--gray)] leading-relaxed mb-4">
                    {t(service.desc)}
                  </p>

                  <div className="flex items-center gap-1.5 text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--electric-blue)] transition-colors">
                    {lang === "en" ? "Configure" : "Yapilandir"}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* -- NEDEN AI REKLAM FILMI -- */}
      <section className="relative py-16 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-3">
              {lang === "en" ? "Why AI Ad Films?" : "Neden AI Reklam Filmi?"}
            </h2>
            <div className="w-20 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-lg bg-[var(--card)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] hover:border-[var(--lime)] hover:shadow-[3px_3px_0px_var(--lime)] transition-all hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--lime)]/15 border-2 border-[var(--lime)]/30 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-[var(--dark-blue)]" />
                  </div>
                  <h3 className="font-black text-sm text-[var(--foreground)] mb-1">
                    {t(item.title)}
                  </h3>
                  <p className="text-xs text-[var(--gray)] leading-relaxed">
                    {t(item.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -- NASIL CALISIR -- */}
      <section className="relative py-16 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-2">
              {lang === "en" ? "How It Works" : "Nasil Calisir?"}
            </h2>
            <div className="w-16 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.step}
                  className="relative p-5 rounded-lg bg-[var(--card)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] text-center"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--lime)] border-3 border-[var(--dark-blue)] flex items-center justify-center text-sm font-black text-[var(--dark-blue)]">
                    {s.step}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[var(--lime)]/10 border-2 border-[var(--lime)]/20 flex items-center justify-center mx-auto mt-2 mb-3">
                    <Icon size={20} className="text-[var(--dark-blue)]" />
                  </div>
                  <h3 className="font-black text-sm text-[var(--foreground)] mb-2">
                    {t(s.title)}
                  </h3>
                  <p className="text-xs text-[var(--gray)] leading-relaxed">
                    {t(s.desc)}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* -- PLATFORM UYUMLULUGU -- */}
      <section className="relative py-16 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-2">
              {lang === "en"
                ? "Platform Compatibility"
                : "Platform Uyumlulugu"}
            </h2>
            <p className="text-[var(--gray)] text-sm">
              {lang === "en"
                ? "Optimized for all major advertising platforms"
                : "Tum buyuk reklam platformlari icin optimize edilmis formatlar"}
            </p>
            <div className="w-16 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PLATFORMS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-[var(--card)] border-3 border-[var(--dark-blue)]/20 text-center hover:border-[var(--lime)] hover:shadow-[3px_3px_0px_var(--lime)] transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--lime)]/10 flex items-center justify-center mx-auto mb-2">
                    <Icon size={16} className="text-[var(--dark-blue)]" />
                  </div>
                  <div className="font-black text-sm text-[var(--foreground)] mb-1">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-[var(--gray)]">
                    {p.specs}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -- CTA -- */}
      <section className="relative py-16 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-1 bg-[var(--lime)] mx-auto mb-8 rounded-full" />
          <Clapperboard
            size={40}
            className="text-[var(--lime)] mx-auto mb-4"
          />
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4">
            {lang === "en"
              ? "Let's Start Your Project"
              : "Projenizi Baslatalim"}
          </h2>
          <p className="text-sm text-[var(--gray)] mb-8 max-w-xl mx-auto">
            {lang === "en"
              ? "Get your AI ad film quote in minutes. 70% savings, 3-5 day delivery. No commitment required."
              : "AI reklam filmi teklifinizi dakikalar icinde alin. %70 tasarruf, 3-5 gun teslimat. Taahhut gerekmez."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#hizmetler"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] text-[var(--dark-blue)] text-base font-black hover:shadow-[3px_3px_0px_var(--dark-blue)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              {lang === "en" ? "Select Your Need" : "İhtiyacını Seç"}
              <ArrowRight size={18} />
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md border-3 border-[var(--dark-blue)] text-[var(--dark-blue)] text-base font-bold hover:bg-[var(--lime)]/10 hover:border-[var(--lime)] transition-all"
            >
              {lang === "en" ? "View Portfolio" : "Portfolyoyu İncele"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
