"use client";

import { useI18n } from "@/lib/i18n";
import { SAAS_SERVICES } from "@/lib/plans-data";
import {
  Video,
  Camera,
  User,
  Share2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";

const ICONS = {
  video: <Video size={24} />,
  camera: <Camera size={24} />,
  user: <User size={24} />,
  share: <Share2 size={24} />,
};

const VISUAL_CONFIG: Record<string, { gradient: string; pattern: string }> = {
  video: {
    gradient: "from-[#1c1242] via-[#251860] to-[#100a2c]",
    pattern: "radial-gradient(circle at 50% 50%, rgba(173,233,79,0.1) 0%, transparent 50%)",
  },
  image: {
    gradient: "from-[#100a2c] via-[#1a1240] to-[#0d0825]",
    pattern: "radial-gradient(circle at 70% 30%, rgba(173,233,79,0.06) 0%, transparent 60%)",
  },
  avatar: {
    gradient: "from-[#0d0825] via-[#1c1242] to-[#100a2c]",
    pattern: "radial-gradient(circle at 20% 80%, rgba(173,233,79,0.07) 0%, transparent 60%)",
  },
  social: {
    gradient: "from-[#100a2c] via-[#1a1240] to-[#1c1242]",
    pattern: "radial-gradient(circle at 80% 20%, rgba(173,233,79,0.08) 0%, transparent 60%)",
  },
};

export const ServiceCards = () => {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(null);

  const toggleMobile = useCallback((i: number) => {
    setMobileActiveIndex((prev) => (prev === i ? null : i));
  }, []);

  const services = SAAS_SERVICES.map((s) => ({
    ...s,
    icon: ICONS[s.iconName],
    visual: VISUAL_CONFIG[s.id] ?? VISUAL_CONFIG.video,
  }));

  return (
    <section
      id="services"
      className="relative py-20 z-10"
      aria-label={t("services.headline")}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "MindID AI Studio — Self-Service",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: t(s.nameKey),
                description: t(s.descKey),
                provider: {
                  "@type": "Organization",
                  name: "MindID",
                  url: "https://mindid.shop",
                },
                areaServed: { "@type": "Country", name: "Turkey" },
                url: `https://mindid.shop${s.href}`,
              },
            })),
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-3">
            {t("services.headline")}
          </h2>
          <p className="text-[var(--gray)] text-sm md:text-base max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
          <div className="w-20 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex h-[520px] lg:h-[580px] gap-2 rounded-3xl overflow-hidden">
          {services.map((service, i) => {
            const isActive = activeIndex === i;

            return (
              <Link
                key={service.id}
                href={service.href}
                className={`service-panel group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? "flex-[4]" : activeIndex !== null ? "flex-[0.6]" : "flex-1"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${service.visual.gradient} transition-opacity duration-500`} />
                <div className="absolute inset-0 opacity-60" style={{ background: service.visual.pattern }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
                  style={{ background: isActive ? "var(--lime)" : "transparent" }}
                />

                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 backdrop-blur-sm">
                      {service.icon}
                    </div>
                    <span
                      className="text-white/80 font-bold text-sm tracking-[0.15em] uppercase"
                      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                    >
                      {t(service.nameKey)}
                    </span>
                  </div>
                </div>

                <div className={`absolute inset-0 flex flex-col justify-end p-8 transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                  <div className="w-14 h-14 rounded-xl bg-[var(--lime)]/20 flex items-center justify-center text-[var(--lime)] mb-4 backdrop-blur-sm border border-[var(--lime)]/20">
                    {service.icon}
                  </div>

                  <h3 className="text-white text-2xl font-black mb-3 leading-tight">
                    {t(service.nameKey)}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-[280px]">
                    {t(service.descKey)}
                  </p>

                  <p className="text-[11px] uppercase tracking-wider text-white/40 font-bold mb-4">
                    ~{service.estimatedCredits} {t("service.creditsPerRun")}
                  </p>

                  <div className="flex items-center gap-2 text-[var(--lime)] font-bold text-sm group/cta">
                    <span>{t("service.tryNow")}</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </div>
                </div>

                <div className="absolute top-6 left-6 text-white/20 font-black text-5xl select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden flex-col gap-3 rounded-2xl overflow-hidden">
          {services.map((service, i) => {
            const isMobileActive = mobileActiveIndex === i;

            return (
              <div
                key={service.id}
                className={`relative overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] animate-[kinetic-slide_0.6s_ease-out_both] ${isMobileActive ? "h-64" : "h-20"}`}
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => toggleMobile(i)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${service.visual.gradient}`} />
                <div className="absolute inset-0 opacity-40" style={{ background: service.visual.pattern }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
                  style={{ background: isMobileActive ? "var(--lime)" : "rgba(255,255,255,0.1)" }}
                />

                <div className={`relative h-20 flex items-center gap-4 px-5 transition-opacity duration-400 ${isMobileActive ? "opacity-0" : "opacity-100"}`}>
                  <span className="text-white/15 font-black text-2xl select-none shrink-0 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-white font-bold text-sm flex-1 truncate uppercase tracking-wide">
                    {t(service.nameKey)}
                  </h3>
                  <div className={`w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-500 ${isMobileActive ? "rotate-90" : ""}`}>
                    <ArrowRight size={12} className="text-white/50" />
                  </div>
                </div>

                <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-700 ${isMobileActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                  <div className="w-12 h-12 rounded-xl bg-[var(--lime)]/20 flex items-center justify-center text-[var(--lime)] mb-3 backdrop-blur-sm border border-[var(--lime)]/20">
                    {service.icon}
                  </div>
                  <h3 className="text-white text-xl font-black mb-2 leading-tight">
                    {t(service.nameKey)}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {t(service.descKey)}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-[var(--lime)] font-bold text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{t("service.tryNow")}</span>
                    <ArrowRight size={14} />
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
