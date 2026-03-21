"use client";

import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Palette,
  Zap,
  TrendingDown,
  ShoppingBag,
  CheckCircle2,
  Store,
} from "lucide-react";

type Sector = {
  icon: typeof Camera;
  name: { tr: string; en: string };
  examples: { tr: string; en: string };
};

const sectors: Sector[] = [
  {
    icon: ShoppingBag,
    name: { tr: "Giyim & Moda", en: "Apparel & Fashion" },
    examples: { tr: "T-shirt, elbise, ayakkabı — manken olmadan profesyonel görseller", en: "T-shirts, dresses, shoes — professional visuals without models" },
  },
  {
    icon: Palette,
    name: { tr: "Kozmetik & Güzellik", en: "Cosmetics & Beauty" },
    examples: { tr: "Parfüm, makyaj, cilt bakım — lüks konsept arka planlar", en: "Perfume, makeup, skincare — luxury concept backgrounds" },
  },
  {
    icon: Zap,
    name: { tr: "Elektronik & Teknoloji", en: "Electronics & Tech" },
    examples: { tr: "Telefon kılıfı, aksesuar, gadget — temiz stüdyo görselleri", en: "Phone cases, accessories, gadgets — clean studio visuals" },
  },
  {
    icon: Store,
    name: { tr: "Ev & Yaşam", en: "Home & Living" },
    examples: { tr: "Mobilya, dekorasyon, mutfak — lifestyle sahneler", en: "Furniture, decor, kitchen — lifestyle scenes" },
  },
];

type Platform = {
  name: string;
  specs: string;
};

const platforms: Platform[] = [
  { name: "Trendyol", specs: "800x800px, beyaz arka plan, JPG" },
  { name: "Hepsiburada", specs: "1000x1000px, beyaz arka plan, JPG/PNG" },
  { name: "Shopify", specs: "2048x2048px, özel arka plan destekli" },
  { name: "Amazon", specs: "1600x1600px+, beyaz arka plan zorunlu" },
  { name: "N11", specs: "800x800px, beyaz arka plan, JPG" },
  { name: "Etsy", specs: "2000x2000px, lifestyle görseller" },
];

