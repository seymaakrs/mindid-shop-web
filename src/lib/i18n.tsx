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
  "nav.about": { tr: "MindID Ne Yapar?", en: "What Does MindID Do?" },
  "nav.faq": { tr: "SSS", en: "FAQ" },
  "nav.contact": { tr: "Iletisim", en: "Contact" },
  "nav.start": { tr: "Hemen Basla", en: "Get Started" },

  // Hero
  "hero.badge": { tr: "AI Video Produksiyon Ajansi", en: "AI Video Production Agency" },
  "hero.title1": { tr: "Yeni Nesil", en: "Next Gen" },
  "hero.title2": { tr: "Reklamcilik", en: "Advertising" },
  "hero.desc": {
    tr: "Yapay zeka, reklam dunyasini kokten degistiriyor. Geleneksel bir reklam filmi icin ortalama 150.000₺ ile 500.000₺ arasinda butce ayirmaniz gerekirken, yapay zeka destekli produksiyonla ayni profesyonel kaliteyi %60'a varan tasarrufla elde ediyorsunuz. Studyo kirasi yok, kalabalik ekip yok, haftalarca surecek cekim plani yok. Sadece akilli teknoloji ve sonuc odakli uretim.",
    en: "AI is fundamentally changing advertising. While traditional ad production requires budgets of $4,200 to $14,000, AI-powered production delivers the same professional quality with up to 60% savings. No studio rental, no large crews, no weeks of shooting. Just smart technology and result-driven production.",
  },
  "hero.video_title": { tr: "Tanitim Videosu", en: "Intro Video" },

  // Service cards
  "service.reels": { tr: "Instagram Reels Icerik (AI)", en: "Instagram Reels Content (AI)" },
  "service.reels.desc": { tr: "Sosyal medya icin kisa format AI video icerik uretimi", en: "Short-form AI video content for social media" },
  "service.product": { tr: "Urun & Hizmet Reklami (AI)", en: "Product & Service Ads (AI)" },
  "service.product.desc": { tr: "AI destekli urun tanitim, hizmet reklami ve yaratici icerik tasarimi", en: "AI-powered product showcase, service ads and creative content design" },
  "service.campaign": { tr: "Kampanya Reklam Filmi", en: "Campaign Ad Film" },
  "service.campaign.desc": { tr: "Kampanya odakli profesyonel reklam filmi produksiyonu", en: "Campaign-focused professional ad film production" },
  "service.corporate": { tr: "Kurumsal Tanitim & Reklam Filmi", en: "Corporate Intro & Ad Film" },
  "service.corporate.desc": { tr: "Kurumsal tanitim ve reklam filmi - tek paket cozum", en: "Corporate introduction and ad film - all-in-one solution" },
  "service.avatar": { tr: "AI Avatar Olustur", en: "Create AI Avatar" },
  "service.avatar.desc": { tr: "AI ile kendi dijital avatarini olustur - video cekimine son", en: "Create your digital avatar with AI - no more video shoots" },
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
    tr: "Temel senaryo, temel gorsel uretim, temel muzik, temel edit ve 2 adet revizyon hakki dahildir.",
    en: "Basic scenario, basic visual production, basic music, basic edit, and 2 revisions included.",
  },
  "config.upgrade": { tr: "Yukseltmeler", en: "Upgrades" },
  "config.scenario": { tr: "Senaryo", en: "Scenario" },
  "config.voice": { tr: "Seslendirme", en: "Voice-over" },
  "config.music": { tr: "Muzik", en: "Music" },
  "config.visual": { tr: "Gorsel Stil", en: "Visual Style" },
  "config.postprod": { tr: "Post-Produksiyon", en: "Post-Production" },
  "config.revision": { tr: "Revizyon Hakki", en: "Revision Rights" },
  "config.total": { tr: "Toplam", en: "Total" },
  "config.price_note": {
    tr: "Fiyatlar KDV haric olup, nihai tutar proje detaylarina gore brief sonrasi netlesir. Odeme plani icin bize ulasin.",
    en: "Prices exclude VAT. Final amount is determined after the brief based on project details. Contact us for payment plans.",
  },

  // Checkout
  "checkout.title": { tr: "Yonetmen Masasi", en: "Director's Desk" },
  "checkout.subtitle": { tr: "Secimleriniz hazir! Son bir adim kaldi.", en: "Your selections are ready! One final step." },
  "checkout.send": { tr: "Yonetmene Gonder", en: "Send to Director" },
  "checkout.traditional": { tr: "Geleneksel Studyo Maliyeti", en: "Traditional Studio Cost" },
  "checkout.ai": { tr: "MindID AI Fiyati", en: "MindID AI Price" },
  "checkout.saved": { tr: "Net Tasarrufunuz", en: "Your Net Savings" },
  "checkout.smart_move": {
    tr: "Bu karari verdiginiz icin tebrikler. Ayni kaliteyi, cok daha akilli bir fiyata aliyorsunuz.",
    en: "Congratulations on this decision. You're getting the same quality at a much smarter price.",
  },
  "checkout.comparison_note": {
    tr: "Geleneksel studyo maliyetleri; ekip, ekipman, mekan, post-produksiyon ve lisans ucretlerini icerir. MindID AI ile bu maliyetlerin buyuk kismi ortadan kalkar.",
    en: "Traditional studio costs include crew, equipment, location, post-production and licensing fees. With MindID AI, most of these costs are eliminated.",
  },

  // Congrats
  "congrats.title": { tr: "Tebrikler!", en: "Congratulations!" },
  "congrats.subtitle": {
    tr: "Talepleriniz basariyla alindi. 24 saat icinde sizinle iletisime gececegiz.",
    en: "Your request has been received. We will contact you within 24 hours.",
  },
  "congrats.traditional_cost": { tr: "Geleneksel studyo maliyeti", en: "Traditional studio cost" },
  "congrats.ai_cost": { tr: "MindID AI ile odeyeceginiz", en: "Your MindID AI cost" },
  "congrats.profit": { tr: "Cebinizde kalan", en: "Money you keep" },

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

  // FAQ - detailed SEO-friendly answers
  "faq.title": { tr: "Sikca Sorulan Sorular", en: "Frequently Asked Questions" },

  "faq.q1": { tr: "AI video produksiyon nedir ve nasil calisir?", en: "What is AI video production and how does it work?" },
  "faq.a1": {
    tr: "AI video produksiyon, yapay zeka teknolojilerini kullanarak profesyonel video iceriklerin olusturuldugu yenilikci bir uretim yontemidir. Geleneksel produksiyondaki cekim ekibi, kamera ekipmanlari, studyo kirasi ve mekan maliyetlerinin yerine, ileri seviye yapay zeka modelleri (goruntu uretimi, ses sentezi, video kompozisyon) kullanilir. Surecimiz su sekilde isler: Oncelikle brief alinir ve senaryo yapay zeka destekli olarak hazirlanir. Ardindan AI gorsel uretim araclariyla sahneler olusturulur, ses ve muzik sentezlenir, video kurgusu yapilir ve post-produksiyon asamasindan gecirilir. Tum bu islemler, geleneksel produksiyonun haftalar suren surecini genlere indirir ve maliyetleri ciddi oranda dusurur.",
    en: "AI video production is an innovative method where professional video content is created using artificial intelligence technologies. Instead of traditional production's filming crew, camera equipment, studio rental, and location costs, advanced AI models (image generation, voice synthesis, video composition) are used. Our process works as follows: First, a brief is taken and the scenario is prepared with AI assistance. Then scenes are created with AI visual generation tools, audio and music are synthesized, video editing is done, and it goes through post-production. All these processes reduce weeks-long traditional production timelines to days and significantly lower costs.",
  },

  "faq.q2": { tr: "Teslimat suresi ne kadar?", en: "What is the delivery time?" },
  "faq.a2": {
    tr: "Teslimat suresi, projenizin kapsamina ve video suresine gore degiskenlik gosterir. Kisa format icerikler (8-16 saniye) 3 ile 5 is gunu icerisinde teslim edilir. Orta format icerikler (24-60 saniye) 5 ile 10 is gunu surer. 2 dakika ve uzeri uzun format icerikler (marka filmleri, kurumsal tanitimlar, kampanya filmleri) ise daha kapsamli bir on hazirlik, senaryo gelistirme, coklu sahne uretimi ve detayli post-produksiyon gerektirdiginden 20 ile 30 is gunu arasinda teslim edilir. Acil projeler icin hizlandirilmis teslimat secenekleri de sunulmaktadir - detaylar icin bizimle iletisime gecin.",
    en: "Delivery time varies depending on project scope and video duration. Short format content (8-16 seconds) is delivered within 3 to 5 business days. Medium format (24-60 seconds) takes 5 to 10 business days. Long format content of 2 minutes and above (brand films, corporate introductions, campaign films) requires more comprehensive pre-production, scenario development, multi-scene generation, and detailed post-production, so delivery takes 20 to 30 business days. Expedited delivery options are available for urgent projects - contact us for details.",
  },

  "faq.q3": { tr: "Revizyon hakkim var mi?", en: "Do I have revision rights?" },
  "faq.a3": {
    tr: "Evet, her projede 2 adet ucretsiz revizyon hakki dahildir. Bu revizyonlar; renk ayarlari, metin degisiklikleri, sahne siralamalari, muzik degisimi gibi duzenlemeleri kapsar. Eger projenizde daha fazla revizyon ihtiyaci ongoruyorsaniz, ekstra revizyon paketi ile ek 1 revizyon hakki edinebilirsiniz. Revizyonlar, ilk taslak tesliminden itibaren 14 gun icerisinde kullanilmalidir. Amacimiz her zaman musterimizin %100 memnuniyetidir.",
    en: "Yes, every project includes 2 free revisions. These revisions cover adjustments like color corrections, text changes, scene reordering, and music changes. If you anticipate needing more revisions, you can add an extra revision package for 1 additional revision. Revisions must be used within 14 days of the first draft delivery. Our goal is always 100% customer satisfaction.",
  },

  "faq.q4": { tr: "Geleneksel produksiyona gore ne kadar tasarruf ederim?", en: "How much do I save compared to traditional production?" },
  "faq.a4": {
    tr: "Bu sorunun cevabi sizi cok memnun edecek. Geleneksel bir reklam filmi produksiyonunda sadece 30 saniyelik bir video icin bile minimum 80.000₺ ile 200.000₺ arasinda butce gerekir. Buna studyo kirasi (gunluk 5.000-15.000₺), profesyonel cekim ekibi (yonetmen, kameraman, isikci, sesci - gunluk 20.000-50.000₺), oyuncu ucretleri, mekan izinleri, ekipman kirasi, post-produksiyon ve lisans bedelleri dahildir. Kurumsal bir tanitim filmi icin bu rakam 300.000₺ ile 750.000₺ arasina cikabilir. MindID AI ile ayni profesyonel kalitede bir icerik, bu maliyetlerin %60 ile %70 altinda uretilir. Yani 200.000₺'lik bir projeyi 60.000-80.000₺'ye yaptirabilirsiniz. Bu sadece bir indirim degil, isletmeniz icin stratejik bir rekabet avantajidir. Tasarruf ettiginiz butceyi pazarlama, marka bilinirligine veya yeni kampanyalara yonlendirerek rakiplerinizin onune gecebilirsiniz.",
    en: "The answer will make you very happy. For traditional ad production, even a 30-second video requires a minimum budget of $2,200 to $5,600. This includes studio rental ($140-420/day), professional crew (director, cameraman, lighting, sound - $560-1,400/day), talent fees, location permits, equipment rental, post-production and licensing. For a corporate intro film, costs can reach $8,400 to $21,000. With MindID AI, the same professional quality is produced at 60-70% less than these costs. So a $5,600 project can be done for $1,680-2,240. This isn't just a discount - it's a strategic competitive advantage for your business. You can redirect saved budget to marketing, brand awareness, or new campaigns to stay ahead of competitors.",
  },

  "faq.q5": { tr: "Hangi platformlar icin icerik uretiyorsunuz?", en: "Which platforms do you produce content for?" },
  "faq.a5": {
    tr: "Tum dijital ve geleneksel mecralara uygun icerik uretimi yapiyoruz. Instagram Reels ve Stories, TikTok, YouTube (pre-roll, mid-roll, shorts), LinkedIn, Facebook, X (Twitter), web siteleri, e-ticaret platformlari, dijital tabela ve ekranlar, TV reklam spotlari, sinema oncesi reklamlar ve kurumsal sunumlar dahil olmak uzere tum formatlarda cikti sagliyoruz. Her platform icin optimize edilmis en-boy oranlari (9:16, 16:9, 1:1, 4:5) ve cozunurlukler (HD, Full HD, 4K) ile teslim yapilir.",
    en: "We produce content for all digital and traditional channels. We deliver in all formats including Instagram Reels and Stories, TikTok, YouTube (pre-roll, mid-roll, shorts), LinkedIn, Facebook, X (Twitter), websites, e-commerce platforms, digital signage, TV commercial spots, pre-cinema ads, and corporate presentations. Delivery includes optimized aspect ratios (9:16, 16:9, 1:1, 4:5) and resolutions (HD, Full HD, 4K) for each platform.",
  },

  "faq.q6": { tr: "Yapay zeka ile uretilen iceriklerde telif hakki durumu nedir?", en: "What is the copyright status of AI-generated content?" },
  "faq.a6": {
    tr: "Bu cok onemli bir konudur ve seffaf olmak istiyoruz. Yapay zeka destekli icerik uretimi, reklamcilik dunyasina yeni girmis bir teknolojidir ve hukuki acidan halen 'gri alan' olarak degerlendirilmektedir. Turkiye'de ve dunya genelinde bu konudaki yasal cerceve hizla gelismektedir - ulkemiz bu alanda yeni yasalar cikardikca oyunun kurallari degisecektir. Mevcut durumda: MindID olarak urettigimiz tum icerikler size ozel olusturulur ve tam ticari kullanim hakki tarafimizdan size devredilir. AI araclarinin urettigi goruntuler uzerinde su an icin geleneksel anlamdaki 'telif hakki' taniminin nasil uygulanacagi tartisma konusudur. Ancak biz her projede; orijinal prompt tasarimi, yaratici yonetim, post-produksiyon ve final duzenleme gibi insan yaraticiligi gerektiren katkilar ekliyoruz ki bu da icerige telif hakki korumasi saglamaktadir. Ayrica stok gorsel, muzik ve ses efektleri icin lisansli kaynaklar kullaniyoruz. Musterilerimize tam yasal guvenlik saglamak icin surekli guncellenen hukuki danismanlik aliyoruz.",
    en: "This is a very important topic and we want to be transparent. AI-powered content creation is a new technology in advertising and is still considered a 'gray area' legally. The legal framework in Turkey and worldwide is rapidly evolving - as countries introduce new laws, the rules of the game will change. Currently: All content produced by MindID is created exclusively for you with full commercial usage rights transferred to you. How traditional 'copyright' definitions apply to AI-generated images is still debated. However, we add human creativity contributions in every project - original prompt design, creative direction, post-production and final editing - which provides copyright protection. We also use licensed sources for stock visuals, music and sound effects. We continuously receive updated legal consultation to ensure full legal security for our clients.",
  },

  "faq.q7": { tr: "Projeye baslamak icin ne gerekiyor?", en: "What's needed to start a project?" },
  "faq.a7": {
    tr: "Projeye baslamak icin tek yapmaniz gereken web sitemizdeki konfiguratoru kullanarak ihtiyaclarinizi belirlemek ve formu doldurmaktir. Ardindan 24 saat icerisinde sizi arayarak detayli bir brief gorusmesi yapiyoruz. Bu gorusmede markanizi, hedef kitlenizi, mesajinizi ve beklentilerinizi anliyoruz. Brief onayindan sonra proje resmi olarak baslar. On odeme alinir ve uretim surecine gecilir. Siz her asamada bilgilendirilirsiniz.",
    en: "To start a project, all you need to do is use the configurator on our website to define your needs and fill out the form. Within 24 hours, we'll call you for a detailed brief meeting. During this meeting, we understand your brand, target audience, message, and expectations. After brief approval, the project officially starts. An advance payment is collected and production begins. You'll be informed at every stage.",
  },

  // About
  "about.title": { tr: "MindID Ne Yapar?", en: "What Does MindID Do?" },
  "about.subtitle": {
    tr: "Yapay zeka ve yaratici vizyonu birlestirerek markanizin hikayesini anlatiyoruz.",
    en: "We combine AI and creative vision to tell your brand's story.",
  },
  "about.desc": {
    tr: "MindID, yapay zeka destekli video produksiyon alaninda Turkiye'nin oncu ajanslarindan biridir. Geleneksel produksiyon sureclerinin yuksek maliyetlerini ve uzun surelerini ortadan kaldirarak, markalara profesyonel kalitede video icerikler sunuyoruz. Ekibimiz; yapay zeka muhendisleri, yaratici yonetmenler, ses tasarimcilari ve dijital pazarlama uzmanlarinan olusur.",
    en: "MindID is one of Turkey's pioneering agencies in AI-powered video production. By eliminating the high costs and long timelines of traditional production, we deliver professional quality video content to brands. Our team consists of AI engineers, creative directors, sound designers, and digital marketing experts.",
  },
  "about.team": { tr: "Ekibimiz", en: "Our Team" },

  // Avatar
  "avatar.title": { tr: "AI Avatar Olustur", en: "Create AI Avatar" },
  "avatar.subtitle": { tr: "Kamera karsisina gecmeden, profesyonel video icerikleri olusturun", en: "Create professional video content without being on camera" },
  "avatar.who_title": { tr: "AI Avatar Kimlere Gore?", en: "Who Is AI Avatar For?" },
  "avatar.who_1": { tr: "Kamera karsisinda konusmakta zorlananlar", en: "Those who struggle speaking on camera" },
  "avatar.who_2": { tr: "Surekli video cekimiyle ugrasmak istemeyenler", en: "Those who don't want constant video shoots" },
  "avatar.who_3": { tr: "Hizli ve olceklenebilir icerik ihtiyaci olanlar", en: "Those who need fast and scalable content" },
  "avatar.who_4": { tr: "Global pazarlarda farkli dillerde icerik uretmek isteyenler", en: "Those who want to produce content in different languages for global markets" },
  "avatar.cta": { tr: "Denemek Istiyorum", en: "I Want to Try" },
  "avatar.examples": { tr: "Ornek Calismalar", en: "Example Works" },

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
