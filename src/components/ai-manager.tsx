"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { Bot, X, Video, Camera, Megaphone, BadgeDollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  { icon: Video, labelTr: "AI Video istiyorum", labelEn: "I want AI Video", descTr: "Kısa video, reklam filmi ve sosyal medya reels paketlerimizi inceleyin.", descEn: "Explore our short video, ad film and social media reels packages.", href: "/configure/reels" },
  { icon: Camera, labelTr: "Ürün Görseli istiyorum", labelEn: "I want Product Photos", descTr: "E-ticaret ve katalog için profesyonel AI ürün görselleri.", descEn: "Professional AI product visuals for e-commerce and catalogs.", href: "/configure/product-photo" },
  { icon: Megaphone, labelTr: "Sosyal Medya Yönetimi", labelEn: "Social Media Management", descTr: "Sosyal medya hesaplarınızı AI destekli uzman ekibimizle yönetelim.", descEn: "Let our AI-powered expert team manage your social media accounts.", href: "/sosyal-medya-yonetimi" },
  { icon: BadgeDollarSign, labelTr: "Fiyatları görmek istiyorum", labelEn: "I want to see prices", descTr: "Tüm hizmetlerimizin fiyatlarını karşılaştırın.", descEn: "Compare prices for all our services.", href: "/#services" },
] as const;

export const AIManager = () => {
  const { lang } = useI18n();
  const isTr = lang === "tr";
  const [open, setOpen] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const show = setTimeout(() => setTooltip(true), 3000);
    const hide = setTimeout(() => setTooltip(false), 8000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" style={{ willChange: "transform" }}>
      {/* Chat Panel */}
      <div
        className={`overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200 transition-all duration-300 ease-out origin-bottom-right ${open ? "max-h-[480px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95 pointer-events-none"}`}
        style={{ width: 320, willChange: "transform, opacity" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--electric-blue)]">
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-white" />
            <span className="text-sm font-bold text-white">MindID Asistan</span>
          </div>
          <button onClick={toggle} className="text-white/80 hover:text-white cursor-pointer" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 max-h-[400px] overflow-y-auto">
          {selected === null ? (
            <>
              <p className="text-sm text-gray-700 mb-4">
                {isTr ? "Merhaba! Size nasıl yardımcı olabilirim?" : "Hello! How can I help you?"}
              </p>
              <div className="flex flex-col gap-2">
                {SERVICES.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left bg-gray-50 hover:bg-[var(--electric-blue)]/10 border border-gray-100 hover:border-[var(--electric-blue)]/30 transition-colors duration-150 cursor-pointer"
                  >
                    <s.icon size={18} className="text-[var(--electric-blue)] shrink-0" />
                    <span className="text-sm font-medium text-gray-800">{isTr ? s.labelTr : s.labelEn}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <button onClick={() => setSelected(null)} className="text-xs text-[var(--electric-blue)] hover:underline self-start cursor-pointer">
                {isTr ? "← Geri dön" : "← Go back"}
              </button>
              <div className="flex items-center gap-2 mb-1">
                {(() => { const Icon = SERVICES[selected].icon; return <Icon size={20} className="text-[var(--electric-blue)]" />; })()}
                <h3 className="text-sm font-bold text-gray-900">{isTr ? SERVICES[selected].labelTr : SERVICES[selected].labelEn}</h3>
              </div>
              <p className="text-sm text-gray-600">{isTr ? SERVICES[selected].descTr : SERVICES[selected].descEn}</p>
              <Link
                href={SERVICES[selected].href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 mt-1 px-4 py-2.5 rounded-xl bg-[var(--electric-blue)] text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-150"
              >
                {isTr ? "İncele" : "Explore"} <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Tooltip */}
      <div
        className={`bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 text-xs font-medium text-gray-700 transition-all duration-300 ${tooltip && !open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
      >
        {isTr ? "Yardıma mı ihtiyacınız var?" : "Need help?"}
      </div>

      {/* Floating Button */}
      <button
        onClick={toggle}
        className="w-14 h-14 rounded-full bg-[var(--electric-blue)] shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150"
        style={{ willChange: "transform" }}
        aria-label={isTr ? "Asistanı aç" : "Open assistant"}
      >
        {open ? <X size={24} className="text-white" /> : <Bot size={24} className="text-white" />}
      </button>
    </div>
  );
};
