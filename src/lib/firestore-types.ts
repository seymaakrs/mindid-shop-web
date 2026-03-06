import type { Timestamp } from "firebase/firestore";

export type AdminDoc = {
  email: string;
  role: string;
};

export type PortfolioItem = {
  id?: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  order: number;
  visible: boolean;
  createdAt: Timestamp;
};

export type SiteSettings = {
  heroVideoUrl: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  usdRate: number;
};

export type FAQItem = {
  id?: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  order: number;
  visible: boolean;
};

export type TeamMember = {
  id?: string;
  role: string;
  roleEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
  order: number;
  visible: boolean;
};

export type PricingServiceItem = {
  id: string;
  nameKey: string;
  descKey: string;
  basePrice: number;
  icon: string;
  traditionalMultiplier: number;
};

export type PricingOptionItem = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type PricingDurationItem = {
  id: string;
  label: string;
  seconds: number;
  description: string;
  basePrice: number;
};

export type PricingRevisionItem = {
  id: string;
  label: string;
  count: number;
  price: number;
};

export type PricingConfig = {
  services: PricingServiceItem[];
  durations: PricingDurationItem[];
  scenarios: PricingOptionItem[];
  voices: PricingOptionItem[];
  music: PricingOptionItem[];
  visualStyles: PricingOptionItem[];
  postProduction: PricingOptionItem[];
  revisions: PricingRevisionItem[];
  // Product photo fields
  productCounts?: PricingOptionItem[];
  colorCountUnitPrice?: number;
  photoVisualStyles?: PricingOptionItem[];
  backgrounds?: PricingOptionItem[];
};

export type AvatarSample = {
  id?: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  order: number;
  visible: boolean;
};
