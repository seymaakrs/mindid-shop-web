"use client";

import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight, TrendingDown, Clock, Sparkles, CheckCircle2, XCircle } from "lucide-react";

type ComparisonRow = {
  label: Record<string, string>;
  traditional: Record<string, string>;
  ai: Record<string, string>;
  savings?: string;
};

const filmComparison: ComparisonRow[] = [
  {
    label: { tr: "30 sn Ürün Reklam Filmi", en: "30s Product Ad Film" },
    traditional: { tr: "80.000₺ – 200.000₺", en: "$2,200 – $5,600" },
    ai: { tr: "9.999₺'den", en: "From $280" },
    savings: "70%",
  },
  {
    label: { tr: "Kampanya Filmi (60 sn)", en: "Campaign Film (60s)" },
    traditional: { tr: "150.000₺ – 500.000₺", en: "$4,200 – $14,000" },
    ai: { tr: "19.999₺'den", en: "From $560" },
    savings: "70%",
  },
  {
    label: { tr: "Kurumsal Tanıtım Filmi", en: "Corporate Film" },
    traditional: { tr: "300.000₺ – 750.000₺", en: "$8,400 – $21,000" },
    ai: { tr: "29.999₺'den", en: "From $840" },
    savings: "70%",
  },
  {
    label: { tr: "Instagram Reels", en: "Instagram Reels" },
    traditional: { tr: "15.000₺ – 50.000₺", en: "$420 – $1,400" },
    ai: { tr: "999₺'den", en: "From $28" },
    savings: "75%",
  },
  {
    label: { tr: "Teslimat Süresi", en: "Delivery Time" },
    traditional: { tr: "3 – 8 hafta", en: "3 – 8 weeks" },
    ai: { tr: "3 – 10 iş günü", en: "3 – 10 business days" },
  },
  {
    label: { tr: "Revizyon", en: "Revisions" },
    traditional: { tr: "Ekstra ücretli", en: "Extra charge" },
    ai: { tr: "2 ücretsiz dahil", en: "2 free included" },
  },
];

const avatarComparison: ComparisonRow[] = [
  {
    label: { tr: "Sunucu / Model (günlük)", en: "Presenter / Model (daily)" },
    traditional: { tr: "5.000₺ – 25.000₺/gün", en: "$140 – $700/day" },
    ai: { tr: "5.999₺ (sınırsız)", en: "$168 (unlimited)" },
    savings: "90%",
  },
  {
    label: { tr: "Çok Dilli İçerik", en: "Multi-Language Content" },
    traditional: { tr: "Her dil için yeni çekim", en: "New shoot per language" },
    ai: { tr: "Tek avatar, sınırsız dil", en: "One avatar, unlimited languages" },
  },
  {
    label: { tr: "Hazır Olma Süresi", en: "Ready Time" },
    traditional: { tr: "Casting + çekim: 2-4 hafta", en: "Casting + shooting: 2-4 weeks" },
    ai: { tr: "3-5 iş günü", en: "3-5 business days" },
  },
];

const visualComparison: ComparisonRow[] = [
  {
    label: { tr: "Ürün Fotoğrafı (adet)", en: "Product Photo (per item)" },
    traditional: { tr: "500₺ – 2.000₺/adet", en: "$14 – $56/item" },
    ai: { tr: "399₺'den", en: "From $11" },
    savings: "70%",
  },
  {
    label: { tr: "Manken Çekimi", en: "Model Shoot" },
    traditional: { tr: "15.000₺+ (manken + stüdyo)", en: "$420+ (model + studio)" },
    ai: { tr: "Manken gerekmez", en: "No model needed" },
    savings: "100%",
  },
  {
    label: { tr: "Stüdyo Kirası", en: "Studio Rental" },
    traditional: { tr: "5.000₺ – 15.000₺/gün", en: "$140 – $420/day" },
    ai: { tr: "Stüdyo gerekmez", en: "No studio needed" },
    savings: "100%",
  },
  {
    label: { tr: "350 Ürün Katalog Çekimi", en: "350-Product Catalog Shoot" },
    traditional: { tr: "150.000₺+ (2-3 hafta)", en: "$4,200+ (2-3 weeks)" },
    ai: { tr: "Günler içinde hazır", en: "Ready in days" },
    savings: "70%",
  },
  {
    label: { tr: "Renk Varyasyonları", en: "Color Variations" },
    traditional: { tr: "Her renk yeni çekim", en: "New shoot per color" },
    ai: { tr: "Anında üretilir", en: "Instantly generated" },
  },
];

