"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { doc, getDoc } from "firebase/firestore";

export type Lang = "tr" | "en" | "es";

type I18nContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  formatPrice: (priceTRY: number) => string;
};

const DEFAULT_USD_RATE = 0.028;

const translations: Record<string, Record<string, string>> = {
  // Nav
  "nav.services": { tr: "Özellikler", en: "Features", es: "Funciones" },
  "nav.videoProduction": { tr: "AI Video", en: "AI Video", es: "Video IA" },
  "nav.visualStudio": { tr: "AI Görsel", en: "AI Images", es: "Imágenes IA" },
  "nav.gallery": { tr: "Galeri", en: "Gallery", es: "Galería" },
  "nav.portfolio": { tr: "Örnekler", en: "Examples", es: "Ejemplos" },
  "nav.about": { tr: "MindID Ne Yapar?", en: "What Does MindID Do?", es: "¿Qué hace MindID?" },
  "nav.socialMediaExpert": { tr: "Sosyal Medya", en: "Social Media", es: "Redes Sociales" },
  "nav.howItWorks": { tr: "Nasıl Çalışır?", en: "How It Works", es: "¿Cómo Funciona?" },
  "nav.faq": { tr: "SSS", en: "FAQ", es: "Preguntas Frecuentes" },
  "nav.testimonials": { tr: "Yorumlar", en: "Testimonials", es: "Testimonios" },
  "nav.contact": { tr: "İletişim", en: "Contact", es: "Contacto" },
  "nav.start": { tr: "Hemen Başla", en: "Get Started", es: "Comenzar" },
  "nav.viewAllGallery": { tr: "Tüm Galeriyi Gör", en: "View Full Gallery", es: "Ver Galería Completa" },
  "nav.templates": { tr: "Şablonlar", en: "Templates", es: "Plantillas" },
  "nav.pricing": { tr: "Planlar", en: "Pricing", es: "Planes" },
  "nav.startFree": { tr: "Ücretsiz Başla", en: "Start Free", es: "Empieza Gratis" },

  // Language selector
  "lang.tr": { tr: "Türkçe", en: "Türkçe", es: "Turco" },
  "lang.en": { tr: "English", en: "English", es: "Inglés" },
  "lang.es": { tr: "Español", en: "Español", es: "Español" },

  // How It Works
  "hiw.title": { tr: "Nasıl Çalışır?", en: "How It Works", es: "¿Cómo Funciona?" },
  "hiw.subtitle": {
    tr: "4 adımda projeniz hayata geçiyor. Siz brief verin, gerisini biz halledelim.",
    en: "Your project comes to life in 4 steps. You provide the brief, we handle the rest.",
    es: "Su proyecto cobra vida en 4 pasos. Usted proporciona el brief, nosotros hacemos el resto.",
  },
  "hiw.step1.title": { tr: "Brief & Planlama", en: "Brief & Planning", es: "Brief y Planificación" },
  "hiw.step1.desc": {
    tr: "Formu doldurun, 24 saat içinde sizi arayalım. Markanızı, hedeflerinizi ve beklentilerinizi anlayalım.",
    en: "Fill out the form, we'll call you within 24 hours. Let's understand your brand, goals, and expectations.",
    es: "Complete el formulario, le llamaremos en 24 horas. Entendamos su marca, objetivos y expectativas.",
  },
  "hiw.step2.title": { tr: "AI Yapım Süreci", en: "AI Production", es: "Producción con IA" },
  "hiw.step2.desc": {
    tr: "Yapay zeka teknolojimiz ile profesyonel içeriğiniz üretilir. Geleneksel sürecin günler yerine saatlerle ölçülen hızı.",
    en: "Your professional content is produced with our AI technology. Speed measured in hours instead of the days of traditional production.",
    es: "Su contenido profesional se produce con nuestra tecnología IA. Velocidad medida en horas en lugar de días.",
  },
  "hiw.step3.title": { tr: "Revizyon", en: "Revision", es: "Revisión" },
  "hiw.step3.desc": {
    tr: "İlk taslağı inceleyin, 2 ücretsiz revizyon hakkınızla mükemmele ulaşana kadar düzenleyelim.",
    en: "Review the first draft, and we'll refine it with your 2 free revisions until it's perfect.",
    es: "Revise el primer borrador, lo perfeccionaremos con sus 2 revisiones gratuitas.",
  },
  "hiw.step4.title": { tr: "Teslim & Yayın", en: "Delivery & Launch", es: "Entrega y Lanzamiento" },
  "hiw.step4.desc": {
    tr: "Tüm platformlara uygun formatlarda teslim. Hemen yayına alın, sonuçları görün.",
    en: "Delivery in formats suitable for all platforms. Go live immediately and see the results.",
    es: "Entrega en formatos adecuados para todas las plataformas. Publique de inmediato y vea los resultados.",
  },

  // Final CTA
  "cta.badge": { tr: "Hemen Başla", en: "Get Started", es: "Empieza Ya" },
  "cta.title": { tr: "Ücretsiz hesabını aç", en: "Open your free account", es: "Abre tu cuenta gratis" },
  "cta.desc": {
    tr: "50 kredi hediye, kart gerekmez, istediğin zaman iptal et. AI üretimine 30 saniyede başla.",
    en: "50 free credits, no credit card, cancel anytime. Start generating in 30 seconds.",
    es: "50 créditos gratis, sin tarjeta, cancela cuando quieras. Empieza en 30 segundos.",
  },
  "cta.primary": { tr: "Ücretsiz Başla", en: "Start Free", es: "Empieza Gratis" },
  "cta.secondary": { tr: "Şablonlara Bak", en: "Browse Templates", es: "Ver Plantillas" },
  "cta.trust": { tr: "50 kredi hediye · Kart gerekmez · İstediğin zaman iptal et", en: "50 free credits · No credit card · Cancel anytime", es: "50 créditos gratis · Sin tarjeta · Cancela cuando quieras" },

  // Logo Wall
  "logowall.title": { tr: "Güvenilir Markalar Bize Güveniyor", en: "Trusted by Leading Brands", es: "Marcas Líderes Confían en Nosotros" },

  // Hero
  "hero.badge": { tr: "AI Reklam Filmi & Ürün Görseli Ajansı", en: "AI Ad Film & Product Visual Agency" },
  "hero.title1": { tr: "Yeni Nesil", en: "Next Gen" },
  "hero.title2": { tr: "Reklamcılık", en: "Advertising" },
  "hero.desc": {
    tr: "MindID, markalar için self-service AI içerik üretim platformudur. Reels, ürün görseli ve dijital avatarları kredi bazlı planlarla tarayıcından üret. Stüdyo, brief, bekleme yok. Ücretsiz başla, 50 kredi hediye.",
    en: "MindID is the self-service AI content platform for brands. Generate reels, product images and digital avatars from your browser with credit-based plans. No studio, no briefs, no waiting. Start free, 50 credits gift.",
  },
  "hero.video_title": { tr: "Tanıtım Videosu", en: "Intro Video" },

  // Services section headline
  "services.headline": {
    tr: "Self-service AI içerik stüdyosu",
    en: "Self-service AI content studio",
  },
  "services.subtitle": {
    tr: "Video, görsel, avatar ve sosyal içerik — kredi bazlı, anında. Tarayıcından üret, hemen indir.",
    en: "Video, images, avatars and social content — credit-based, instant. Generate in-browser, download now.",
  },

  // SaaS service cards
  "service.video.name": { tr: "AI Video", en: "AI Video", es: "Video IA" },
  "service.video.desc": { tr: "Reels, reklam, ürün ve kurumsal videolar — tek panelden.", en: "Reels, ads, product and corporate videos — one panel." },
  "service.image.name": { tr: "AI Görsel", en: "AI Images", es: "Imágenes IA" },
  "service.image.desc": { tr: "Ürün, kampanya ve sosyal medya görselleri.", en: "Product, campaign and social images." },
  "service.avatar.name": { tr: "Dijital Avatar", en: "Digital Avatar", es: "Avatar Digital" },
  "service.avatar.desc": { tr: "Marka avatarınla sonsuz sahne.", en: "Endless scenes with your brand avatar." },
  "service.social.name": { tr: "Sosyal İçerik", en: "Social Content", es: "Contenido Social" },
  "service.social.desc": { tr: "Post, story, banner — platform boyutları otomatik.", en: "Posts, stories, banners — platform sizes auto-handled." },
  "service.from": { tr: "Başlayan", en: "Starting" },
  "service.explore": { tr: "Keşfet", en: "Explore" },
  "service.tryNow": { tr: "Hemen Dene", en: "Try Now", es: "Probar Ahora" },
  "service.creditsPerRun": { tr: "kredi / üretim", en: "credits / run", es: "créditos / ejecución" },

  // Portfolio
  "portfolio.title": { tr: "Portfolyo", en: "Portfolio" },
  "portfolio.subtitle": { tr: "AI reklam filmleri, avatar örnekleri ve e-ticaret ürün görselleri — yapay zeka ile ürettiğimiz çalışmaları inceleyin", en: "AI ad films, avatar samples, and e-commerce product visuals — explore our AI-produced works" },
  "portfolio.coming": { tr: "Çok Yakında", en: "Coming Soon" },
  "portfolio.all": { tr: "Tümü", en: "All" },
  "portfolio.items": { tr: "proje", en: "projects" },
  "portfolio.noResults": { tr: "Bu kategoride henüz içerik yok", en: "No content in this category yet" },
  "portfolio.showAll": { tr: "Tümünü Göster", en: "Show All" },
  "portfolio.watch": { tr: "İzle", en: "Watch" },

  // Duration selector
  "duration.title": { tr: "Video Süresi Seçin", en: "Select Video Duration" },
  "duration.subtitle": { tr: "Reklam videonuzun süresini belirleyin", en: "Choose your ad video duration" },
  "duration.sec": { tr: "saniye", en: "seconds" },
  "duration.min": { tr: "dakika", en: "minutes" },

  // Configurator
  "config.title": { tr: "Videonuzu Yapılandırın", en: "Configure Your Video" },
  "config.step.configure": { tr: "Yapılandır", en: "Configure", es: "Configurar" },
  "config.step.checkout": { tr: "Bilgiler", en: "Details", es: "Detalles" },
  "config.step.done": { tr: "Tamam", en: "Done", es: "Listo" },
  "config.base": { tr: "Temel Paket Dahil", en: "Base Package Included" },
  "config.base.desc": {
    tr: "Temel senaryo, temel görsel üretim, temel müzik, temel edit ve 2 adet revizyon hakkı dahildir.",
    en: "Basic scenario, basic visual production, basic music, basic edit, and 2 revisions included.",
  },
  "config.upgrade": { tr: "Yükseltmeler", en: "Upgrades" },
  "config.scenario": { tr: "Senaryo", en: "Scenario" },
  "config.voice": { tr: "Seslendirme", en: "Voice-over" },
  "config.music": { tr: "Müzik", en: "Music" },
  "config.visual": { tr: "Görsel Stil", en: "Visual Style" },
  "config.postprod": { tr: "Post-Prodüksiyon", en: "Post-Production" },
  "config.revision": { tr: "Revizyon Hakkı", en: "Revision Rights" },
  // Product photo configurator
  "config.product-photo.title": { tr: "Ürün Görselinizi Yapılandırın", en: "Configure Your Product Photography" },
  "config.product-photo.base.desc": {
    tr: "Temel stüdyo çekimi, beyaz arka plan ve 2 adet revizyon hakkı dahildir.",
    en: "Basic studio shoot, white background, and 2 revisions included.",
  },
  "config.productCount": { tr: "Ürün Sayısı", en: "Product Count" },
  "config.photoAngle": { tr: "Çekim Açısı", en: "Shooting Angles" },
  "config.photoModel": { tr: "Model Seçimi", en: "Model Type" },
  "config.colorPackage": { tr: "Renk Paketi", en: "Color Package" },
  "config.photoVisualStyle": { tr: "Görsel Stili", en: "Visual Style" },
  "config.background": { tr: "Arka Plan", en: "Background" },
  "config.photoRetouch": { tr: "Rötuş & İşlem", en: "Retouching & Processing" },
  "config.total": { tr: "Toplam", en: "Total" },
  "config.price_note": {
    tr: "Fiyatlar KDV hariç olup, nihai tutar proje detaylarına göre brief sonrası netleşir. Ödeme planı için bize ulaşın.",
    en: "Prices exclude VAT. Final amount is determined after the brief based on project details. Contact us for payment plans.",
  },

  // Checkout
  "checkout.title": { tr: "Yönetmen Masası", en: "Director's Desk" },
  "checkout.subtitle": { tr: "Seçimleriniz hazır! Son bir adım kaldı.", en: "Your selections are ready! One final step." },
  "checkout.send": { tr: "Yönetmene Gönder", en: "Send to Director" },
  "checkout.traditional": { tr: "Geleneksel Stüdyo Maliyeti", en: "Traditional Studio Cost" },
  "checkout.ai": { tr: "MindID AI Fiyatı", en: "MindID AI Price" },
  "checkout.saved": { tr: "Net Tasarrufunuz", en: "Your Net Savings" },
  "checkout.smart_move": {
    tr: "Bu kararı verdiğiniz için tebrikler. Aynı kaliteyi, çok daha akıllı bir fiyata alıyorsunuz.",
    en: "Congratulations on this decision. You're getting the same quality at a much smarter price.",
  },
  "checkout.comparison_note": {
    tr: "Geleneksel stüdyo maliyetleri; ekip, ekipman, mekân, post-prodüksiyon ve lisans ücretlerini içerir. MindID AI ile bu maliyetlerin büyük kısmı ortadan kalkar.",
    en: "Traditional studio costs include crew, equipment, location, post-production and licensing fees. With MindID AI, most of these costs are eliminated.",
  },

  // Congrats
  "congrats.title": { tr: "Tebrikler!", en: "Congratulations!" },
  "congrats.subtitle": {
    tr: "talepleriniz başarıyla alındı. 24 saat içinde sizinle iletişime geçeceğiz.",
    en: "your request has been received. We will contact you within 24 hours.",
  },
  "congrats.traditional_cost": { tr: "Geleneksel stüdyo maliyeti", en: "Traditional studio cost" },
  "congrats.ai_cost": { tr: "MindID AI ile ödeyeceğiniz", en: "Your MindID AI cost" },
  "congrats.profit": { tr: "Cebinizde kalan", en: "Money you keep" },

  // Form
  "form.title": { tr: "Bilgileriniz", en: "Your Information" },
  "form.name": { tr: "Ad Soyad", en: "Full Name" },
  "form.email": { tr: "E-posta", en: "Email" },
  "form.phone": { tr: "Telefon", en: "Phone" },
  "form.company": { tr: "Şirket / Marka Adı", en: "Company / Brand Name" },
  "form.sector": { tr: "Sektör", en: "Sector" },
  "form.target": { tr: "Hedef Kitle", en: "Target Audience" },
  "form.message": { tr: "Ek Notlar", en: "Additional Notes" },
  "form.upload": { tr: "Dosya Yükle (görsel, senaryo, referans)", en: "Upload Files (visual, script, reference)" },
  "form.submit": { tr: "Gönder", en: "Submit" },

  // FAQ - detailed SEO-friendly answers
  "faq.title": { tr: "Sıkça Sorulan Sorular", en: "Frequently Asked Questions" },

  "faq.q1": { tr: "AI video prodüksiyon nedir ve nasıl çalışır?", en: "What is AI video production and how does it work?" },
  "faq.a1": {
    tr: "AI video prodüksiyon, yapay zeka teknolojilerini kullanarak profesyonel video içeriklerin oluşturulduğu yenilikçi bir üretim yöntemidir. Geleneksel prodüksiyondaki çekim ekibi, kamera ekipmanları, stüdyo kirası ve mekân maliyetlerinin yerine, ileri seviye yapay zeka modelleri (görüntü üretimi, ses sentezi, video kompozisyon) kullanılır. Sürecimiz şu şekilde işler: Öncelikle brief alınır ve senaryo yapay zeka destekli olarak hazırlanır. Ardından AI görsel üretim araçlarıyla sahneler oluşturulur, ses ve müzik sentezlenir, video kurgusu yapılır ve post-prodüksiyon aşamasından geçirilir. Tüm bu işlemler, geleneksel prodüksiyonun haftalar süren sürecini günlere indirir ve maliyetleri ciddi oranda düşürür.",
    en: "AI video production is an innovative method where professional video content is created using artificial intelligence technologies. Instead of traditional production's filming crew, camera equipment, studio rental, and location costs, advanced AI models (image generation, voice synthesis, video composition) are used. Our process works as follows: First, a brief is taken and the scenario is prepared with AI assistance. Then scenes are created with AI visual generation tools, audio and music are synthesized, video editing is done, and it goes through post-production. All these processes reduce weeks-long traditional production timelines to days and significantly lower costs.",
  },

  "faq.q2": { tr: "Teslimat süresi ne kadar?", en: "What is the delivery time?" },
  "faq.a2": {
    tr: "Teslimat süresi, projenizin kapsamına ve video süresine göre değişkenlik gösterir. Kısa format içerikler (8-16 saniye) 3 ile 5 iş günü içerisinde teslim edilir. Orta format içerikler (24-60 saniye) 5 ile 10 iş günü sürer. 2 dakika ve üzeri uzun format içerikler (marka filmleri, kurumsal tanıtımlar, kampanya filmleri) ise daha kapsamlı bir ön hazırlık, senaryo geliştirme, çoklu sahne üretimi ve detaylı post-prodüksiyon gerektirdiğinden 20 ile 30 iş günü arasında teslim edilir. Acil projeler için hızlandırılmış teslimat seçenekleri de sunulmaktadır - detaylar için bizimle iletişime geçin.",
    en: "Delivery time varies depending on project scope and video duration. Short format content (8-16 seconds) is delivered within 3 to 5 business days. Medium format (24-60 seconds) takes 5 to 10 business days. Long format content of 2 minutes and above (brand films, corporate introductions, campaign films) requires more comprehensive pre-production, scenario development, multi-scene generation, and detailed post-production, so delivery takes 20 to 30 business days. Expedited delivery options are available for urgent projects - contact us for details.",
  },

  "faq.q3": { tr: "Revizyon hakkım var mı?", en: "Do I have revision rights?" },
  "faq.a3": {
    tr: "Evet, her projede 2 adet ücretsiz revizyon hakkı dahildir. Bu revizyonlar; renk ayarları, metin değişiklikleri, sahne sıralamaları, müzik değişimi gibi düzenlemeleri kapsar. Eğer projenizde daha fazla revizyon ihtiyacı öngörüyorsanız, ekstra revizyon paketi ile ek 1 revizyon hakkı edinebilirsiniz. Revizyonlar, ilk taslak tesliminden itibaren 14 gün içerisinde kullanılmalıdır. Amacımız her zaman müşterimizin %100 memnuniyetidir.",
    en: "Yes, every project includes 2 free revisions. These revisions cover adjustments like color corrections, text changes, scene reordering, and music changes. If you anticipate needing more revisions, you can add an extra revision package for 1 additional revision. Revisions must be used within 14 days of the first draft delivery. Our goal is always 100% customer satisfaction.",
  },

  "faq.q4": { tr: "Geleneksel prodüksiyona göre ne kadar tasarruf ederim?", en: "How much do I save compared to traditional production?" },
  "faq.a4": {
    tr: "Bu sorunun cevabı sizi çok memnun edecek. Geleneksel bir reklam filmi prodüksiyonunda sadece 30 saniyelik bir video için bile minimum 80.000₺ ile 200.000₺ arasında bütçe gerekir. Buna stüdyo kirası (günlük 5.000-15.000₺), profesyonel çekim ekibi (yönetmen, kameraman, ışıkçı, sesçi - günlük 20.000-50.000₺), oyuncu ücretleri, mekân izinleri, ekipman kirası, post-prodüksiyon ve lisans bedelleri dahildir. Kurumsal bir tanıtım filmi için bu rakam 300.000₺ ile 750.000₺ arasına çıkabilir. MindID AI ile aynı profesyonel kalitede bir içerik, bu maliyetlerin %60 ile %70 altında üretilir. Yani 200.000₺'lik bir projeyi 60.000-80.000₺'ye yaptırabilirsiniz. Bu sadece bir indirim değil, işletmeniz için stratejik bir rekabet avantajıdır. Tasarruf ettiğiniz bütçeyi pazarlama, marka bilinirliğine veya yeni kampanyalara yönlendirerek rakiplerinizin önüne geçebilirsiniz.",
    en: "The answer will make you very happy. For traditional ad production, even a 30-second video requires a minimum budget of $2,200 to $5,600. This includes studio rental ($140-420/day), professional crew (director, cameraman, lighting, sound - $560-1,400/day), talent fees, location permits, equipment rental, post-production and licensing. For a corporate intro film, costs can reach $8,400 to $21,000. With MindID AI, the same professional quality is produced at 60-70% less than these costs. So a $5,600 project can be done for $1,680-2,240. This isn't just a discount - it's a strategic competitive advantage for your business. You can redirect saved budget to marketing, brand awareness, or new campaigns to stay ahead of competitors.",
  },

  "faq.q5": { tr: "Hangi platformlar için içerik üretiyorsunuz?", en: "Which platforms do you produce content for?" },
  "faq.a5": {
    tr: "Tüm dijital ve geleneksel mecralara uygun içerik üretimi yapıyoruz. Instagram Reels ve Stories, TikTok, YouTube (pre-roll, mid-roll, shorts), LinkedIn, Facebook, X (Twitter), web siteleri, e-ticaret platformları, dijital tabela ve ekranlar, TV reklam spotları, sinema öncesi reklamlar ve kurumsal sunumlar dahil olmak üzere tüm formatlarda çıktı sağlıyoruz. Her platform için optimize edilmiş en-boy oranları (9:16, 16:9, 1:1, 4:5) ve çözünürlükler (HD, Full HD, 4K) ile teslim yapılır.",
    en: "We produce content for all digital and traditional channels. We deliver in all formats including Instagram Reels and Stories, TikTok, YouTube (pre-roll, mid-roll, shorts), LinkedIn, Facebook, X (Twitter), websites, e-commerce platforms, digital signage, TV commercial spots, pre-cinema ads, and corporate presentations. Delivery includes optimized aspect ratios (9:16, 16:9, 1:1, 4:5) and resolutions (HD, Full HD, 4K) for each platform.",
  },

  "faq.q6": { tr: "Yapay zeka ile üretilen içeriklerde telif hakkı durumu nedir?", en: "What is the copyright status of AI-generated content?" },
  "faq.a6": {
    tr: "Bu çok önemli bir konudur ve şeffaf olmak istiyoruz. Yapay zeka destekli içerik üretimi, reklamcılık dünyasına yeni girmiş bir teknolojidir ve hukuki açıdan hâlâ 'gri alan' olarak değerlendirilmektedir. Türkiye'de ve dünya genelinde bu konudaki yasal çerçeve hızla gelişmektedir - ülkemiz bu alanda yeni yasalar çıkardıkça oyunun kuralları değişecektir. Mevcut durumda: MindID olarak ürettiğimiz tüm içerikler size özel oluşturulur ve tam ticari kullanım hakkı tarafımızdan size devredilir. AI araçlarının ürettiği görseller üzerinde şu an için geleneksel anlamdaki 'telif hakkı' tanımının nasıl uygulanacağı tartışma konusudur. Ancak biz her projede; orijinal prompt tasarımı, yaratıcı yönetim, post-prodüksiyon ve final düzenleme gibi insan yaratıcılığı gerektiren katkılar ekliyoruz ki bu da içeriğe telif hakkı koruması sağlamaktadır. Ayrıca stok görsel, müzik ve ses efektleri için lisanslı kaynaklar kullanıyoruz. Müşterilerimize tam yasal güvenlik sağlamak için sürekli güncellenen hukuki danışmanlık alıyoruz.",
    en: "This is a very important topic and we want to be transparent. AI-powered content creation is a new technology in advertising and is still considered a 'gray area' legally. The legal framework in Turkey and worldwide is rapidly evolving - as countries introduce new laws, the rules of the game will change. Currently: All content produced by MindID is created exclusively for you with full commercial usage rights transferred to you. How traditional 'copyright' definitions apply to AI-generated images is still debated. However, we add human creativity contributions in every project - original prompt design, creative direction, post-production and final editing - which provides copyright protection. We also use licensed sources for stock visuals, music and sound effects. We continuously receive updated legal consultation to ensure full legal security for our clients.",
  },

  "faq.q7": { tr: "Projeye başlamak için ne gerekiyor?", en: "What's needed to start a project?" },
  "faq.a7": {
    tr: "Projeye başlamak için tek yapmanız gereken web sitemizdeki konfigüratörü kullanarak ihtiyaçlarınızı belirlemek ve formu doldurmaktır. Ardından 24 saat içerisinde sizi arayarak detaylı bir brief görüşmesi yapıyoruz. Bu görüşmede markanızı, hedef kitlenizi, mesajınızı ve beklentilerinizi anlıyoruz. Brief onayından sonra proje resmî olarak başlar. Ön ödeme alınır ve üretim sürecine geçilir. Siz her aşamada bilgilendirilirsiniz.",
    en: "To start a project, all you need to do is use the configurator on our website to define your needs and fill out the form. Within 24 hours, we'll call you for a detailed brief meeting. During this meeting, we understand your brand, target audience, message, and expectations. After brief approval, the project officially starts. An advance payment is collected and production begins. You'll be informed at every stage.",
  },

  // FAQ — Reklam Filmi Küme
  "faq.q8": { tr: "AI reklam filmi ne kadar sürede hazır olur?", en: "How long does an AI ad film take to produce?" },
  "faq.a8": {
    tr: "AI reklam filmi üretim süresi projenin kapsamına bağlıdır. Kısa format Instagram Reels (8-16 saniye) 3-5 iş günü, ürün reklamı (30-60 saniye) 5-10 iş günü, kampanya filmi ve kurumsal tanıtım filmleri ise 20-30 iş günü sürer. Geleneksel prodüksiyonda bu süreler 2-8 haftaya çıkar. Acil projeler için hızlandırılmış teslimat seçenekleri mevcuttur.",
    en: "AI ad film production time depends on project scope. Short-form Instagram Reels (8-16 seconds) take 3-5 business days, product ads (30-60 seconds) 5-10 business days, campaign and corporate films 20-30 business days. Traditional production takes 2-8 weeks. Express delivery options available for urgent projects.",
  },

  "faq.q9": { tr: "AI reklam filmi senaryosunu kim yazıyor?", en: "Who writes the AI ad film scenario?" },
  "faq.a9": {
    tr: "Senaryo sürecimiz hibrit bir yaklaşıma sahiptir. Öncelikle brief görüşmesinde markanızın mesajını, hedef kitlenizi ve kampanya hedeflerinizi anlıyoruz. Ardından deneyimli yaratıcı ekibimiz, yapay zeka destekli araçları da kullanarak senaryoyu hazırlar. Temel pakette standart senaryo dahildir; profesyonel senaryo yükseltmesi ile daha detaylı ve özgün hikaye anlatımı tercih edebilirsiniz. Senaryo onayınız alındıktan sonra prodüksiyona geçilir.",
    en: "Our scenario process uses a hybrid approach. First, during the brief meeting, we understand your brand message, target audience, and campaign goals. Then our experienced creative team prepares the scenario, also utilizing AI-assisted tools. A standard scenario is included in the base package; with the professional scenario upgrade, you can opt for more detailed and original storytelling. Production begins after your scenario approval.",
  },

  "faq.q10": { tr: "AI ile yapılan reklam filmi gerçekçi görünüyor mu?", en: "Do AI-made ad films look realistic?" },
  "faq.a10": {
    tr: "Evet. 2026 itibarıyla yapay zeka görsel üretim teknolojisi inanılmaz bir seviyeye ulaştı. AI ile üretilen reklam filmleri; sinema kalitesinde görsel çıktı, doğal geçişler, profesyonel ışıklandırma ve gerçekçi hareket animasyonları sunmaktadır. Post-prodüksiyon aşamasında insan uzmanlarımız son rötuşları yaparak kaliteyi bir üst seviyeye taşır. Portföy sayfamızda gerçek örneklerimizi inceleyebilirsiniz.",
    en: "Yes. As of 2026, AI visual generation technology has reached incredible levels. AI-produced ad films offer cinema-quality visual output, natural transitions, professional lighting, and realistic motion animations. During post-production, our human experts add final touches to elevate quality further. You can see real examples on our portfolio page.",
  },

  "faq.q11": { tr: "AI reklam filmi hangi formatlarda teslim edilir?", en: "What formats are AI ad films delivered in?" },
  "faq.a11": {
    tr: "Reklam filmlerinizi ihtiyacınıza göre tüm popüler formatlarda teslim ediyoruz: MP4 (H.264/H.265), MOV, WebM. Çözünürlük olarak HD (720p), Full HD (1080p) ve 4K (2160p) seçenekleri mevcuttur. En-boy oranları: 9:16 (Stories/Reels), 16:9 (YouTube/TV), 1:1 (Feed), 4:5 (Instagram) şeklinde platform bazlı optimize edilir.",
    en: "We deliver your ad films in all popular formats: MP4 (H.264/H.265), MOV, WebM. Resolution options include HD (720p), Full HD (1080p) and 4K (2160p). Aspect ratios are platform-optimized: 9:16 (Stories/Reels), 16:9 (YouTube/TV), 1:1 (Feed), 4:5 (Instagram).",
  },

  // FAQ — Avatar Küme
  "faq.q12": { tr: "AI avatar gerçekçi mi görünür?", en: "Do AI avatars look realistic?" },
  "faq.a12": {
    tr: "Evet, yapay zeka avatar teknolojimiz son derece gerçekçi sonuçlar üretmektedir. Yüz ifadeleri, dudak hareketleri (lip-sync), göz teması ve doğal vücut dili yapay zeka tarafından hassas bir şekilde oluşturulur. Avatarınız farklı duygusal ifadeler gösterebilir ve doğal konuşma temposuna uyum sağlar. Birçok izleyici AI avatar ile gerçek insan arasındaki farkı ayırt edemez.",
    en: "Yes, our AI avatar technology produces highly realistic results. Facial expressions, lip movements (lip-sync), eye contact, and natural body language are precisely generated by AI. Your avatar can display different emotional expressions and adapts to natural speaking tempo. Many viewers cannot distinguish between an AI avatar and a real person.",
  },

  "faq.q13": { tr: "AI avatarımı farklı dillerde konuşturabilir miyim?", en: "Can my AI avatar speak different languages?" },
  "faq.a13": {
    tr: "Evet, bu AI avatarın en güçlü özelliklerinden biridir. Aynı dijital avatarınızı Türkçe, İngilizce, Almanca, Fransızca, Arapça, Çince ve daha birçok dilde konuşturabilirsiniz. Dudak hareketleri her dile otomatik olarak senkronize edilir. Bu sayede global pazarlara hitap eden içerikler, tek bir avatar ile üretilir — her dil için yeni çekim yapmaya gerek kalmaz.",
    en: "Yes, this is one of AI avatar's most powerful features. You can make your digital avatar speak in Turkish, English, German, French, Arabic, Chinese, and many more languages. Lip movements are automatically synchronized for each language. This way, content targeting global markets is produced with a single avatar — no need for new shoots per language.",
  },

  "faq.q14": { tr: "AI avatar ile ne tür içerikler üretebilirim?", en: "What types of content can I produce with an AI avatar?" },
  "faq.a14": {
    tr: "AI avatar ile üretebileceğiniz içerik türleri çok geniştir: marka tanıtım videoları, ürün sunumları, eğitim videoları, müşteri hizmetleri bot videoları, sosyal medya içerikleri, kurumsal iletişim videoları, haber bültenleri ve podcast görüntüleri. Avatar, markanızın dijital yüzü olarak 7/24 çalışabilir ve sınırsız sayıda video üretebilir.",
    en: "The content types you can produce with an AI avatar are vast: brand introduction videos, product presentations, training videos, customer service bot videos, social media content, corporate communication videos, newsletters, and podcast visuals. The avatar can work 24/7 as your brand's digital face and produce unlimited videos.",
  },

  // FAQ — E-ticaret Ürün Görseli Küme
  "faq.q15": { tr: "AI ürün görseli için mankene gerek yok mu?", en: "Are mannequins really not needed for AI product photos?" },
  "faq.a15": {
    tr: "Hayır, AI ürün görseli üretiminde mankene veya modele ihtiyaç yoktur. Yapay zeka teknolojimiz, ürünlerinizi çeşitli poz ve açılarda, farklı vücut tiplerinde ve istediğiniz konseptte gösterebilir. Giyim ürünleri görünmez manken efekti, model üzerinde gösterim veya düz zemin üzerinde sergileme şeklinde hazırlanabilir — tamamen sizin tercihinize bağlı.",
    en: "No, AI product visual production doesn't require mannequins or models. Our AI technology can display your products in various poses and angles, on different body types, and in any concept you want. Apparel products can be prepared as invisible mannequin effect, model display, or flat lay — entirely based on your preference.",
  },

  "faq.q16": { tr: "Hangi e-ticaret platformları için ürün görseli hazırlıyorsunuz?", en: "Which e-commerce platforms do you prepare product images for?" },
  "faq.a16": {
    tr: "Tüm büyük e-ticaret platformları için uygun formatta ürün görselleri hazırlıyoruz: Trendyol (800x800px, beyaz arka plan), Hepsiburada (1000x1000px), N11, GittiGidiyor, Shopify (2048x2048px'e kadar), Amazon (1600x1600px+, beyaz arka plan zorunlu), Etsy, eBay, AliExpress ve WooCommerce. Her platformun özel gereksinimlerine uygun boyut, format ve arka plan standartlarında teslim yapılır.",
    en: "We prepare product images in proper format for all major e-commerce platforms: Trendyol (800x800px, white background), Hepsiburada (1000x1000px), Shopify (up to 2048x2048px), Amazon (1600x1600px+, white background required), Etsy, eBay, AliExpress, and WooCommerce. Delivery meets each platform's specific size, format, and background standards.",
  },

  "faq.q17": { tr: "Bir ürünün farklı renk varyasyonları için ayrı ayrı ödeme mi yapılır?", en: "Do I pay separately for different color variations of a product?" },
  "faq.a17": {
    tr: "Hayır, renk varyasyonları çok düşük maliyetle üretilir. Geleneksel stüdyo çekiminde her renk için ayrı çekim yapılması gerekir ki bu maliyeti katlar. AI ile ise bir ürünün 5-10 farklı renk varyasyonu dakikalar içinde oluşturulur. Renk varyasyonları için ürün başına küçük bir ek ücret uygulanır — geleneksel çekimin yüzde biri düzeyinde.",
    en: "No, color variations are produced at very low cost. In traditional studio shoots, each color requires a separate shoot, multiplying costs. With AI, 5-10 different color variations of a product are created in minutes. A small per-product fee applies for color variations — a fraction of traditional shooting costs.",
  },

  "faq.q18": { tr: "AI ile üretilen ürün görselleri Trendyol'da kabul ediliyor mu?", en: "Are AI-generated product images accepted on Trendyol?" },
  "faq.a18": {
    tr: "Evet. AI ile üretilen ürün görselleri, Trendyol ve diğer e-ticaret platformlarının tüm görsel standartlarını karşılar. Çözünürlük, arka plan rengi (beyaz), dosya formatı ve boyut gereksinimleri platformun kurallarına uygun şekilde hazırlanır. Görseller profesyonel stüdyo çekiminden ayırt edilemez kalitededir.",
    en: "Yes. AI-generated product images meet all visual standards of Trendyol and other e-commerce platforms. Resolution, background color (white), file format, and size requirements are prepared according to platform rules. The visuals are indistinguishable from professional studio photography.",
  },

  "faq.q19": { tr: "Ödeme nasıl yapılır?", en: "How does payment work?" },
  "faq.a19": {
    tr: "Sipariş formu gönderildikten sonra 24 saat içerisinde sizinle iletişime geçiyoruz. Brief görüşmesi yapılır ve proje kapsamı netleştirilir. Ödeme planımız şu şekildedir: Brief onayından sonra %50 ön ödeme alınır, teslimat sonrası kalan %50 ödenir. Havale/EFT ve kredi kartı ile ödeme kabul edilmektedir.",
    en: "After submitting the order form, we contact you within 24 hours. A brief meeting is conducted and project scope is finalized. Our payment plan: 50% advance payment after brief approval, remaining 50% after delivery. We accept bank transfer and credit card payments.",
  },

  "faq.q20": { tr: "Birden fazla ürünüm var, toplu sipariş indirimi var mı?", en: "I have multiple products, is there a bulk order discount?" },
  "faq.a20": {
    tr: "Evet, toplu siparişlerde özel fiyatlandırma sunuyoruz. 50+ ürün görselinde %15'e varan, 200+ üründe %25'e varan toplu sipariş indirimi uygulanmaktadır. E-ticaret satıcıları için özel katalog çekim paketlerimiz de mevcuttur — 350 ürünlük bir katalog çekimi bile günler içinde tamamlanabilir. Detaylı fiyat teklifi için konfigüratörümüzü kullanın veya bize ulaşın.",
    en: "Yes, we offer special pricing for bulk orders. Up to 15% discount for 50+ product images, up to 25% for 200+ products. We also have special catalog shooting packages for e-commerce sellers — even a 350-product catalog shoot can be completed in days. Use our configurator or contact us for a detailed quote.",
  },

  "faq.q21": { tr: "MindID hangi ülkelere hizmet veriyor?", en: "Which countries does MindID serve?" },
  "faq.a21": {
    tr: "MindID olarak İstanbul merkezli çalışmakla birlikte tüm dünyaya hizmet veriyoruz. AI destekli prodüksiyon süreci tamamen dijital olduğu için fiziksel konum sınırlaması yoktur. Türkiye, ABD, İngiltere, Almanya, BAE ve birçok ülkeden müşterilerimize hizmet sunuyoruz. İngilizce ve Türkçe olmak üzere iki dilde iletişim sağlıyoruz.",
    en: "MindID is based in Istanbul but serves clients worldwide. Since our AI-powered production process is entirely digital, there are no physical location limitations. We serve clients from Turkey, USA, UK, Germany, UAE, and many other countries. We communicate in both English and Turkish.",
  },

  // About
  "about.title": { tr: "MindID Ne Yapar?", en: "What Does MindID Do?" },
  "about.subtitle": {
    tr: "Yapay zeka reklam filmleri, avatar oluşturma ve e-ticaret ürün görselleri ile markanızı büyütüyoruz.",
    en: "We grow your brand with AI ad films, avatar creation, and e-commerce product visuals.",
  },
  "about.desc": {
    tr: "MindID, yapay zeka ile reklam filmi yapımı, dijital avatar oluşturma ve e-ticaret ürün fotoğrafçılığı alanlarında Türkiye'nin öncü ajanslarından biridir. Manken ve stüdyo masrafı olmadan, %70'e varan tasarrufla stüdyo kalitesinde ürün görselleri üretiyoruz. Ekibimiz; yapay zeka mühendisleri, yaratıcı yönetmenler, ses tasarımcıları ve dijital pazarlama uzmanlarından oluşur.",
    en: "MindID is one of Turkey's pioneering agencies in AI ad film production, digital avatar creation, and e-commerce product photography. We produce studio-quality product visuals without mannequin or studio costs, with up to 70% savings. Our team consists of AI engineers, creative directors, sound designers, and digital marketing experts.",
  },
  "about.team": { tr: "Ekibimiz", en: "Our Team" },

  // Avatar
  "avatar.title": { tr: "AI Avatar Oluştur", en: "Create AI Avatar" },
  "avatar.subtitle": { tr: "Yapay zeka ile dijital avatar oluşturun — marka yüzü, dijital sunucu, influencer avatar. Kamera karşısına geçmeden profesyonel içerikler üretin.", en: "Create digital avatars with AI — brand face, digital presenter, influencer avatar. Produce professional content without being on camera." },
  "avatar.who_title": { tr: "AI Avatar Kimlere Göre?", en: "Who Is AI Avatar For?" },
  "avatar.who_1": { tr: "Kamera karşısında konuşmakta zorlananlar", en: "Those who struggle speaking on camera" },
  "avatar.who_2": { tr: "Sürekli video çekimiyle uğraşmak istemeyenler", en: "Those who don't want constant video shoots" },
  "avatar.who_3": { tr: "Hızlı ve ölçeklenebilir içerik ihtiyacı olanlar", en: "Those who need fast and scalable content" },
  "avatar.who_4": { tr: "Global pazarlarda farklı dillerde içerik üretmek isteyenler", en: "Those who want to produce content in different languages for global markets" },
  "avatar.cta": { tr: "Denemek İstiyorum", en: "I Want to Try" },
  "avatar.examples": { tr: "Örnek Çalışmalar", en: "Example Works" },

  // AI Manager
  "ai.welcome": { tr: "Hoş geldiniz! Size nasıl yardımcı olabilirim?", en: "Welcome! How can I help you?" },
  "ai.select_service": { tr: "Bir hizmet seçin başlayalım!", en: "Select a service and let's begin!" },
  "ai.great_choice": { tr: "Harika seçim!", en: "Great choice!" },
  "ai.almost_done": { tr: "Neredeyse bitti! Son adım.", en: "Almost done! Final step." },

  // Testimonials
  "testimonials.title": { tr: "Kullanıcılarımız ne diyor?", en: "What our users say" },
  "testimonials.subtitle": { tr: "MindID'i kullanan markaların deneyimleri", en: "Stories from brands using MindID" },
  "testimonial.1.name": { tr: "Mehmet Yılmaz", en: "Mehmet Yilmaz" },
  "testimonial.1.role": { tr: "Pazarlama Müdürü, Tekno Elektronik", en: "Marketing Director, Tekno Electronics" },
  "testimonial.1.text": {
    tr: "Reels üretimi için ayrı bir ekip tutmaya gerek kalmadı. MindID'le her hafta 10+ video çıkarıyoruz, ekip 1 kişi.",
    en: "No more separate teams for reels production. We ship 10+ videos a week with MindID — one person.",
  },
  "testimonial.1.service": { tr: "AI Video", en: "AI Video" },
  "testimonial.2.name": { tr: "Ayşe Kaya", en: "Ayse Kaya" },
  "testimonial.2.role": { tr: "E-Ticaret Direktörü, Moda Atölyesi", en: "E-Commerce Director, Fashion Atelier" },
  "testimonial.2.text": {
    tr: "350 ürünlük kataloğun tüm görselleri MindID ile bir hafta sonu içinde hazırdı. Self-service yapı bizim için oyun değiştirici.",
    en: "All visuals for a 350-product catalog were ready over one weekend with MindID. The self-service flow is a game-changer.",
  },
  "testimonial.2.service": { tr: "AI Görsel", en: "AI Images" },
  "testimonial.3.name": { tr: "Burak Demir", en: "Burak Demir" },
  "testimonial.3.role": { tr: "Kurucu, Demir Mobilya", en: "Founder, Demir Furniture" },
  "testimonial.3.text": {
    tr: "Aboneliğe geçtikten bir ay sonra Instagram içerik üretim hızımız 4 katına çıktı. Kredi sistemi gayet adil.",
    en: "Our Instagram production speed 4x'd in the first month on subscription. The credit system is fair and predictable.",
  },
  "testimonial.3.service": { tr: "AI Video", en: "AI Video" },
  "testimonial.4.name": { tr: "Elif Çelik", en: "Elif Celik" },
  "testimonial.4.role": { tr: "Marka Yöneticisi, Çelik Kozmetik", en: "Brand Manager, Celik Cosmetics" },
  "testimonial.4.text": {
    tr: "Aynı ürünü 12 farklı sahnede tek tıkla üretebilmek dönüşüm oranımızı %40 artırdı. A/B testlerimiz hızlandı.",
    en: "Generating 12 scenes of the same product with one click boosted our conversion 40%. A/B testing is so much faster now.",
  },
  "testimonial.4.service": { tr: "AI Görsel", en: "AI Images" },
  "testimonial.5.name": { tr: "Ahmet Özkan", en: "Ahmet Ozkan" },
  "testimonial.5.role": { tr: "İçerik Direktörü, Özkan Medya", en: "Content Director, Ozkan Media" },
  "testimonial.5.text": {
    tr: "Şablon kütüphanesi sürekli güncelleniyor. Trend yakaladığımız anda aynı gün içerik üretiyoruz.",
    en: "The template library updates constantly. We catch a trend and ship same-day content.",
  },
  "testimonial.5.service": { tr: "AI Video", en: "AI Video" },
  "testimonial.6.name": { tr: "Zeynep Aras", en: "Zeynep Aras" },
  "testimonial.6.role": { tr: "Satış Direktörü, Aras Gıda", en: "Sales Director, Aras Foods" },
  "testimonial.6.text": {
    tr: "Growth planına geçtikten sonra tüm sosyal medya çıktılarımızı in-house yapmaya başladık. Aylık fatura küçük, çıktı büyük.",
    en: "After moving to the Growth plan we brought everything in-house. The bill is small, the output is huge.",
  },
  "testimonial.6.service": { tr: "AI Görsel", en: "AI Images" },
  "testimonial.7.name": { tr: "Emre Şahin", en: "Emre Sahin" },
  "testimonial.7.role": { tr: "Dijital Pazarlama Lideri, Şahin Holding", en: "Digital Marketing Lead, Sahin Holding" },
  "testimonial.7.text": {
    tr: "API entegrasyonuyla MindID'i kendi panelimize bağladık. Müşterilerimiz tek tıkla AI reklam üretebiliyor.",
    en: "We integrated MindID via API into our own portal. Clients generate AI ads with one click.",
  },
  "testimonial.7.service": { tr: "API", en: "API" },
  "testimonial.8.name": { tr: "Selin Toprak", en: "Selin Toprak" },
  "testimonial.8.role": { tr: "Kurucu, Toprak Aksesuar", en: "Founder, Toprak Accessories" },
  "testimonial.8.text": {
    tr: "Avatar özelliği sayesinde markamın yüzünü hiç kameraya çıkmadan oluşturdum. Tüm reklamlarda aynı kişi görünüyor.",
    en: "With the avatar feature I built my brand face without ever being on camera. Every ad shows the same person.",
  },
  "testimonial.8.service": { tr: "Avatar", en: "Avatar" },

  // Footer
  "footer.rights": { tr: "Tüm hakları saklıdır.", en: "All rights reserved.", es: "Todos los derechos reservados." },
  "footer.services": { tr: "Hizmetler", en: "Services", es: "Servicios" },
  "footer.resources": { tr: "Kaynaklar", en: "Resources", es: "Recursos" },
  "footer.company": { tr: "Şirket", en: "Company", es: "Empresa" },
  "footer.contact": { tr: "İletişim", en: "Contact", es: "Contacto" },
  "footer.aiReels": { tr: "AI Instagram Reels", en: "AI Instagram Reels", es: "AI Instagram Reels" },
  "footer.aiProductPhoto": { tr: "AI Ürün Görseli", en: "AI Product Photography", es: "Fotografía de Producto IA" },
  "footer.aiProductAd": { tr: "AI Ürün Reklam Filmi", en: "AI Product Ad Film", es: "Película Publicitaria IA" },
  "footer.aiCampaign": { tr: "AI Kampanya Filmi", en: "AI Campaign Film", es: "Película de Campaña IA" },
  "footer.aiCorporate": { tr: "AI Kurumsal Tanıtım", en: "AI Corporate Film", es: "Película Corporativa IA" },
  "footer.aiAvatar": { tr: "AI Avatar Oluşturma", en: "AI Avatar Creation", es: "Creación de Avatar IA" },
  "footer.aiVsTraditional": { tr: "AI vs Geleneksel", en: "AI vs Traditional", es: "IA vs Tradicional" },
  "footer.howItWorks": { tr: "Nasıl Çalışır?", en: "How It Works", es: "¿Cómo Funciona?" },
  "footer.ecommerce": { tr: "E-ticaret Çözümleri", en: "E-commerce Solutions", es: "Soluciones E-commerce" },
  "footer.portfolio": { tr: "Portfolyo", en: "Portfolio", es: "Portafolio" },
  "footer.aboutMindid": { tr: "MindID Hakkında", en: "About MindID", es: "Acerca de MindID" },
  "footer.faq": { tr: "SSS", en: "FAQ", es: "Preguntas Frecuentes" },
  "footer.testimonials": { tr: "Müşteri Yorumları", en: "Testimonials", es: "Testimonios" },
  "footer.privacy": { tr: "Gizlilik", en: "Privacy", es: "Privacidad" },
  "footer.terms": { tr: "Kullanım Koşulları", en: "Terms of Use", es: "Términos de Uso" },
  "footer.product": { tr: "Ürün", en: "Product", es: "Producto" },
  "footer.templates": { tr: "Şablonlar", en: "Templates", es: "Plantillas" },
  "footer.pricing": { tr: "Planlar", en: "Pricing", es: "Planes" },
  "footer.startFree": { tr: "Ücretsiz Başla", en: "Start Free", es: "Empieza Gratis" },
  "footer.login": { tr: "Giriş Yap", en: "Sign In", es: "Iniciar Sesión" },

  // SaaS Plans
  "plans.heading": { tr: "Sana uygun planı seç", en: "Pick the plan that fits", es: "Elige tu plan" },
  "plans.sub": {
    tr: "Ücretsiz başla, ihtiyacın oldukça büyüt. Yıllık planlarda 2 ay hediye.",
    en: "Start free, scale as you grow. 2 months free on annual plans.",
  },
  "plans.free.name": { tr: "Ücretsiz", en: "Free", es: "Gratis" },
  "plans.free.tagline": { tr: "Dene ve gör", en: "Try and see", es: "Pruébalo" },
  "plans.starter.name": { tr: "Başlangıç", en: "Starter", es: "Inicial" },
  "plans.starter.tagline": { tr: "Solo girişimciler için", en: "For solo creators", es: "Para creadores solos" },
  "plans.growth.name": { tr: "Büyüme", en: "Growth", es: "Crecimiento" },
  "plans.growth.tagline": { tr: "Aktif markalar için", en: "For active brands", es: "Marcas activas" },
  "plans.scale.name": { tr: "Ölçek", en: "Scale", es: "Escala" },
  "plans.scale.tagline": { tr: "Ajans ve ekipler için", en: "For agencies & teams", es: "Agencias y equipos" },
  "plans.badge.popular": { tr: "Popüler", en: "Popular", es: "Popular" },
  "plans.cta.startFree": { tr: "Ücretsiz Başla", en: "Start Free", es: "Empieza Gratis" },
  "plans.cta.start": { tr: "Planı Seç", en: "Choose Plan", es: "Elegir Plan" },
  "plans.cta.contact": { tr: "İletişime Geç", en: "Contact Sales", es: "Contactar" },
  "plans.feature.credits50": { tr: "50 kredi / ay", en: "50 credits / month", es: "50 créditos / mes" },
  "plans.feature.credits500": { tr: "500 kredi / ay", en: "500 credits / month", es: "500 créditos / mes" },
  "plans.feature.credits2000": { tr: "2.000 kredi / ay", en: "2,000 credits / month", es: "2.000 créditos / mes" },
  "plans.feature.credits6000": { tr: "6.000 kredi / ay", en: "6,000 credits / month", es: "6.000 créditos / mes" },
  "plans.feature.templates": { tr: "Tüm şablonlara erişim", en: "Access all templates", es: "Acceso a plantillas" },
  "plans.feature.standardQuality": { tr: "Standart kalite", en: "Standard quality", es: "Calidad estándar" },
  "plans.feature.hdQuality": { tr: "HD kalite", en: "HD quality", es: "Calidad HD" },
  "plans.feature.fullHDQuality": { tr: "Full HD kalite", en: "Full HD quality", es: "Calidad Full HD" },
  "plans.feature.4kQuality": { tr: "4K kalite", en: "4K quality", es: "Calidad 4K" },
  "plans.feature.watermark": { tr: "Watermark", en: "Watermark", es: "Marca de agua" },
  "plans.feature.noWatermark": { tr: "Watermark yok", en: "No watermark", es: "Sin marca de agua" },
  "plans.feature.commercial": { tr: "Ticari kullanım hakkı", en: "Commercial usage rights", es: "Derechos comerciales" },
  "plans.feature.priority": { tr: "Öncelikli kuyruk", en: "Priority queue", es: "Cola prioritaria" },
  "plans.feature.api": { tr: "API & webhook erişimi", en: "API & webhook access", es: "Acceso API y webhook" },

  // SaaS FAQ
  "saas.faq.q1": { tr: "MindID nedir?", en: "What is MindID?" },
  "saas.faq.a1": {
    tr: "MindID, markalar için self-service AI içerik üretim platformudur. Tarayıcıdan kayıt olur, kredi alır ve hazır şablonlarla reels, ürün görseli ve dijital avatar üretirsin. Stüdyo, ekip, brief yok.",
    en: "MindID is a self-service AI content platform for brands. Sign up in your browser, get credits and use templates to generate reels, product images and digital avatars. No studio, no crew, no briefs.",
  },
  "saas.faq.q2": { tr: "Kredi sistemi nasıl çalışıyor?", en: "How does the credit system work?" },
  "saas.faq.a2": {
    tr: "Her plan aylık kredi içerir. Her AI üretimi, çıktının türüne göre belli kadar kredi tüketir — görseller 2 kredi'den, kısa videolar 15 kredi'den, avatar 25 kredi'den başlar. Yeni hesaplara 50 kredi hediye.",
    en: "Every plan includes monthly credits. Each AI generation uses a small number of credits depending on the output type — images from 2 credits, short videos from 15 credits, avatars from 25 credits. New accounts get 50 free credits.",
  },
  "saas.faq.q3": { tr: "Teknik bilgi gerekiyor mu?", en: "Do I need technical skills?" },
  "saas.faq.a3": {
    tr: "Hayır. MindID şablon önceliklidir. Bir şablon seç, marka bilgilerini (logo, ürün fotoğrafı, metin) gir — AI gerisini halleder. Pro kullanıcılar özel prompt yazabilir.",
    en: "No. MindID is template-first. Pick a template, drop in your brand details (logo, product photo, copy) and AI does the rest. Pro users can write custom prompts.",
  },
  "saas.faq.q4": { tr: "Çıktıları ticari olarak kullanabilir miyim?", en: "Can I use outputs commercially?" },
  "saas.faq.a4": {
    tr: "Evet. Ücretli planlar (Başlangıç ve üstü) watermark olmadan tam ticari kullanım hakkı içerir. Ücretsiz planda watermark vardır ve sadece test amaçlıdır.",
    en: "Yes. Paid plans (Starter and above) include full commercial usage rights with no watermark. The Free plan adds a watermark and is intended for testing.",
  },
  "saas.faq.q5": { tr: "API var mı?", en: "Is there an API?" },
  "saas.faq.a5": {
    tr: "Evet — Scale (Ölçek) planı API erişimi ve webhook içerir. MindID'i kendi akışına veya ürününe entegre edebilirsin.",
    en: "Yes — the Scale plan includes API access and webhooks so you can integrate MindID into your existing workflow or product.",
  },
  "saas.faq.q6": { tr: "İstediğim zaman iptal edebilir miyim?", en: "Can I cancel anytime?" },
  "saas.faq.a6": {
    tr: "Evet. Aboneliğini panelden tek tıkla iptal edebilirsin. Fatura döneminin sonuna kadar erişimin devam eder. Kredi paketleri ise süresizdir.",
    en: "Yes. Cancel your subscription anytime from your dashboard. Access continues until the end of your billing period. Credit packs never expire.",
  },
  "saas.faq.q7": { tr: "Üretim ne kadar sürer?", en: "How fast are generations?" },
  "saas.faq.a7": {
    tr: "AI görseller saniyeler içinde, kısa videolar dakikalar içinde, avatarlar ise kuyruğa göre 1-5 dakika içinde hazır olur. Growth ve Scale planında öncelikli kuyruk avantajı vardır.",
    en: "AI images take seconds, short videos take minutes, and avatars take 1-5 minutes depending on the queue. Growth and Scale plans get priority queue.",
  },
  "saas.faq.q8": { tr: "Verilerim güvende mi?", en: "Is my data safe?" },
  "saas.faq.a8": {
    tr: "Evet. Tüm yüklenen dosyalar şifrelenir ve hesabınla ilişkilendirilir. AI modellerimiz eğitim için müşteri verisi kullanmaz. KVKK ve GDPR uyumlu çalışıyoruz.",
    en: "Yes. All uploads are encrypted and tied to your account. Our AI models don't use customer data for training. We're KVKK and GDPR compliant.",
  },
};

