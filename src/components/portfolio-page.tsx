"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { usePortfolio } from "@/lib/hooks/use-firestore";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { VideoPlayerModal } from "./video-player-modal";

const CATEGORIES = [
  { id: "all", tr: "Tümü", en: "All" },
  { id: "reels", tr: "AI Reels", en: "AI Reels" },
  { id: "product", tr: "Ürün Filmi", en: "Product Film" },
  { id: "product-photo", tr: "Ürün Görseli", en: "Product Photo" },
  { id: "campaign", tr: "Kampanya", en: "Campaign" },
  { id: "corporate", tr: "Kurumsal", en: "Corporate" },
  { id: "avatar", tr: "Avatar", en: "Avatar" },
];

/* ── Hover Video Card ── */
const HoverVideoCard = ({
  videoUrl,
  thumbnailUrl,
  title,
  altText,
  category,
}: {
  videoUrl?: string;
  thumbnailUrl?: string;
  title: string;
  altText: string;
  category: string;
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
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const catLabel = CATEGORIES.find((c) => c.id === category);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0"
    >
      {/* Thumbnail */}
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt={altText}
          fill
          className={`object-cover transition-opacity duration-500 ${hovering && videoUrl ? "opacity-0" : "opacity-100"}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      )}

      {/* Video preview on hover */}
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

      {/* Gradient overlay — bottom */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        hovering
          ? "bg-gradient-to-t from-black/60 via-transparent to-transparent"
          : "bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      }`} />

      {/* Play button — center */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
        hovering ? "opacity-100 scale-100" : "opacity-60 scale-90"
      }`}>
        <div className={`w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
          hovering ? "bg-[var(--lime)]/30 border-[var(--lime)]/50 scale-110" : "bg-black/30"
        }`}>
          <Play size={18} className={`ml-0.5 transition-colors duration-300 ${hovering ? "text-[var(--lime)]" : "text-white"}`} />
        </div>
      </div>

      {/* Category badge — top left */}
      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[var(--dark-blue)]/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider">
        {catLabel ? catLabel.tr : category}
      </span>

      {/* Title — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className={`text-xs font-bold text-white leading-tight transition-transform duration-300 ${
          hovering ? "translate-y-0" : "translate-y-0"
        }`}>
          {title}
        </p>
      </div>
    </div>
  );
};

/* ── Portfolio Page ── */
export const PortfolioPage = () => {
  const { t, lang } = useI18n();
  const { data: portfolio, loading } = usePortfolio();
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const hasItems = portfolio.length > 0;

  const filteredItems =
    activeCategory === "all"
      ? portfolio
      : portfolio.filter((item) => item.category === activeCategory);

  const displayTitle = (item: (typeof portfolio)[0]) =>
    lang === "en" ? item.titleEn || item.title : item.title;

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: portfolio.length };
    portfolio.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [portfolio]);

  return (
    <div className="min-h-screen relative z-10">
      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-blue)] via-[var(--deep-blue)] to-[var(--dark-blue)]" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, var(--lime) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--lime) 0%, transparent 40%)",
          }}
        />
        {/* Decorative grid dots */}
        <div className="absolute inset-0 opacity-[0.04]"
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

            {/* Stats row */}
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
                  <div className="text-2xl font-black text-[var(--lime)]">
                    {CATEGORIES.filter((c) => c.id !== "all" && (categoryCounts[c.id] || 0) > 0).length}
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
                    {lang === "en" ? "Categories" : "Kategori"}
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

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[var(--background)] rounded-t-[24px]" />
      </div>

      {/* ── Content Area ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Category Filter */}
        {hasItems && (
          <div className="flex flex-wrap items-center gap-2 mb-8 -mt-1">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              if (cat.id !== "all" && count === 0) return null;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border-2 ${
                    isActive
                      ? "bg-[var(--dark-blue)] text-white border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--lime)]"
                      : "bg-[var(--card)] text-[var(--foreground)]/70 border-[var(--electric-blue)]/15 hover:border-[var(--dark-blue)]/30 hover:text-[var(--foreground)]"
                  }`}
                >
                  {lang === "en" ? cat.en : cat.tr}
                  {count > 0 && (
                    <span className={`ml-1.5 text-[10px] ${isActive ? "text-[var(--lime)]" : "text-[var(--gray)]"}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Results info */}
        {hasItems && activeCategory !== "all" && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[var(--foreground)]/60">
              <span className="font-bold text-[var(--foreground)]">{filteredItems.length}</span>{" "}
              {t("portfolio.items")}
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="text-xs text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold"
            >
              {t("portfolio.showAll")} →
            </button>
          </div>
        )}

        {/* ── Grid ── */}
        {loading ? (
          /* Loading skeleton */
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
        ) : hasItems ? (
          <>
            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex items-center justify-center mx-auto mb-4">
                  <Play size={24} className="text-[var(--gray)]" />
                </div>
                <p className="text-[var(--foreground)] font-bold mb-1">
                  {t("portfolio.noResults")}
                </p>
                <p className="text-sm text-[var(--gray)] mb-4">
                  {lang === "en"
                    ? "Try selecting a different category"
                    : "Farklı bir kategori seçmeyi deneyin"}
                </p>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="px-4 py-2 rounded-full bg-[var(--dark-blue)] text-white text-xs font-bold cursor-pointer hover:shadow-[3px_3px_0px_var(--lime)] transition-all"
                >
                  {t("portfolio.showAll")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => {
                  const title = displayTitle(item);
                  const altText = `${title} — AI ${item.category} prodüksiyon | MindID`;
                  const hasSlug = !!item.slug;

                  const cardClass =
                    "aspect-[9/16] rounded-xl bg-[var(--card)] border-2 border-[var(--electric-blue)]/10 overflow-hidden cursor-pointer group relative hover:shadow-[0_8px_30px_rgba(16,10,44,0.15)] hover:border-[var(--lime)]/40 transition-all duration-300 hover:-translate-y-1";

                  // Card with hover video preview
                  const cardInner = item.thumbnailUrl ? (
                    <HoverVideoCard
                      videoUrl={item.videoUrl}
                      thumbnailUrl={item.thumbnailUrl}
                      title={title}
                      altText={altText}
                      category={item.category}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[var(--electric-blue)]/5 to-[var(--electric-blue)]/10">
                        <div className="w-12 h-12 rounded-full bg-[var(--electric-blue)]/15 flex items-center justify-center group-hover:bg-[var(--lime)]/15 transition-colors">
                          <Play
                            size={18}
                            className="text-[var(--gray)] group-hover:text-[var(--foreground)] ml-0.5 transition-colors"
                          />
                        </div>
                        <span className="text-xs font-bold text-[var(--foreground)] text-center px-3">
                          {title}
                        </span>
                        <span className="text-[9px] font-bold text-[var(--gray)] uppercase tracking-wider">
                          {CATEGORIES.find((c) => c.id === item.category)?.tr || item.category}
                        </span>
                      </div>
                    </>
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
                      onClick={() =>
                        item.videoUrl &&
                        setSelectedVideo({ url: item.videoUrl, title })
                      }
                      className={cardClass}
                    >
                      {cardInner}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* Fallback: placeholder grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="aspect-[9/16] rounded-xl bg-[var(--card)] border-2 border-[var(--electric-blue)]/10 flex flex-col items-center justify-center gap-3 hover:border-[var(--lime)]/30 hover:shadow-[0_8px_30px_rgba(16,10,44,0.1)] transition-all cursor-pointer group duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--electric-blue)]/10 flex items-center justify-center group-hover:bg-[var(--lime)]/10 transition-colors">
                  <Play
                    size={18}
                    className="text-[var(--gray)] group-hover:text-[var(--foreground)] ml-0.5 transition-colors"
                  />
                </div>
                <span className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-wider">
                  {t("portfolio.coming")}
                </span>
                <span className="text-[10px] text-[var(--gray)]/50">
                  #{String(i + 1).padStart(2, "0")}
                </span>
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
