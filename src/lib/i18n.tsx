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
  "nav.videoProduction": { tr: "AI Video", en: "AI Video", es: "Video IA" },
  "nav.visualStudio": { tr: "AI Görsel", en: "AI Images", es: "Imágenes IA" },
  "nav.templates": { tr: "Şablonlar", en: "Templates", es: "Plantillas" },
  "nav.pricing": { tr: "Planlar", en: "Pricing", es: "Planes" },
  "nav.startFree": { tr: "Ücretsiz Başla", en: "Start Free", es: "Empieza Gratis" },

  // Language selector
  "lang.tr": { tr: "Türkçe", en: "Türkçe", es: "Turco" },
  "lang.en": { tr: "English", en: "English", es: "Inglés" },
  "lang.es": { tr: "Español", en: "Español", es: "Español" },

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
  "cta.trust": {
    tr: "50 kredi hediye · Kart gerekmez · İstediğin zaman iptal et",
    en: "50 free credits · No credit card · Cancel anytime",
    es: "50 créditos gratis · Sin tarjeta · Cancela cuando quieras",
  },

  // Logo Wall
  "logowall.title": { tr: "Güvenilir Markalar Bize Güveniyor", en: "Trusted by Leading Brands", es: "Marcas Líderes Confían en Nosotros" },

  // Services section headline
  "services.headline": {
    tr: "Self-service AI içerik stüdyosu",
    en: "Self-service AI content studio",
    es: "Estudio de contenido IA autoservicio",
  },
  "services.subtitle": {
    tr: "Video, görsel, avatar ve sosyal içerik — kredi bazlı, anında. Tarayıcından üret, hemen indir.",
    en: "Video, images, avatars and social content — credit-based, instant. Generate in-browser, download now.",
    es: "Video, imágenes, avatares y contenido social — basado en créditos, instantáneo. Genera en el navegador, descarga ya.",
  },

  // SaaS service cards
  "service.video.name": { tr: "AI Video", en: "AI Video", es: "Video IA" },
  "service.video.desc": { tr: "Reels, reklam, ürün ve kurumsal videolar — tek panelden.", en: "Reels, ads, product and corporate videos — one panel.", es: "Reels, anuncios y videos corporativos — un solo panel." },
  "service.image.name": { tr: "AI Görsel", en: "AI Images", es: "Imágenes IA" },
  "service.image.desc": { tr: "Ürün, kampanya ve sosyal medya görselleri.", en: "Product, campaign and social images.", es: "Imágenes de producto, campaña y sociales." },
  "service.avatar.name": { tr: "Dijital Avatar", en: "Digital Avatar", es: "Avatar Digital" },
  "service.avatar.desc": { tr: "Marka avatarınla sonsuz sahne.", en: "Endless scenes with your brand avatar.", es: "Escenas infinitas con tu avatar de marca." },
  "service.social.name": { tr: "Sosyal İçerik", en: "Social Content", es: "Contenido Social" },
  "service.social.desc": { tr: "Post, story, banner — platform boyutları otomatik.", en: "Posts, stories, banners — platform sizes auto-handled.", es: "Publicaciones, stories, banners — tamaños automáticos." },
  "service.tryNow": { tr: "Hemen Dene", en: "Try Now", es: "Probar Ahora" },
  "service.creditsPerRun": { tr: "kredi / üretim", en: "credits / run", es: "créditos / ejecución" },

  // FAQ title (questions live in saas.faq.*)
  "faq.title": { tr: "Sıkça Sorulan Sorular", en: "Frequently Asked Questions", es: "Preguntas Frecuentes" },

  // About
  "about.subtitle": {
    tr: "Markaların reels, ürün görseli ve dijital avatarlarını saniyeler içinde üretebilmesi için bir AI içerik stüdyosu kurduk.",
    en: "We built an AI content studio so brands can generate reels, product images and digital avatars in seconds.",
    es: "Construimos un estudio de contenido IA para que las marcas generen reels, imágenes de producto y avatares en segundos.",
  },
  "about.desc": {
    tr: "MindID, markalar için self-service AI içerik üretim platformudur. Kayıt ol, kredi al, hazır şablonlardan üret — stüdyo, çekim ekibi, brief ve revizyon trafiği yok. Ekibimiz; AI mühendisleri, ürün geliştiriciler ve içerik tasarımcılarından oluşur.",
    en: "MindID is a self-service AI content platform for brands. Sign up, get credits, generate from ready-made templates — no studio, no crew, no brief or revision loops. Our team is made of AI engineers, product builders and content designers.",
    es: "MindID es una plataforma de contenido IA autoservicio. Regístrate, obtén créditos y genera desde plantillas — sin estudios, sin equipos ni briefs. Nuestro equipo está formado por ingenieros de IA, product builders y diseñadores de contenido.",
  },

  // Testimonials
  "testimonials.title": { tr: "Kullanıcılarımız ne diyor?", en: "What our users say", es: "Lo que dicen nuestros usuarios" },
  "testimonials.subtitle": { tr: "MindID'i kullanan markaların deneyimleri", en: "Stories from brands using MindID", es: "Historias de marcas que usan MindID" },
  "testimonial.1.name": { tr: "Mehmet Yılmaz", en: "Mehmet Yilmaz", es: "Mehmet Yilmaz" },
  "testimonial.1.role": { tr: "Pazarlama Müdürü, Tekno Elektronik", en: "Marketing Director, Tekno Electronics", es: "Director de Marketing, Tekno Electronics" },
  "testimonial.1.text": {
    tr: "Reels üretimi için ayrı bir ekip tutmaya gerek kalmadı. MindID'le her hafta 10+ video çıkarıyoruz, ekip 1 kişi.",
    en: "No more separate teams for reels production. We ship 10+ videos a week with MindID — one person.",
    es: "Ya no necesitamos un equipo aparte para reels. Sacamos 10+ videos por semana con MindID — una sola persona.",
  },
  "testimonial.1.service": { tr: "AI Video", en: "AI Video", es: "Video IA" },
  "testimonial.2.name": { tr: "Ayşe Kaya", en: "Ayse Kaya", es: "Ayse Kaya" },
  "testimonial.2.role": { tr: "E-Ticaret Direktörü, Moda Atölyesi", en: "E-Commerce Director, Fashion Atelier", es: "Directora E-Commerce, Moda Atölyesi" },
  "testimonial.2.text": {
    tr: "350 ürünlük kataloğun tüm görselleri MindID ile bir hafta sonu içinde hazırdı. Self-service yapı bizim için oyun değiştirici.",
    en: "All visuals for a 350-product catalog were ready over one weekend with MindID. The self-service flow is a game-changer.",
    es: "Todos los visuales de un catálogo de 350 productos quedaron listos en un fin de semana con MindID. El autoservicio lo cambia todo.",
  },
  "testimonial.2.service": { tr: "AI Görsel", en: "AI Images", es: "Imágenes IA" },
  "testimonial.3.name": { tr: "Burak Demir", en: "Burak Demir", es: "Burak Demir" },
  "testimonial.3.role": { tr: "Kurucu, Demir Mobilya", en: "Founder, Demir Furniture", es: "Fundador, Demir Mobilya" },
  "testimonial.3.text": {
    tr: "Aboneliğe geçtikten bir ay sonra Instagram içerik üretim hızımız 4 katına çıktı. Kredi sistemi gayet adil.",
    en: "Our Instagram production speed 4x'd in the first month on subscription. The credit system is fair and predictable.",
    es: "Nuestra velocidad de producción en Instagram se cuadriplicó al mes de la suscripción. El sistema de créditos es justo.",
  },
  "testimonial.3.service": { tr: "AI Video", en: "AI Video", es: "Video IA" },
  "testimonial.4.name": { tr: "Elif Çelik", en: "Elif Celik", es: "Elif Celik" },
  "testimonial.4.role": { tr: "Marka Yöneticisi, Çelik Kozmetik", en: "Brand Manager, Celik Cosmetics", es: "Gerente de Marca, Celik Cosmetics" },
  "testimonial.4.text": {
    tr: "Aynı ürünü 12 farklı sahnede tek tıkla üretebilmek dönüşüm oranımızı %40 artırdı. A/B testlerimiz hızlandı.",
    en: "Generating 12 scenes of the same product with one click boosted our conversion 40%. A/B testing is so much faster now.",
    es: "Generar el mismo producto en 12 escenas con un clic subió nuestra conversión un 40%.",
  },
  "testimonial.4.service": { tr: "AI Görsel", en: "AI Images", es: "Imágenes IA" },
  "testimonial.5.name": { tr: "Ahmet Özkan", en: "Ahmet Ozkan", es: "Ahmet Ozkan" },
  "testimonial.5.role": { tr: "İçerik Direktörü, Özkan Medya", en: "Content Director, Ozkan Media", es: "Director de Contenido, Ozkan Media" },
  "testimonial.5.text": {
    tr: "Şablon kütüphanesi sürekli güncelleniyor. Trend yakaladığımız anda aynı gün içerik üretiyoruz.",
    en: "The template library updates constantly. We catch a trend and ship same-day content.",
    es: "La biblioteca de plantillas se actualiza constantemente. Atrapamos una tendencia y publicamos el mismo día.",
  },
  "testimonial.5.service": { tr: "AI Video", en: "AI Video", es: "Video IA" },
  "testimonial.6.name": { tr: "Zeynep Aras", en: "Zeynep Aras", es: "Zeynep Aras" },
  "testimonial.6.role": { tr: "Satış Direktörü, Aras Gıda", en: "Sales Director, Aras Foods", es: "Directora de Ventas, Aras Foods" },
  "testimonial.6.text": {
    tr: "Growth planına geçtikten sonra tüm sosyal medya çıktılarımızı in-house yapmaya başladık. Aylık fatura küçük, çıktı büyük.",
    en: "After moving to the Growth plan we brought everything in-house. The bill is small, the output is huge.",
    es: "Con el plan Growth trajimos todo internamente. La factura es pequeña, la producción es enorme.",
  },
  "testimonial.6.service": { tr: "AI Görsel", en: "AI Images", es: "Imágenes IA" },
  "testimonial.7.name": { tr: "Emre Şahin", en: "Emre Sahin", es: "Emre Sahin" },
  "testimonial.7.role": { tr: "Dijital Pazarlama Lideri, Şahin Holding", en: "Digital Marketing Lead, Sahin Holding", es: "Líder de Marketing Digital, Sahin Holding" },
  "testimonial.7.text": {
    tr: "API entegrasyonuyla MindID'i kendi panelimize bağladık. Müşterilerimiz tek tıkla AI reklam üretebiliyor.",
    en: "We integrated MindID via API into our own portal. Clients generate AI ads with one click.",
    es: "Integramos MindID a nuestro panel vía API. Nuestros clientes generan anuncios con un solo clic.",
  },
  "testimonial.7.service": { tr: "API", en: "API", es: "API" },
  "testimonial.8.name": { tr: "Selin Toprak", en: "Selin Toprak", es: "Selin Toprak" },
  "testimonial.8.role": { tr: "Kurucu, Toprak Aksesuar", en: "Founder, Toprak Accessories", es: "Fundadora, Toprak Accessories" },
  "testimonial.8.text": {
    tr: "Avatar özelliği sayesinde markamın yüzünü hiç kameraya çıkmadan oluşturdum. Tüm reklamlarda aynı kişi görünüyor.",
    en: "With the avatar feature I built my brand face without ever being on camera. Every ad shows the same person.",
    es: "Con la función de avatar creé la cara de mi marca sin salir frente a la cámara.",
  },
  "testimonial.8.service": { tr: "Avatar", en: "Avatar", es: "Avatar" },

  // Footer
  "footer.rights": { tr: "Tüm hakları saklıdır.", en: "All rights reserved.", es: "Todos los derechos reservados." },
  "footer.resources": { tr: "Kaynaklar", en: "Resources", es: "Recursos" },
  "footer.company": { tr: "Şirket", en: "Company", es: "Empresa" },
  "footer.contact": { tr: "İletişim", en: "Contact", es: "Contacto" },
  "footer.aiReels": { tr: "AI Reels & Video", en: "AI Reels & Video", es: "Reels y Video IA" },
  "footer.aiProductPhoto": { tr: "AI Ürün Görseli", en: "AI Product Images", es: "Imágenes de Producto IA" },
  "footer.aiAvatar": { tr: "Dijital Avatar", en: "Digital Avatar", es: "Avatar Digital" },
  "footer.ecommerce": { tr: "E-ticaret Şablonları", en: "E-commerce Templates", es: "Plantillas E-commerce" },
  "footer.aboutMindid": { tr: "MindID Hakkında", en: "About MindID", es: "Acerca de MindID" },
  "footer.faq": { tr: "SSS", en: "FAQ", es: "Preguntas Frecuentes" },
  "footer.testimonials": { tr: "Kullanıcı Yorumları", en: "User Stories", es: "Historias de Usuarios" },
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
    es: "Empieza gratis y escala según crezcas. 2 meses gratis en planes anuales.",
  },
  "plans.free.name": { tr: "Ücretsiz", en: "Free", es: "Gratis" },
  "plans.free.tagline": { tr: "Dene ve gör", en: "Try and see", es: "Pruébalo" },
  "plans.starter.name": { tr: "Başlangıç", en: "Starter", es: "Inicial" },
  "plans.starter.tagline": { tr: "Solo girişimciler için", en: "For solo creators", es: "Para creadores solos" },
  "plans.growth.name": { tr: "Büyüme", en: "Growth", es: "Crecimiento" },
  "plans.growth.tagline": { tr: "Aktif markalar için", en: "For active brands", es: "Marcas activas" },
  "plans.scale.name": { tr: "Ölçek", en: "Scale", es: "Escala" },
  "plans.scale.tagline": { tr: "Yüksek hacimli takımlar için", en: "For high-volume teams", es: "Equipos de alto volumen" },
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
  "saas.faq.q1": { tr: "MindID nedir?", en: "What is MindID?", es: "¿Qué es MindID?" },
  "saas.faq.a1": {
    tr: "MindID, markalar için self-service AI içerik üretim platformudur. Tarayıcıdan kayıt olur, kredi alır ve hazır şablonlarla reels, ürün görseli ve dijital avatar üretirsin. Stüdyo, ekip, brief yok.",
    en: "MindID is a self-service AI content platform for brands. Sign up in your browser, get credits and use templates to generate reels, product images and digital avatars. No studio, no crew, no briefs.",
    es: "MindID es una plataforma de contenido IA autoservicio. Regístrate, obtén créditos y usa plantillas para generar reels, imágenes de producto y avatares digitales.",
  },
  "saas.faq.q2": { tr: "Kredi sistemi nasıl çalışıyor?", en: "How does the credit system work?", es: "¿Cómo funcionan los créditos?" },
  "saas.faq.a2": {
    tr: "Her plan aylık kredi içerir. Her AI üretimi, çıktının türüne göre belli kadar kredi tüketir — görseller 2 kredi'den, kısa videolar 15 kredi'den, avatar 25 kredi'den başlar. Yeni hesaplara 50 kredi hediye.",
    en: "Every plan includes monthly credits. Each AI generation uses a small number of credits depending on the output type — images from 2 credits, short videos from 15 credits, avatars from 25 credits. New accounts get 50 free credits.",
    es: "Cada plan incluye créditos mensuales. Cada generación IA usa créditos según el tipo — imágenes desde 2, videos cortos desde 15, avatares desde 25. Las cuentas nuevas reciben 50 créditos gratis.",
  },
  "saas.faq.q3": { tr: "Teknik bilgi gerekiyor mu?", en: "Do I need technical skills?", es: "¿Necesito conocimientos técnicos?" },
  "saas.faq.a3": {
    tr: "Hayır. MindID şablon önceliklidir. Bir şablon seç, marka bilgilerini (logo, ürün fotoğrafı, metin) gir — AI gerisini halleder. Pro kullanıcılar özel prompt yazabilir.",
    en: "No. MindID is template-first. Pick a template, drop in your brand details (logo, product photo, copy) and AI does the rest. Pro users can write custom prompts.",
    es: "No. MindID es template-first. Elige una plantilla, ingresa tu marca (logo, foto de producto, texto) y la IA hace el resto.",
  },
  "saas.faq.q4": { tr: "Çıktıları ticari olarak kullanabilir miyim?", en: "Can I use outputs commercially?", es: "¿Puedo usar los resultados comercialmente?" },
  "saas.faq.a4": {
    tr: "Evet. Ücretli planlar (Başlangıç ve üstü) watermark olmadan tam ticari kullanım hakkı içerir. Ücretsiz planda watermark vardır ve sadece test amaçlıdır.",
    en: "Yes. Paid plans (Starter and above) include full commercial usage rights with no watermark. The Free plan adds a watermark and is intended for testing.",
    es: "Sí. Los planes pagados (Starter y superiores) incluyen uso comercial sin marca de agua. El plan Free lleva marca de agua y es para pruebas.",
  },
  "saas.faq.q5": { tr: "API var mı?", en: "Is there an API?", es: "¿Hay API?" },
  "saas.faq.a5": {
    tr: "Evet — Scale (Ölçek) planı API erişimi ve webhook içerir. MindID'i kendi akışına veya ürününe entegre edebilirsin.",
    en: "Yes — the Scale plan includes API access and webhooks so you can integrate MindID into your existing workflow or product.",
    es: "Sí — el plan Scale incluye acceso a API y webhooks para integrar MindID en tu flujo o producto.",
  },
  "saas.faq.q6": { tr: "İstediğim zaman iptal edebilir miyim?", en: "Can I cancel anytime?", es: "¿Puedo cancelar en cualquier momento?" },
  "saas.faq.a6": {
    tr: "Evet. Aboneliğini panelden tek tıkla iptal edebilirsin. Fatura döneminin sonuna kadar erişimin devam eder. Kredi paketleri ise süresizdir.",
    en: "Yes. Cancel your subscription anytime from your dashboard. Access continues until the end of your billing period. Credit packs never expire.",
    es: "Sí. Cancela tu suscripción desde el panel cuando quieras. Tu acceso continúa hasta el fin del período facturado.",
  },
  "saas.faq.q7": { tr: "Üretim ne kadar sürer?", en: "How fast are generations?", es: "¿Cuánto tardan las generaciones?" },
  "saas.faq.a7": {
    tr: "AI görseller saniyeler içinde, kısa videolar dakikalar içinde, avatarlar ise kuyruğa göre 1-5 dakika içinde hazır olur. Growth ve Scale planında öncelikli kuyruk avantajı vardır.",
    en: "AI images take seconds, short videos take minutes, and avatars take 1-5 minutes depending on the queue. Growth and Scale plans get priority queue.",
    es: "Las imágenes en segundos, los videos cortos en minutos, los avatares en 1-5 minutos. Growth y Scale tienen cola prioritaria.",
  },
  "saas.faq.q8": { tr: "Verilerim güvende mi?", en: "Is my data safe?", es: "¿Están seguros mis datos?" },
  "saas.faq.a8": {
    tr: "Evet. Tüm yüklenen dosyalar şifrelenir ve hesabınla ilişkilendirilir. AI modellerimiz eğitim için müşteri verisi kullanmaz. KVKK ve GDPR uyumlu çalışıyoruz.",
    en: "Yes. All uploads are encrypted and tied to your account. Our AI models don't use customer data for training. We're KVKK and GDPR compliant.",
    es: "Sí. Todas las cargas están cifradas y vinculadas a tu cuenta. Nuestros modelos no usan datos de clientes para entrenamiento. Cumplimos KVKK y GDPR.",
  },
};

const I18nContext = createContext<I18nContextType | null>(null);

// Cookie'den veya URL'den dili algıla
function detectLang(): Lang {
  if (typeof window === "undefined") return "tr";

  if (window.location.pathname.startsWith("/en")) return "en";
  if (window.location.pathname.startsWith("/es")) return "es";
  if (window.location.pathname.startsWith("/tr")) return "tr";

  const match = document.cookie.match(/(?:^|; )lang=(tr|en|es)/);
  if (match) return match[1] as Lang;

  return "tr";
}

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("tr");
  const [usdRate, setUsdRate] = useState(DEFAULT_USD_RATE);

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
      document.cookie = `lang=${newLang}; path=/; max-age=${365 * 24 * 60 * 60}`;
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
      document.cookie = `lang=${newLang}; path=/; max-age=${365 * 24 * 60 * 60}`;
      const currentPath = window.location.pathname.replace(/^\/(tr|en|es)/, "") || "/";
      const newPath = newLang === "tr" ? currentPath : `/${newLang}${currentPath === "/" ? "" : currentPath}`;
      window.history.replaceState(null, "", newPath);
      return newLang;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
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
        const eur = Math.round(priceTRY * usdRate * 0.92);
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
