"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { usePortfolio } from "@/lib/hooks/use-firestore";
import { ArrowLeft, Play, Sparkles, Clapperboard, Camera, Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { VideoPlayerModal } from "./video-player-modal";
import type { PortfolioItem } from "@/lib/firestore-types";

/* ── Service Groups ── */
const SERVICE_GROUP_MAP: Record<string, "film" | "gorsel" | "sosyal"> = {
  campaign: "film",
  corporate: "film",
  product: "film",
  "product-photo": "gorsel",
  reels: "sosyal",
  avatar: "sosyal",
};

const SERVICE_TABS = [
  { id: "all", tr: "Tümü", en: "All", icon: null },
  { id: "film", tr: "AI Reklam & Video", en: "AI Ad & Video", icon: Clapperboard },
  { id: "gorsel", tr: "AI Studio Görsel", en: "AI Studio Visual", icon: Camera },
  { id: "sosyal", tr: "Sosyal Medya Uzmanı", en: "Social Media Expert", icon: Smartphone },
];

/* ── Orientation fallback ── */
const getOrientation = (item: PortfolioItem): "horizontal" | "vertical" | "square" => {
  if (item.orientation) return item.orientation;
  if (["campaign", "corporate", "product"].includes(item.category)) return "horizontal";
  if (item.category === "product-photo") return "square";
  return "vertical";
};

/* ── Aspect ratio class ── */
const aspectClass: Record<string, string> = {
  horizontal: "aspect-video",
  vertical: "aspect-[9/16]",
  square: "aspect-square",
};

/* ── Hover Video Card ── */
const HoverVideoCard = ({
  videoUrl,
  thumbnailUrl,
  title,
  altText,
  category,
  orientation,
}: {
  videoUrl?: string;
  thumbnailUrl?: string;
  title: string;
  altText: string;
  category: string;
  orientation: "horizontal" | "vertical" | "square";
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHovering(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovering(false);
    if (videoRef.current) videoRef.current.pause();
  }, []);

  const catLabel = SERVICE_TABS.find((t) => t.id === SERVICE_GROUP_MAP[category]);
  const orientIcon = orientation === "horizontal" ? "16:9" : orientation === "square" ? "1:1" : "9:16";

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="absolute inset-0">
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt={altText}
          fill
          className={`object-cover transition-opacity duration-500 ${hovering && videoUrl ? "opacity-0" : "opacity-100"}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      )}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovering ? "opacity-100" : "opacity-0"}`}
        />
      )}
      <div className={`absolute inset-0 transition-all duration-300 ${
        hovering
          ? "bg-gradient-to-t from-black/60 via-transparent to-transparent"
          : "bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      }`} />
      {/* Play button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
        hovering ? "opacity-100 scale-100" : "opacity-60 scale-90"
      }`}>
        <div className={`w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
          hovering ? "bg-[var(--lime)]/30 border-[var(--lime)]/50 scale-110" : "bg-black/30"
        }`}>
          <Play size={18} className={`ml-0.5 transition-colors duration-300 ${hovering ? "text-[var(--lime)]" : "text-white"}`} />
        </div>
      </div>
      {/* Top badges */}
      <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-1">
        {catLabel && (
          <span className="px-2 py-0.5 rounded-md bg-[var(--dark-blue)]/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider">
            {catLabel.tr}
          </span>
        )}
        <span className="px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-white/60 text-[9px] font-bold">
          {orientIcon}
        </span>
      </div>
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-xs font-bold text-white leading-tight">{title}</p>
      </div>
    </div>
  );
};

