"use client";

import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight, Percent, Video, Camera, Megaphone, Bot } from "lucide-react";

type CrossSellItem = {
  icon: typeof Video;
  name: { tr: string; en: string };
  desc: { tr: string; en: string };
  href: string;
  startPrice: number;
  discount: number; // yüzde indirim
};

// Video servisi alana → Görsel + Sosyal Medya öner
const VIDEO_CROSS: CrossSellItem[] = [
  {
    icon: Camera,
    name: { tr: "AI Ürün Görseli", en: "AI Product Photos" },
    desc: { tr: "Video + görsel birlikte alana özel indirim", en: "Special discount when bundled with video" },
    href: "/configure/product-photo",
    startPrice: 1490,
    discount: 15,
  },
  {
    icon: Megaphone,
    name: { tr: "Sosyal Medya Yönetimi", en: "Social Media Management" },
    desc: { tr: "Videolarınızı yayınlayacak bir ekip", en: "A team to publish your videos" },
    href: "/sosyal-medya-yonetimi",
    startPrice: 4900,
    discount: 10,
  },
];

// Görsel servisi alana → Video + Sosyal Medya öner
const PHOTO_CROSS: CrossSellItem[] = [
  {
    icon: Video,
    name: { tr: "AI Reklam Filmi", en: "AI Ad Film" },
    desc: { tr: "Ürünlerinizi videoya da taşıyın", en: "Bring your products to video too" },
    href: "/configure/reels",
    startPrice: 1990,
    discount: 15,
  },
  {
    icon: Megaphone,
    name: { tr: "Sosyal Medya Yönetimi", en: "Social Media Management" },
    desc: { tr: "Görselleri yayınlayacak profesyonel ekip", en: "Professional team to publish your visuals" },
    href: "/sosyal-medya-yonetimi",
    startPrice: 4900,
    discount: 10,
  },
];

// Sosyal medya alana → Video + Görsel öner
const SOCIAL_CROSS: CrossSellItem[] = [
  {
    icon: Video,
    name: { tr: "AI Reklam Filmi", en: "AI Ad Film" },
    desc: { tr: "Sosyal medya içerikleriniz için profesyonel video", en: "Professional video for your social media content" },
    href: "/configure/reels",
    startPrice: 1990,
    discount: 20,
  },
  {
    icon: Camera,
    name: { tr: "AI Ürün Görseli", en: "AI Product Photos" },
    desc: { tr: "Feed'iniz için yüksek kalite ürün görselleri", en: "High quality product visuals for your feed" },
    href: "/configure/product-photo",
    startPrice: 1490,
    discount: 15,
  },
  {
    icon: Bot,
    name: { tr: "AI Avatar", en: "AI Avatar" },
    desc: { tr: "Dijital sunucu ile içeriklere yüz ekleyin", en: "Add a face to your content with a digital presenter" },
    href: "/avatar",
    startPrice: 6900,
    discount: 10,
  },
];

const CROSS_SELL_MAP: Record<string, CrossSellItem[]> = {
  reels: VIDEO_CROSS,
  product: VIDEO_CROSS,
  campaign: VIDEO_CROSS,
  corporate: VIDEO_CROSS,
  "product-photo": PHOTO_CROSS,
  "social-media": SOCIAL_CROSS,
  avatar: SOCIAL_CROSS,
};

type Props = {
  serviceId: string;
};

export const CrossSell = ({ serviceId }: Props) => {
  const { lang, formatPrice } = useI18n();
  const isTr = lang === "tr";
  const items = CROSS_SELL_MAP[serviceId] ?? [];

  if (items.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Percent size={14} className="text-[var(--lime)]" />
        <h3 className="text-sm font-black text-[var(--foreground)]">
          {isTr ? "Birlikte Alana Özel İndirim" : "Bundle Discount"}
        </h3>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const discountedPrice = Math.round(item.startPrice * (1 - item.discount / 100));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-lg border border-[var(--lime)]/20 bg-[var(--lime)]/5 hover:border-[var(--lime)]/50 hover:bg-[var(--lime)]/10 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--lime)]/20 flex items-center justify-center shrink-0">
                <item.icon size={16} className="text-[var(--dark-blue)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--foreground)] truncate">
                    {isTr ? item.name.tr : item.name.en}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--lime)] text-[var(--dark-blue)] shrink-0">
                    %{item.discount} İNDİRİM
                  </span>
                </div>
                <p className="text-[10px] text-[var(--gray)] truncate">
                  {isTr ? item.desc.tr : item.desc.en}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-[var(--gray)] line-through">{formatPrice(item.startPrice)}</span>
                  <span className="text-xs font-bold text-[var(--foreground)]">{formatPrice(discountedPrice)}'den</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-[var(--gray)] group-hover:text-[var(--foreground)] transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
