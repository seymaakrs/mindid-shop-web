"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { Bot, X, Video, Camera, Megaphone, BadgeDollarSign, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  { icon: Video, labelTr: "AI Video", labelEn: "AI Video", descTr: "Kısa video, reklam filmi ve sosyal medya reels paketlerimizi inceleyin.", descEn: "Explore our short video, ad film and social media reels packages.", href: "/configure/reels" },
  { icon: Camera, labelTr: "Ürün Görseli", labelEn: "Product Photos", descTr: "E-ticaret ve katalog için profesyonel AI ürün görselleri.", descEn: "Professional AI product visuals for e-commerce and catalogs.", href: "/configure/product-photo" },
  { icon: Megaphone, labelTr: "Sosyal Medya", labelEn: "Social Media", descTr: "Sosyal medya hesaplarınızı AI destekli uzman ekibimizle yönetelim.", descEn: "Let our AI-powered expert team manage your social media accounts.", href: "/sosyal-medya-yonetimi" },
  { icon: BadgeDollarSign, labelTr: "Fiyatları Gör", labelEn: "See Prices", descTr: "", descEn: "", href: "/#services" },
] as const;

export const AIManager = () => {
  const { lang } = useI18n();
  const isTr = lang === "tr";
  const [open, setOpen] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  // Tooltip sadece kullanıcı biraz scroll yaptıktan sonra göster (rahatsız etme)
  useEffect(() => {
    let shown = false;
    const onScroll = () => {
      if (shown || open) return;
      if (window.scrollY > 600) {
        shown = true;
        setTooltip(true);
        setTimeout(() => setTooltip(false), 4000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const toggle = useCallback(() => {
    setOpen((p) => !p);
    setTooltip(false);
    setSelected(null);
  }, []);

  const handleSelect = (i: number) => {
    if (SERVICES[i].href.startsWith("/#")) {
      setOpen(false);
      document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
    } else {
      setSelected(i);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2" style={{ willChange: "transform" }}>
      {/* Chat Panel */}
      <div
        className={`overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200 transition-all duration-300 ease-out origin-bottom-right ${open ? "max-h-[480px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95 pointer-events-none"}`}
        style={{ width: 300, willChange: "transform, opacity" }}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--dark-blue)]">
          <div className="flex items-center gap-2">
            <Bot size={18} className="text-[var(--lime)]" />
            <span className="text-sm font-bold text-[var(--lime)]">MindID Asistan</span>
          </div>
          <button onClick={toggle} className="text-white/60 hover:text-white cursor-pointer" aria-label="Kapat">
            <X size={16} />
          </button>
        </div>

        <div className="p-4">
          {selected === null ? (
            <>
              <p className="text-sm text-gray-600 mb-3">
                {isTr ? "Size nasıl yardımcı olabilirim?" : "How can I help you?"}
              </p>
              <div className="flex flex-col gap-1.5">
                {SERVICES.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  >
                    <s.icon size={16} className="text-[var(--electric-blue)] shrink-0" />
                    <span className="text-sm text-gray-700">{isTr ? s.labelTr : s.labelEn}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <button onClick={() => setSelected(null)} className="text-xs text-[var(--electric-blue)] hover:underline self-start cursor-pointer">
                ← {isTr ? "Geri" : "Back"}
              </button>
              <p className="text-sm text-gray-600">{isTr ? SERVICES[selected].descTr : SERVICES[selected].descEn}</p>
              <Link
                href={SERVICES[selected].href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--dark-blue)] text-[var(--lime)] text-sm font-bold hover:opacity-90 transition-opacity"
              >
                {isTr ? "İncele" : "Explore"} <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Tooltip — sadece scroll sonrası, sessizce */}
      {tooltip && !open && (
        <div className="bg-white px-3 py-1.5 rounded-full shadow-md border border-gray-100 text-xs text-gray-500 animate-fade-in">
          {isTr ? "Yardıma mı ihtiyacınız var?" : "Need help?"}
        </div>
      )}

      {/* Floating Button — küçük ve zarif */}
      <button
        onClick={toggle}
        className="w-12 h-12 rounded-full bg-[var(--dark-blue)] shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150"
        style={{ willChange: "transform" }}
        aria-label={isTr ? "Asistanı aç" : "Open assistant"}
      >
        {open ? <X size={20} className="text-[var(--lime)]" /> : <HelpCircle size={20} className="text-[var(--lime)]" />}
      </button>
    </div>
  );
};
