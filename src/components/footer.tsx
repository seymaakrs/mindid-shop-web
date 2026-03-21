"use client";

import { useI18n } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const { t, lang } = useI18n();

  return (
    <footer className="relative z-10 border-t-3 border-[var(--lime)] bg-[var(--dark-blue)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Hizmetler */}
          <div>
            <h4 className="text-sm font-black text-[var(--lime)] mb-4">
              {lang === "en" ? "Services" : "Hizmetler"}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/configure/reels" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "AI Instagram Reels" : "AI Instagram Reels"}
                </Link>
              </li>
              <li>
                <Link href="/configure/product-photo" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "AI Product Photography" : "AI Ürün Görseli"}
                </Link>
              </li>
              <li>
                <Link href="/configure/product" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "AI Product Ad Film" : "AI Ürün Reklam Filmi"}
                </Link>
              </li>
              <li>
                <Link href="/configure/campaign" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "AI Campaign Film" : "AI Kampanya Filmi"}
                </Link>
              </li>
              <li>
                <Link href="/configure/corporate" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "AI Corporate Film" : "AI Kurumsal Tanıtım"}
                </Link>
              </li>
              <li>
                <Link href="/avatar" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "AI Avatar Creation" : "AI Avatar Oluşturma"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kaynaklar */}
          <div>
            <h4 className="text-sm font-black text-[var(--lime)] mb-4">
              {lang === "en" ? "Resources" : "Kaynaklar"}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-vs-traditional" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "AI vs Traditional" : "AI vs Geleneksel"}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "How It Works" : "Nasıl Çalışır?"}
                </Link>
              </li>
              <li>
                <Link href="/e-commerce" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "E-commerce Solutions" : "E-ticaret Çözümleri"}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "Portfolio" : "Portfolyo"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h4 className="text-sm font-black text-[var(--lime)] mb-4">
              {lang === "en" ? "Company" : "Şirket"}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "About MindID" : "MindID Hakkında"}
                </Link>
              </li>
              <li>
                <a href="/#faq" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "FAQ" : "SSS"}
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  {lang === "en" ? "Testimonials" : "Müşteri Yorumları"}
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-sm font-black text-[var(--lime)] mb-4">
              {lang === "en" ? "Contact" : "İletişim"}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:seymaakrs@gmail.com" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  seymaakrs@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/905000000000" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  WhatsApp
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
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="MindID -Lab Technology"
              width={120}
              height={40}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-xs text-[var(--gray)]">
            &copy; {new Date().getFullYear()} MindID -Lab Technology. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