export const EcommercePage = () => {
  const { lang } = useI18n();

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--lime)]/10 border border-[var(--lime)]/30 mb-4">
            <Camera size={14} className="text-[var(--lime)]" />
            <span className="text-xs font-bold text-[var(--lime)]">
              {lang === "en" ? "From ₺399 — 70% Cheaper" : "399₺'den — %70 Daha Ucuz"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--cream)] mb-4">
            {lang === "en"
              ? "AI Product Photography for E-commerce"
              : "E-ticaret İçin AI Ürün Görseli"}
          </h1>
          <p className="text-lg text-[var(--cream)]/70 max-w-2xl mx-auto">
            {lang === "en"
              ? "Studio-quality product images without mannequins or studio costs. Perfect for Shopify, Amazon, Trendyol, Hepsiburada sellers."
              : "Manken ve stüdyo masrafı olmadan stüdyo kalitesinde ürün görselleri. Trendyol, Hepsiburada, Shopify, Amazon satıcıları için."}
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: TrendingDown,
              title: { tr: "%70 Maliyet Tasarrufu", en: "70% Cost Savings" },
              desc: {
                tr: "Geleneksel stüdyo çekimine göre %70'e varan tasarruf. Manken, stüdyo, ekip masrafı yok.",
                en: "Up to 70% savings vs traditional studio shoots. No mannequin, studio, or crew costs.",
              },
            },
            {
              icon: Zap,
              title: { tr: "Günler İçinde Teslimat", en: "Delivery in Days" },
              desc: {
                tr: "350 ürünlük katalog çekimi bile günler içinde tamamlanır. Geleneksel yöntemde haftalar sürer.",
                en: "Even 350-product catalog shoots completed in days. Traditional methods take weeks.",
              },
            },
            {
              icon: Palette,
              title: { tr: "Sınırsız Varyasyon", en: "Unlimited Variations" },
              desc: {
                tr: "Her renk, her arka plan, her stil — tek çekimden sınırsız varyasyon. Ekstra maliyet yok.",
                en: "Every color, background, style — unlimited variations from one shoot. No extra cost.",
              },
            },
          ].map((benefit, i) => (
            <div
              key={i}
              className="rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 p-6 hover:border-[var(--lime)] transition-all"
            >
              <benefit.icon size={28} className="text-[var(--lime)] mb-3" />
              <h3 className="text-sm font-black text-[var(--cream)] mb-2">
                {lang === "en" ? benefit.title.en : benefit.title.tr}
              </h3>
              <p className="text-xs text-[var(--cream)]/60 leading-relaxed">
                {lang === "en" ? benefit.desc.en : benefit.desc.tr}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works for E-commerce */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-black text-[var(--lime)] mb-6 text-center">
            {lang === "en"
              ? "How AI Product Photography Works"
              : "AI Ürün Fotoğrafçılığı Nasıl Çalışır?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { tr: "Ürünlerinizin fotoğraflarını veya 3D modellerini yükleyin", en: "Upload your product photos or 3D models" },
              { tr: "İstediğiniz arka plan stilini seçin (beyaz, lifestyle, konsept)", en: "Choose your preferred background style (white, lifestyle, concept)" },
              { tr: "AI ile stüdyo kalitesinde görseller otomatik üretilir", en: "AI automatically generates studio-quality visuals" },
              { tr: "Farklı renk ve açılardan varyasyonlar anında hazır", en: "Variations in different colors and angles ready instantly" },
              { tr: "E-ticaret platformunuza uygun boyut ve formatta teslim", en: "Delivered in your e-commerce platform's required size and format" },
              { tr: "2 ücretsiz revizyon hakkı dahil", en: "2 free revision rounds included" },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-[var(--card)] border border-[var(--electric-blue)]/10">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--lime)]/15 text-[var(--lime)] flex items-center justify-center text-xs font-black">
                  {i + 1}
                </span>
                <span className="text-sm text-[var(--cream)]/80">{lang === "en" ? step.en : step.tr}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sectors */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-black text-[var(--electric-blue)] mb-6 text-center">
            {lang === "en" ? "Industries We Serve" : "Hizmet Verdiğimiz Sektörler"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectors.map((sector, i) => (
              <div key={i} className="rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <sector.icon size={20} className="text-[var(--lime)]" />
                  <h3 className="text-sm font-black text-[var(--cream)]">
                    {lang === "en" ? sector.name.en : sector.name.tr}
                  </h3>
                </div>
                <p className="text-xs text-[var(--cream)]/60">
                  {lang === "en" ? sector.examples.en : sector.examples.tr}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Compatibility */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-black text-[var(--electric-blue)] mb-6 text-center">
            {lang === "en" ? "Platform Compatibility" : "Platform Uyumluluğu"}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-3 border-[var(--electric-blue)]/30 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[var(--dark-blue)] border-b-3 border-[var(--electric-blue)]/30">
                  <th className="text-left p-4 text-sm font-bold text-[var(--cream)]">Platform</th>
                  <th className="text-left p-4 text-sm font-bold text-[var(--cream)]">
                    {lang === "en" ? "Specs" : "Özellikler"}
                  </th>
                  <th className="text-center p-4 text-sm font-bold text-[var(--lime)]">
                    {lang === "en" ? "Supported" : "Destekleniyor"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((platform, i) => (
                  <tr key={i} className="border-b border-[var(--electric-blue)]/10">
                    <td className="p-4 text-sm font-bold text-[var(--cream)]">{platform.name}</td>
                    <td className="p-4 text-xs text-[var(--cream)]/60">{platform.specs}</td>
                    <td className="p-4 text-center">
                      <CheckCircle2 size={16} className="text-[var(--lime)] mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className="mb-12 rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 p-6">
          <h2 className="text-xl font-black text-[var(--lime)] mb-4 text-center">
            {lang === "en" ? "Cost Comparison" : "Maliyet Karşılaştırması"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-md border-2 border-red-500/30">
              <h3 className="text-sm font-black text-red-400 mb-3">
                {lang === "en" ? "Traditional Studio Shoot" : "Geleneksel Stüdyo Çekimi"}
              </h3>
              <ul className="space-y-2 text-xs text-[var(--cream)]/60">
                <li>• {lang === "en" ? "Studio rental: $140 – $420/day" : "Stüdyo kirası: 5.000₺ – 15.000₺/gün"}</li>
                <li>• {lang === "en" ? "Photographer: $280 – $700/day" : "Fotoğrafçı: 10.000₺ – 25.000₺/gün"}</li>
                <li>• {lang === "en" ? "Model: $140 – $420/session" : "Manken: 5.000₺ – 15.000₺/seans"}</li>
                <li>• {lang === "en" ? "Styling & props: $140+" : "Styling & aksesuarlar: 5.000₺+"}</li>
                <li>• {lang === "en" ? "Retouching: $3 – $14/photo" : "Rötuş: 100₺ – 500₺/fotoğraf"}</li>
              </ul>
              <div className="mt-3 pt-3 border-t border-red-500/20">
                <span className="text-sm font-black text-red-400">
                  {lang === "en" ? "Total: $700 – $1,500+ per day" : "Toplam: 25.000₺ – 50.000₺+ / gün"}
                </span>
              </div>
            </div>
            <div className="p-4 rounded-md border-2 border-[var(--lime)]/30">
              <h3 className="text-sm font-black text-[var(--lime)] mb-3">
                MindID AI
              </h3>
              <ul className="space-y-2 text-xs text-[var(--cream)]/60">
                <li>• {lang === "en" ? "No studio needed" : "Stüdyo gerekmez"} ✓</li>
                <li>• {lang === "en" ? "No photographer needed" : "Fotoğrafçı gerekmez"} ✓</li>
                <li>• {lang === "en" ? "No mannequin needed" : "Manken gerekmez"} ✓</li>
                <li>• {lang === "en" ? "Unlimited color variations" : "Sınırsız renk varyasyonu"} ✓</li>
                <li>• {lang === "en" ? "2 free revisions included" : "2 ücretsiz revizyon dahil"} ✓</li>
              </ul>
              <div className="mt-3 pt-3 border-t border-[var(--lime)]/20">
                <span className="text-sm font-black text-[var(--lime)]">
                  {lang === "en" ? "From $11 per product" : "Ürün başına 399₺'den"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-lg bg-[var(--card)] border-3 border-[var(--lime)] p-8 shadow-[6px_6px_0px_var(--lime)]">
          <h2 className="text-2xl font-black text-[var(--lime)] mb-3">
            {lang === "en"
              ? "Start Saving 70% on Product Photography"
              : "Ürün Fotoğrafçılığında %70 Tasarruf Etmeye Başlayın"}
          </h2>
          <p className="text-[var(--cream)]/70 mb-6 max-w-lg mx-auto">
            {lang === "en"
              ? "Configure your product photography, see the price, and submit your order. We'll contact you within 24 hours."
              : "Ürün fotoğrafınızı yapılandırın, fiyatı görün ve siparişinizi gönderin. 24 saat içinde iletişime geçeceğiz."}
          </p>
          <Link
            href="/configure/product-photo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] font-black text-sm hover:shadow-[4px_4px_0px_var(--electric-blue)] transition-all"
          >
            {lang === "en" ? "Configure Product Photography" : "Ürün Görseli Yapılandır"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
