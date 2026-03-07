"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { usePortfolio } from "@/lib/hooks/use-firestore";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { VideoPlayerModal } from "./video-player-modal";

export const PortfolioPage = () => {
  const { t, lang } = useI18n();
  const { data: portfolio, loading } = usePortfolio();
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  const hasItems = portfolio.length > 0;

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--lime)] hover:underline mb-6 text-sm font-bold">
          <ArrowLeft size={16} />
          Ana Sayfa
        </Link>

        <h1 className="text-3xl md:text-4xl font-black text-[var(--lime)] mb-2">
          {t("portfolio.title")}
        </h1>
        <p className="text-[var(--gray)] mb-10">{t("portfolio.subtitle")}</p>

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {portfolio.map((item) => (
              <div
                key={item.id}
                onClick={() => item.videoUrl && setSelectedVideo({
                  url: item.videoUrl,
                  title: lang === "en" ? item.titleEn || item.title : item.title,
                })}
                className="aspect-[9/16] rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex flex-col items-center justify-center gap-2 hover:border-[var(--lime)]/50 hover:shadow-[4px_4px_0px_var(--lime)] transition-all cursor-pointer group overflow-hidden relative"
              >
                {item.thumbnailUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnailUrl}
                      alt={lang === "en" ? item.titleEn || item.title : item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[var(--lime)]/20 flex items-center justify-center group-hover:bg-[var(--lime)]/30 transition-colors">
                        <Play size={16} className="text-[var(--lime)]" />
                      </div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center px-1">
                        {lang === "en" ? item.titleEn || item.title : item.title}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)]/20 flex items-center justify-center group-hover:bg-[var(--lime)]/20 transition-colors">
                      <Play size={16} className="text-[var(--gray)] group-hover:text-[var(--lime)]" />
                    </div>
                    <span className="text-[10px] font-bold text-[var(--cream)] uppercase tracking-wider text-center px-1">
                      {lang === "en" ? item.titleEn || item.title : item.title}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Fallback: 48 placeholder grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 48 }, (_, i) => (
              <div
                key={i}
                className="aspect-[9/16] rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex flex-col items-center justify-center gap-2 hover:border-[var(--lime)]/50 hover:shadow-[4px_4px_0px_var(--lime)] transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)]/20 flex items-center justify-center group-hover:bg-[var(--lime)]/20 transition-colors">
                  <Play size={16} className="text-[var(--gray)] group-hover:text-[var(--lime)]" />
                </div>
                <span className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-wider">
                  {t("portfolio.coming")}
                </span>
                <span className="text-[10px] text-[var(--electric-blue)]">#{String(i + 1).padStart(2, "0")}</span>
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
