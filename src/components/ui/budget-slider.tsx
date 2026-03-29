"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

type ServiceOption = {
  id: string;
  name: { tr: string; en: string };
  desc: { tr: string; en: string };
  minPrice: number;
  href: string;
  tag?: { tr: string; en: string };
};

const services: ServiceOption[] = [
  {
    id: "product-photo",
    name: { tr: "AI Ürün Görseli", en: "AI Product Photography" },
    desc: { tr: "E-ticaret ürün fotoğrafı — manken ve stüdyo masrafı olmadan", en: "E-commerce product photos — without mannequin or studio costs" },
    minPrice: 399,
    href: "/configure/product-photo",
    tag: { tr: "E-ticaret", en: "E-commerce" },
  },
  {
    id: "reels",
    name: { tr: "AI Instagram Reels", en: "AI Instagram Reels" },
    desc: { tr: "Sosyal medya için kısa format AI video", en: "Short-form AI video for social media" },
    minPrice: 999,
    href: "/configure/reels",
    tag: { tr: "Sosyal Medya", en: "Social Media" },
  },
  {
    id: "avatar",
    name: { tr: "AI Avatar Oluşturma", en: "AI Avatar Creation" },
    desc: { tr: "Dijital sunucu, marka yüzü, influencer avatar", en: "Digital presenter, brand face, influencer avatar" },
    minPrice: 5999,
    href: "/avatar",
    tag: { tr: "Avatar", en: "Avatar" },
  },
  {
    id: "product",
    name: { tr: "AI Ürün Reklam Filmi", en: "AI Product Ad Film" },
    desc: { tr: "Sinema kalitesinde ürün reklam videosu", en: "Cinema-quality product ad video" },
    minPrice: 9999,
    href: "/configure/product",
    tag: { tr: "Reklam Filmi", en: "Ad Film" },
  },
  {
    id: "campaign",
    name: { tr: "AI Kampanya Filmi", en: "AI Campaign Film" },
    desc: { tr: "Kampanya odaklı profesyonel reklam filmi", en: "Campaign-focused professional ad film" },
    minPrice: 19999,
    href: "/configure/campaign",
    tag: { tr: "Kampanya", en: "Campaign" },
  },
  {
    id: "corporate",
    name: { tr: "AI Kurumsal Tanıtım Filmi", en: "AI Corporate Film" },
    desc: { tr: "Marka hikayenizi profesyonelce anlatın", en: "Tell your brand story professionally" },
    minPrice: 29999,
    href: "/configure/corporate",
    tag: { tr: "Kurumsal", en: "Corporate" },
  },
];

const BUDGET_STEPS = [399, 1000, 3000, 5000, 10000, 20000, 30000, 50000];

export const BudgetSlider = () => {
  const { lang, formatPrice } = useI18n();
  const [budgetIndex, setBudgetIndex] = useState(3); // Default: 5000

  const budget = BUDGET_STEPS[budgetIndex];

  const availableServices = useMemo(
    () => services.filter((s) => s.minPrice <= budget),
    [budget],
  );

  return (
    <section className="relative z-10 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-2">
            {lang === "en"
              ? "What Can You Get with Your Budget?"
              : "Bütçenizle Neler Yapabilirsiniz?"}
          </h2>
          <p className="text-sm text-[var(--gray)]">
            {lang === "en"
              ? "Slide to set your budget — see which AI services are available."
              : "Bütçenizi belirleyin — hangi AI hizmetlerini alabileceğinizi görün."}
          </p>
        </div>

        {/* Slider */}
        <div className="bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[var(--gray)] font-bold">399₺</span>
            <span className="text-2xl font-black text-[var(--foreground)]">
              {formatPrice(budget)}
            </span>
            <span className="text-xs text-[var(--gray)] font-bold">50.000₺</span>
          </div>
          <input
            type="range"
            min={0}
            max={BUDGET_STEPS.length - 1}
            value={budgetIndex}
            onChange={(e) => setBudgetIndex(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[var(--electric-blue)]/20 accent-[var(--lime)]"
          />
          <div className="mt-3 text-center">
            <span className="text-sm text-[var(--gray)]">
              {availableServices.length}{" "}
              {lang === "en"
                ? `service${availableServices.length !== 1 ? "s" : ""} available`
                : "hizmet mevcut"}
            </span>
          </div>
        </div>

        {/* Available Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service) => {
            const isAvailable = service.minPrice <= budget;
            return (
              <div
                key={service.id}
                className={`rounded-lg border-3 p-4 transition-all ${
                  isAvailable
                    ? "bg-[var(--card)] border-[var(--lime)]/40 shadow-[3px_3px_0px_var(--lime)]"
                    : "bg-[var(--card)]/50 border-[var(--electric-blue)]/10 opacity-40"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    {service.tag && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block ${
                        isAvailable
                          ? "bg-[var(--lime)]/15 text-[var(--foreground)]"
                          : "bg-[var(--electric-blue)]/10 text-[var(--gray)]"
                      }`}>
                        {lang === "en" ? service.tag.en : service.tag.tr}
                      </span>
                    )}
                    <h3 className={`text-sm font-black ${isAvailable ? "text-[var(--foreground)]" : "text-[var(--gray)]"}`}>
                      {lang === "en" ? service.name.en : service.name.tr}
                    </h3>
                  </div>
                  <span className={`text-xs font-bold ${isAvailable ? "text-[var(--foreground)]" : "text-[var(--gray)]"}`}>
                    {formatPrice(service.minPrice)}+
                  </span>
                </div>
                <p className="text-xs text-[var(--gray)] mb-3">
                  {lang === "en" ? service.desc.en : service.desc.tr}
                </p>
                {isAvailable ? (
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] hover:underline"
                  >
                    {lang === "en" ? "Configure" : "Yapılandır"}
                    <ArrowRight size={12} />
                  </Link>
                ) : (
                  <span className="text-xs text-[var(--gray)]">
                    {lang === "en" ? `Need ${formatPrice(service.minPrice)}+` : `${formatPrice(service.minPrice)}+ gerekli`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
