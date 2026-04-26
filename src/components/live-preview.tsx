"use client";

import { useEffect, useState } from "react";
import type { ServicePackage, AddOnService } from "@/lib/types";
import {
  Check,
  Play,
  Film,
  Image as ImageIcon,
  Camera,
  Smartphone,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Mic,
  Infinity as InfinityIcon,
  Palette,
  Wand2,
} from "lucide-react";

type LivePreviewProps = {
  serviceId: string;
  selectedPackage: ServicePackage | null;
  selectedAddOns: AddOnService[];
  totalAI: number;
  formatPrice: (price: number) => string;
};

type ServiceLayout = "video-vertical" | "video-horizontal" | "photo-grid" | "phone-feed";

const SERVICE_LAYOUT: Record<string, ServiceLayout> = {
  reels: "video-vertical",
  product: "video-horizontal",
  campaign: "video-horizontal",
  corporate: "video-horizontal",
  "product-photo": "photo-grid",
  "social-media": "phone-feed",
  avatar: "phone-feed",
};

const SERVICE_ICON: Record<string, typeof Film> = {
  reels: Film,
  product: Film,
  campaign: Film,
  corporate: Film,
  "product-photo": Camera,
  "social-media": Smartphone,
  avatar: Smartphone,
};

// Map add-on ids to small chip icons + label
const ADDON_CHIP: Record<string, { icon: typeof Zap; label: string }> = {
  "addon-vfx": { icon: Zap, label: "VFX Eklendi" },
  "addon-ses-klonlama": { icon: Mic, label: "Ses Klonlama" },
  "addon-dudak-senkron": { icon: Wand2, label: "Dudak Senkron" },
  "addon-ozel-beste": { icon: Sparkles, label: "Özel Beste" },
  "addon-sinir-revizyon": { icon: InfinityIcon, label: "Sınırsız Revizyon" },
  "addon-ai-model": { icon: Sparkles, label: "AI Model" },
  "addon-sinir-renk": { icon: Palette, label: "Sınırsız Renk" },
  "addon-premium-rotus": { icon: Sparkles, label: "Premium Rötuş" },
};

