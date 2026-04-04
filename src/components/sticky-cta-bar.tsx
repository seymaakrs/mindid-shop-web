"use client";

import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";

export const StickyCTABar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // 8 saniye sonra göster
    const timer = setTimeout(() => setVisible(true), 8_000);

    // Scroll ile de tetikle: %30 aşınca
    const handleScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled > 0.3) setVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9980] md:hidden">
      <div className="bg-[var(--dark-blue)] border-t-2 border-[var(--lime)] px-4 py-3 flex items-center gap-3">
        {/* Sol: mesaj */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white leading-tight truncate">
            AI ile <span className="text-[var(--lime)]">%70'e varan</span> tasarruf
          </p>
          <p className="text-[10px] text-white/60 leading-tight">
            Ücretsiz teklif · 24 saat içinde dönüş
          </p>
        </div>

        {/* CTA butonu */}
        <a
          href="#services"
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[var(--lime)] border-2 border-[var(--lime)] text-[var(--dark-blue)] text-xs font-black"
        >
          Paketi Seç
          <ArrowRight size={12} />
        </a>

        {/* Kapat */}
        <button
          onClick={() => { setDismissed(true); setVisible(false); }}
          className="flex-shrink-0 text-white/40 hover:text-white transition-colors cursor-pointer p-1"
          aria-label="Kapat"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