const ComparisonTable = ({
  title,
  rows,
  lang,
}: {
  title: Record<string, string>;
  rows: ComparisonRow[];
  lang: string;
}) => (
  <div className="mb-12">
    <h3 className="text-xl md:text-2xl font-black text-[var(--electric-blue)] mb-6">
      {lang === "en" ? title.en : title.tr}
    </h3>
    <div className="overflow-x-auto">
      <table className="w-full border-3 border-[var(--electric-blue)]/30 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[var(--card)] border-b-3 border-[var(--electric-blue)]/30">
            <th className="text-left p-4 text-sm font-bold text-[var(--foreground)]">
              {lang === "en" ? "Item" : "Kalem"}
            </th>
            <th className="text-left p-4 text-sm font-bold text-red-400">
              {lang === "en" ? "Traditional" : "Geleneksel"}
            </th>
            <th className="text-left p-4 text-sm font-bold text-[var(--lime)]">
              MindID AI
            </th>
            <th className="text-center p-4 text-sm font-bold text-[var(--foreground)]">
              {lang === "en" ? "Savings" : "Tasarruf"}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[var(--electric-blue)]/10 hover:bg-[var(--electric-blue)]/5 transition-colors"
            >
              <td className="p-4 text-sm font-bold text-[var(--foreground)]">
                {lang === "en" ? row.label.en : row.label.tr}
              </td>
              <td className="p-4 text-sm text-red-400/80 line-through decoration-red-400/40">
                {lang === "en" ? row.traditional.en : row.traditional.tr}
              </td>
              <td className="p-4 text-sm font-bold text-[var(--lime)]">
                {lang === "en" ? row.ai.en : row.ai.tr}
              </td>
              <td className="p-4 text-center">
                {row.savings ? (
                  <span className="inline-block px-2 py-1 rounded-full bg-[var(--lime)]/15 text-[var(--lime)] text-xs font-black">
                    {row.savings}
                  </span>
                ) : (
                  <span className="text-[var(--gray)] text-xs">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const AiVsTraditionalPage = () => {
  const { lang } = useI18n();

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--lime)]/10 border border-[var(--lime)]/30 mb-4">
            <TrendingDown size={14} className="text-[var(--lime)]" />
            <span className="text-xs font-bold text-[var(--lime)]">
              {lang === "en" ? "Up to 70% Cost Savings" : "%70'e Varan Maliyet Tasarrufu"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4">
            {lang === "en"
              ? "AI vs Traditional Production"
              : "AI vs Geleneksel Prodüksiyon"}
          </h1>
          <p className="text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto">
            {lang === "en"
              ? "Real cost, speed, and quality comparison between AI-powered production and traditional methods. See exactly how much you save with MindID."
              : "AI destekli prodüksiyon ile geleneksel yöntemlerin gerçek maliyet, hız ve kalite karşılaştırması. MindID ile ne kadar tasarruf ettiğinizi görün."}
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: TrendingDown,
              value: "%70",
              label: { tr: "Maliyet Tasarrufu", en: "Cost Savings" },
            },
            {
              icon: Clock,
              value: "5x",
              label: { tr: "Daha Hızlı Teslimat", en: "Faster Delivery" },
            },
            {
              icon: Sparkles,
              value: "∞",
              label: { tr: "Renk & Varyasyon", en: "Color & Variations" },
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 p-6 text-center"
            >
              <stat.icon size={24} className="text-[var(--lime)] mx-auto mb-2" />
              <div className="text-3xl font-black text-[var(--lime)]">{stat.value}</div>
              <div className="text-sm text-[var(--foreground)]/70 font-bold">
                {lang === "en" ? stat.label.en : stat.label.tr}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Tables */}
        <ComparisonTable
          title={{ tr: "🎬 Reklam Filmi Karşılaştırması", en: "🎬 Ad Film Comparison" }}
          rows={filmComparison}
          lang={lang}
        />

        <ComparisonTable
          title={{ tr: "🧑‍💻 AI Avatar Karşılaştırması", en: "🧑‍💻 AI Avatar Comparison" }}
          rows={avatarComparison}
          lang={lang}
        />

        <ComparisonTable
          title={{
            tr: "📸 E-ticaret Ürün Görseli Karşılaştırması",
            en: "📸 E-commerce Product Visual Comparison",
          }}
          rows={visualComparison}
          lang={lang}
        />

        {/* What You Get vs What You Don't Need */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-lg bg-[var(--card)] border-3 border-[var(--lime)]/30 p-6">
            <h3 className="text-lg font-black text-[var(--lime)] mb-4">
              {lang === "en" ? "What You Get with AI" : "AI ile Ne Alırsınız"}
            </h3>
            {[
              { tr: "Stüdyo kalitesinde profesyonel çıktı", en: "Studio-quality professional output" },
              { tr: "%70'e varan maliyet tasarrufu", en: "Up to 70% cost savings" },
              { tr: "Günler içinde teslimat", en: "Delivery in days" },
              { tr: "Sınırsız renk ve varyasyon", en: "Unlimited colors and variations" },
              { tr: "2 ücretsiz revizyon hakkı", en: "2 free revisions included" },
              { tr: "Çok dilli içerik üretimi", en: "Multi-language content production" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <CheckCircle2 size={16} className="text-[var(--lime)] mt-0.5 shrink-0" />
                <span className="text-sm text-[var(--foreground)]/80">
                  {lang === "en" ? item.en : item.tr}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-[var(--card)] border-3 border-red-500/30 p-6">
            <h3 className="text-lg font-black text-red-400 mb-4">
              {lang === "en" ? "What You Don't Need Anymore" : "Artık İhtiyacınız Olmayan"}
            </h3>
            {[
              { tr: "Stüdyo kirası (5.000₺ – 15.000₺/gün)", en: "Studio rental ($140 – $420/day)" },
              { tr: "Kalabalık çekim ekibi", en: "Large filming crew" },
              { tr: "Manken / model ücreti", en: "Model / talent fees" },
              { tr: "Haftalarca çekim planı", en: "Weeks of shooting schedule" },
              { tr: "Mekân izinleri ve logistik", en: "Location permits and logistics" },
              { tr: "Pahalı post-prodüksiyon süreci", en: "Expensive post-production process" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                <span className="text-sm text-[var(--foreground)]/80">
                  {lang === "en" ? item.en : item.tr}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-lg bg-[var(--card)] border-3 border-[var(--lime)] p-8 shadow-[6px_6px_0px_var(--lime)]">
          <h2 className="text-2xl font-black text-[var(--lime)] mb-3">
            {lang === "en"
              ? "Ready to Save 70% on Production?"
              : "Prodüksiyonda %70 Tasarrufa Hazır mısınız?"}
          </h2>
          <p className="text-[var(--foreground)]/70 mb-6 max-w-lg mx-auto">
            {lang === "en"
              ? "Configure your project, see the price instantly, and submit your order. We'll contact you within 24 hours."
              : "Projenizi yapılandırın, fiyatı anında görün ve siparişinizi gönderin. 24 saat içinde sizinle iletişime geçeceğiz."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/configure/product-photo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] font-black text-sm hover:shadow-[4px_4px_0px_var(--electric-blue)] transition-all"
            >
              {lang === "en" ? "AI Product Photos" : "AI Ürün Görseli"}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/configure/product"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[var(--electric-blue)] text-[var(--foreground)] font-black text-sm hover:shadow-[4px_4px_0px_var(--lime)] transition-all"
            >
              {lang === "en" ? "AI Ad Film" : "AI Reklam Filmi"}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/avatar"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border-2 border-[var(--lime)] text-[var(--lime)] font-black text-sm hover:bg-[var(--lime)]/10 transition-all"
            >
              {lang === "en" ? "AI Avatar" : "AI Avatar"}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
