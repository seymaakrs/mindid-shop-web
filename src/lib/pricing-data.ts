import type {
  DurationOption,
  ScenarioType,
  VoiceOption,
  MusicOption,
  VisualStyle,
  PostProductionOption,
  RevisionPackage,
} from "./types";

export const DURATION_OPTIONS: DurationOption[] = [
  {
    id: "8s",
    label: "8 Saniye",
    seconds: 8,
    description: "Sosyal medya hikaye & bumper reklam",
    basePrice: 2500,
  },
  {
    id: "15s",
    label: "15 Saniye",
    seconds: 15,
    description: "Pre-roll & kisa reklam spotu",
    basePrice: 4000,
  },
  {
    id: "30s",
    label: "30 Saniye",
    seconds: 30,
    description: "Standart TV & dijital reklam",
    basePrice: 7000,
  },
  {
    id: "60s",
    label: "1 Dakika",
    seconds: 60,
    description: "Detayli urun/hizmet tanitimi",
    basePrice: 12000,
  },
  {
    id: "120s",
    label: "2 Dakika",
    seconds: 120,
    description: "Marka filmi & kurumsal tanitim",
    basePrice: 20000,
  },
  {
    id: "300s",
    label: "5 Dakika",
    seconds: 300,
    description: "Mini belgesel & detayli anlati",
    basePrice: 35000,
  },
];

export const SCENARIO_OPTIONS: ScenarioType[] = [
  {
    id: "basic",
    label: "Temel Senaryo",
    description: "Urun/hizmet odakli basit anlati yapisi",
    price: 1500,
  },
  {
    id: "storytelling",
    label: "Hikaye Anlatimi",
    description: "Duygusal bag kuran, karakterli hikaye yapisi",
    price: 3000,
  },
  {
    id: "cinematic",
    label: "Sinematik Senaryo",
    description: "Film kalitesinde dramatik anlati ve gorsel kurgu",
    price: 5000,
  },
  {
    id: "custom",
    label: "Ozel Senaryo",
    description: "Markaniza ozel, sifirdan yazilan senaryo",
    price: 7500,
  },
];

export const VOICE_OPTIONS: VoiceOption[] = [
  {
    id: "ai-standard",
    label: "AI Seslendirme (Standart)",
    description: "Yuksek kaliteli yapay zeka sesi",
    price: 500,
  },
  {
    id: "ai-premium",
    label: "AI Seslendirme (Premium)",
    description: "Dogal tonlamali premium AI ses klonlama",
    price: 1500,
  },
  {
    id: "ai-clone",
    label: "Ses Klonlama",
    description: "Marka temsilcinizin sesinin AI ile klonlanmasi",
    price: 3000,
  },
  {
    id: "no-voice",
    label: "Seslendirme Yok",
    description: "Sadece muzik ve gorsel anlati",
    price: 0,
  },
];

export const MUSIC_OPTIONS: MusicOption[] = [
  {
    id: "stock",
    label: "Stok Muzik",
    description: "Lisansli hazir muzik arsivinden secim",
    price: 300,
  },
  {
    id: "ai-composed",
    label: "AI Kompozisyon",
    description: "Yapay zeka ile ozel bestelenmis muzik",
    price: 1000,
  },
  {
    id: "custom-composed",
    label: "Ozel Beste",
    description: "Markaniz icin ozel bestelenmis jingle/muzik",
    price: 3000,
  },
  {
    id: "no-music",
    label: "Muzik Yok",
    description: "Muzik olmadan, sadece ses efektleri",
    price: 0,
  },
];

export const VISUAL_STYLE_OPTIONS: VisualStyle[] = [
  {
    id: "realistic",
    label: "Fotorealistik",
    description: "Gercekci gorunumlu AI gorsel uretimi",
    price: 2000,
  },
  {
    id: "cinematic",
    label: "Sinematik",
    description: "Film kalitesinde renk ve isik tasarimi",
    price: 3500,
  },
  {
    id: "animated",
    label: "Animasyon",
    description: "2D/3D animasyon tarzi gorsel uretim",
    price: 3000,
  },
  {
    id: "mixed",
    label: "Karisik Teknik",
    description: "Gercekci + animasyon karisimi hibrit yaklasim",
    price: 4000,
  },
];

export const POST_PRODUCTION_OPTIONS: PostProductionOption[] = [
  {
    id: "color-grade",
    label: "Renk Duzenleme",
    description: "Profesyonel renk grading & atmosfer",
    price: 1000,
  },
  {
    id: "vfx",
    label: "Gorsel Efektler (VFX)",
    description: "Ozel gorsel efektler ve gecisler",
    price: 2000,
  },
  {
    id: "subtitle",
    label: "Altyazi & Metin",
    description: "Animasyonlu altyazi ve ekran yazilari",
    price: 500,
  },
  {
    id: "lip-sync",
    label: "Dudak Senkronu",
    description: "AI dudak senkronizasyonu (karakter varsa)",
    price: 1500,
  },
  {
    id: "sound-design",
    label: "Ses Tasarimi",
    description: "Profesyonel ses efektleri ve miksleme",
    price: 1200,
  },
];

export const REVISION_PACKAGES: RevisionPackage[] = [
  {
    id: "basic",
    label: "Temel Revizyon",
    count: 2,
    price: 0,
  },
  {
    id: "standard",
    label: "Standart Revizyon",
    count: 5,
    price: 1500,
  },
  {
    id: "premium",
    label: "Premium Revizyon",
    count: 10,
    price: 3000,
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(price);
};