/* ── Hero Featured Video ── */
const PortfolioHero = ({
  item,
  lang,
}: {
  item: PortfolioItem;
  lang: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const title = lang === "en" ? item.titleEn || item.title : item.title;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [item.videoUrl]);

  return (
    <div className="relative w-full aspect-video max-h-[70vh] overflow-hidden rounded-2xl border-3 border-[var(--electric-blue)]/20">
      {/* Background: video or thumbnail */}
      {item.videoUrl ? (
        <video
          ref={videoRef}
          src={item.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={item.thumbnailUrl}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : item.thumbnailUrl ? (
        <Image src={item.thumbnailUrl} alt={title} fill className="object-cover" priority />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-blue)] to-[var(--deep-blue)]" />
      )}
      {/* Frosted glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-[var(--lime)]/20 border border-[var(--lime)]/40 text-[var(--lime)] text-[10px] font-black uppercase tracking-wider">
            {lang === "en" ? "Featured" : "Öne Çıkan"}
          </span>
          {item.clientName && (
            <span className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-[10px] font-bold">
              {item.clientName}
            </span>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight max-w-xl">
          {title}
        </h2>
        {item.slug && (
          <Link
            href={`/portfolio/${item.slug}`}
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-[var(--lime)] text-[var(--dark-blue)] text-sm font-black border-2 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <Play size={14} className="ml-0.5" />
            {lang === "en" ? "Watch Full Video" : "Tam Videoyu İzle"}
          </Link>
        )}
      </div>
    </div>
  );
};

/* ── Portfolio Page ── */
export const PortfolioPage = () => {
  const { t, lang } = useI18n();
  const { data: portfolio, loading } = usePortfolio();
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  /* Filter by service group */
  const filteredItems = useMemo(() => {
    if (activeTab === "all") return portfolio;
    return portfolio.filter((item) => SERVICE_GROUP_MAP[item.category] === activeTab);
  }, [portfolio, activeTab]);

  /* Featured item: first item with a video in current filter */
  const featuredItem = useMemo(
    () => filteredItems.find((item) => item.videoUrl) ?? null,
    [filteredItems]
  );

  /* Grid items: all except featured */
  const gridItems = useMemo(
    () => (featuredItem ? filteredItems.filter((i) => i.id !== featuredItem.id) : filteredItems),
    [filteredItems, featuredItem]
  );

  /* Service tab counts */
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: portfolio.length };
    portfolio.forEach((item) => {
      const group = SERVICE_GROUP_MAP[item.category];
      if (group) counts[group] = (counts[group] || 0) + 1;
    });
    return counts;
  }, [portfolio]);

  /* Grid config per tab */
  const gridConfig = useMemo(() => {
    switch (activeTab) {
      case "film":
        return { cols: "grid-cols-2 sm:grid-cols-3", featuredSpan: "sm:col-span-2", fallbackOrientation: "horizontal" as const };
      case "gorsel":
        return { cols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4", featuredSpan: "sm:col-span-2", fallbackOrientation: "square" as const };
      case "sosyal":
        return { cols: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-5", featuredSpan: "sm:col-span-2", fallbackOrientation: "vertical" as const };
      default:
        return { cols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4", featuredSpan: "sm:col-span-2", fallbackOrientation: "vertical" as const };
    }
  }, [activeTab]);

  const hasItems = portfolio.length > 0;

  return (
    <div className="min-h-screen relative z-10">
      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-blue)] via-[var(--deep-blue)] to-[var(--dark-blue)]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, var(--lime) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--lime) 0%, transparent 40%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-bold"
          >
            <ArrowLeft size={16} />
            {lang === "en" ? "Home" : "Ana Sayfa"}
          </Link>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--lime)]/10 border border-[var(--lime)]/30 mb-4">
              <Sparkles size={12} className="text-[var(--lime)]" />
              <span className="text-[10px] font-bold text-[var(--lime)] uppercase tracking-wider">
                {lang === "en" ? "Our Work" : "Portfolyo"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
              {t("portfolio.title")}
            </h1>
            <p className="text-base text-white/60 leading-relaxed max-w-lg">
              {t("portfolio.subtitle")}
            </p>
            {hasItems && (
              <div className="flex items-center gap-6 mt-6">
                <div>
                  <div className="text-2xl font-black text-[var(--lime)]">{portfolio.length}+</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
                    {lang === "en" ? "Projects" : "Proje"}
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <div className="text-2xl font-black text-[var(--lime)]">3</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
                    {lang === "en" ? "Services" : "Hizmet"}
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <div className="text-2xl font-black text-[var(--lime)]">AI</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
                    {lang === "en" ? "Powered" : "Destekli"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[var(--background)] rounded-t-[24px]" />
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* ── Service Tabs ── */}
        {hasItems && (
          <div className="sticky top-0 z-20 bg-[var(--background)] py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-[var(--electric-blue)]/10 mb-8">
            <div className="flex flex-wrap items-center gap-2 max-w-6xl mx-auto">
              {SERVICE_TABS.map((tab) => {
                const count = tabCounts[tab.id] || 0;
                if (tab.id !== "all" && count === 0) return null;
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border-2 ${
                      isActive
                        ? "bg-[var(--dark-blue)] text-white border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--lime)]"
                        : "bg-[var(--card)] text-[var(--foreground)]/70 border-[var(--electric-blue)]/15 hover:border-[var(--dark-blue)]/30 hover:text-[var(--foreground)]"
                    }`}
                  >
                    {Icon && <Icon size={12} />}
                    {lang === "en" ? tab.en : tab.tr}
                    <span className={`text-[10px] ${isActive ? "text-[var(--lime)]" : "text-[var(--gray)]"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Hero Featured Video ── */}
        {!loading && featuredItem && (
          <div className="mb-8">
            <PortfolioHero item={featuredItem} lang={lang} />
          </div>
        )}

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="aspect-[9/16] rounded-xl bg-[var(--card)] border-2 border-[var(--electric-blue)]/10 overflow-hidden animate-pulse"
              >
                <div className="w-full h-full bg-gradient-to-b from-[var(--electric-blue)]/5 to-[var(--electric-blue)]/10" />
              </div>
            ))}
          </div>
        ) : gridItems.length > 0 ? (
          <div className={`grid ${gridConfig.cols} gap-4`}>
            {gridItems.map((item, index) => {
              const orientation = getOrientation(item);
              const title = lang === "en" ? item.titleEn || item.title : item.title;
              const altText = `${title} — AI ${item.category} prodüksiyon | MindID`;
              const hasSlug = !!item.slug;
              const isFeaturedSize = index === 0 && activeTab !== "all";

              const cardClass = [
                "rounded-xl bg-[var(--card)] border-2 border-[var(--electric-blue)]/10 overflow-hidden cursor-pointer group relative",
                "hover:shadow-[0_8px_30px_rgba(16,10,44,0.15)] hover:border-[var(--lime)]/40 transition-all duration-300 hover:-translate-y-1",
                aspectClass[orientation],
                isFeaturedSize ? gridConfig.featuredSpan : "",
              ].filter(Boolean).join(" ");

              const cardInner = item.thumbnailUrl ? (
                <HoverVideoCard
                  videoUrl={item.videoUrl}
                  thumbnailUrl={item.thumbnailUrl}
                  title={title}
                  altText={altText}
                  category={item.category}
                  orientation={orientation}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[var(--electric-blue)]/5 to-[var(--electric-blue)]/10">
                  <div className="w-12 h-12 rounded-full bg-[var(--electric-blue)]/15 flex items-center justify-center group-hover:bg-[var(--lime)]/15 transition-colors">
                    <Play size={18} className="text-[var(--gray)] group-hover:text-[var(--foreground)] ml-0.5 transition-colors" />
                  </div>
                  <span className="text-xs font-bold text-[var(--foreground)] text-center px-3">{title}</span>
                </div>
              );

              if (hasSlug) {
                return (
                  <Link key={item.id} href={`/portfolio/${item.slug}`} className={cardClass}>
                    {cardInner}
                  </Link>
                );
              }
              return (
                <div
                  key={item.id}
                  onClick={() => item.videoUrl && setSelectedVideo({ url: item.videoUrl, title })}
                  className={cardClass}
                >
                  {cardInner}
                </div>
              );
            })}
          </div>
        ) : !loading && hasItems ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex items-center justify-center mx-auto mb-4">
              <Play size={24} className="text-[var(--gray)]" />
            </div>
            <p className="text-[var(--foreground)] font-bold mb-4">{t("portfolio.noResults")}</p>
            <button
              onClick={() => setActiveTab("all")}
              className="px-4 py-2 rounded-full bg-[var(--dark-blue)] text-white text-xs font-bold cursor-pointer hover:shadow-[3px_3px_0px_var(--lime)] transition-all"
            >
              {t("portfolio.showAll")}
            </button>
          </div>
        ) : (
          /* Placeholder grid while empty */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="aspect-[9/16] rounded-xl bg-[var(--card)] border-2 border-[var(--electric-blue)]/10 flex flex-col items-center justify-center gap-3 hover:border-[var(--lime)]/30 transition-all cursor-pointer group duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--electric-blue)]/10 flex items-center justify-center group-hover:bg-[var(--lime)]/10 transition-colors">
                  <Play size={18} className="text-[var(--gray)] group-hover:text-[var(--foreground)] ml-0.5 transition-colors" />
                </div>
                <span className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-wider">
                  {t("portfolio.coming")}
                </span>
                <span className="text-[10px] text-[var(--gray)]/50">#{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <VideoPlayerModal
        open={!!selectedVideo}
        videoUrl={selectedVideo?.url ?? ""}
        title={selectedVideo?.title}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};
