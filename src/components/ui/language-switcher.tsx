"use client";

import { Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useI18n, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "tr", flag: "🇹🇷", label: "TR" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
];

export const LanguageSwitcher = () => {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div ref={ref} className="fixed bottom-6 left-6 z-50">
      {/* Seçenek listesi — yukarı açılır */}
      {open && (
        <div className="absolute bottom-12 left-0 flex flex-col gap-1 mb-1">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold shadow-md transition-all cursor-pointer whitespace-nowrap ${
                lang === l.code
                  ? "bg-[var(--lime)] text-[var(--dark-blue)]"
                  : "bg-[var(--dark-blue)] text-[var(--lime)] hover:bg-[var(--dark-blue)]/80"
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Ana buton — sadece ikon */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Dil seç"
        aria-expanded={open}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--dark-blue)] text-[var(--lime)] shadow-lg hover:scale-105 transition-transform cursor-pointer"
      >
        <span className="text-base leading-none">{current.flag}</span>
      </button>
    </div>
  );
};
