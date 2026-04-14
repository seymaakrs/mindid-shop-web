"use client";

import { useI18n } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 border-t-3 border-[var(--lime)] bg-[var(--dark-blue)] leopard-pattern py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Hizmetler */}
          <div>
            <h3 className="text-sm font-black text-[var(--lime)] mb-4">
              {t("footer.services")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-reklam-filmi" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.aiReels")}
                </Link>
              </li>
              <li>
                <Link href="/ai-gorsel" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.aiProductPhoto")}
                </Link>
              </li>
              <li>
                <Link href="/configure/product" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.aiProductAd")}
                </Link>
              </li>
              <li>
                <Link href="/configure/campaign" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.aiCampaign")}
                </Link>
              </li>
              <li>
                <Link href="/configure/corporate" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.aiCorporate")}
                </Link>
              </li>
              <li>
                <Link href="/avatar" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.aiAvatar")}
                </Link>
              </li>
              <li>
                <Link href="/sosyal-medya-yonetimi" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  Sosyal Medya Yönetimi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kaynaklar */}
          <div>
            <h3 className="text-sm font-black text-[var(--lime)] mb-4">
              {t("footer.resources")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-vs-traditional" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.aiVsTraditional")}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/e-commerce" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.ecommerce")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.portfolio")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h3 className="text-sm font-black text-[var(--lime)] mb-4">
              {t("footer.company")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.aboutMindid")}
                </Link>
              </li>
              <li>
                <a href="/#faq" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.faq")}
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {t("footer.testimonials")}
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-sm font-black text-[var(--lime)] mb-4">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@mindid.shop" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  info@mindid.shop
                </a>
              </li>
              <li>
                <a href="tel:+905419315550" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  +90 541 931 55 50
                </a>
              </li>
              <li className="text-xs text-[var(--cream)]/40">
                İstanbul, Türkiye
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--electric-blue)]/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="slowdays"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-black text-[var(--lime)] leading-tight">
                slowdays
              </span>
              <span className="text-[9px] font-semibold text-[var(--cream)]/40 leading-tight uppercase tracking-wider">
                Your Creative Mind
              </span>
            </div>
          </div>

          {/* Sosyal medya ikonları */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/mindid.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--cream)]/40 hover:text-[var(--lime)] transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a
              href="tel:+905419315550"
              className="text-[var(--cream)]/40 hover:text-[var(--lime)] transition-colors"
              aria-label="Phone"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a
              href="mailto:info@mindid.shop"
              className="text-[var(--cream)]/40 hover:text-[var(--lime)] transition-colors"
              aria-label="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>

          {/* Yasal linkler + telif */}
          <div className="flex items-center gap-3 text-xs text-[var(--gray)]">
            <span>&copy; {new Date().getFullYear()} slowdays. {t("footer.rights")}</span>
            <span className="text-[var(--cream)]/20">|</span>
            <Link href="/kvkk" className="hover:text-[var(--lime)] transition-colors">KVKK</Link>
            <Link href="/gizlilik" className="hover:text-[var(--lime)] transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/kullanim-kosullari" className="hover:text-[var(--lime)] transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