const useAnimatedNumber = (target: number, duration = 600) => {
  const [value, setValue] = useState(target);
  useEffect(() => {
    const start = value;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(start + (target - start) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
};

// Derive a duration label from preset ids or package name
const deriveDuration = (pkg: ServicePackage | null): string => {
  if (!pkg) return "";
  const dur = pkg.presetIds.duration;
  if (dur?.includes("15")) return "15s";
  if (dur?.includes("30")) return "30s";
  if (dur?.includes("60")) return "60s";
  if (dur?.includes("90")) return "90s";
  if (dur?.includes("120")) return "2dk";
  return "30s";
};

const deriveQuality = (pkg: ServicePackage | null): string => {
  if (!pkg) return "HD";
  // Use highlighted/badge as a proxy for tier
  if (pkg.badge?.toLowerCase().includes("pro") || pkg.highlighted) return "4K";
  if (pkg.badgeVariant === "anchor") return "4K";
  return "HD";
};

const derivePhotoCount = (pkg: ServicePackage | null): number => {
  if (!pkg) return 4;
  const ids = pkg.presetIds;
  const count = ids.productCount;
  if (count?.includes("10")) return 10;
  if (count?.includes("5")) return 5;
  if (count?.includes("3")) return 3;
  if (count?.includes("1")) return 1;
  return 4;
};

const deriveStyleLabel = (pkg: ServicePackage | null): string => {
  if (!pkg) return "";
  return pkg.presetIds.visualStyle ?? pkg.presetIds.photoVisualStyle ?? "Modern";
};

// ----- Sub previews -----

const VideoPreview = ({ vertical, pkg }: { vertical: boolean; pkg: ServicePackage | null }) => {
  const duration = deriveDuration(pkg);
  const quality = deriveQuality(pkg);
  const style = deriveStyleLabel(pkg);
  return (
    <div
      className={`relative w-full ${vertical ? "aspect-[9/16] max-w-[220px] mx-auto" : "aspect-video"} rounded-xl overflow-hidden bg-gradient-to-br from-[var(--dark-blue)] via-[#1a1240] to-[var(--dark-blue)]`}
      style={{ boxShadow: pkg ? "0 0 30px rgba(173,233,79,0.18)" : undefined }}
    >
      {/* Animated scanline */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--lime)] to-transparent animate-scanline" />
      </div>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--lime) 1px, transparent 1px), linear-gradient(90deg, var(--lime) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Quality badge */}
      <div className="absolute top-2 left-2 z-10">
        <span className="inline-block px-2 py-0.5 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] text-[10px] font-black tracking-wider">
          {quality}
        </span>
      </div>
      {/* Duration badge */}
      <div className="absolute top-2 right-2 z-10">
        <span className="inline-block px-2 py-0.5 rounded-md bg-black/50 backdrop-blur text-white text-[10px] font-bold">
          {duration}
        </span>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-14 h-14 rounded-full bg-[var(--lime)]/90 flex items-center justify-center transition-transform ${pkg ? "scale-100" : "scale-90 opacity-60"}`}
          style={{ boxShadow: "0 0 25px rgba(173,233,79,0.5)" }}
        >
          <Play size={22} className="text-[var(--dark-blue)] fill-[var(--dark-blue)] ml-0.5" />
        </div>
      </div>

      {/* Bottom info strip */}
      {pkg && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-white text-[10px] font-bold truncate">{pkg.name}</div>
          {style && <div className="text-white/70 text-[9px] truncate">{style}</div>}
        </div>
      )}
    </div>
  );
};

const PhotoGridPreview = ({ pkg }: { pkg: ServicePackage | null }) => {
  const count = derivePhotoCount(pkg);
  const style = deriveStyleLabel(pkg);
  const cells = [
    "from-[#ade94f]/40 to-[#100a2c]/60",
    "from-[#100a2c]/60 to-[#ade94f]/30",
    "from-[#ade94f]/30 to-[#1a1240]/70",
    "from-[#1a1240]/70 to-[#ade94f]/40",
  ];
  return (
    <div
      className="relative w-full aspect-square rounded-xl overflow-hidden bg-[var(--dark-blue)] p-2"
      style={{ boxShadow: pkg ? "0 0 30px rgba(173,233,79,0.18)" : undefined }}
    >
      <div className="absolute top-2 left-2 z-10 max-w-[70%]">
        <span className="inline-block px-2 py-0.5 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] text-[10px] font-black truncate">
          {pkg ? `${pkg.name} — ${count} foto` : "Paket bekleniyor"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1 h-full">
        {cells.map((c, i) => (
          <div
            key={i}
            className={`relative rounded-md bg-gradient-to-br ${c} overflow-hidden`}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <ImageIcon size={20} className="text-white" />
            </div>
          </div>
        ))}
      </div>
      {/* Watermark */}
      <div className="absolute bottom-2 right-2 z-10">
        <span className="text-white/60 text-[9px] font-black tracking-widest">MindID</span>
      </div>
      {/* Style indicator */}
      {pkg && style && (
        <div className="absolute bottom-2 left-2 z-10">
          <span className="inline-block px-1.5 py-0.5 rounded-sm bg-black/50 backdrop-blur text-white text-[9px] font-bold">
            {style}
          </span>
        </div>
      )}
    </div>
  );
};

const PhonePreview = ({ pkg }: { pkg: ServicePackage | null }) => {
  const posts = [
    { likes: "2.4K", comments: "184" },
    { likes: "1.1K", comments: "92" },
    { likes: "5.7K", comments: "421" },
  ];
  return (
    <div
      className="relative mx-auto w-[180px] aspect-[9/19] rounded-3xl bg-[var(--dark-blue)] border-4 border-[#0a0620] overflow-hidden"
      style={{ boxShadow: pkg ? "0 0 30px rgba(173,233,79,0.18)" : undefined }}
    >
      {/* Notch */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />
      {/* Status bar */}
      <div className="px-4 pt-3 pb-1 flex justify-between items-center text-white text-[8px] font-bold relative z-10">
        <span>9:41</span>
        <span className="opacity-70">•••</span>
      </div>
      {/* Feed */}
      <div className="px-2 pt-2 space-y-2 overflow-hidden">
        {posts.map((p, i) => (
          <div
            key={i}
            className="rounded-md bg-gradient-to-br from-[var(--lime)]/20 to-[#1a1240]/80 p-1.5"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-4 h-4 rounded-full bg-[var(--lime)]" />
              <div className="text-white text-[7px] font-bold">mindid_brand</div>
            </div>
            <div className="aspect-square rounded-sm bg-gradient-to-br from-[var(--lime)]/30 to-[var(--dark-blue)] flex items-center justify-center mb-1">
              <ImageIcon size={14} className="text-white/40" />
            </div>
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-0.5 text-[7px]">
                  <Heart size={8} className="fill-white" /> {p.likes}
                </span>
                <span className="flex items-center gap-0.5 text-[7px]">
                  <MessageCircle size={8} /> {p.comments}
                </span>
                <Send size={8} />
              </div>
              <Bookmark size={8} />
            </div>
          </div>
        ))}
      </div>
      {pkg && (
        <div className="absolute bottom-1 left-2 right-2 z-10">
          <div className="px-2 py-1 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] text-[8px] font-black text-center truncate">
            {pkg.name}
          </div>
        </div>
      )}
    </div>
  );
};

// ----- Empty state -----
const EmptyState = ({ serviceId }: { serviceId: string }) => {
  const Icon = SERVICE_ICON[serviceId] ?? Film;
  return (
    <div className="w-full aspect-video rounded-xl border-2 border-dashed border-[var(--electric-blue)]/30 bg-[var(--card)]/40 flex flex-col items-center justify-center gap-2 p-4">
      <Icon size={36} className="text-[var(--gray)]/40" />
      <p className="text-xs text-[var(--gray)] font-bold text-center">
        Henüz paket seçmedin
      </p>
      <p className="text-[10px] text-[var(--gray)]/70 text-center">
        Bir paket seç, anında önizlemeyi gör
      </p>
    </div>
  );
};

// ----- Feature list with stagger -----
const FeatureList = ({ features }: { features: string[] }) => {
  return (
    <ul className="space-y-2">
      {features.map((f, i) => (
        <li
          key={`${f}-${i}`}
          className="flex items-start gap-2 opacity-0 animate-fade-in-up"
          style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
        >
          <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-[var(--lime)]/15 flex items-center justify-center">
            <Check size={11} className="text-[var(--lime)]" strokeWidth={3} />
          </span>
          <span className="text-xs text-[var(--foreground)] leading-snug">{f}</span>
        </li>
      ))}
    </ul>
  );
};

// ----- Main component -----
export const LivePreview = ({
  serviceId,
  selectedPackage,
  selectedAddOns,
  totalAI,
  formatPrice,
}: LivePreviewProps) => {
  const layout = SERVICE_LAYOUT[serviceId] ?? "video-horizontal";
  const animatedTotal = useAnimatedNumber(totalAI);
  const [expanded, setExpanded] = useState(false);
  // re-mount key for fade transition when package switches
  const transitionKey = selectedPackage?.id ?? "empty";

  const features =
    selectedPackage?.features && selectedPackage.features.length > 0
      ? selectedPackage.features
      : selectedPackage
        ? [
            selectedPackage.tagline,
            "Profesyonel post prodüksiyon",
            "Hızlı teslim",
          ].filter(Boolean)
        : [];

  const renderVisual = () => {
    if (!selectedPackage) return <EmptyState serviceId={serviceId} />;
    if (layout === "video-vertical") return <VideoPreview vertical pkg={selectedPackage} />;
    if (layout === "video-horizontal") return <VideoPreview vertical={false} pkg={selectedPackage} />;
    if (layout === "photo-grid") return <PhotoGridPreview pkg={selectedPackage} />;
    if (layout === "phone-feed") return <PhonePreview pkg={selectedPackage} />;
    return <EmptyState serviceId={serviceId} />;
  };

  return (
    <>
      {/* ===== Desktop sticky preview ===== */}
      <div className="hidden lg:block">
        <div className="sticky top-20 space-y-4">
          <div
            className="rounded-2xl bg-[var(--card)] border-3 border-[var(--electric-blue)]/15 p-4 transition-shadow"
            style={{
              boxShadow: selectedPackage
                ? "0 0 24px rgba(173,233,79,0.18), 4px 4px 0 var(--electric-blue)"
                : "4px 4px 0 var(--electric-blue)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--gray)]">
                Canlı Önizleme
              </span>
              {selectedPackage && (
                <span className="text-[10px] font-bold text-[var(--lime)] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] animate-pulse" />
                  CANLI
                </span>
              )}
            </div>

            {/* Visual with fade transition */}
            <div
              key={transitionKey}
              className="animate-fade-in"
            >
              {renderVisual()}
            </div>

            {/* Add-on chips */}
            {selectedAddOns.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {selectedAddOns.map((a) => {
                  const chip = ADDON_CHIP[a.id];
                  const Icon = chip?.icon ?? Sparkles;
                  return (
                    <span
                      key={a.id}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1 bg-[var(--lime)]/15 text-[var(--lime)] text-[10px] font-bold animate-fade-in-up"
                    >
                      <Icon size={10} />
                      {chip?.label ?? a.name}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Total counter */}
            <div className="mt-4 pt-3 border-t border-dashed border-[var(--electric-blue)]/20">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gray)]">
                  Toplam
                </span>
                <span className="text-2xl font-black text-[var(--foreground)] tabular-nums">
                  {totalAI > 0 ? formatPrice(animatedTotal) : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          {selectedPackage && features.length > 0 && (
            <div
              key={`features-${transitionKey}`}
              className="rounded-2xl bg-[var(--card)] border-3 border-[var(--electric-blue)]/15 p-4 shadow-[4px_4px_0_var(--electric-blue)]"
            >
              <h4 className="text-xs font-black uppercase tracking-wider text-[var(--foreground)] mb-3">
                Bu pakette neler var
              </h4>
              <FeatureList features={features} />
            </div>
          )}
        </div>
      </div>

      {/* ===== Mobile collapsible preview ===== */}
      <div className="lg:hidden mb-4 sticky top-2 z-30">
        <div
          className="rounded-2xl bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 overflow-hidden"
          style={{
            boxShadow: selectedPackage
              ? "0 0 18px rgba(173,233,79,0.18), 3px 3px 0 var(--electric-blue)"
              : "3px 3px 0 var(--electric-blue)",
          }}
        >
          <div className="p-3">
            <div className="flex items-center gap-3">
              {/* Mini visual (always visible) */}
              <div className="w-20 flex-shrink-0">
                <div key={transitionKey} className="animate-fade-in">
                  {!selectedPackage ? (
                    <div className="w-full aspect-square rounded-md border-2 border-dashed border-[var(--electric-blue)]/30 bg-[var(--card)]/40 flex items-center justify-center">
                      {(() => {
                        const Icon = SERVICE_ICON[serviceId] ?? Film;
                        return <Icon size={20} className="text-[var(--gray)]/40" />;
                      })()}
                    </div>
                  ) : layout === "phone-feed" ? (
                    <div className="w-full aspect-square rounded-md bg-gradient-to-br from-[var(--lime)]/30 to-[var(--dark-blue)] flex items-center justify-center">
                      <Smartphone size={22} className="text-white" />
                    </div>
                  ) : layout === "photo-grid" ? (
                    <div className="w-full aspect-square rounded-md bg-gradient-to-br from-[var(--lime)]/30 to-[var(--dark-blue)] grid grid-cols-2 gap-0.5 p-0.5">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="rounded-sm bg-white/10" />
                      ))}
                    </div>
                  ) : (
                    <div className="w-full aspect-square rounded-md bg-gradient-to-br from-[var(--dark-blue)] to-[#1a1240] flex items-center justify-center relative">
                      <div className="w-7 h-7 rounded-full bg-[var(--lime)]/90 flex items-center justify-center">
                        <Play size={12} className="text-[var(--dark-blue)] fill-[var(--dark-blue)] ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-black uppercase tracking-widest text-[var(--gray)]">
                  Canlı Önizleme
                </div>
                <div className="text-sm font-black text-[var(--foreground)] truncate">
                  {selectedPackage ? selectedPackage.name : "Henüz paket seçmedin"}
                </div>
                <div className="text-lg font-black text-[var(--foreground)] tabular-nums">
                  {totalAI > 0 ? formatPrice(animatedTotal) : "—"}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--lime)]/15 text-[var(--lime)] flex items-center justify-center"
                aria-label={expanded ? "Daralt" : "Genişlet"}
              >
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {expanded && (
              <div className="mt-3 pt-3 border-t border-dashed border-[var(--electric-blue)]/20 animate-fade-in-up">
                {/* Larger visual */}
                <div key={`m-${transitionKey}`} className="animate-fade-in mb-3">
                  {renderVisual()}
                </div>

                {/* Add-on chips */}
                {selectedAddOns.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedAddOns.map((a) => {
                      const chip = ADDON_CHIP[a.id];
                      const Icon = chip?.icon ?? Sparkles;
                      return (
                        <span
                          key={a.id}
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 bg-[var(--lime)]/15 text-[var(--lime)] text-[10px] font-bold"
                        >
                          <Icon size={10} />
                          {chip?.label ?? a.name}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Features */}
                {selectedPackage && features.length > 0 && (
                  <>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-[var(--foreground)] mb-2">
                      Bu pakette neler var
                    </h4>
                    <FeatureList features={features} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
