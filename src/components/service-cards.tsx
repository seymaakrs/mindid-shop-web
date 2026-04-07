"use client";

import { useI18n } from "@/lib/i18n";
import { SERVICE_TYPES } from "@/lib/pricing-data";
import {
  Video,
  Camera,
  Film,
  Megaphone,
  Building2,
  User,
  Share2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

/* ─── Hizmet ikonları ─── */
const serviceIcons: Record<string, React.ReactNode> = {
  "product-photo": <Camera size={28} />,
  reels: <Video size={28} />,
  "product-ad": <Film size={28} />,
  "campaign-ad": <Megaphone size={28} />,
  "corporate-intro": <Building2 size={28} />,
  avatar: <User size={28} />,
  "social-media": <Share2 size={28} />,
};

/* ─── Kart renkleri ─── */
const cardColors = [
  "bg-[var(--cream)]",
  "bg-[var(--lime)]/10",
  "bg-white/80",
  "bg-[var(--lime)]/15",
  "bg-[var(--cream)]",
  "bg-white/80",
  "bg-[var(--lime)]/10",
];

export const ServiceCards = () => {
  const { t } = useI18n();

  const services = SERVICE_TYPES.map((s) => ({
    ...s,
    icon: serviceIcons[s.id] || <Video size={28} />,
  }));

  // Sıralama: fiyata göre (avatar sona)
  const sorted = [...services]
    .filter((s) => s.id !== "avatar")
    .sort((a, b) => a.basePrice - b.basePrice);
  const avatar = services.find((s) => s.id === "avatar");
  const allServices = [...sorted, ...(avatar ? [avatar] : [])];

  return (
    <section
      id="services"
      className="relative py-20 z-10"
      aria-label="Hizmetlerimiz"
    >
      {/* Schema.org Service markup (GEO uyumlu) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "MindID AI Hizmetleri",
            itemListElement: allServices.map((s, i) => ({
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
                url: `https://mindid.shop/configure/${s.id}`,
              },
            })),
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SEO headline */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-3">
            {t("services.headline")}
          </h2>
          <p className="text-[var(--gray)] text-sm md:text-base max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
          <div className="w-20 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {allServices.map((service, i) => {
            const isAvatar = service.id === "avatar";
            const isSocialMedia = service.id === "social-media";
            const href = isAvatar
              ? "/avatar"
              : isSocialMedia
                ? "/sosyal-medya-yonetimi"
                : `/configure/${service.id}`;

            return (
              <Link
                key={service.id}
                href={href}
                className={`group relative rounded-2xl p-6 border border-[var(--dark-blue)]/8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[var(--lime)] transition-all duration-500 animate-[kinetic-slide_0.6s_ease-out_both] ${cardColors[i % cardColors.length]}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* İkon (hover animasyonlu) */}
                <div className="w-12 h-12 rounded-xl bg-[var(--dark-blue)]/5 flex items-center justify-center text-[var(--dark-blue)] mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--lime)]/20 group-hover:text-[var(--lime)]">
                  {service.icon}
                </div>

                {/* Başlık */}
                <h3 className="text-lg font-bold text-[var(--dark-blue)] mb-2 leading-snug group-hover:text-[var(--electric-blue)] transition-colors">
                  {t(service.nameKey)}
                </h3>

                {/* Açıklama */}
                <p className="text-sm text-[var(--dark-blue)]/60 leading-relaxed mb-4 line-clamp-3">
                  {t(service.descKey)}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-1.5 text-sm font-bold text-[var(--dark-blue)]/40 group-hover:text-[var(--lime)] transition-colors">
                  <span>{t("service.explore") || "Keşfet"}</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
