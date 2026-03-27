"use client";

import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const navLinks = [
    { href: "#services", label: t("nav.videoProduction") },
    { href: "#services", label: t("nav.visualStudio") },
    { href: "/portfolio", label: t("nav.gallery") },
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
            src="/yuvarlak_-06.jpg"
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

        {/* Right side: Sosyal Medya Uzmanı + Hamburger */}
        <div className="flex items-center gap-3">
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
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — slide down animation */}
      <div
        className={`xl:hidden border-t-2 border-[var(--dark-blue)] bg-[var(--lime)] overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              className="block text-sm font-bold text-[var(--dark-blue)] py-1 hover:text-[var(--electric-blue)] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t-2 border-[var(--dark-blue)]/20">
            <a
              href="/about"
              onClick={closeMobile}
              className="block w-full text-center px-5 py-2.5 rounded-md bg-[var(--dark-blue)] text-[var(--lime)] text-sm font-bold"
            >
              {t("nav.socialMediaExpert")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
