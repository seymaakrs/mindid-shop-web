"use client";

import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const navLinks = [
    { href: "/ai-reklam-filmi", label: t("nav.videoProduction") },
    { href: "/ai-gorsel", label: t("nav.visualStudio") },
    { href: "/portfolio", label: t("nav.portfolio") },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 border-b border-[var(--dark-blue)]/20 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
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
            src="/logo.png"
            alt="MindID Ana Sayfa"
            width={56}
            height={56}
            className={`rounded-full transition-all duration-300 ${scrolled ? "h-10 w-10" : "h-14 w-14"}`}
            priority
          />
          <div className="flex flex-col">
            <span className="text-lg font-black text-[var(--dark-blue)] leading-tight tracking-tight">
              MindID
            </span>
            <span className="text-xs font-semibold text-[var(--dark-blue)]/50 leading-tight">
              Your Creative Mind
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5" aria-label="Ana navigasyon">
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

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="/sosyal-medya-yonetimi"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[var(--dark-blue)] text-[var(--lime)] text-sm font-bold border-2 border-[var(--dark-blue)] hover:bg-[var(--electric-blue)] transition-colors whitespace-nowrap"
          >
            {t("nav.socialMediaExpert")}
          </a>

          <button
            ref={toggleRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[var(--dark-blue)] cursor-pointer"
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="navigation"
        aria-label="Mobil navigasyon"
        className={`lg:hidden border-t border-[var(--dark-blue)]/20 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
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
              href="/sosyal-medya-yonetimi"
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
