"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { usePortfolio } from "@/lib/hooks/use-firestore";
import { ArrowLeft, Play, Filter } from "lucide-react";
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

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--lime)] hover:underline mb-6 text-sm font-bold"
        >
          <ArrowLeft size={16} />
          Ana Sayfa
        </Link>

        <h1 className="text-3xl md:text-4xl font-black text-[var(--lime)] mb-2">
          {t("portfolio.title")}
        </h1>
        <p className="text-[var(--gray)] mb-6">{t("portfolio.subtitle")}</p>

        {/* Category Filter */}
        {hasItems && (
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            <Filter size={14} className="text-[var(--gray)] shrink-0" />
            {CATEGORIES.map((cat) => {
              const count =
                cat.id === "all"
                  ? portfolio.length
                  : portfolio.filter((i) => i.category === cat.id).length;
              if (cat.id !== "all" && count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-3 py-1.5 rounded-md text-xs font-bold border-2 transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-[var(--lime)] text-[var(--dark-blue)] border-[var(--dark-blue)] shadow-[2px_2px_0px_var(--dark-blue)]"
                      : "bg-transparent text-[var(--cream)]/60 border-[var(--electric-blue)]/20 hover:border-[var(--lime)]/40"
                  }`}
                >
                  {lang === "en" ? cat.en : cat.tr}
                  <span className="ml-1 opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Results count */}
        {hasItems && activeCategory !== "all" && (
          <p className="text-xs text-[var(--gray)] mb-4">
            {filteredItems.length} {t("portfolio.items")}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="aspect-[9/16] rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 overflow-hidden"
              >
                <div className="w-full h-full animate-pulse flex flex-col">
                  <div className="flex-1 bg-[var(--electric-blue)]/10" />
                  <div className="p-2 space-y-2">
                    <div className="h-2 bg-[var(--electric-blue)]/15 rounded-full w-3/4 mx-auto" />
                    <div className="h-2 bg-[var(--electric-blue)]/10 rounded-full w-1/2 mx-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : hasItems ? (
          <>
            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[var(--gray)]">{t("portfolio.noResults")}</p>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="mt-3 text-[var(--lime)] font-bold text-sm hover:underline cursor-pointer"
                >
                  {t("portfolio.showAll")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {filteredItems.map((item) => {
                  const title = displayTitle(item);
                  const altText = `${title} — AI ${item.category} prodüksiyon | MindID`;
                  const hasSlug = !!item.slug;

                  const cardContent = (
                    <>
                      {item.thumbnailUrl ? (
                        <>
                          <Image
                            src={item.thumbnailUrl}
                            alt={altText}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-[var(--lime)]/20 flex items-center justify-center group-hover:bg-[var(--lime)]/30 transition-colors">
                              <Play size={16} className="text-[var(--lime)]" />
                            </div>
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center px-1">
                              {title}
                            </span>
                          </div>
                          {/* Category badge */}
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[var(--lime)]/90 text-[var(--dark-blue)] text-[8px] font-bold uppercase">
                            {item.category}
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)]/20 flex items-center justify-center group-hover:bg-[var(--lime)]/20 transition-colors">
                            <Play
                              size={16}
                              className="text-[var(--gray)] group-hover:text-[var(--lime)]"
                            />
                          </div>
                          <span className="text-[10px] font-bold text-[var(--cream)] uppercase tracking-wider text-center px-1">
                            {title}
                          </span>
                        </>
                      )}
                    </>
                  );

                  // If item has slug, link to detail page; otherwise open video modal
                  if (hasSlug) {
                    return (
                      <Link
                        key={item.id}
                        href={`/portfolio/${item.slug}`}
                        className="aspect-[9/16] rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex flex-col items-center justify-center gap-2 hover:border-[var(--lime)]/50 hover:shadow-[4px_4px_0px_var(--lime)] transition-all cursor-pointer group overflow-hidden relative"
                      >
                        {cardContent}
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
                      className="aspect-[9/16] rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex flex-col items-center justify-center gap-2 hover:border-[var(--lime)]/50 hover:shadow-[4px_4px_0px_var(--lime)] transition-all cursor-pointer group overflow-hidden relative"
                    >
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* Fallback: 48 placeholder grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 48 }, (_, i) => (
              <div
                key={i}
                className="aspect-[9/16] rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex flex-col items-center justify-center gap-2 hover:border-[var(--lime)]/50 hover:shadow-[4px_4px_0px_var(--lime)] transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)]/20 flex items-center justify-center group-hover:bg-[var(--lime)]/20 transition-colors">
                  <Play
                    size={16}
                    className="text-[var(--gray)] group-hover:text-[var(--lime)]"
                  />
                </div>
                <span className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-wider">
                  {t("portfolio.coming")}
                </span>
                <span className="text-[10px] text-[var(--electric-blue)]">
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
