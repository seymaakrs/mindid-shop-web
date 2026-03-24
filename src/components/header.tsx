"use client";

import { Globe, Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect } from "react";
import Image from "next/image";

export const Header = () => {
  const { lang, toggleLang, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            src="/leopard-icon.png"
            alt="MindID"
            width={44}
            height={44}
            className={`transition-all duration-300 ${scrolled ? "h-9 w-9" : "h-11 w-11"}`}
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
        <nav className="hidden lg:flex items-center gap-6">
          <a
            href="#services"
            className="text-sm font-bold text-[var(--dark-blue)] hover:text-[var(--electric-blue)] transition-colors"
          >
            {t("nav.services")}
          </a>
          <a
            href="/portfolio"
            className="text-sm font-bold text-[var(--dark-blue)] hover:text-[var(--electric-blue)] transition-colors"
          >
            {t("nav.portfolio")}
          </a>
          <a
            href="/how-it-works"
            className="text-sm font-bold text-[var(--dark-blue)] hover:text-[var(--electric-blue)] transition-colors"
          >
            {lang === "en" ? "How It Works" : "Nasıl Çalışır?"}
          </a>
          <a
            href="/blog"
            className="text-sm font-bold text-[var(--dark-blue)] hover:text-[var(--electric-blue)] transition-colors"
          >
            Blog
          </a>
          <a
            href="/about"
            className="text-sm font-bold text-[var(--dark-blue)] hover:text-[var(--electric-blue)] transition-colors"
          >
            {t("nav.about")}
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border-2 border-[var(--dark-blue)] bg-white/50 text-[var(--dark-blue)] text-sm font-bold hover:bg-white transition-colors cursor-pointer"
          >
            <Globe size={14} />
            {lang === "tr" ? "EN" : "TR"}
          </button>

          <a
            href="#services"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[var(--dark-blue)] text-[var(--lime)] text-sm font-bold border-2 border-[var(--dark-blue)] hover:bg-[var(--electric-blue)] transition-colors"
          >
            {lang === "en" ? "Get a Quote" : "Teklif Al"}
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[var(--dark-blue)] cursor-pointer"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t-2 border-[var(--dark-blue)] bg-[var(--lime)] px-4 py-4 space-y-3">
          <a href="#services" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[var(--dark-blue)]">
            {t("nav.services")}
          </a>
          <a href="/portfolio" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[var(--dark-blue)]">
            {t("nav.portfolio")}
          </a>
          <a href="/how-it-works" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[var(--dark-blue)]">
            {lang === "en" ? "How It Works" : "Nasıl Çalışır?"}
          </a>
          <a href="/blog" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[var(--dark-blue)]">
            Blog
          </a>
          <a href="/about" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[var(--dark-blue)]">
            {t("nav.about")}
          </a>
          <div className="pt-3 border-t-2 border-[var(--dark-blue)]/20">
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-5 py-2.5 rounded-md bg-[var(--dark-blue)] text-[var(--lime)] text-sm font-bold"
            >
              {lang === "en" ? "Get a Quote" : "Teklif Al"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
