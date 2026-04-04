import type {
  DurationOption,
  ScenarioType,
  VoiceOption,
  MusicOption,
  VisualStyle,
  PostProductionOption,
  RevisionPackage,
  ProductCountOption,
  PhotoAngleOption,
  PhotoModelOption,
  ColorPackageOption,
  PhotoVisualStyle,
  BackgroundOption,
  PhotoRetouchOption,
} from "./types";

// ─────────────────────────────────────────────
// Hizmet Taban Fiyatları (2026 Q1 — Enflasyon + Pazar Uyumlu)
// Geleneksel çarpanlar: Türkiye pazar araştırmasına göre güncellendi
// Kaynak: Medyabox, SanatYapım, BozboraMedya 2025-2026 fiyat listeleri
// ─────────────────────────────────────────────
export const SERVICE_TYPES = [
  { id: "reels", nameKey: "service.reels", descKey: "service.reels.desc", basePrice: 990, icon: "📱", traditionalMultiplier: 3.5 },
  { id: "product-photo", nameKey: "service.product-photo", descKey: "service.product-photo.desc", basePrice: 490, icon: "📸", traditionalMultiplier: 4.0 },
  { id: "product", nameKey: "service.product", descKey: "service.product.desc", basePrice: 9900, icon: "🎯", traditionalMultiplier: 3.5 },
  { id: "campaign", nameKey: "service.campaign", descKey: "service.campaign.desc", basePrice: 19900, icon: "🚀", traditionalMultiplier: 3.2 },
  { id: "corporate", nameKey: "service.corporate", descKey: "service.corporate.desc", basePrice: 29900, icon: "🏢", traditionalMultiplier: 3.0 },
  { id: "avatar", nameKey: "service.avatar", descKey: "service.avatar.desc", basePrice: 6900, icon: "🤖", traditionalMultiplier: 0 },
  { id: "social-media", nameKey: "service.social-media", descKey: "service.social-media.desc", basePrice: 4900, icon: "📢", traditionalMultiplier: 2.5 },
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

// ─────────────────────────────────────────────
// VIDEO PARAMETRELERİ
// ─────────────────────────────────────────────

// Süre seçenekleri — psikolojik fiyat bariyerlerine uyumlandı
// 16s→15sn, 24s→30sn, 36s→45sn (yuvarlak değerler)
// 240s ve 360s kaldırıldı (düşük talep)
export const DURATION_OPTIONS: DurationOption[] = [
  { id: "8s", label: "8", seconds: 8, description: "Bumper reklam & hikâye", basePrice: 0 },
  { id: "15s", label: "15", seconds: 15, description: "Pre-roll & kısa spot", basePrice: 999 },
  { id: "30s", label: "30", seconds: 30, description: "Standart dijital reklam", basePrice: 2499 },
  { id: "45s", label: "45", seconds: 45, description: "Detaylı tanıtım", basePrice: 3999 },
  { id: "60s", label: "60", seconds: 60, description: "1 dakika tam reklam filmi", basePrice: 5999 },
  { id: "90s", label: "90", seconds: 90, description: "1.5 dakika tanıtım filmi", basePrice: 9999 },
  { id: "120s", label: "120", seconds: 120, description: "2 dakika marka filmi", basePrice: 14999 },
  { id: "180s", label: "180", seconds: 180, description: "3 dakika kurumsal", basePrice: 22999 },
  { id: "300s", label: "300", seconds: 300, description: "5 dakika uzun format", basePrice: 39999 },
];

// Senaryo — fiyatlar 2026 enflasyona uyumlandı (+%20-25)
export const SCENARIO_OPTIONS: ScenarioType[] = [
  { id: "basic", label: "Temel Senaryo", description: "Dahil — basit anlatı yapısı", price: 0 },
  { id: "storytelling", label: "Hikâye Anlatımı", description: "Duygusal bağ kuran hikâye senaryosu", price: 2999 },
  { id: "cinematic", label: "Sinematik Senaryo", description: "Film kalitesinde dramatik kurgu", price: 5999 },
  { id: "custom", label: "Özel Senaryo", description: "Sıfırdan yazılan premium senaryo", price: 9999 },
];

// Seslendirme
export const VOICE_OPTIONS: VoiceOption[] = [
  { id: "none", label: "Seslendirme Yok", description: "Dahil — sadece müzik & efekt", price: 0 },
  { id: "ai-standard", label: "AI Ses (Standart)", description: "Kaliteli yapay zeka sesi — 30+ dil", price: 999 },
  { id: "ai-premium", label: "AI Ses (Premium)", description: "Doğal tonlamalı premium ses kalitesi", price: 2499 },
  { id: "ai-clone", label: "Ses Klonlama", description: "Kendi sesinizin AI kopyası — marka sesi", price: 4999 },
];

// Müzik
export const MUSIC_OPTIONS: MusicOption[] = [
  { id: "basic", label: "Temel Müzik", description: "Dahil — lisanslı stok müzik", price: 0 },
  { id: "ai-composed", label: "AI Kompozisyon", description: "AI ile özel bestelenmiş — markanıza özel ton", price: 1999 },
  { id: "custom", label: "Özel Beste / Jingle", description: "Profesyonel besteci ile marka jingle'ı", price: 4999 },
];

// Görsel stil
export const VISUAL_STYLE_OPTIONS: VisualStyle[] = [
  { id: "basic", label: "Temel Görsel", description: "Dahil — standart AI görsel üretim", price: 0 },
  { id: "cinematic-anim", label: "Animasyon / Sinematik", description: "Sinematik veya animasyon tarzı", price: 1499 },
  { id: "ultra-real", label: "Ultra Gerçekçi", description: "Birebir gerçeklik — fotoğraf kalitesi", price: 4999 },
  { id: "hybrid", label: "Hibrit Teknik", description: "Gerçekçi + animasyon karışımı — premium", price: 5999 },
];

// Post-prodüksiyon (çoklu seçim)
export const POST_PRODUCTION_OPTIONS: PostProductionOption[] = [
  { id: "edit-basic", label: "Temel Edit", description: "Dahil — standart kurgu & renk düzeltme", price: 0 },
  { id: "subtitle-voice", label: "Altyazı + Metin + Seslendirme", description: "Animasyonlu altyazı ve seslendirme paketi", price: 3499 },
  { id: "sound-design", label: "Ses Tasarımı", description: "Profesyonel ses miksi, foley ve efektler", price: 4999 },
  { id: "lip-sync", label: "Dudak Senkronu", description: "AI lip-sync teknolojisi — çok dilli", price: 5999 },
  { id: "vfx", label: "Görsel Efektler (VFX)", description: "Özel VFX, partikül ve geçiş efektleri", price: 7499 },
];

// Revizyon — orta seçenek eklendi (mevcut devasa boşluk giderildi)
export const REVISION_PACKAGES: RevisionPackage[] = [
  { id: "base", label: "Temel (2 Revizyon)", count: 2, price: 0 },
  { id: "plus", label: "Artı (4 Revizyon)", count: 4, price: 2999 },
  { id: "unlimited", label: "Sınırsız Revizyon", count: 99, price: 7999 },
];

// ─────────────────────────────────────────────
// ÜRÜN GÖRSELİ PARAMETRELERİ (Yeni Yapı)
// ─────────────────────────────────────────────

// Ürün adedi
export const PRODUCT_COUNT_OPTIONS: ProductCountOption[] = [
  { id: "1-5", label: "1-5 Ürün", description: "Küçük koleksiyon", price: 0 },
  { id: "6-15", label: "6-15 Ürün", description: "Orta koleksiyon", price: 699 },
  { id: "16-30", label: "16-30 Ürün", description: "Geniş koleksiyon", price: 1499 },
  { id: "31-50", label: "31-50 Ürün", description: "Büyük koleksiyon", price: 2499 },
  { id: "51+", label: "50+ Ürün", description: "Mega koleksiyon — özel fiyat", price: 3999 },
];

// ★ YENİ: Açı sayısı (tek açı vs çoklu açı)
export const PHOTO_ANGLE_OPTIONS: PhotoAngleOption[] = [
  { id: "1-angle", label: "Tek Açı", description: "Ürün başına 1 açıdan çekim — ön görünüm", angleCount: 1, price: 0 },
  { id: "2-angle", label: "2 Açı", description: "Ön + arka veya ön + yan görünüm", angleCount: 2, price: 299 },
  { id: "4-angle", label: "4 Açı", description: "Ön, arka, sol, sağ — tam görünüm", angleCount: 4, price: 799 },
  { id: "6-angle", label: "6 Açı + Detay", description: "4 açı + 2 detay/yakın çekim", angleCount: 6, price: 1499 },
];

// ★ YENİ: Model tipi
export const PHOTO_MODEL_OPTIONS: PhotoModelOption[] = [
  { id: "no-model", label: "Modelsiz", description: "Sadece ürün — sade ve profesyonel", price: 0 },
  { id: "ai-model", label: "AI Model", description: "Yapay zeka ile oluşturulmuş model — maliyet avantajı", price: 999 },
  { id: "ai-model-custom", label: "Özel AI Model", description: "Markanıza özel tasarlanmış AI model — sabit yüz", price: 2499 },
  { id: "real-model", label: "Gerçek Model Entegrasyonu", description: "Fotoğrafınızı AI ile entegre edin", price: 3999 },
];

// ★ YENİ: Renk paketi (birim fiyat yerine paket sistemi)
export const COLOR_PACKAGE_OPTIONS: ColorPackageOption[] = [
  { id: "1-color", label: "Tek Renk", description: "Ürün başına 1 renk varyasyonu", includedColors: 1, price: 0 },
  { id: "3-color", label: "3 Renk", description: "En popüler 3 renk varyasyonu", includedColors: 3, price: 399 },
  { id: "5-color", label: "5 Renk", description: "Geniş renk paleti", includedColors: 5, price: 699 },
  { id: "unlimited-color", label: "Sınırsız Renk", description: "Tüm renk varyasyonları — limit yok", includedColors: 99, price: 1299 },
];

// Görsel stili (güncellendi)
export const PHOTO_VISUAL_STYLE_OPTIONS: PhotoVisualStyle[] = [
  { id: "studio", label: "Stüdyo", description: "Klasik stüdyo çekimi — temiz ve profesyonel", price: 0 },
  { id: "lifestyle", label: "Lifestyle", description: "Yaşam tarzı ortamında — doğal his", price: 699 },
  { id: "flat-lay", label: "Flat Lay", description: "Düz yüzey kompozisyon — minimalist", price: 499 },
  { id: "360", label: "360° Görüntü", description: "360 derece dönen ürün görüntüsü", price: 1999 },
];

// Arka plan (güncellendi)
export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  { id: "white", label: "Beyaz", description: "Temiz beyaz arka plan — e-ticaret standart", price: 0 },
  { id: "gradient", label: "Gradient", description: "Yumuşak renk geçişli arka plan", price: 399 },
  { id: "custom-scene", label: "Özel Sahne", description: "Tasarlanmış sahne ortamı — marka uyumlu", price: 999 },
  { id: "natural", label: "Doğal Ortam", description: "Doğal çevre arka planı — dış mekân", price: 1499 },
];

