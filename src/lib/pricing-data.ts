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
  { id: "product", nameKey: "service.product", descKey: "service.product.desc", basePrice: 9999, icon: "🎯", traditionalMultiplier: 3.2 },
  { id: "campaign", nameKey: "service.campaign", descKey: "service.campaign.desc", basePrice: 19999, icon: "🚀", traditionalMultiplier: 3.0 },
  { id: "corporate", nameKey: "service.corporate", descKey: "service.corporate.desc", basePrice: 29999, icon: "🏢", traditionalMultiplier: 2.8 },
  { id: "avatar", nameKey: "service.avatar", descKey: "service.avatar.desc", basePrice: 5999, icon: "🤖", traditionalMultiplier: 0 },
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

export const DURATION_OPTIONS: DurationOption[] = [
  { id: "8s", label: "8", seconds: 8, description: "Bumper reklam & hikâye", basePrice: 0 },
  { id: "16s", label: "16", seconds: 16, description: "Pre-roll & kısa spot", basePrice: 800 },
  { id: "24s", label: "24", seconds: 24, description: "Standart dijital reklam", basePrice: 1800 },
  { id: "36s", label: "36", seconds: 36, description: "Detaylı tanıtım", basePrice: 3200 },
  { id: "48s", label: "48", seconds: 48, description: "Genişletilmiş reklam", basePrice: 5000 },
  { id: "60s", label: "60", seconds: 60, description: "1 dakika tam reklam", basePrice: 7500 },
  { id: "90s", label: "90", seconds: 90, description: "1.5 dakika tanıtım", basePrice: 11000 },
  { id: "120s", label: "120", seconds: 120, description: "2 dakika marka filmi", basePrice: 15000 },
  { id: "180s", label: "180", seconds: 180, description: "3 dakika kurumsal", basePrice: 22000 },
  { id: "240s", label: "240", seconds: 240, description: "4 dakika belgesel", basePrice: 30000 },
  { id: "300s", label: "300", seconds: 300, description: "5 dakika film", basePrice: 40000 },
  { id: "360s", label: "360", seconds: 360, description: "6 dakika maksimum", basePrice: 52000 },
];

export const SCENARIO_OPTIONS: ScenarioType[] = [
  { id: "basic", label: "Temel Senaryo", description: "Dahil - basit anlatı yapısı", price: 0 },
  { id: "storytelling", label: "Hikâye Anlatımı", description: "Duygusal bağ kuran hikâye", price: 2500 },
  { id: "cinematic", label: "Sinematik Senaryo", description: "Film kalitesinde dramatik kurgu", price: 5000 },
  { id: "custom", label: "Özel Senaryo", description: "Sıfırdan yazılan premium senaryo", price: 8000 },
];

export const VOICE_OPTIONS: VoiceOption[] = [
  { id: "none", label: "Seslendirme Yok", description: "Dahil - sadece müzik", price: 0 },
  { id: "ai-standard", label: "AI Ses (Standart)", description: "Kaliteli yapay zeka sesi", price: 800 },
  { id: "ai-premium", label: "AI Ses (Premium)", description: "Doğal tonlamalı premium ses", price: 2000 },
  { id: "ai-clone", label: "Ses Klonlama", description: "Kendi sesinizin AI kopyası", price: 4000 },
];

export const MUSIC_OPTIONS: MusicOption[] = [
  { id: "basic", label: "Temel Müzik", description: "Dahil - stok müzik", price: 0 },
  { id: "ai-composed", label: "AI Kompozisyon", description: "AI ile özel bestelenmiş", price: 1500 },
  { id: "custom", label: "Özel Beste", description: "Markanız için özel jingle", price: 4000 },
];

export const VISUAL_STYLE_OPTIONS: VisualStyle[] = [
  { id: "basic", label: "Temel Görsel", description: "Dahil - standart AI görsel", price: 0 },
  { id: "cinematic-anim", label: "Animasyon / Sinematik", description: "Sinematik veya animasyon tarzı", price: 1200 },
  { id: "ultra-real", label: "Ultra Gerçekçi", description: "Birebir gerçeklik - fotoğraf kalitesi", price: 4000 },
  { id: "hybrid", label: "Hibrit Teknik", description: "Gerçekçi + animasyon karışımı", price: 4800 },
];

export const POST_PRODUCTION_OPTIONS: PostProductionOption[] = [
  { id: "edit-basic", label: "Temel Edit", description: "Dahil - standart kurgu", price: 0 },
  { id: "subtitle-voice", label: "Altyazı + Metin + Seslendirme", description: "Animasyonlu altyazı ve seslendirme paketi", price: 3000 },
  { id: "sound-design", label: "Ses Tasarımı", description: "Profesyonel ses miksi ve efektler", price: 4000 },
  { id: "lip-sync", label: "Dudak Senkronu", description: "AI lip-sync teknolojisi", price: 5000 },
  { id: "vfx", label: "Görsel Efektler (VFX)", description: "Özel VFX ve geçiş efektleri", price: 6000 },
];

export const REVISION_PACKAGES: RevisionPackage[] = [
  { id: "base", label: "Temel (2 Revizyon)", count: 2, price: 0 },
  { id: "extra", label: "Ekstra (+1 Revizyon)", count: 3, price: 6000 },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(price);
};
