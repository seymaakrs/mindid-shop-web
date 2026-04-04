"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, TrendingUp, Star } from "lucide-react";

type ToastData = {
  icon: React.ElementType;
  text: string;
  sub: string;
  color: string;
};

const TOASTS: ToastData[] = [
  { icon: Users, text: "Mehmet K. AI Reklam Filmi paketini inceledi", sub: "3 dakika önce", color: "var(--lime)" },
  { icon: TrendingUp, text: "Bu hafta 12 yeni proje teklifi alındı", sub: "Son 7 gün", color: "var(--electric-blue)" },
  { icon: Star, text: "Ayşe T. Ürün Görseli paketini seçti", sub: "8 dakika önce", color: "var(--lime)" },
  { icon: Users, text: "Bir e-ticaret markası AI Avatar hizmetini inceledi", sub: "Az önce", color: "var(--electric-blue)" },
  { icon: TrendingUp, text: "Bu ay 47 marka AI prodüksiyon tercih etti", sub: "Nisan 2026", color: "var(--lime)" },
  { icon: Star, text: "Burak D. Sosyal Medya paketini talep etti", sub: "15 dakika önce", color: "var(--electric-blue)" },
  { icon: Users, text: "İstanbul'dan bir kozmetik markası teklif aldı", sub: "22 dakika önce", color: "var(--lime)" },
  { icon: TrendingUp, text: "Geleneksel prodüksiyona göre ortalama %68 tasarruf", sub: "MindID müşterileri", color: "var(--electric-blue)" },
];

export const SocialProofToast = () => {
  const [current, setCurrent] = useState<ToastData | null>(null);
  const [visible, setVisible] = useState(false);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  const showNext = useCallback(() => {
    setUsedIndices((prev) => {
      const remaining = TOASTS.map((_, i) => i).filter((i) => !prev.includes(i));
      const pool = remaining.length > 0 ? remaining : TOASTS.map((_, i) => i);
      const idx = pool[Math.floor(Math.random() * pool.length)];
      const next = prev.length >= TOASTS.length - 1 ? [idx] : [...prev, idx];

      setCurrent(TOASTS[idx]);
      setVisible(true);

      // 4 saniye sonra gizle
      setTimeout(() => setVisible(false), 4_000);

      return next;
    });
  }, []);

  useEffect(() => {
    // İlk gösterim: 25 saniye sonra
    const first = setTimeout(showNext, 25_000);

    // Sonraki: her 35-55 sn arası rastgele
    let interval: ReturnType<typeof setInterval>;
    const startInterval = setTimeout(() => {
      interval = setInterval(showNext, 35_000 + Math.random() * 20_000);
    }, 30_000);

    return () => {
      clearTimeout(first);
      clearTimeout(startInterval);
      clearInterval(interval);
    };
  }, [showNext]);

  if (!current) return null;

  const Icon = current.icon;

  return (
    <div
      className={`fixed bottom-20 left-4 z-[9990] max-w-xs transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="bg-white rounded-lg border-2 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] p-3 flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: current.color }}
        >
          <Icon size={14} className="text-[var(--dark-blue)]" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-[var(--dark-blue)] leading-snug">{current.text}</p>
          <p className="text-[10px] text-[var(--gray)] mt-0.5">{current.sub}</p>
        </div>
      </div>
    </div>
  );
};