const I18nContext = createContext<I18nContextType | null>(null);

// Cookie'den veya URL'den dili algıla
function detectLang(): Lang {
  if (typeof window === "undefined") return "tr";

  // 1. URL'den algıla (/en/... → en, /es/... → es)
  if (window.location.pathname.startsWith("/en")) return "en";
  if (window.location.pathname.startsWith("/es")) return "es";
  if (window.location.pathname.startsWith("/tr")) return "tr";

  // 2. Cookie'den algıla
  const match = document.cookie.match(/(?:^|; )lang=(tr|en|es)/);
  if (match) return match[1] as Lang;

  // 3. Varsayılan
  return "tr";
}

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("tr");
  const [usdRate, setUsdRate] = useState(DEFAULT_USD_RATE);

  // Sayfa yüklendiğinde dil algıla
  useEffect(() => {
    setLang(detectLang());
  }, []);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const { db } = await import("./firebase");
        const snap = await getDoc(doc(db, "mindid_settings", "general"));
        if (snap.exists() && snap.data().usdRate) {
          setUsdRate(snap.data().usdRate);
        }
      } catch {
        // Keep default rate
      }
    };
    fetchRate();
  }, []);

  const changeLang = useCallback((newLang: Lang) => {
    setLang(() => {
      // Cookie'yi güncelle
      document.cookie = `lang=${newLang}; path=/; max-age=${365 * 24 * 60 * 60}`;
      // URL'yi güncelle (SEO-friendly)
      const currentPath = window.location.pathname.replace(/^\/(tr|en|es)/, "") || "/";
      const newPath = newLang === "tr" ? currentPath : `/${newLang}${currentPath === "/" ? "" : currentPath}`;
      window.history.replaceState(null, "", newPath);
      return newLang;
    });
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const langOrder: Lang[] = ["tr", "en", "es"];
      const currentIndex = langOrder.indexOf(prev);
      const newLang = langOrder[(currentIndex + 1) % langOrder.length];
      // Cookie'yi güncelle
      document.cookie = `lang=${newLang}; path=/; max-age=${365 * 24 * 60 * 60}`;
      // URL'yi güncelle (SEO-friendly)
      const currentPath = window.location.pathname.replace(/^\/(tr|en|es)/, "") || "/";
      const newPath = newLang === "tr" ? currentPath : `/${newLang}${currentPath === "/" ? "" : currentPath}`;
      window.history.replaceState(null, "", newPath);
      return newLang;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      // Seçili dilde varsa onu kullan, yoksa İngilizce'ye düş, o da yoksa key döndür
      return translations[key]?.[lang] ?? translations[key]?.["en"] ?? key;
    },
    [lang]
  );

  const formatPrice = useCallback(
    (priceTRY: number): string => {
      if (lang === "en") {
        const usd = Math.round(priceTRY * usdRate);
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        }).format(usd);
      }
      if (lang === "es") {
        const eur = Math.round(priceTRY * usdRate * 0.92); // USD → EUR yaklaşık
        return new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
        }).format(eur);
      }
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 0,
      }).format(priceTRY);
    },
    [lang, usdRate]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang: changeLang, toggleLang, t, formatPrice }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
