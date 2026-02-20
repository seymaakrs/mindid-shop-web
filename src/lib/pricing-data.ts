import type {
  DurationOption,
  ScenarioType,
  VoiceOption,
  MusicOption,
  VisualStyle,
  PostProductionOption,
  RevisionPackage,
} from "./types";

export const SERVICE_TYPES = [
  { id: "reels", nameKey: "service.reels", descKey: "service.reels.desc", basePrice: 999, icon: "📱", traditionalMultiplier: 3.5 },
  { id: "product", nameKey: "service.product", descKey: "service.product.desc", basePrice: 2999, icon: "🎯", traditionalMultiplier: 3.2 },
  { id: "creative", nameKey: "service.creative", descKey: "service.creative.desc", basePrice: 19999, icon: "🎨", traditionalMultiplier: 2.8 },
  { id: "brand", nameKey: "service.brand", descKey: "service.brand.desc", basePrice: 29999, icon: "✨", traditionalMultiplier: 3.0 },
  { id: "corporate", nameKey: "service.corporate", descKey: "service.corporate.desc", basePrice: 39999, icon: "🏢", traditionalMultiplier: 2.5 },
  { id: "ad", nameKey: "service.ad", descKey: "service.ad.desc", basePrice: 49999, icon: "🎬", traditionalMultiplier: 2.5 },
  { id: "portfolio", nameKey: "service.portfolio", descKey: "service.portfolio.desc", basePrice: 0, icon: "📂", traditionalMultiplier: 0 },
  { id: "avatar", nameKey: "service.avatar", descKey: "service.avatar.desc", basePrice: 0, icon: "🤖", traditionalMultiplier: 0 },
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

export const DURATION_OPTIONS: DurationOption[] = [
  { id: "8s", label: "8", seconds: 8, description: "Bumper reklam & hikaye", basePrice: 0 },
  { id: "16s", label: "16", seconds: 16, description: "Pre-roll & kisa spot", basePrice: 800 },
  { id: "24s", label: "24", seconds: 24, description: "Standart dijital reklam", basePrice: 1800 },
  { id: "36s", label: "36", seconds: 36, description: "Detayli tanitim", basePrice: 3200 },
  { id: "48s", label: "48", seconds: 48, description: "Genisletilmis reklam", basePrice: 5000 },
  { id: "60s", label: "60", seconds: 60, description: "1 dakika tam reklam", basePrice: 7500 },
  { id: "90s", label: "90", seconds: 90, description: "1.5 dakika tanitim", basePrice: 11000 },
  { id: "120s", label: "120", seconds: 120, description: "2 dakika marka filmi", basePrice: 15000 },
  { id: "180s", label: "180", seconds: 180, description: "3 dakika kurumsal", basePrice: 22000 },
  { id: "240s", label: "240", seconds: 240, description: "4 dakika belgesel", basePrice: 30000 },
  { id: "300s", label: "300", seconds: 300, description: "5 dakika film", basePrice: 40000 },
  { id: "360s", label: "360", seconds: 360, description: "6 dakika maksimum", basePrice: 52000 },
];

export const SCENARIO_OPTIONS: ScenarioType[] = [
  { id: "basic", label: "Temel Senaryo", description: "Dahil - basit anlati yapisi", price: 0 },
  { id: "storytelling", label: "Hikaye Anlatimi", description: "Duygusal bag kuran hikaye", price: 2500 },
  { id: "cinematic", label: "Sinematik Senaryo", description: "Film kalitesinde dramatik kurgu", price: 5000 },
  { id: "custom", label: "Ozel Senaryo", description: "Sifirdan yazilan premium senaryo", price: 8000 },
];

export const VOICE_OPTIONS: VoiceOption[] = [
  { id: "none", label: "Seslendirme Yok", description: "Dahil - sadece muzik", price: 0 },
  { id: "ai-standard", label: "AI Ses (Standart)", description: "Kaliteli yapay zeka sesi", price: 800 },
  { id: "ai-premium", label: "AI Ses (Premium)", description: "Dogal tonlamali premium ses", price: 2000 },
  { id: "ai-clone", label: "Ses Klonlama", description: "Kendi sesinizin AI kopyasi", price: 4000 },
];

export const MUSIC_OPTIONS: MusicOption[] = [
  { id: "basic", label: "Temel Muzik", description: "Dahil - stok muzik", price: 0 },
  { id: "ai-composed", label: "AI Kompozisyon", description: "AI ile ozel bestelenmis", price: 1500 },
  { id: "custom", label: "Ozel Beste", description: "Markaniz icin ozel jingle", price: 4000 },
];

export const VISUAL_STYLE_OPTIONS: VisualStyle[] = [
  { id: "basic", label: "Temel Gorsel", description: "Dahil - standart AI gorsel", price: 0 },
  { id: "realistic", label: "Fotorealistik", description: "Gercekci yuksek kalite", price: 3000 },
  { id: "cinematic", label: "Sinematik", description: "Film kalitesinde isik ve renk", price: 5000 },
  { id: "animated", label: "Animasyon", description: "2D/3D animasyon tarzi", price: 4000 },
  { id: "mixed", label: "Hibrit Teknik", description: "Gercekci + animasyon karisimi", price: 6000 },
];

export const POST_PRODUCTION_OPTIONS: PostProductionOption[] = [
  { id: "color-grade", label: "Renk Duzenleme", description: "Profesyonel color grading", price: 1500 },
  { id: "vfx", label: "Gorsel Efektler", description: "VFX ve ozel gecisler", price: 3000 },
  { id: "subtitle", label: "Altyazi & Metin", description: "Animasyonlu altyazilar", price: 800 },
  { id: "lip-sync", label: "Dudak Senkronu", description: "AI lip-sync teknolojisi", price: 2500 },
  { id: "sound-design", label: "Ses Tasarimi", description: "Profesyonel ses miksi", price: 2000 },
];

export const REVISION_PACKAGES: RevisionPackage[] = [
  { id: "base", label: "Temel (1 Revizyon)", count: 1, price: 0 },
  { id: "standard", label: "Standart (3 Revizyon)", count: 3, price: 1500 },
  { id: "premium", label: "Premium (5 Revizyon)", count: 5, price: 3000 },
  { id: "unlimited", label: "Pro (10 Revizyon)", count: 10, price: 5000 },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(price);
};
