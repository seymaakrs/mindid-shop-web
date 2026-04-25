"use client";

import { useI18n } from "@/lib/i18n";
import { SERVICE_TYPES } from "@/lib/pricing-data";
import {
  Video,
  Camera,
  Film,
  User,
  Share2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";

/* ─── 5 hizmet tanımı (sıralı) ─── */
const VISIBLE_SERVICES = [
  {
    id: "product",
    icon: <Film size={24} />,
    gradient: "from-[#1c1242] via-[#2a1a5e] to-[#100a2c]",
    accentColor: "var(--lime)",
    pattern: "radial-gradient(circle at 30% 70%, rgba(173,233,79,0.08) 0%, transparent 60%)",
  },
  {
    id: "product-photo",
    icon: <Camera size={24} />,
    gradient: "from-[#100a2c] via-[#1a1240] to-[#0d0825]",
    accentColor: "var(--lime)",
    pattern: "radial-gradient(circle at 70% 30%, rgba(173,233,79,0.06) 0%, transparent 60%)",
  },
  {
    id: "reels",
    icon: <Video size={24} />,
    gradient: "from-[#1c1242] via-[#251860] to-[#100a2c]",
    accentColor: "var(--lime)",
    pattern: "radial-gradient(circle at 50% 50%, rgba(173,233,79,0.1) 0%, transparent 50%)",
  },
  {
    id: "avatar",
    icon: <User size={24} />,
    gradient: "from-[#0d0825] via-[#1c1242] to-[#100a2c]",
    accentColor: "var(--lime)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(173,233,79,0.07) 0%, transparent 60%)",
  },
  {
    id: "social-media",
    icon: <Share2 size={24} />,
    gradient: "from-[#100a2c] via-[#1a1240] to-[#1c1242]",
    accentColor: "var(--lime)",
    pattern: "radial-gradient(circle at 80% 20%, rgba(173,233,79,0.08) 0%, transparent 60%)",
  },
];

export const ServiceCards = () => {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(null);

  const toggleMobile = useCallback((i: number) => {
    setMobileActiveIndex((prev) => (prev === i ? null : i));
  }, []);

  /* Hizmet verilerini SERVICE_TYPES'tan al */
  const services = VISIBLE_SERVICES.map((vs) => {
    const data = SERVICE_TYPES.find((s) => s.id === vs.id);
    return { ...vs, data };
  });

  /* Link hedefleri */
  const getHref = (id: string) => {
    if (id === "avatar") return "/avatar";
    if (id === "social-media") return "/sosyal-medya-yonetimi";
    return `/configure/${id}`;
  };

  return (
    <section
      id="services"
      className="relative py-20 z-10"
      aria-label="Hizmetlerimiz"
    >
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "MindID AI Hizmetleri",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: s.data ? t(s.data.nameKey) : s.id,
                description: s.data ? t(s.data.descKey) : "",
                provider: {
                  "@type": "Organization",
                  name: "MindID",
                  url: "https://mindid.shop",
                },
                areaServed: { "@type": "Country", name: "Turkey" },
                url: `https://mindid.shop${getHref(s.id)}`,
              },
            })),
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-3">
            {t("services.headline")}
          </h2>
          <p className="text-[var(--gray)] text-sm md:text-base max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
          <div className="w-20 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
        </div>

        {/* ── Desktop: Dikey Panel Layoutu ── */}
        <div className="hidden md:flex h-[520px] lg:h-[580px] gap-2 rounded-3xl overflow-hidden">
          {services.map((service, i) => {
            const isActive = activeIndex === i;
            const nameKey = service.data?.nameKey || "";
            const descKey = service.data?.descKey || "";

            return (
              <Link
                key={service.id}
                href={getHref(service.id)}
                className={`service-panel group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? "flex-[4]" : activeIndex !== null ? "flex-[0.6]" : "flex-1"
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Gradient arka plan */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${service.gradient} transition-opacity duration-500`}
                />

                {/* Dekoratif pattern */}
                <div
                  className="absolute inset-0 opacity-60"
                  style={{ background: service.pattern }}
                />

                {/* Alt gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Üst dekoratif çizgi */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
                  style={{
                    background: isActive ? "var(--lime)" : "transparent",
                  }}
                />

                {/* ── Dikey Yazı (panel kapalıyken) ── */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    {/* İkon */}
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 backdrop-blur-sm">
                      {service.icon}
                    </div>
                    {/* Dikey metin */}
                    <span
                      className="text-white/80 font-bold text-sm tracking-[0.15em] uppercase"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                      }}
                    >
                      {t(nameKey)}
                    </span>
                  </div>
                </div>

                {/* ── Açık İçerik (panel hover'da) ── */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-8 transition-all duration-700 ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {/* İkon büyük */}
                  <div className="w-14 h-14 rounded-xl bg-[var(--lime)]/20 flex items-center justify-center text-[var(--lime)] mb-4 backdrop-blur-sm border border-[var(--lime)]/20">
                    {service.icon}
                  </div>

                  {/* Başlık */}
                  <h3 className="text-white text-2xl font-black mb-3 leading-tight">
                    {t(nameKey)}
                  </h3>

                  {/* Açıklama */}
                  <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-[280px]">
                    {t(descKey)}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[var(--lime)] font-bold text-sm group/cta">
                    <span>{t("service.explore") || "Keşfet"}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover/cta:translate-x-1"
                    />
                  </div>
                </div>

                {/* Panel numarası */}
                <div className="absolute top-6 left-6 text-white/20 font-black text-5xl select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Mobil: Accordion Paneller ── */}
        <div className="flex md:hidden flex-col gap-3 rounded-2xl overflow-hidden">
          {services.map((service, i) => {
            const nameKey = service.data?.nameKey || "";
            const descKey = service.data?.descKey || "";
            const isMobileActive = mobileActiveIndex === i;

            return (
              <div
                key={service.id}
                className={`relative overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] animate-[kinetic-slide_0.6s_ease-out_both] ${
                  isMobileActive ? "h-64" : "h-20"
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => toggleMobile(i)}
              >
                {/* Gradient arka plan */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${service.gradient}`}
                />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{ background: service.pattern }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Üst çizgi */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
                  style={{ background: isMobileActive ? "var(--lime)" : "rgba(255,255,255,0.1)" }}
                />

                {/* ── Kapalı Durum: Başlık satırı ── */}
                <div
                  className={`relative h-20 flex items-center gap-4 px-5 transition-opacity duration-400 ${
                    isMobileActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="text-white/15 font-black text-2xl select-none shrink-0 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-white font-bold text-sm flex-1 truncate uppercase tracking-wide">
                    {t(nameKey)}
                  </h3>
                  <div className={`w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-500 ${isMobileActive ? "rotate-90" : ""}`}>
                    <ArrowRight size={12} className="text-white/50" />
                  </div>
                </div>

                {/* ── Açık Durum: Detay içerik ── */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-700 ${
                    isMobileActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--lime)]/20 flex items-center justify-center text-[var(--lime)] mb-3 backdrop-blur-sm border border-[var(--lime)]/20">
                    {service.icon}
                  </div>
                  <h3 className="text-white text-xl font-black mb-2 leading-tight">
                    {t(nameKey)}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {t(descKey)}
                  </p>
                  <Link
                    href={getHref(service.id)}
                    className="inline-flex items-center gap-2 text-[var(--lime)] font-bold text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{t("service.explore") || "Keşfet"}</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
