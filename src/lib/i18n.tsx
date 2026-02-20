"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "tr" | "en";

type I18nContextType = {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
  formatPrice: (priceTRY: number) => string;
};

const USD_RATE = 0.028;

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.services": { tr: "Hizmetler", en: "Services" },
  "nav.portfolio": { tr: "Portfolyo", en: "Portfolio" },
  "nav.avatar": { tr: "Avatarini Olustur", en: "Create Your Avatar" },
  "nav.faq": { tr: "SSS", en: "FAQ" },
  "nav.contact": { tr: "Iletisim", en: "Contact" },
  "nav.start": { tr: "Hemen Basla", en: "Get Started" },

  // Hero
  "hero.badge": { tr: "AI Video Produksiyon Ajansi", en: "AI Video Production Agency" },
  "hero.title1": { tr: "Yeni Nesil", en: "Next Generation" },
  "hero.title2": { tr: "Reklamcilik", en: "Advertising" },
  "hero.desc": {
    tr: "Yapay zeka reklamciligini tercih ettiginizde, geleneksel studyo cekim maliyetlerinin ortalama 150.000₺ - 500.000₺ arasindaki bedeli yerine, yeni nesil reklamcilik ile maliyetleriniz %60 azaliyor.",
    en: "By choosing AI advertising, instead of paying the average $4,200 - $14,000 for traditional studio production, next-gen advertising reduces your costs by 60%.",
  },
  "hero.savings": { tr: "%60 Maliyet Tasarrufu", en: "60% Cost Savings" },

  // Service cards
  "service.reels": { tr: "Instagram Reels Icerik (AI)", en: "Instagram Reels Content (AI)" },
  "service.reels.desc": { tr: "Sosyal medya icin kisa format AI video icerik uretimi", en: "Short-form AI video content for social media" },
  "service.product": { tr: "Urun & Hizmet Reklami (AI)", en: "Product & Service Ads (AI)" },
  "service.product.desc": { tr: "Urun tanitim ve hizmet reklam videolari", en: "Product showcase and service advertisement videos" },
  "service.creative": { tr: "Yaratici Icerik Tasarimi (AI-IGC)", en: "Creative Content Design (AI-IGC)" },
  "service.creative.desc": { tr: "AI destekli yaratici icerik ve gorsel tasarim", en: "AI-powered creative content and visual design" },
  "service.brand": { tr: "Premium Marka Hikayesi Filmi", en: "Premium Brand Story Film" },
  "service.brand.desc": { tr: "Markanizin hikayesini anlatan sinematik film", en: "Cinematic film telling your brand story" },
  "service.corporate": { tr: "Kurumsal Tanitim Filmi", en: "Corporate Intro Film" },
  "service.corporate.desc": { tr: "Profesyonel kurumsal tanitim videosu", en: "Professional corporate introduction video" },
  "service.ad": { tr: "Kurumsal Reklam Filmi", en: "Corporate Ad Film" },
  "service.ad.desc": { tr: "Yuksek butceli kurumsal reklam produksiyonu", en: "High-budget corporate ad production" },
  "service.portfolio": { tr: "Portfolyo", en: "Portfolio" },
  "service.portfolio.desc": { tr: "Tamamlanan projelerimiz ve referanslarimiz", en: "Our completed projects and references" },
  "service.avatar": { tr: "Avatarini Olustur", en: "Create Your Avatar" },
  "service.avatar.desc": { tr: "AI ile kendi dijital avatarini olustur", en: "Create your digital avatar with AI" },
  "service.from": { tr: "Baslayan", en: "Starting" },

  // Duration selector
  "duration.title": { tr: "Video Suresi Secin", en: "Select Video Duration" },
  "duration.subtitle": { tr: "Reklam videonuzun suresini belirleyin", en: "Choose your ad video duration" },
  "duration.sec": { tr: "saniye", en: "seconds" },
  "duration.min": { tr: "dakika", en: "minutes" },

  // Configurator
  "config.title": { tr: "Videonuzu Yapilandirin", en: "Configure Your Video" },
  "config.base": { tr: "Temel Paket Dahil", en: "Base Package Included" },
  "config.base.desc": {
    tr: "Temel senaryo, temel gorsel uretim, temel muzik, basit edit ve 1 adet revizyon hakki dahildir.",
    en: "Basic scenario, basic visual production, basic music, simple edit, and 1 revision included.",
  },
  "config.upgrade": { tr: "Yukseltmeler", en: "Upgrades" },
  "config.scenario": { tr: "Senaryo", en: "Scenario" },
  "config.voice": { tr: "Seslendirme", en: "Voice-over" },
  "config.music": { tr: "Muzik", en: "Music" },
  "config.visual": { tr: "Gorsel Stil", en: "Visual Style" },
  "config.postprod": { tr: "Post-Produksiyon", en: "Post-Production" },
  "config.revision": { tr: "Ek Revizyon", en: "Extra Revision" },
  "config.total": { tr: "Toplam", en: "Total" },

  // Checkout
  "checkout.title": { tr: "Yonetmen Masasi", en: "Director's Desk" },
  "checkout.subtitle": { tr: "Secimleriniz hazir! Son bir adim kaldi.", en: "Your selections are ready! One final step." },
  "checkout.send": { tr: "Yonetmene Gonder", en: "Send to Director" },
  "checkout.traditional": { tr: "Geleneksel Fiyat", en: "Traditional Price" },
  "checkout.ai": { tr: "AI Fiyat", en: "AI Price" },
  "checkout.saved": { tr: "Tasarrufunuz", en: "You Saved" },

  // Congrats
  "congrats.title": { tr: "Tebrikler!", en: "Congratulations!" },
  "congrats.subtitle": {
    tr: "Talepleriniz basariyla alindi. 24 saat icinde sizinle iletisime gececegiz.",
    en: "Your request has been received. We will contact you within 24 hours.",
  },
  "congrats.traditional_cost": { tr: "Geleneksel maliyetle odeyeceginiz tutar", en: "Traditional cost you would pay" },
  "congrats.ai_cost": { tr: "AI ile odeyeceginiz tutar", en: "AI cost you will pay" },
  "congrats.profit": { tr: "Kar ettiniz", en: "You saved" },

  // Form
  "form.title": { tr: "Bilgileriniz", en: "Your Information" },
  "form.name": { tr: "Ad Soyad", en: "Full Name" },
  "form.email": { tr: "E-posta", en: "Email" },
  "form.phone": { tr: "Telefon", en: "Phone" },
  "form.company": { tr: "Sirket / Marka Adi", en: "Company / Brand Name" },
  "form.sector": { tr: "Sektor", en: "Sector" },
  "form.target": { tr: "Hedef Kitle", en: "Target Audience" },
  "form.message": { tr: "Ek Notlar", en: "Additional Notes" },
  "form.upload": { tr: "Dosya Yukle (gorsel, senaryo, referans)", en: "Upload Files (visual, script, reference)" },
  "form.submit": { tr: "Gonder", en: "Submit" },

  // FAQ
  "faq.title": { tr: "Sikca Sorulan Sorular", en: "Frequently Asked Questions" },
  "faq.q1": { tr: "AI video produksiyon nedir?", en: "What is AI video production?" },
  "faq.a1": {
    tr: "AI video produksiyon, yapay zeka teknolojileri kullanilarak video iceriklerin olusturuldugu yenilikci bir uretim yontemidir. Geleneksel cekim ekibi, studyo ve ekipman yerine AI araclari kullanilir.",
    en: "AI video production is an innovative method where video content is created using artificial intelligence. Instead of traditional filming teams, studios, and equipment, AI tools are used.",
  },
  "faq.q2": { tr: "Teslimat suresi ne kadar?", en: "What is the delivery time?" },
  "faq.a2": {
    tr: "Projenin kapsamina gore 3-14 is gunu arasinda degisir. Kisa format icerikler (8-16sn) 3-5 is gunu, uzun format icerikler (2-6dk) 7-14 is gunu icerisinde teslim edilir.",
    en: "It varies between 3-14 business days depending on project scope. Short formats (8-16s) take 3-5 days, long formats (2-6min) take 7-14 business days.",
  },
  "faq.q3": { tr: "Revizyon hakkim var mi?", en: "Do I have revision rights?" },
  "faq.a3": {
    tr: "Temel pakette 1 adet revizyon hakki dahildir. Ek revizyon paketleri ile 3, 5 veya 10 revizyona kadar yukseltebilirsiniz.",
    en: "1 revision is included in the base package. You can upgrade to 3, 5, or 10 revisions with additional revision packages.",
  },
  "faq.q4": { tr: "Geleneksel produksiyona gore ne kadar tasarruf ederim?", en: "How much do I save compared to traditional production?" },
  "faq.a4": {
    tr: "Ortalama %60 maliyet tasarrufu saglarsiniz. Geleneksel bir reklam filmi 150.000₺-500.000₺ arasinda iken, AI ile ayni kalitede icerik cok daha uygun fiyatlarla uretilir.",
    en: "You save an average of 60%. While a traditional ad film costs $4,200-$14,000, AI produces same-quality content at much more affordable prices.",
  },
  "faq.q5": { tr: "Hangi platformlar icin icerik uretiyorsunuz?", en: "Which platforms do you produce content for?" },
  "faq.a5": {
    tr: "Instagram, TikTok, YouTube, LinkedIn, web siteleri ve TV reklamlari dahil tum dijital ve geleneksel platformlar icin icerik uretiyoruz.",
    en: "We produce content for all digital and traditional platforms including Instagram, TikTok, YouTube, LinkedIn, websites, and TV commercials.",
  },
  "faq.q6": { tr: "Telif hakki sorunu olur mu?", en: "Are there copyright issues?" },
  "faq.a6": {
    tr: "Hayir. Tum AI ile uretilen icerikler size ozel olusturulur ve tam ticari kullanim hakki size aittir.",
    en: "No. All AI-generated content is created exclusively for you and full commercial usage rights belong to you.",
  },

  // Portfolio
  "portfolio.title": { tr: "Portfolyo", en: "Portfolio" },
  "portfolio.subtitle": { tr: "Tamamlanan projelerimiz", en: "Our completed projects" },
  "portfolio.coming": { tr: "Yakinoda", en: "Coming Soon" },

  // Avatar
  "avatar.title": { tr: "Avatarini Olustur", en: "Create Your Avatar" },
  "avatar.subtitle": { tr: "AI ile kendi dijital temsilcini olustur", en: "Create your digital representative with AI" },

  // AI Manager
  "ai.welcome": { tr: "Hosgeldiniz! Size nasil yardimci olabilirim?", en: "Welcome! How can I help you?" },
  "ai.select_service": { tr: "Bir hizmet secin baslayalim!", en: "Select a service and let's begin!" },
  "ai.great_choice": { tr: "Harika secim!", en: "Great choice!" },
  "ai.almost_done": { tr: "Neredeyse bitti! Son adim.", en: "Almost done! Final step." },

  // Footer
  "footer.rights": { tr: "Tum haklari saklidir.", en: "All rights reserved." },
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("tr");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "tr" ? "en" : "tr"));
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[lang] ?? key;
    },
    [lang]
  );

  const formatPrice = useCallback(
    (priceTRY: number): string => {
      if (lang === "en") {
        const usd = Math.round(priceTRY * USD_RATE);
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        }).format(usd);
      }
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 0,
      }).format(priceTRY);
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t, formatPrice }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
