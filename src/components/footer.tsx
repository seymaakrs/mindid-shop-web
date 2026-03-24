"use client";

import { useI18n } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const { t, lang } = useI18n();

  return (
    <footer className="relative z-10 border-t-3 border-[var(--lime)] bg-[var(--dark-blue)] leopard-pattern py-12">
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
                <a href="mailto:seyma@mindid.shop" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
                  seyma@mindid.shop
                </a>
              </li>
              <li>
                <a href="https://wa.me/905419315550" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--cream)]/60 hover:text-[var(--lime)] transition-colors">
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
          <div className="flex items-center gap-3">
            <Image
              src="/favicon.png"
              alt="MindID"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-black text-[var(--lime)] leading-tight">
                MindID
              </span>
              <span className="text-[9px] font-semibold text-[var(--cream)]/40 leading-tight uppercase tracking-wider">
                Your Creative Mind
              </span>
            </div>
          </div>
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
              href="https://wa.me/905419315550"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--cream)]/40 hover:text-[var(--lime)] transition-colors"
              aria-label="WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a
              href="mailto:seyma@mindid.shop"
              className="text-[var(--cream)]/40 hover:text-[var(--lime)] transition-colors"
              aria-label="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--gray)]">
            <span>&copy; {new Date().getFullYear()} MindID. {t("footer.rights")}</span>
            <span className="text-[var(--cream)]/20">|</span>
            <Link href="/kvkk" className="hover:text-[var(--lime)] transition-colors">KVKK</Link>
            <Link href="/gizlilik" className="hover:text-[var(--lime)] transition-colors">
              {lang === "en" ? "Privacy" : "Gizlilik"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
