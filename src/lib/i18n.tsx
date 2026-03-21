"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { doc, getDoc } from "firebase/firestore";

export type Lang = "tr" | "en";

type I18nContextType = {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
  formatPrice: (priceTRY: number) => string;
};

const DEFAULT_USD_RATE = 0.028;

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.services": { tr: "Hizmetler", en: "Services" },
  "nav.portfolio": { tr: "Portfolyo", en: "Portfolio" },
  "nav.about": { tr: "MindID Ne Yapar?", en: "What Does MindID Do?" },
  "nav.faq": { tr: "SSS", en: "FAQ" },
  "nav.testimonials": { tr: "Yorumlar", en: "Testimonials" },
  "nav.contact": { tr: "İletişim", en: "Contact" },
  "nav.start": { tr: "Hemen Başla", en: "Get Started" },

  // Hero
  "hero.badge": { tr: "AI Video Prodüksiyon Ajansı", en: "AI Video Production Agency" },
  "hero.title1": { tr: "Yeni Nesil", en: "Next Gen" },
  "hero.title2": { tr: "Reklamcılık", en: "Advertising" },
  "hero.desc": {
    tr: "Yapay zeka, reklam dünyasını kökten değiştiriyor. Geleneksel bir reklam filmi için ortalama 150.000₺ ile 500.000₺ arasında bütçe ayırmanız gerekirken, yapay zeka destekli prodüksiyonla aynı profesyonel kaliteyi %60'a varan tasarrufla elde ediyorsunuz. Stüdyo kirası yok, kalabalık ekip yok, haftalarca sürecek çekim planı yok. Sadece akıllı teknoloji ve sonuç odaklı üretim.",
    en: "AI is fundamentally changing advertising. While traditional ad production requires budgets of $4,200 to $14,000, AI-powered production delivers the same professional quality with up to 60% savings. No studio rental, no large crews, no weeks of shooting. Just smart technology and result-driven production.",
  },
  "hero.video_title": { tr: "Tanıtım Videosu", en: "Intro Video" },

  // Services section headline
  "services.headline": {
    tr: "Bütçenize Göre AI Reklam Filminizi Oluşturun",
    en: "Create Your AI Ad Film Based on Your Budget",
  },
  "services.subtitle": {
    tr: "En uygun fiyattan başlayın, markanıza özel profesyonel video içerikler üretin.",
    en: "Start from the most affordable option, produce professional video content tailored to your brand.",
  },

  // Service cards
  "service.reels": { tr: "Instagram Reels İçerik (AI)", en: "Instagram Reels Content (AI)" },
  "service.reels.desc": { tr: "Sosyal medya için kısa format AI video içerik üretimi", en: "Short-form AI video content for social media" },
  "service.product": { tr: "Ürün & Hizmet Reklamı (AI)", en: "Product & Service Ads (AI)" },
  "service.product.desc": { tr: "AI destekli ürün tanıtım, hizmet reklamı ve yaratıcı içerik tasarımı", en: "AI-powered product showcase, service ads and creative content design" },
  "service.campaign": { tr: "Kampanya Reklam Filmi", en: "Campaign Ad Film" },
  "service.campaign.desc": { tr: "Kampanya odaklı profesyonel reklam filmi prodüksiyonu", en: "Campaign-focused professional ad film production" },
  "service.corporate": { tr: "Kurumsal Tanıtım & Reklam Filmi", en: "Corporate Intro & Ad Film" },
  "service.corporate.desc": { tr: "Kurumsal tanıtım ve reklam filmi - tek paket çözüm", en: "Corporate introduction and ad film - all-in-one solution" },
  "service.avatar": { tr: "AI Avatar Oluştur", en: "Create AI Avatar" },
  "service.avatar.desc": { tr: "AI ile kendi dijital avatarını oluştur - video çekimine son", en: "Create your digital avatar with AI - no more video shoots" },
  "service.product-photo": { tr: "AI Ürün Görseli", en: "AI Product Photography" },
  "service.product-photo.desc": {
    tr: "E-ticaret ve katalog için AI destekli profesyonel ürün fotoğrafçılığı",
    en: "AI-powered professional product photography for e-commerce and catalogs",
  },
  "service.portfolio": { tr: "Portfolyo", en: "Portfolio" },
  "service.portfolio.desc": { tr: "Yapay zeka ile ürettiğimiz çalışmalarımızı inceleyin", en: "Explore our AI-produced works" },
  "service.from": { tr: "Başlayan", en: "Starting" },

  // Portfolio
  "portfolio.title": { tr: "Portfolyo", en: "Portfolio" },
  "portfolio.subtitle": { tr: "Yapay zeka ile ürettiğimiz çalışmalarımızı inceleyin", en: "Explore our AI-produced works" },
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
  "config.colorCount": { tr: "Renk Sayısı (ürün başına)", en: "Color Count (per product)" },
  "config.colorCount.desc": { tr: "Her ürün için kaç farklı renk varyasyonu çekilecek?", en: "How many color variations per product?" },
  "config.colorCount.unit": { tr: "renk başına", en: "per color" },
  "config.photoVisualStyle": { tr: "Görsel Stili", en: "Visual Style" },
  "config.background": { tr: "Arka Plan", en: "Background" },
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

  // About
  "about.title": { tr: "MindID Ne Yapar?", en: "What Does MindID Do?" },
  "about.subtitle": {
    tr: "Yapay zeka ve yaratıcı vizyonu birleştirerek markanızın hikâyesini anlatıyoruz.",
    en: "We combine AI and creative vision to tell your brand's story.",
  },
  "about.desc": {
    tr: "MindID, yapay zeka destekli video prodüksiyon alanında Türkiye'nin öncü ajanslarından biridir. Geleneksel prodüksiyon süreçlerinin yüksek maliyetlerini ve uzun sürelerini ortadan kaldırarak, markalara profesyonel kalitede video içerikler sunuyoruz. Ekibimiz; yapay zeka mühendisleri, yaratıcı yönetmenler, ses tasarımcıları ve dijital pazarlama uzmanlarından oluşur.",
    en: "MindID is one of Turkey's pioneering agencies in AI-powered video production. By eliminating the high costs and long timelines of traditional production, we deliver professional quality video content to brands. Our team consists of AI engineers, creative directors, sound designers, and digital marketing experts.",
  },
  "about.team": { tr: "Ekibimiz", en: "Our Team" },

  // Avatar
  "avatar.title": { tr: "AI Avatar Oluştur", en: "Create AI Avatar" },
  "avatar.subtitle": { tr: "Kamera karşısına geçmeden, profesyonel video içerikleri oluşturun", en: "Create professional video content without being on camera" },
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
  "testimonials.title": { tr: "Müşteri Yorumları", en: "Customer Testimonials" },
  "testimonials.subtitle": { tr: "Müşterilerimizin deneyimleri", en: "What our clients say" },
  "testimonial.1.name": { tr: "Mehmet Yılmaz", en: "Mehmet Yilmaz" },
  "testimonial.1.role": { tr: "Pazarlama Müdürü, Tekno Elektronik", en: "Marketing Director, Tekno Electronics" },
  "testimonial.1.text": {
    tr: "AI video prodüksiyon ile kampanya filmimizi geleneksel yöntemin yarı maliyetine çıkardık. Kalite beklentimizin çok üzerindeydi.",
    en: "We produced our campaign film at half the cost of traditional methods with AI video production. Quality far exceeded our expectations.",
  },
  "testimonial.1.service": { tr: "AI Video", en: "AI Video" },
  "testimonial.2.name": { tr: "Ayşe Kaya", en: "Ayse Kaya" },
  "testimonial.2.role": { tr: "E-Ticaret Direktörü, Moda Atölyesi", en: "E-Commerce Director, Fashion Atelier" },
  "testimonial.2.text": {
    tr: "350 ürünlük katalog çekimimizi AI ile 1 haftada tamamladık. Stüdyo çekimine göre %70 tasarruf ettik.",
    en: "We completed our 350-product catalog shoot with AI in 1 week. We saved 70% compared to studio photography.",
  },
  "testimonial.2.service": { tr: "AI Ürün Görseli", en: "AI Product Photo" },
  "testimonial.3.name": { tr: "Burak Demir", en: "Burak Demir" },
  "testimonial.3.role": { tr: "Kurucu, Demir Mobilya", en: "Founder, Demir Furniture" },
  "testimonial.3.text": {
    tr: "Kurumsal tanıtım filmimizi 3 günde aldık. Eskiden bunun için haftalarca bekliyorduk. MindID ile çalışmak büyük avantaj.",
    en: "We received our corporate intro film in 3 days. We used to wait weeks for this. Working with MindID is a huge advantage.",
  },
  "testimonial.3.service": { tr: "AI Video", en: "AI Video" },
  "testimonial.4.name": { tr: "Elif Çelik", en: "Elif Celik" },
  "testimonial.4.role": { tr: "Marka Yöneticisi, Çelik Kozmetik", en: "Brand Manager, Celik Cosmetics" },
  "testimonial.4.text": {
    tr: "Ürün görsellerimizi farklı arka planlarda ve renklerde AI ile oluşturduk. E-ticaret dönüşüm oranımız %40 arttı.",
    en: "We created our product visuals in different backgrounds and colors with AI. Our e-commerce conversion rate increased by 40%.",
  },
  "testimonial.4.service": { tr: "AI Ürün Görseli", en: "AI Product Photo" },
  "testimonial.5.name": { tr: "Ahmet Özkan", en: "Ahmet Ozkan" },
  "testimonial.5.role": { tr: "Genel Müdür, Özkan İnşaat", en: "CEO, Ozkan Construction" },
  "testimonial.5.text": {
    tr: "Instagram Reels içeriklerimizi AI ile üretmeye başladık. Takipçi etkileşimimiz 3 katına çıktı, bütçemiz ise aynı kaldı.",
    en: "We started producing our Instagram Reels content with AI. Our follower engagement tripled while our budget stayed the same.",
  },
  "testimonial.5.service": { tr: "AI Video", en: "AI Video" },
  "testimonial.6.name": { tr: "Zeynep Aras", en: "Zeynep Aras" },
  "testimonial.6.role": { tr: "Satış Direktörü, Aras Gıda", en: "Sales Director, Aras Foods" },
  "testimonial.6.text": {
    tr: "Yeni ürün serimizin 120 çeşit görseli 5 farklı arka planla hazırlandı. Geleneksel çekimle aylar sürecek iş günler içinde bitti.",
    en: "120 product photos for our new line were created with 5 different backgrounds. Work that would take months with traditional shoots was done in days.",
  },
  "testimonial.6.service": { tr: "AI Ürün Görseli", en: "AI Product Photo" },
  "testimonial.7.name": { tr: "Emre Şahin", en: "Emre Sahin" },
  "testimonial.7.role": { tr: "Dijital Pazarlama Uzmanı, Şahin Otomotiv", en: "Digital Marketing Specialist, Sahin Automotive" },
  "testimonial.7.text": {
    tr: "Kampanya reklam filmimiz için 5 farklı versiyon ürettik. A/B test yapıp en iyi performans gösteren videoyu belirledik.",
    en: "We produced 5 different versions for our campaign ad. We A/B tested and identified the best performing video.",
  },
  "testimonial.7.service": { tr: "AI Video", en: "AI Video" },
  "testimonial.8.name": { tr: "Selin Toprak", en: "Selin Toprak" },
  "testimonial.8.role": { tr: "Kurucu, Toprak Aksesuar", en: "Founder, Toprak Accessories" },
  "testimonial.8.text": {
    tr: "Takı koleksiyonumuzun 360° görsellerini AI ile oluşturduk. Müşterilerimiz ürünleri döndürerek inceleyebiliyor, satışlarımız arttı.",
    en: "We created 360° visuals of our jewelry collection with AI. Customers can rotate and examine products, boosting our sales.",
  },
  "testimonial.8.service": { tr: "AI Ürün Görseli", en: "AI Product Photo" },

  // Footer
  "footer.rights": { tr: "Tüm hakları saklıdır.", en: "All rights reserved." },
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("tr");
  const [usdRate, setUsdRate] = useState(DEFAULT_USD_RATE);

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
        const usd = Math.round(priceTRY * usdRate);
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
    [lang, usdRate]
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