// ★ YENİ: Rötuş & İşlem
export const PHOTO_RETOUCH_OPTIONS: PhotoRetouchOption[] = [
  { id: "basic-retouch", label: "Temel Rötuş", description: "Dahil — otomatik renk & ışık düzeltme", price: 0 },
  { id: "pro-retouch", label: "Profesyonel Rötuş", description: "Detaylı gölge, yansıma, doku iyileştirme", price: 799 },
  { id: "premium-retouch", label: "Premium İşlem", description: "Tam profesyonel post-prod — reklam kalitesi", price: 1999 },
];

// Eski uyumluluk — kaldırıldı, yerine paket sistemi geldi
export const COLOR_COUNT_UNIT_PRICE = 0;

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(price);
};

import type { ServicePackage } from "./types";

export const SERVICE_PACKAGES: Record<string, ServicePackage[]> = {
  reels: [
    {
      id: "reels-starter",
      name: "Başlangıç",
      tagline: "Hızlı sosyal medya içeriği için ideal giriş paketi",
      price: 990,
      highlighted: false,
      features: [
        "8 saniye video",
        "Temel AI görsel üretim",
        "Stok müzik dahil",
        "2 revizyon hakkı",
      ],
      presetIds: { duration: "8s", scenario: "basic", voice: "none", music: "basic", visualStyle: "basic", postProduction: [], revision: "base" },
    },
    {
      id: "reels-growth",
      name: "Büyüme",
      badge: "⭐ EN POPÜLER",
      badgeVariant: "popular",
      tagline: "Markanızı sesli ve müzikli içerikle öne çıkarın",
      price: 3900,
      highlighted: true,
      features: [
        "15 saniye video",
        "AI seslendirme (standart)",
        "AI ile özel müzik",
        "2 revizyon hakkı",
        "Hızlı teslim",
      ],
      presetIds: { duration: "15s", scenario: "basic", voice: "ai-standard", music: "ai-composed", visualStyle: "basic", postProduction: [], revision: "base" },
    },
    {
      id: "reels-pro",
      name: "Profesyonel",
      tagline: "Hikaye anlatan, dönüşüm sağlayan premium içerik",
      price: 7900,
      highlighted: false,
      features: [
        "30 saniye video",
        "Premium AI seslendirme",
        "AI müzik kompozisyon",
        "Sinematik/animasyon tarz",
        "Altyazı + metin animasyonu",
        "4 revizyon hakkı",
      ],
      presetIds: { duration: "30s", scenario: "storytelling", voice: "ai-premium", music: "ai-composed", visualStyle: "cinematic-anim", postProduction: ["subtitle-voice"], revision: "plus" },
    },
    {
      id: "reels-elite",
      name: "Elite",
      badge: "👑 PREMIUM",
      badgeVariant: "anchor",
      tagline: "Markanın kendine özgü sesi ve kimliğiyle",
      price: 14900,
      highlighted: false,
      features: [
        "45 saniye video",
        "Ses klonlama (markanın sesi)",
        "Özel beste & jingle",
        "Hibrit teknik görsel",
        "VFX efektler",
        "Sınırsız revizyon",
      ],
      presetIds: { duration: "45s", scenario: "storytelling", voice: "ai-clone", music: "custom", visualStyle: "hybrid", postProduction: ["vfx"], revision: "unlimited" },
    },
  ],

  "product-photo": [
    {
      id: "photo-basic",
      name: "Temel",
      tagline: "Hızlı ve uygun maliyetli ürün görseli",
      price: 490,
      highlighted: false,
      features: [
        "1-5 ürün görseli",
        "Beyaz stüdyo arka plan",
        "Tek açıdan çekim",
        "Temel rötuş dahil",
      ],
      presetIds: { productCount: "1-5", photoAngle: "1-angle", photoModel: "no-model", colorPackage: "1-color", photoVisualStyle: "studio", background: "white", photoRetouch: "basic-retouch" },
    },
    {
      id: "photo-standard",
      name: "Standart",
      badge: "💡 EN İYİ DEĞER",
      badgeVariant: "value",
      tagline: "E-ticarette öne çıkan profesyonel görseller",
      price: 2490,
      highlighted: true,
      features: [
        "6-15 ürün görseli",
        "Özel sahne arka planı",
        "2 açıdan çekim",
        "3 renk varyasyonu",
        "Profesyonel rötuş",
      ],
      presetIds: { productCount: "6-15", photoAngle: "2-angle", photoModel: "no-model", colorPackage: "3-color", photoVisualStyle: "studio", background: "custom-scene", photoRetouch: "pro-retouch" },
    },
    {
      id: "photo-pro",
      name: "Profesyonel",
      tagline: "Geniş koleksiyon için kapsamlı çekim paketi",
      price: 3990,
      highlighted: false,
      features: [
        "16-30 ürün görseli",
        "Lifestyle ortam arka planı",
        "4 açıdan çekim",
        "AI model dahil",
        "5 renk varyasyonu",
        "Profesyonel rötuş",
      ],
      presetIds: { productCount: "16-30", photoAngle: "4-angle", photoModel: "ai-model", colorPackage: "5-color", photoVisualStyle: "lifestyle", background: "custom-scene", photoRetouch: "pro-retouch" },
    },
    {
      id: "photo-elite",
      name: "Elite",
      badge: "👑 PREMIUM",
      badgeVariant: "anchor",
      tagline: "Mega koleksiyon için tam reklam kalitesi",
      price: 7900,
      highlighted: false,
      features: [
        "31-50 ürün görseli",
        "Doğal ortam arka planı",
        "6 açı + detay çekimi",
        "Özel AI model (sabit yüz)",
        "Sınırsız renk varyasyonu",
        "Premium reklam kalitesi rötuş",
      ],
      presetIds: { productCount: "31-50", photoAngle: "6-angle", photoModel: "ai-model-custom", colorPackage: "unlimited-color", photoVisualStyle: "lifestyle", background: "natural", photoRetouch: "premium-retouch" },
    },
  ],

  product: [
    {
      id: "product-starter",
      name: "Film Starter",
      tagline: "Ürününüzü AI ile ilk kez ekrana taşıyın",
      price: 9900,
      highlighted: false,
      features: [
        "8 saniye ürün filmi",
        "Temel AI görsel üretim",
        "Stok müzik dahil",
        "2 revizyon hakkı",
      ],
      presetIds: { duration: "8s", scenario: "basic", voice: "none", music: "basic", visualStyle: "basic", postProduction: [], revision: "base" },
    },
    {
      id: "product-standard",
      name: "Film Standart",
      badge: "⭐ EN POPÜLER",
      badgeVariant: "popular",
      tagline: "Sesli ve müzikli profesyonel ürün tanıtımı",
      price: 13900,
      highlighted: true,
      features: [
        "15 saniye ürün filmi",
        "AI seslendirme (standart)",
        "AI ile özel müzik",
        "Profesyonel kurgu",
        "2 revizyon hakkı",
      ],
      presetIds: { duration: "15s", scenario: "basic", voice: "ai-standard", music: "ai-composed", visualStyle: "basic", postProduction: [], revision: "base" },
    },
    {
      id: "product-pro",
      name: "Film Pro",
      tagline: "Ultra gerçekçi görsel, hikaye anlatan senaryo",
      price: 22900,
      highlighted: false,
      features: [
        "30 saniye ürün filmi",
        "Hikaye anlatımı senaryosu",
        "Premium AI seslendirme",
        "AI müzik kompozisyon",
        "Ultra gerçekçi görsel",
        "Altyazı + metin animasyonu",
        "4 revizyon hakkı",
      ],
      presetIds: { duration: "30s", scenario: "storytelling", voice: "ai-premium", music: "ai-composed", visualStyle: "ultra-real", postProduction: ["subtitle-voice"], revision: "plus" },
    },
    {
      id: "product-elite",
      name: "Film Elite",
      badge: "👑 PREMIUM",
      badgeVariant: "anchor",
      tagline: "Sinema kalitesinde tam prodüksiyon",
      price: 34900,
      highlighted: false,
      features: [
        "45 saniye ürün filmi",
        "Sinematik senaryo",
        "Ses klonlama (markanın sesi)",
        "Özel beste & jingle",
        "Hibrit teknik görsel",
        "VFX + dudak senkronu",
        "Sınırsız revizyon",
      ],
      presetIds: { duration: "45s", scenario: "cinematic", voice: "ai-clone", music: "custom", visualStyle: "hybrid", postProduction: ["vfx", "lip-sync"], revision: "unlimited" },
    },
  ],

  campaign: [
    {
      id: "campaign-core",
      name: "Kampanya Core",
      tagline: "Kampanyanızı hızla hayata geçirin",
      price: 19900,
      highlighted: false,
      features: [
        "15 saniye kampanya filmi",
        "Hikaye anlatımı senaryosu",
        "AI seslendirme",
        "Stok müzik dahil",
        "2 revizyon hakkı",
      ],
      presetIds: { duration: "15s", scenario: "storytelling", voice: "ai-standard", music: "basic", visualStyle: "basic", postProduction: [], revision: "base" },
    },
    {
      id: "campaign-pro",
      name: "Kampanya Pro",
      badge: "⭐ EN POPÜLER",
      badgeVariant: "popular",
      tagline: "Sinematik görsel + profesyonel ses ile dikkat çekin",
      price: 29900,
      highlighted: true,
      features: [
        "30 saniye kampanya filmi",
        "Sinematik senaryo",
        "Premium AI seslendirme",
        "AI müzik kompozisyon",
        "Ultra gerçekçi görsel",
        "4 revizyon hakkı",
      ],
      presetIds: { duration: "30s", scenario: "cinematic", voice: "ai-premium", music: "ai-composed", visualStyle: "ultra-real", postProduction: [], revision: "plus" },
    },
    {
      id: "campaign-elite",
      name: "Kampanya Elite",
      tagline: "VFX ve ses klonlama ile marka kimliği",
      price: 44900,
      highlighted: false,
      features: [
        "45 saniye kampanya filmi",
        "Sinematik senaryo",
        "Ses klonlama",
        "Özel beste & jingle",
        "Hibrit teknik görsel",
        "Görsel efektler (VFX)",
        "Sınırsız revizyon",
      ],
      presetIds: { duration: "45s", scenario: "cinematic", voice: "ai-clone", music: "custom", visualStyle: "hybrid", postProduction: ["vfx"], revision: "unlimited" },
    },
    {
      id: "campaign-platinum",
      name: "Kampanya Platinum",
      badge: "👑 PREMIUM",
      badgeVariant: "anchor",
      tagline: "Tam prodüksiyon — sınır tanımayan kampanya",
      price: 64900,
      highlighted: false,
      features: [
        "90 saniye kampanya filmi",
        "Özel yazılmış senaryo",
        "Ses klonlama",
        "Özel beste & jingle",
        "Hibrit teknik görsel",
        "Tam VFX prodüksiyon",
        "Ses tasarımı + dudak senkronu",
        "Sınırsız revizyon",
      ],
      presetIds: { duration: "90s", scenario: "custom", voice: "ai-clone", music: "custom", visualStyle: "hybrid", postProduction: ["vfx", "sound-design", "lip-sync"], revision: "unlimited" },
    },
  ],

  corporate: [
    {
      id: "corporate-standard",
      name: "Kurumsal Standart",
      tagline: "Markanızı güçlü bir şekilde tanıtın",
      price: 29900,
      highlighted: false,
      features: [
        "30 saniye kurumsal film",
        "Hikaye anlatımı senaryosu",
        "AI seslendirme",
        "AI müzik kompozisyon",
        "2 revizyon hakkı",
      ],
      presetIds: { duration: "30s", scenario: "storytelling", voice: "ai-standard", music: "ai-composed", visualStyle: "basic", postProduction: [], revision: "base" },
    },
    {
      id: "corporate-pro",
      name: "Kurumsal Pro",
      badge: "⭐ EN POPÜLER",
      badgeVariant: "popular",
      tagline: "Kurumsal kimliğinizi ultra kalite ile yansıtın",
      price: 44900,
      highlighted: true,
      features: [
        "45 saniye kurumsal film",
        "Sinematik senaryo",
        "Premium AI seslendirme",
        "AI müzik kompozisyon",
        "Ultra gerçekçi görsel",
        "Altyazı + metin animasyonu",
        "4 revizyon hakkı",
      ],
      presetIds: { duration: "45s", scenario: "cinematic", voice: "ai-premium", music: "ai-composed", visualStyle: "ultra-real", postProduction: ["subtitle-voice"], revision: "plus" },
    },
    {
      id: "corporate-elite",
      name: "Kurumsal Elite",
      tagline: "Tam prodüksiyon ile kurumsal liderliğinizi gösterin",
      price: 64900,
      highlighted: false,
      features: [
        "60 saniye kurumsal film",
        "Sinematik senaryo",
        "Ses klonlama",
        "Özel beste & jingle",
        "Hibrit teknik görsel",
        "Altyazı + ses tasarımı",
        "Sınırsız revizyon",
      ],
      presetIds: { duration: "60s", scenario: "cinematic", voice: "ai-clone", music: "custom", visualStyle: "hybrid", postProduction: ["subtitle-voice", "sound-design"], revision: "unlimited" },
    },
    {
      id: "corporate-platinum",
      name: "Kurumsal Platinum",
      badge: "👑 PREMIUM",
      badgeVariant: "anchor",
      tagline: "Türkiye'nin en kapsamlı AI kurumsal prodüksiyonu",
      price: 94900,
      highlighted: false,
      features: [
        "120 saniye kurumsal film",
        "Sıfırdan özel senaryo",
        "Ses klonlama",
        "Özel beste & jingle",
        "Hibrit teknik görsel",
        "Dudak senkronu (çok dilli)",
        "VFX prodüksiyon",
        "Ses tasarımı",
        "Sınırsız revizyon",
      ],
      presetIds: { duration: "120s", scenario: "custom", voice: "ai-clone", music: "custom", visualStyle: "hybrid", postProduction: ["vfx", "sound-design", "lip-sync"], revision: "unlimited" },
    },
  ],
};
