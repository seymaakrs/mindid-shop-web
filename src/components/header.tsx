"use client";

import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const LANG_OPTIONS: { code: Lang; label: string; flag: string }[] = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export const Header = () => {
  const { lang, setLang, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dil dropdown dışına tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANG_OPTIONS.find((l) => l.code === lang) ?? LANG_OPTIONS[0];

  const navLinks = [
    { href: "#services", label: t("nav.videoProduction") },
    { href: "#services", label: t("nav.visualStudio") },
    { href: "/portfolio", label: t("nav.gallery") },
    { href: "/how-it-works", label: t("nav.howItWorks") },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b-3 border-[var(--dark-blue)] bg-[var(--lime)] leopard-pattern-dark transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/favicon.jpg"
            alt="MindID"
            width={44}
            height={44}
            className={`rounded-full transition-all duration-300 ${scrolled ? "h-9 w-9" : "h-11 w-11"}`}
            priority
          />
          <div className="flex flex-col">
            <span className="text-base font-black text-[var(--dark-blue)] leading-tight tracking-tight">
              MindID
            </span>
            <span className="text-[10px] font-semibold text-[var(--dark-blue)]/60 leading-tight">
              Your Creative Mind
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-bold text-[var(--dark-blue)] hover:text-[var(--electric-blue)] transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: Language Selector + Sosyal Medya Uzmanı */}
        <div className="flex items-center gap-3">
          {/* Professional Language Dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border-2 border-[var(--dark-blue)] bg-white/60 text-[var(--dark-blue)] text-sm font-bold hover:bg-white transition-colors cursor-pointer"
            >
              <Globe size={14} />
              <span className="hidden sm:inline">{currentLang.flag}</span>
              <span className="text-xs">{lang.toUpperCase()}</span>
              <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 rounded-lg border-2 border-[var(--dark-blue)] bg-white shadow-[4px_4px_0px_var(--dark-blue)] overflow-hidden z-50">
                {LANG_OPTIONS.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => {
                      setLang(option.code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                      lang === option.code
                        ? "bg-[var(--lime)]/30 text-[var(--dark-blue)]"
                        : "text-[var(--dark-blue)]/70 hover:bg-[var(--lime)]/10"
                    }`}
                  >
                    <span className="text-base">{option.flag}</span>
                    <span>{option.label}</span>
                    {lang === option.code && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-[var(--lime)]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sosyal Medya Uzmanı — CTA yerine nav link */}
          <a
            href="/about"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[var(--dark-blue)] text-[var(--lime)] text-sm font-bold border-2 border-[var(--dark-blue)] hover:bg-[var(--electric-blue)] transition-colors whitespace-nowrap"
          >
            {t("nav.socialMediaExpert")}
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-[var(--dark-blue)] cursor-pointer"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t-2 border-[var(--dark-blue)] bg-[var(--lime)] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-bold text-[var(--dark-blue)]"
            >
              {link.label}
            </a>
          ))}

          {/* Mobilde dil seçimi */}
          <div className="pt-3 border-t-2 border-[var(--dark-blue)]/20">
            <div className="flex gap-2 mb-3">
              {LANG_OPTIONS.map((option) => (
                <button
                  key={option.code}
                  onClick={() => {
                    setLang(option.code);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border-2 text-xs font-bold transition-colors cursor-pointer ${
                    lang === option.code
                      ? "border-[var(--dark-blue)] bg-[var(--dark-blue)] text-[var(--lime)]"
                      : "border-[var(--dark-blue)]/30 bg-white/50 text-[var(--dark-blue)]"
                  }`}
                >
                  <span>{option.flag}</span>
                  <span>{option.code.toUpperCase()}</span>
                </button>
              ))}
            </div>

            <a
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-5 py-2.5 rounded-md bg-[var(--dark-blue)] text-[var(--lime)] text-sm font-bold"
            >
              {t("nav.socialMediaExpert")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
