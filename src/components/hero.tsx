"use client";

import { useI18n } from "@/lib/i18n";
import { Search, Video, ShoppingBag, User, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ─── Floating Animasyon CSS ─── */
const floatStyles = `
  @keyframes float-a {
    0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
    50%       { transform: translateY(-12px) rotate(var(--rot)); }
  }
  @keyframes float-b {
    0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
    50%       { transform: translateY(-18px) rotate(var(--rot)); }
  }
  @keyframes float-c {
    0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
    50%       { transform: translateY(-10px) rotate(var(--rot)); }
  }
  @keyframes float-d {
    0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
    50%       { transform: translateY(-15px) rotate(var(--rot)); }
  }
  .float-a { animation: float-a 5.2s ease-in-out infinite; }
  .float-b { animation: float-b 6.8s ease-in-out infinite; }
  .float-c { animation: float-c 4.9s ease-in-out infinite; }
  .float-d { animation: float-d 7.4s ease-in-out infinite; }
`;

/* ─── Hizmet Kartı Tipi ─── */
interface ServiceCard {
  label: string;
  title: string;
  description: string;
  stat?: string;
  icon: React.ReactNode;
  color: string;
  labelBg: string;
  desktopStyle: React.CSSProperties;
  floatClass: string;
  rotation: string;
}

/* ─── Tek Kart Bileşeni ─── */
const HeroCard = ({
  card,
  index,
  mounted,
}: {
  card: ServiceCard;
  index: number;
  mounted: boolean;
}) => {
  return (
    <div
      className={`${card.floatClass} group/card rounded-2xl p-7 shadow-lg border border-[var(--dark-blue)]/10 backdrop-blur-sm w-[320px] cursor-pointer ${card.color}`}
      style={
        {
          "--rot": card.rotation,
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? `translateY(0) scale(1) rotate(${card.rotation})`
            : "translateY(50px) scale(0.85)",
          transition: `opacity 0.7s cubic-bezier(0.05,0.7,0.1,1) ${0.2 + index * 0.15}s, transform 0.7s cubic-bezier(0.05,0.7,0.1,1) ${0.2 + index * 0.15}s, box-shadow 0.3s ease`,
          animationDelay: mounted ? `${index * 0.9}s` : undefined,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 20px 48px rgba(0,0,0,0.16)";
        (e.currentTarget as HTMLElement).style.transform = `scale(1.06) rotate(0deg)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 32px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLElement).style.transform = `translateY(0) scale(1) rotate(${card.rotation})`;
      }}
    >
      <span
        className={`inline-block text-[11px] font-black uppercase tracking-widest px-3.5 py-1 rounded-md mb-4 ${card.labelBg}`}
      >
        {card.label}
      </span>

      <h3 className="text-[20px] font-bold text-[var(--dark-blue)] leading-snug">
        {card.title}
      </h3>

      <p className="text-[14px] text-[var(--dark-blue)]/65 mt-2 leading-relaxed">
        {card.description}
      </p>

      {card.stat ? (
        <div className="mt-3.5">
          <span className="text-[12px] font-bold text-[var(--dark-blue)]/50 bg-[var(--dark-blue)]/6 px-3 py-1 rounded-md">
            {card.stat}
          </span>
        </div>
      ) : (
        <div className="mt-3.5 text-[var(--dark-blue)]/30 transition-all duration-300 group-hover/card:scale-125 group-hover/card:text-[var(--lime)]">
          {card.icon}
        </div>
      )}
    </div>
  );
};

/* ─── Mobil Kart ─── */
const MobileCard = ({
  card,
  index,
  mounted,
}: {
  card: ServiceCard;
  index: number;
  mounted: boolean;
}) => {
  const directions = [
    { x: -60, y: 40 },
    { x: 60, y: 40 },
    { x: -60, y: -40 },
    { x: 60, y: -40 },
  ];
  const dir = directions[index] || { x: 0, y: 40 };

  return (
    <div
      className={`rounded-xl p-4 shadow-md border border-[var(--dark-blue)]/8 backdrop-blur-sm ${card.color}`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted
          ? "translate(0, 0) scale(1) rotate(0deg)"
          : `translate(${dir.x}px, ${dir.y}px) scale(0.8) rotate(${index % 2 === 0 ? -8 : 8}deg)`,
        transition: `all 0.8s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.4 + index * 0.12}s`,
      }}
    >
      <span
        className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md mb-2 ${card.labelBg}`}
      >
        {card.label}
      </span>
      <h3 className="text-sm font-bold text-[var(--dark-blue)] leading-snug">
        {card.title}
      </h3>
      <p className="text-[11px] text-[var(--dark-blue)]/60 mt-0.5 leading-relaxed">
        {card.description}
      </p>
      {card.stat && (
        <span className="inline-block mt-1.5 text-[9px] font-bold text-[var(--dark-blue)]/40 bg-[var(--dark-blue)]/5 px-1.5 py-0.5 rounded">
          {card.stat}
        </span>
      )}
    </div>
  );
};

/* ─── Ana Hero Bileşeni ─── */
export const Hero = () => {
  const { lang } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const cards: ServiceCard[] = [
    {
      label: lang === "en" ? "VIDEO" : "VİDEO",
      title: lang === "en" ? "AI Ad Film" : "AI Reklam Filmi",
      description:
        lang === "en"
          ? "Produce your brand film in days."
          : "Marka filminizi günler içinde üretin.",
      stat: lang === "en" ? "5-day delivery" : "5 günde teslimat",
      icon: <Video size={20} />,
      color: "bg-[var(--cream)]",
      labelBg: "bg-[var(--lime)] text-[var(--dark-blue)]",
      desktopStyle: { top: "12%", left: "3%" },
      floatClass: "float-a",
      rotation: "-2.5deg",
    },
    {
      label: lang === "en" ? "E-COMMERCE" : "E-TİCARET",
      title: lang === "en" ? "AI Product Visuals" : "AI Ürün Görseli",
      description:
        lang === "en"
          ? "Studio-quality product photography."
          : "Stüdyo kalitesinde ürün çekimi.",
      stat: lang === "en" ? "70% cost savings" : "%70 maliyet tasarrufu",
      icon: <ShoppingBag size={20} />,
      color: "bg-[var(--lime)]/15",
      labelBg: "bg-[var(--dark-blue)] text-[var(--lime)]",
      desktopStyle: { top: "10%", right: "3%" },
      floatClass: "float-b",
      rotation: "2deg",
    },
    {
      label: "AVATAR",
      title: lang === "en" ? "Digital Avatar" : "Dijital Avatar",
      description:
        lang === "en"
          ? "Create content without a camera."
          : "Kamera olmadan içerik üretin.",
      icon: <User size={20} />,
      color: "bg-white/80",
      labelBg: "bg-[var(--dark-blue)]/10 text-[var(--dark-blue)]",
      desktopStyle: { bottom: "14%", left: "4%" },
      floatClass: "float-c",
      rotation: "1.5deg",
    },
    {
      label: "PLATFORM",
      title: lang === "en" ? "Social Media" : "Sosyal Medya",
      description:
        lang === "en"
          ? "One video, four platforms. Zero friction."
          : "Bir video, dört platform. Sıfır sürtünme.",
      stat: lang === "en" ? "48+ completed projects" : "48+ tamamlanan proje",
      icon: <Share2 size={20} />,
      color: "bg-[var(--lime)]/10",
      labelBg: "bg-[var(--lime)]/80 text-[var(--dark-blue)]",
      desktopStyle: { bottom: "12%", right: "3%" },
      floatClass: "float-d",
      rotation: "-1.8deg",
    },
  ];

  /* ─── Hızlı Erişim Chip'leri (SEO/GEO: sık sorulan ihtiyaçlar) ─── */
  const chips = lang === "en"
    ? [
        { label: "AI Reels", href: "/configure/reels" },
        { label: "Product Photos", href: "/configure/urun-gorseli" },
        { label: "Digital Avatar", href: "/configure/avatar" },
        { label: "Social Media", href: "/configure/sosyal-medya" },
      ]
    : [
        { label: "AI Reels", href: "/configure/reels" },
        { label: "Ürün Görseli", href: "/configure/urun-gorseli" },
        { label: "Dijital Avatar", href: "/configure/avatar" },
        { label: "Sosyal Medya", href: "/configure/sosyal-medya" },
      ];

  return (
    <>
      <style>{floatStyles}</style>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
        aria-label={
          lang === "en"
            ? "Hero section — AI creative agency for brands"
            : "Ana bölüm — Markalar için AI kreatif ajans"
        }
      >
        {/* ─── Arka Plan Video ─── */}
        <div className="absolute inset-0 z-0 hidden sm:block">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-15"
            poster="/kaplan-yatay.png"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[var(--background)]/85" />
        </div>

        {/* ─── Desktop: Floating Kartlar ─── */}
        <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="absolute pointer-events-auto"
              style={card.desktopStyle}
            >
              <HeroCard card={card} index={i} mounted={mounted} />
            </div>
          ))}
        </div>

        {/* ─── Merkez İçerik ─── */}
        <div className="relative z-20 text-center flex flex-col items-center gap-5 px-4 max-w-2xl mx-auto mb-48 md:mb-0">
          {/* Küçük üst yazı */}
          <p
            className="text-[var(--dark-blue)]/50 tracking-wide"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "1.15rem",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s",
            }}
          >
            {lang === "en" ? "your niche, amplified" : "nişini büyüt, farkını yarat"}
          </p>

          {/* H1 — Büyük El Yazısı */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--dark-blue)] leading-[1.05]"
            style={{
              fontFamily: "'Caveat', cursive",
              opacity: mounted ? 1 : 0,
              transform: mounted
                ? "translateY(0) rotate(0deg)"
                : "translateY(50px) rotate(-2deg)",
              transition: "all 0.9s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s",
            }}
          >
            {lang === "en"
              ? "what's your brand's next move?"
              : "markanın bir sonraki adımı ne?"}
          </h1>

          {/* ─── AI Asistan Arama Çubuğu ─── */}
          <div
            className="w-full max-w-md flex flex-col gap-3"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.05, 0.7, 0.1, 1) 0.55s",
            }}
          >
            {/* Arama kutusu */}
            <Link
              href="/configure/reels"
              className="group flex items-center gap-3 w-full px-5 py-4 rounded-full border-2 border-[var(--dark-blue)]/15 bg-white/70 backdrop-blur-sm hover:border-[var(--lime)] hover:shadow-xl hover:bg-white/95 transition-all duration-300"
              aria-label={
                lang === "en"
                  ? "Calculate your AI content price"
                  : "AI içerik fiyatını hesapla"
              }
            >
              <Search
                size={18}
                className="text-[var(--dark-blue)]/40 group-hover:text-[var(--lime)] transition-colors shrink-0"
              />
              <span className="text-sm text-[var(--dark-blue)]/50 font-medium flex-1 text-left">
                {lang === "en"
                  ? "What do you need? Calculate your price..."
                  : "Ne ihtiyacın var? Fiyatını hesapla..."}
              </span>
              <ArrowRight
                size={16}
                className="text-[var(--dark-blue)]/25 group-hover:text-[var(--lime)] group-hover:translate-x-1 transition-all shrink-0"
              />
            </Link>

            {/* Hızlı Erişim Chip'leri (GEO: konuya özel anahtar kelimeler) */}
            <div className="flex flex-wrap justify-center gap-2">
              {chips.map((chip) => (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-[var(--dark-blue)]/6 text-[var(--dark-blue)]/55 hover:bg-[var(--lime)] hover:text-[var(--dark-blue)] transition-all duration-200 border border-[var(--dark-blue)]/8 hover:border-[var(--lime)] hover:shadow-sm"
                >
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ─── GEO/SEO: Kısa Açıklama (AI arama motorları için) ─── */}
          <p
            className="text-[12px] text-[var(--dark-blue)]/35 max-w-xs leading-relaxed"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.7s ease 0.9s",
            }}
          >
            {lang === "en"
              ? "AI-powered video ads, product visuals & social media — delivered in days, not months."
              : "Yapay zeka destekli reklam filmi, ürün görseli ve sosyal medya içeriği — günler içinde teslim."}
          </p>
        </div>

        {/* ─── Mobil Kartlar ─── */}
        <div className="absolute bottom-6 left-0 right-0 z-20 px-4 md:hidden">
          <div className="grid grid-cols-2 gap-2.5">
            {cards.map((card, i) => (
              <MobileCard key={card.label} card={card} index={i} mounted={mounted} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
