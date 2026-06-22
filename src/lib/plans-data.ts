import type { CustomerPlan } from "./firestore-types";

export type PlanFeature = {
  labelKey: string;
  included: boolean;
};

export type Plan = {
  id: CustomerPlan;
  nameKey: string;
  taglineKey: string;
  priceMonthly: number;
  priceYearly: number;
  monthlyCredits: number;
  highlighted: boolean;
  badgeKey?: string;
  ctaKey: string;
  features: PlanFeature[];
};

export const PLANS: Plan[] = [
  {
    id: "free",
    nameKey: "plans.free.name",
    taglineKey: "plans.free.tagline",
    priceMonthly: 0,
    priceYearly: 0,
    monthlyCredits: 50,
    highlighted: false,
    ctaKey: "plans.cta.startFree",
    features: [
      { labelKey: "plans.feature.credits50", included: true },
      { labelKey: "plans.feature.templates", included: true },
      { labelKey: "plans.feature.standardQuality", included: true },
      { labelKey: "plans.feature.watermark", included: true },
      { labelKey: "plans.feature.commercial", included: false },
      { labelKey: "plans.feature.priority", included: false },
      { labelKey: "plans.feature.api", included: false },
    ],
  },
  {
    id: "starter",
    nameKey: "plans.starter.name",
    taglineKey: "plans.starter.tagline",
    priceMonthly: 299,
    priceYearly: 2990,
    monthlyCredits: 500,
    highlighted: false,
    ctaKey: "plans.cta.start",
    features: [
      { labelKey: "plans.feature.credits500", included: true },
      { labelKey: "plans.feature.templates", included: true },
      { labelKey: "plans.feature.hdQuality", included: true },
      { labelKey: "plans.feature.noWatermark", included: true },
      { labelKey: "plans.feature.commercial", included: true },
      { labelKey: "plans.feature.priority", included: false },
      { labelKey: "plans.feature.api", included: false },
    ],
  },
  {
    id: "growth",
    nameKey: "plans.growth.name",
    taglineKey: "plans.growth.tagline",
    priceMonthly: 799,
    priceYearly: 7990,
    monthlyCredits: 2000,
    highlighted: true,
    badgeKey: "plans.badge.popular",
    ctaKey: "plans.cta.start",
    features: [
      { labelKey: "plans.feature.credits2000", included: true },
      { labelKey: "plans.feature.templates", included: true },
      { labelKey: "plans.feature.fullHDQuality", included: true },
      { labelKey: "plans.feature.noWatermark", included: true },
      { labelKey: "plans.feature.commercial", included: true },
      { labelKey: "plans.feature.priority", included: true },
      { labelKey: "plans.feature.api", included: false },
    ],
  },
  {
    id: "scale",
    nameKey: "plans.scale.name",
    taglineKey: "plans.scale.tagline",
    priceMonthly: 1999,
    priceYearly: 19990,
    monthlyCredits: 6000,
    highlighted: false,
    ctaKey: "plans.cta.contact",
    features: [
      { labelKey: "plans.feature.credits6000", included: true },
      { labelKey: "plans.feature.templates", included: true },
      { labelKey: "plans.feature.4kQuality", included: true },
      { labelKey: "plans.feature.noWatermark", included: true },
      { labelKey: "plans.feature.commercial", included: true },
      { labelKey: "plans.feature.priority", included: true },
      { labelKey: "plans.feature.api", included: true },
    ],
  },
];

export type CreditPack = {
  id: string;
  credits: number;
  price: number;
  bonusPercent: number;
};

export const CREDIT_PACKS: CreditPack[] = [
  { id: "pack-100", credits: 100, price: 99, bonusPercent: 0 },
  { id: "pack-500", credits: 500, price: 449, bonusPercent: 10 },
  { id: "pack-1500", credits: 1500, price: 1199, bonusPercent: 20 },
  { id: "pack-5000", credits: 5000, price: 3499, bonusPercent: 30 },
];

// Tahmini kredi maliyetleri (jenerasyon başına) — UI'da gösterim için
export const GENERATION_COSTS = {
  imageStandard: 2,
  imageHD: 5,
  videoShort: 15,
  videoLong: 40,
  avatar: 25,
  socialPost: 3,
} as const;

export type SaasService = {
  id: "video" | "image" | "avatar" | "social";
  nameKey: string;
  descKey: string;
  href: string;
  iconName: "video" | "camera" | "user" | "share";
  estimatedCredits: number;
};

export const SAAS_SERVICES: SaasService[] = [
  {
    id: "video",
    nameKey: "service.video.name",
    descKey: "service.video.desc",
    href: "/ai-reklam-filmi",
    iconName: "video",
    estimatedCredits: GENERATION_COSTS.videoShort,
  },
  {
    id: "image",
    nameKey: "service.image.name",
    descKey: "service.image.desc",
    href: "/ai-gorsel",
    iconName: "camera",
    estimatedCredits: GENERATION_COSTS.imageHD,
  },
  {
    id: "avatar",
    nameKey: "service.avatar.name",
    descKey: "service.avatar.desc",
    href: "/avatar",
    iconName: "user",
    estimatedCredits: GENERATION_COSTS.avatar,
  },
  {
    id: "social",
    nameKey: "service.social.name",
    descKey: "service.social.desc",
    href: "/e-commerce",
    iconName: "share",
    estimatedCredits: GENERATION_COSTS.socialPost,
  },
];
