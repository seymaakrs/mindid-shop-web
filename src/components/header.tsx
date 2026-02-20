"use client";

import { Clapperboard, Globe, Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";

export const Header = () => {
  const { lang, toggleLang, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-3 border-[var(--dark-blue)] bg-[var(--lime)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-md bg-[var(--dark-blue)]">
            <Clapperboard size={18} className="text-[var(--lime)]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--dark-blue)]" style={{ fontFamily: "Syne, sans-serif" }}>
            Mind<span className="text-[var(--electric-blue)]">ID</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <a href="#services" className="text-sm font-semibold text-[var(--dark-blue)] hover:text-[var(--electric-blue)] transition-colors">
            {t("nav.services")}
          </a>
          <a href="/portfolio" className="text-sm font-semibold text-[var(--dark-blue)] hover:text-[var(--electric-blue)] transition-colors">
            {t("nav.portfolio")}
          </a>
          <a href="/avatar" className="text-sm font-semibold text-[var(--dark-blue)] hover:text-[var(--electric-blue)] transition-colors">
            {t("nav.avatar")}
          </a>
          <a href="#faq" className="text-sm font-semibold text-[var(--dark-blue)] hover:text-[var(--electric-blue)] transition-colors">
            {t("nav.faq")}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border-2 border-[var(--dark-blue)] bg-white/50 text-[var(--dark-blue)] text-sm font-bold hover:bg-white transition-colors cursor-pointer"
          >
            <Globe size={14} />
            {lang === "tr" ? "EN" : "TR"}
          </button>

          {/* CTA */}
          <a
            href="#services"
            className="hidden sm:inline-flex px-4 py-2 rounded-md bg-[var(--dark-blue)] text-[var(--lime)] text-sm font-bold border-2 border-[var(--dark-blue)] hover:bg-[var(--electric-blue)] transition-colors"
          >
            {t("nav.start")}
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[var(--dark-blue)] cursor-pointer"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t-2 border-[var(--dark-blue)] bg-[var(--lime)] px-4 py-4 space-y-3">
          <a href="#services" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[var(--dark-blue)]">{t("nav.services")}</a>
          <a href="/portfolio" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[var(--dark-blue)]">{t("nav.portfolio")}</a>
          <a href="/avatar" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[var(--dark-blue)]">{t("nav.avatar")}</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[var(--dark-blue)]">{t("nav.faq")}</a>
          <a href="#services" onClick={() => setMobileOpen(false)} className="block px-4 py-2 rounded-md bg-[var(--dark-blue)] text-[var(--lime)] text-sm font-bold text-center">{t("nav.start")}</a>
        </div>
      )}
    </header>
  );
};
