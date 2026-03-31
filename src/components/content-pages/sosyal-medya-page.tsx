"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  ArrowRight,
  Sparkles,
  BarChart3,
  Globe,
  Megaphone,
  LineChart,
  Target,
  Search,
  Lightbulb,
  Clapperboard,
  FileBarChart,
  CheckCircle2,
  Crown,
  Smartphone,
  Camera,
  Video,
  ImageIcon,
  Calendar,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PackageFeature {
  tr: string;
  en: string;
  highlight?: boolean;
}

interface PricingPackage {
  name: { tr: string; en: string };
  subtitle: { tr: string; en: string };
  price: number;
  popular?: boolean;
  features: PackageFeature[];
  icon: React.ReactNode;
  accent: string;
  deliverables: {
    carousel: number;
    reels: number;
    story: { tr: string; en: string };
    drone: { tr: string; en: string };
  };
}

interface ConfigOption {
  label: { tr: string; en: string };
  price: number;
}

interface ConfigCategory {
  id: string;
  title: { tr: string; en: string };
  options: ConfigOption[];
}

/* ------------------------------------------------------------------ */
/*  Pricing packages data (3 tiers)                                    */
/* ------------------------------------------------------------------ */

const PACKAGES: PricingPackage[] = [
  {
    name: { tr: "Baslangic Paketi", en: "Starter Package" },
    subtitle: { tr: "Dijitale ilk adim", en: "Your first step into digital" },
    price: 9999,
    icon: <Smartphone className="w-6 h-6" />,
    accent: "var(--electric-blue)",
    deliverables: {
      carousel: 10,
      reels: 3,
      story: { tr: "12 Story/ay (haftada 3)", en: "12 Stories/mo (3/week)" },
      drone: { tr: "Dahil degil", en: "Not included" },
    },
    features: [
      { tr: "2 platform (Instagram + 1 secmeli)", en: "2 platforms (Instagram + 1 choice)" },
      { tr: "10 carousel post/ay", en: "10 carousel posts/month", highlight: true },
      { tr: "3 Reels/ay (AI + profesyonel kurgu)", en: "3 Reels/month (AI + professional editing)", highlight: true },
      { tr: "12 Story/ay (haftada 3)", en: "12 Stories/month (3/week)" },
      { tr: "AI destekli icerik uretimi", en: "AI-powered content creation" },
      { tr: "Icerik takvimi planlama", en: "Content calendar planning" },
      { tr: "Hashtag stratejisi", en: "Hashtag strategy" },
      { tr: "Aylik analiz raporu", en: "Monthly analytics report" },
      { tr: "Temel grafik tasarim", en: "Basic graphic design" },
      { tr: "2 revizyon turu/ay", en: "2 revision rounds/month" },
    ],
  },
  {
    name: { tr: "Standart Paket", en: "Standard Package" },
    subtitle: { tr: "Buyuyen markalar icin", en: "For growing brands" },
    price: 22999,
    popular: true,
    icon: <TrendingUp className="w-6 h-6" />,
    accent: "var(--lime)",
    deliverables: {
      carousel: 10,
      reels: 5,
      story: { tr: "20 Story/ay (haftada 5)", en: "20 Stories/mo (5/week)" },
      drone: { tr: "3 ayda 1 seans", en: "1 session / quarter" },
    },
    features: [
      { tr: "3 platform", en: "3 platforms" },
      { tr: "10 carousel post/ay", en: "10 carousel posts/month", highlight: true },
      { tr: "5 Reels/ay (AI + profesyonel kurgu)", en: "5 Reels/month (AI + professional editing)", highlight: true },
      { tr: "20 Story/ay (haftada 5)", en: "20 Stories/month (5/week)" },
      { tr: "Drone cekimi (3 ayda 1 seans)", en: "Drone footage (1 session/quarter)", highlight: true },
      { tr: "Reklam yonetimi (butce haric)", en: "Ad management (budget excluded)" },
      { tr: "Haftalik analiz raporu", en: "Weekly analytics report" },
      { tr: "Rakip analizi (aylik)", en: "Competitor analysis (monthly)" },
      { tr: "Icerik takvimi + spontan icerik", en: "Content calendar + spontaneous content" },
      { tr: "1 tanitim videosu / ceyrek", en: "1 promo video / quarter" },
      { tr: "4 revizyon turu/ay", en: "4 revision rounds/month" },
    ],
  },
  {
    name: { tr: "Premium Paket", en: "Premium Package" },
    subtitle: { tr: "Tam donanim, sinirsiz buyume", en: "Full power, unlimited growth" },
    price: 37999,
    icon: <Crown className="w-6 h-6" />,
    accent: "var(--dark-blue)",
    deliverables: {
      carousel: 15,
      reels: 8,
      story: { tr: "Gunluk Story (30/ay)", en: "Daily Stories (30/mo)" },
      drone: { tr: "Aylik drone cekimi", en: "Monthly drone session" },
    },
    features: [
      { tr: "5 platform", en: "5 platforms" },
      { tr: "15 carousel post/ay", en: "15 carousel posts/month", highlight: true },
      { tr: "8 Reels/ay (AI + profesyonel kurgu)", en: "8 Reels/month (AI + professional editing)", highlight: true },
      { tr: "Gunluk Story paylasimi (30/ay)", en: "Daily Story posts (30/month)", highlight: true },
      { tr: "Aylik drone cekimi", en: "Monthly drone session", highlight: true },
      { tr: "2 profesyonel video produksiyon/ay", en: "2 professional video productions/month", highlight: true },
      { tr: "Gelismis reklam yonetimi + A/B test", en: "Advanced ad management + A/B testing" },
      { tr: "Influencer arastirma & yonetimi", en: "Influencer research & management" },
      { tr: "Kriz yonetimi", en: "Crisis management" },
      { tr: "Dedike hesap yoneticisi", en: "Dedicated account manager" },
      { tr: "Canli dashboard erisimi", en: "Live dashboard access" },
      { tr: "Sinirsiz revizyon", en: "Unlimited revisions" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Configurator data                                                  */
/* ------------------------------------------------------------------ */

const BASE_PRICE = 5999;

const CONFIG_CATEGORIES: ConfigCategory[] = [
  {
    id: "platforms",
    title: { tr: "Platform Sayisi", en: "Number of Platforms" },
    options: [
      { label: { tr: "1 Platform", en: "1 Platform" }, price: 0 },
      { label: { tr: "2 Platform", en: "2 Platforms" }, price: 0 },
      { label: { tr: "3 Platform", en: "3 Platforms" }, price: 2999 },
      { label: { tr: "4 Platform", en: "4 Platforms" }, price: 4999 },
      { label: { tr: "5+ Platform", en: "5+ Platforms" }, price: 6999 },
    ],
  },
  {
    id: "carousel",
    title: { tr: "Carousel Post/ay", en: "Carousel Posts/Month" },
    options: [
      { label: { tr: "8 post/ay", en: "8 posts/month" }, price: 0 },
      { label: { tr: "10 post/ay", en: "10 posts/month" }, price: 1499 },
      { label: { tr: "15 post/ay", en: "15 posts/month" }, price: 3499 },
      { label: { tr: "20 post/ay", en: "20 posts/month" }, price: 5499 },
    ],
  },
  {
    id: "reels",
    title: { tr: "Reels/ay", en: "Reels/Month" },
    options: [
      { label: { tr: "0 Reels", en: "0 Reels" }, price: 0 },
      { label: { tr: "3 Reels", en: "3 Reels" }, price: 2499 },
      { label: { tr: "5 Reels", en: "5 Reels" }, price: 3999 },
      { label: { tr: "8 Reels", en: "8 Reels" }, price: 5999 },
    ],
  },
  {
    id: "stories",
    title: { tr: "Story Paylasimi", en: "Story Posts" },
    options: [
      { label: { tr: "Haftada 3 (12/ay)", en: "3/week (12/mo)" }, price: 0 },
      { label: { tr: "Haftada 5 (20/ay)", en: "5/week (20/mo)" }, price: 1999 },
      { label: { tr: "Her gun (30/ay)", en: "Daily (30/mo)" }, price: 3999 },
    ],
  },
  {
    id: "drone",
    title: { tr: "Drone & Video Cekimi", en: "Drone & Video Production" },
    options: [
      { label: { tr: "Dahil degil", en: "Not included" }, price: 0 },
      { label: { tr: "3 ayda 1 seans", en: "1 session/quarter" }, price: 3999 },
      { label: { tr: "Ayda 1 seans", en: "1 session/month" }, price: 7999 },
      { label: { tr: "Ayda 2 seans", en: "2 sessions/month" }, price: 12999 },
    ],
  },
  {
    id: "ads",
    title: { tr: "Reklam Yonetimi", en: "Ad Management" },
    options: [
      { label: { tr: "Yok", en: "None" }, price: 0 },
      { label: { tr: "Temel", en: "Basic" }, price: 2999 },
      { label: { tr: "Gelismis + A/B Test", en: "Advanced + A/B Testing" }, price: 5999 },
    ],
  },
];

const EXTRA_SERVICES: ConfigOption[] = [
  { label: { tr: "Influencer Yonetimi", en: "Influencer Management" }, price: 3999 },
  { label: { tr: "Kriz Yonetimi", en: "Crisis Management" }, price: 2999 },
  { label: { tr: "Dedike Hesap Yoneticisi", en: "Dedicated Account Manager" }, price: 4999 },
  { label: { tr: "Canli Dashboard", en: "Live Dashboard" }, price: 2999 },
];

/* ------------------------------------------------------------------ */
/*  Feature cards data                                                 */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: { tr: "Vibe Marketing Felsefesi", en: "Vibe Marketing Philosophy" },
    desc: {
      tr: "AI destekli yuksek hacimli icerik uretimi + profesyonel produksiyon. Geleneksel ajanslarin 3-5 kati icerik, ayni butcede.",
      en: "AI-powered high-volume content + professional production. 3-5x more content than traditional agencies, same budget.",
    },
  },
  {
    icon: <Camera className="w-7 h-7" />,
    title: { tr: "Drone & Video Produksiyon", en: "Drone & Video Production" },
    desc: {
      tr: "Profesyonel drone cekimi ve video produksiyon. Markaniz icin sinematik icerikler.",
      en: "Professional drone footage and video production. Cinematic content for your brand.",
    },
  },
  {
    icon: <ImageIcon className="w-7 h-7" />,
    title: { tr: "Carousel & Gorsel Tasarim", en: "Carousel & Visual Design" },
    desc: {
      tr: "Dikkat cekici carousel postlar, infografikler ve gorsel icerikler. Her biri marka kimliginize uygun.",
      en: "Eye-catching carousel posts, infographics and visual content. Each aligned with your brand identity.",
    },
  },
  {
    icon: <Video className="w-7 h-7" />,
    title: { tr: "AI Reels Uretimi", en: "AI Reels Production" },
    desc: {
      tr: "AI ile hizli Reels uretimi + profesyonel kurgu. Trend yakala, viral ol.",
      en: "Fast Reels with AI + professional editing. Catch trends, go viral.",
    },
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: { tr: "Veri Odakli Strateji", en: "Data-Driven Strategy" },
    desc: {
      tr: "Performans verileriyle beslenen strateji. Her karar veriye dayanir.",
      en: "Strategy powered by performance data. Every decision is data-backed.",
    },
  },
  {
    icon: <Megaphone className="w-7 h-7" />,
    title: { tr: "Reklam Optimizasyonu", en: "Ad Optimization" },
    desc: {
      tr: "Meta, Google, TikTok reklamlari. AI ile A/B test ve butce optimizasyonu.",
      en: "Meta, Google, TikTok ads. AI-powered A/B testing and budget optimization.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Process steps                                                      */
/* ------------------------------------------------------------------ */

const PROCESS_STEPS = [
  {
    step: 1,
    icon: <Search className="w-8 h-8" />,
    title: { tr: "Analiz", en: "Analysis" },
    desc: {
      tr: "Markanizi, sektorunuzu ve rakiplerinizi derinlemesine analiz ediyoruz.",
      en: "We deeply analyze your brand, industry, and competitors.",
    },
  },
  {
    step: 2,
    icon: <Lightbulb className="w-8 h-8" />,
    title: { tr: "Strateji", en: "Strategy" },
    desc: {
      tr: "Veriye dayali icerik stratejisi ve vibe marketing plani olusturuyoruz.",
      en: "We create a data-driven content strategy and vibe marketing plan.",
    },
  },
  {
    step: 3,
    icon: <Clapperboard className="w-8 h-8" />,
    title: { tr: "Uretim", en: "Production" },
    desc: {
      tr: "Carousel, Reels, Story, drone cekimi ve video produksiyon. Hem AI hem geleneksel.",
      en: "Carousel, Reels, Stories, drone footage and video production. Both AI and traditional.",
    },
  },
  {
    step: 4,
    icon: <FileBarChart className="w-8 h-8" />,
    title: { tr: "Raporlama", en: "Reporting" },
    desc: {
      tr: "Detayli performans raporlari ve stratejik optimizasyon onerileri.",
      en: "Detailed performance reports and strategic optimization suggestions.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Comparison table data                                              */
/* ------------------------------------------------------------------ */

const COMPARISON_ROWS = [
  {
    label: { tr: "Platform Sayisi", en: "Platforms" },
    values: ["2", "3", "5"],
  },
  {
    label: { tr: "Carousel Post/ay", en: "Carousel Posts/mo" },
    values: ["10", "10", "15"],
  },
  {
    label: { tr: "Reels/ay", en: "Reels/mo" },
    values: ["3", "5", "8"],
  },
  {
    label: { tr: "Story/ay", en: "Stories/mo" },
    values: [
      { tr: "12 (haftada 3)", en: "12 (3/week)" },
      { tr: "20 (haftada 5)", en: "20 (5/week)" },
      { tr: "30 (her gun)", en: "30 (daily)" },
    ],
  },
  {
    label: { tr: "Drone Cekimi", en: "Drone Footage" },
    values: ["—", { tr: "3 ayda 1", en: "Quarterly" }, { tr: "Aylik", en: "Monthly" }],
  },
  {
    label: { tr: "Video Produksiyon", en: "Video Production" },
    values: ["—", { tr: "Ceyreklik", en: "Quarterly" }, { tr: "2/ay", en: "2/month" }],
  },
  {
    label: { tr: "Reklam Yonetimi", en: "Ad Management" },
    values: ["—", { tr: "Temel", en: "Basic" }, { tr: "Gelismis + A/B", en: "Advanced + A/B" }],
  },
  {
    label: { tr: "Raporlama", en: "Reporting" },
    values: [
      { tr: "Aylik", en: "Monthly" },
      { tr: "Haftalik", en: "Weekly" },
      { tr: "Canli Dashboard", en: "Live Dashboard" },
    ],
  },
  {
    label: { tr: "Hesap Yoneticisi", en: "Account Manager" },
    values: [
      { tr: "Paylasimli", en: "Shared" },
      { tr: "Paylasimli", en: "Shared" },
      { tr: "Dedike", en: "Dedicated" },
    ],
  },
  {
    label: { tr: "Revizyon", en: "Revisions" },
    values: [
      { tr: "2 tur/ay", en: "2 rounds/mo" },
      { tr: "4 tur/ay", en: "4 rounds/mo" },
      { tr: "Sinirsiz", en: "Unlimited" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper: format TRY price                                           */
/* ------------------------------------------------------------------ */

const formatTRY = (amount: number): string => {
  return `\u20BA${new Intl.NumberFormat("tr-TR").format(amount)}`;
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const SosyalMedyaPage = () => {
  const { lang } = useI18n();

  /* Configurator state */
  const [configSelections, setConfigSelections] = useState<Record<string, number>>({
    platforms: 0,
    carousel: 0,
    reels: 0,
    stories: 0,
    drone: 0,
    ads: 0,
  });
  const [selectedExtras, setSelectedExtras] = useState<Set<number>>(new Set());

  const handleSingleSelect = (categoryId: string, optionIndex: number) => {
    setConfigSelections((prev) => ({ ...prev, [categoryId]: optionIndex }));
  };

  const toggleExtra = (index: number) => {
    setSelectedExtras((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const configTotal = (() => {
    let total = BASE_PRICE;
    for (const cat of CONFIG_CATEGORIES) {
      const idx = configSelections[cat.id] ?? 0;
      total += cat.options[idx].price;
    }
    for (const idx of selectedExtras) {
      total += EXTRA_SERVICES[idx].price;
    }
    return total;
  })();

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 mb-5 sm:mb-6 rounded-full border-2 border-[var(--lime)] bg-[var(--lime)]/10 text-xs sm:text-sm font-semibold text-[var(--dark-blue)]">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {lang === "en" ? "AI + Traditional Production" : "AI + Geleneksel Produksiyon"}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-[var(--dark-blue)] mb-5 sm:mb-6">
            {lang === "en" ? (
              <>
                Social Media with{" "}
                <span className="text-[var(--lime)]">Vibe Marketing</span>
              </>
            ) : (
              <>
                <span className="text-[var(--lime)]">Vibe Marketing</span> ile
                {" "}Sosyal Medya Yonetimi
              </>
            )}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[var(--gray)] mb-5 sm:mb-6">
            {lang === "en"
              ? "Drone footage, professional video production, AI-powered high-volume content. We combine traditional craftsmanship with vibe marketing philosophy."
              : "Drone cekimi, profesyonel video produksiyon, AI destekli yuksek hacimli icerik. Geleneksel zanaat ile vibe marketing felsefesini birlestiriyoruz."}
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-4 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 mb-8 sm:mb-10">
            {[
              { num: "10+", label: { tr: "Carousel/ay", en: "Carousels/mo" } },
              { num: "5+", label: { tr: "Reels/ay", en: "Reels/mo" } },
              { num: "30", label: { tr: "Story/ay", en: "Stories/mo" } },
              { num: "4K", label: { tr: "Drone Cekimi", en: "Drone Footage" } },
            ].map((stat) => (
              <div key={stat.num} className="text-center">
                <div className="text-xl sm:text-3xl font-extrabold text-[var(--lime)]">{stat.num}</div>
                <div className="text-[10px] sm:text-sm text-[var(--gray)] font-medium leading-tight">
                  {lang === "en" ? stat.label.en : stat.label.tr}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#paketler"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-[var(--lime)] text-[var(--dark-blue)] font-bold text-base sm:text-lg border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all w-full sm:w-auto text-center justify-center"
            >
              {lang === "en" ? "View Packages" : "Paketleri Incele"}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#konfigurator"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-[var(--card)] text-[var(--dark-blue)] font-bold text-base sm:text-lg border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all w-full sm:w-auto text-center justify-center"
            >
              {lang === "en" ? "Build Your Package" : "Kendi Paketini Olustur"}
            </a>
          </div>
        </div>
      </section>

      {/* ── PACKAGES (3 tiers) ──────────────────────────────────────── */}
      <section id="paketler" className="py-14 sm:py-20 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--dark-blue)] mb-3 sm:mb-4">
              {lang === "en" ? "Choose Your Package" : "Paketinizi Secin"}
            </h2>
            <p className="text-[var(--gray)] text-base sm:text-lg max-w-2xl mx-auto">
              {lang === "en"
                ? "Three packages designed for every stage of growth. All include AI-powered content creation and professional production."
                : "Her buyume asamasina uygun 3 paket. Hepsi AI destekli icerik uretimi ve profesyonel produksiyon iceriyor."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.price}
                className={`relative flex flex-col rounded-lg border-3 bg-[var(--card)] p-5 sm:p-7 transition-transform hover:-translate-y-1 ${
                  pkg.popular
                    ? "border-[var(--lime)] shadow-[6px_6px_0px_var(--lime)] lg:scale-[1.02] z-10"
                    : "border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)]"
                }`}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[var(--lime)] text-[var(--dark-blue)] text-sm font-bold border-2 border-[var(--dark-blue)]">
                    {lang === "en" ? "Most Popular" : "En Populer"}
                  </div>
                )}

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-2 mt-2">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center border-2 border-[var(--dark-blue)]"
                    style={{ backgroundColor: pkg.accent, color: pkg.accent === "var(--dark-blue)" ? "white" : "var(--dark-blue)" }}
                  >
                    {pkg.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark-blue)]">
                      {lang === "en" ? pkg.name.en : pkg.name.tr}
                    </h3>
                    <p className="text-xs text-[var(--gray)]">
                      {lang === "en" ? pkg.subtitle.en : pkg.subtitle.tr}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4 sm:mb-5 mt-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[var(--dark-blue)]">
                    {formatTRY(pkg.price)}
                  </span>
                  <span className="text-[var(--gray)] font-medium">
                    /{lang === "en" ? "mo" : "ay"}
                  </span>
                </div>

                {/* Deliverable highlights */}
                <div className="grid grid-cols-2 gap-2 mb-5 p-3 rounded-lg bg-[var(--background)] border border-[var(--gray)]/20">
                  <div className="text-center">
                    <div className="text-xl font-extrabold text-[var(--dark-blue)]">{pkg.deliverables.carousel}</div>
                    <div className="text-[10px] text-[var(--gray)] font-medium uppercase tracking-wide">Carousel</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-extrabold text-[var(--dark-blue)]">{pkg.deliverables.reels}</div>
                    <div className="text-[10px] text-[var(--gray)] font-medium uppercase tracking-wide">Reels</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-[var(--dark-blue)]">
                      {lang === "en" ? pkg.deliverables.story.en : pkg.deliverables.story.tr}
                    </div>
                    <div className="text-[10px] text-[var(--gray)] font-medium uppercase tracking-wide">Story</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-[var(--dark-blue)]">
                      {lang === "en" ? pkg.deliverables.drone.en : pkg.deliverables.drone.tr}
                    </div>
                    <div className="text-[10px] text-[var(--gray)] font-medium uppercase tracking-wide">Drone</div>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-2 mb-6">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          f.highlight ? "text-[var(--lime)]" : "text-[var(--gray)]/50"
                        }`}
                      />
                      <span className={f.highlight ? "font-semibold" : ""}>
                        {lang === "en" ? f.en : f.tr}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`https://wa.me/905551234567?text=${encodeURIComponent(
                    lang === "en"
                      ? `Hi! I'm interested in the ${pkg.name.en} (${formatTRY(pkg.price)}/mo).`
                      : `Merhaba! ${pkg.name.tr} (${formatTRY(pkg.price)}/ay) hakkinda bilgi almak istiyorum.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3.5 rounded-lg font-bold border-2 border-[var(--dark-blue)] transition-all hover:translate-y-[2px] hover:shadow-none ${
                    pkg.popular
                      ? "bg-[var(--lime)] text-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)]"
                      : "bg-[var(--card)] text-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)]"
                  }`}
                >
                  {lang === "en" ? "Get Started" : "Hemen Baslayalim"}
                </a>
              </div>
            ))}
          </div>

          {/* KDV note */}
          <p className="text-center text-sm text-[var(--gray)] mt-6">
            {lang === "en"
              ? "* All prices exclude VAT. Minimum 3-month commitment."
              : "* Tum fiyatlara KDV dahil degildir. Minimum 3 aylik taahhut."}
          </p>
        </div>
      </section>

      {/* ── COMPARISON TABLE ────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--dark-blue)] mb-4">
              {lang === "en" ? "Package Comparison" : "Paket Karsilastirmasi"}
            </h2>
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto rounded-lg border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)]">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--dark-blue)] text-white">
                  <th className="text-left py-4 px-4 font-bold text-sm"></th>
                  <th className="text-center py-4 px-4 font-bold text-sm">
                    {lang === "en" ? "Starter" : "Baslangic"}
                    <div className="text-xs font-normal opacity-70">{formatTRY(9999)}/{lang === "en" ? "mo" : "ay"}</div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-sm bg-[var(--lime)] text-[var(--dark-blue)]">
                    {lang === "en" ? "Standard" : "Standart"} ⭐
                    <div className="text-xs font-normal opacity-70">{formatTRY(22999)}/{lang === "en" ? "mo" : "ay"}</div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-sm">
                    Premium
                    <div className="text-xs font-normal opacity-70">{formatTRY(37999)}/{lang === "en" ? "mo" : "ay"}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className={`border-t border-[var(--gray)]/15 ${i % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--background)]"}`}>
                    <td className="py-3 px-4 text-sm font-semibold text-[var(--dark-blue)]">
                      {lang === "en" ? row.label.en : row.label.tr}
                    </td>
                    {row.values.map((val, j) => (
                      <td key={j} className={`text-center py-3 px-4 text-sm ${j === 1 ? "bg-[var(--lime)]/5" : ""}`}>
                        {typeof val === "string" ? val : lang === "en" ? val.en : val.tr}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile comparison cards */}
          <div className="sm:hidden space-y-4">
            {COMPARISON_ROWS.map((row, i) => (
              <div
                key={i}
                className="rounded-lg border-2 border-[var(--dark-blue)] bg-[var(--card)] p-4 shadow-[3px_3px_0px_var(--dark-blue)]"
              >
                <div className="text-xs font-bold text-[var(--dark-blue)] uppercase tracking-wide mb-3">
                  {lang === "en" ? row.label.en : row.label.tr}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: lang === "en" ? "Starter" : "Baslangic", idx: 0, highlight: false },
                    { name: lang === "en" ? "Standard" : "Standart", idx: 1, highlight: true },
                    { name: "Premium", idx: 2, highlight: false },
                  ].map((tier) => {
                    const val = row.values[tier.idx];
                    const displayVal = typeof val === "string" ? val : lang === "en" ? val.en : val.tr;
                    return (
                      <div
                        key={tier.idx}
                        className={`text-center rounded-md py-2 px-1 ${
                          tier.highlight ? "bg-[var(--lime)]/15 border border-[var(--lime)]" : "bg-[var(--background)]"
                        }`}
                      >
                        <div className="text-[10px] text-[var(--gray)] font-medium mb-1">{tier.name}</div>
                        <div className="text-xs font-bold text-[var(--dark-blue)]">{displayVal}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONFIGURATOR ───────────────────────────────────────────── */}
      <section id="konfigurator" className="py-14 sm:py-20 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--dark-blue)] mb-3 sm:mb-4">
              {lang === "en" ? "Build Your Own Package" : "Kendi Paketinizi Olusturun"}
            </h2>
            <p className="text-[var(--gray)] text-base sm:text-lg max-w-xl mx-auto">
              {lang === "en"
                ? "Select the features you need. Pay only for what you use."
                : "Ihtiyaciniz olan ozellikleri secin. Yalnizca kullandiginiz icin odeyin."}
            </p>
          </div>

          <div className="space-y-6">
            {CONFIG_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="rounded-lg border-3 border-[var(--dark-blue)] bg-[var(--card)] p-4 sm:p-6 shadow-[4px_4px_0px_var(--dark-blue)]"
              >
                <h3 className="text-base sm:text-lg font-bold text-[var(--dark-blue)] mb-3 sm:mb-4">
                  {lang === "en" ? cat.title.en : cat.title.tr}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {cat.options.map((opt, idx) => {
                    const isActive = configSelections[cat.id] === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSingleSelect(cat.id, idx)}
                        className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border-2 text-xs sm:text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-[var(--lime)] border-[var(--dark-blue)] text-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)]"
                            : "bg-[var(--background)] border-[var(--gray)]/30 text-[var(--foreground)] hover:border-[var(--dark-blue)]"
                        }`}
                      >
                        {lang === "en" ? opt.label.en : opt.label.tr}
                        {opt.price > 0 && (
                          <span className="ml-1 text-xs opacity-70">+{formatTRY(opt.price)}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Extras */}
            <div className="rounded-lg border-3 border-[var(--dark-blue)] bg-[var(--card)] p-4 sm:p-6 shadow-[4px_4px_0px_var(--dark-blue)]">
              <h3 className="text-base sm:text-lg font-bold text-[var(--dark-blue)] mb-3 sm:mb-4">
                {lang === "en" ? "Extra Services" : "Ek Hizmetler"}
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {EXTRA_SERVICES.map((svc, idx) => {
                  const isActive = selectedExtras.has(idx);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleExtra(idx)}
                      className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border-2 text-xs sm:text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-[var(--electric-blue)] border-[var(--dark-blue)] text-white shadow-[3px_3px_0px_var(--dark-blue)]"
                          : "bg-[var(--background)] border-[var(--gray)]/30 text-[var(--foreground)] hover:border-[var(--dark-blue)]"
                      }`}
                    >
                      {lang === "en" ? svc.label.en : svc.label.tr}
                      <span className="ml-1 text-xs opacity-70">+{formatTRY(svc.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky price bar */}
          <div className="sticky bottom-3 sm:bottom-4 mt-8 sm:mt-10 rounded-lg border-3 border-[var(--dark-blue)] bg-[var(--lime)] p-3 sm:p-5 shadow-[5px_5px_0px_var(--dark-blue)] flex flex-row items-center justify-between gap-3 sm:gap-4 z-20">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-[var(--dark-blue)] opacity-70 hidden sm:block">
                {lang === "en" ? "Your custom package" : "Ozel paketiniz"}
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--dark-blue)]">
                {formatTRY(configTotal)}
                <span className="text-xs sm:text-base font-semibold opacity-70">
                  /{lang === "en" ? "mo" : "ay"}
                </span>
              </p>
            </div>
            <a
              href={`https://wa.me/905551234567?text=${encodeURIComponent(
                lang === "en"
                  ? `Hi! I'd like a custom social media package (${formatTRY(configTotal)}/mo).`
                  : `Merhaba! Ozel sosyal medya paketi (${formatTRY(configTotal)}/ay) hakkinda bilgi almak istiyorum.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-8 sm:py-3.5 rounded-lg bg-[var(--dark-blue)] text-white font-bold text-sm sm:text-base border-2 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--foreground)] hover:shadow-none hover:translate-y-[2px] transition-all shrink-0"
            >
              {lang === "en" ? "Request Proposal" : "Teklif Iste"}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--dark-blue)] mb-3 sm:mb-4">
              {lang === "en" ? "Why MindID?" : "Neden MindID?"}
            </h2>
            <p className="text-[var(--gray)] text-base sm:text-lg max-w-2xl mx-auto">
              {lang === "en"
                ? "We combine traditional craftsmanship (drone, video, photography) with AI-powered vibe marketing. The result: 3-5x more content at competitive prices."
                : "Geleneksel zanaat (drone, video, fotograf) ile AI destekli vibe marketing'i birlestiriyoruz. Sonuc: Rekabetci fiyatlarla 3-5 kat daha fazla icerik."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="rounded-lg border-3 border-[var(--dark-blue)] bg-[var(--card)] p-6 shadow-[5px_5px_0px_var(--dark-blue)] hover:-translate-y-1 transition-transform"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--lime)]/20 flex items-center justify-center text-[var(--dark-blue)] mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--dark-blue)] mb-2">
                  {lang === "en" ? feat.title.en : feat.title.tr}
                </h3>
                <p className="text-sm text-[var(--gray)] leading-relaxed">
                  {lang === "en" ? feat.desc.en : feat.desc.tr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--dark-blue)] mb-3 sm:mb-4">
              {lang === "en" ? "How It Works" : "Nasil Calisir?"}
            </h2>
            <p className="text-[var(--gray)] text-base sm:text-lg max-w-xl mx-auto">
              {lang === "en"
                ? "From analysis to results in 4 clear steps."
                : "Analizden sonuca 4 net adim."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((s) => (
              <div
                key={s.step}
                className="relative rounded-lg border-3 border-[var(--dark-blue)] bg-[var(--card)] p-6 shadow-[5px_5px_0px_var(--dark-blue)] text-center"
              >
                <div className="absolute -top-4 -left-3 w-9 h-9 rounded-full bg-[var(--lime)] border-2 border-[var(--dark-blue)] flex items-center justify-center font-extrabold text-[var(--dark-blue)] text-sm">
                  {s.step}
                </div>
                <div className="w-14 h-14 rounded-lg bg-[var(--lime)]/15 flex items-center justify-center text-[var(--dark-blue)] mx-auto mb-4">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--dark-blue)] mb-2">
                  {lang === "en" ? s.title.en : s.title.tr}
                </h3>
                <p className="text-sm text-[var(--gray)] leading-relaxed">
                  {lang === "en" ? s.desc.en : s.desc.tr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[var(--dark-blue)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-5 sm:mb-6">
            {lang === "en"
              ? "Ready to Grow Your Brand?"
              : "Markanizi Buyutmeye Hazir misiniz?"}
          </h2>
          <p className="text-base sm:text-lg text-white/70 mb-8 sm:mb-10 max-w-xl mx-auto">
            {lang === "en"
              ? "Book a free strategy call. We'll analyze your brand and create a custom social media roadmap with vibe marketing."
              : "Ucretsiz strateji gorusmesi planlayin. Markanizi analiz edelim ve vibe marketing ile size ozel bir sosyal medya yol haritasi olusturalim."}
          </p>
          <a
            href="#paketler"
            className="inline-flex items-center gap-2 px-8 py-3 sm:px-10 sm:py-4 rounded-lg bg-[var(--lime)] text-[var(--dark-blue)] font-bold text-base sm:text-lg border-3 border-white shadow-[5px_5px_0px_white] hover:shadow-[2px_2px_0px_white] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
          >
            {lang === "en" ? "View Packages" : "Paketleri Incele"}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};
