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
  // SEO & GEO fields
  slug?: string;
  seoDescription?: string;
  seoDescriptionEn?: string;
  techniques?: string[];
  clientName?: string;
  duration?: string; // ISO 8601 e.g. "PT30S"
  completedAt?: Timestamp;
  // UI & SEO/GEO/AEO fields (2026)
  orientation?: "horizontal" | "vertical" | "square"; // 16:9 / 9:16 / 1:1
  keywords?: string[];   // TR SEO keywords
  keywordsEn?: string[]; // EN SEO keywords
  regionTargeted?: string; // GEO: "TR" | "MENA" | "EU"
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

// Blog types
export type BlogPost = {
  id?: string;
  title: string;
  titleEn: string;
  slug: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  coverImage: string;
  tags: string[];
  category: "film" | "avatar" | "visual" | "general";
  published: boolean;
  publishedAt: Timestamp;
  updatedAt: Timestamp;
};

// Lead capture (exit-intent popup, newsletter)
export type LeadStatus = "new" | "contacted" | "converted" | "lost";

export type LeadSource = "exit_intent" | "popup" | "footer" | "other";

export type LeadCapture = {
  id?: string;
  name: string;
  phone?: string;
  email?: string;
  source: LeadSource;
  page: string; // hangi sayfadayken yakalandı
  status: LeadStatus;
  notes: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// Order management types
export type OrderStatus = "new" | "seen" | "in-progress" | "completed" | "cancelled";

export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  targetAudience: string;
  message: string;
};

export type OrderConfigOption = {
  id: string;
  label: string;
  price: number;
};

export type OrderConfig = {
  // Video fields
  duration?: { id: string; label: string; seconds: number; basePrice: number };
  scenario?: OrderConfigOption;
  voice?: OrderConfigOption;
  music?: OrderConfigOption;
  visualStyle?: OrderConfigOption;
  postProduction?: OrderConfigOption[];
  revision?: { id: string; label: string; count: number; price: number };
  // Product photo fields
  productCount?: OrderConfigOption;
  photoAngle?: OrderConfigOption & { angleCount: number };
  photoModel?: OrderConfigOption;
  colorPackage?: OrderConfigOption & { includedColors: number };
  photoVisualStyle?: OrderConfigOption;
  background?: OrderConfigOption;
  photoRetouch?: OrderConfigOption;
};

export type OrderPricing = {
  basePrice: number;
  totalAI: number;
  totalTraditional: number;
  savings: number;
  currency: string;
};

export type OrderSubmission = {
  id?: string;
  customer: OrderCustomer;
  serviceId: string;
  serviceName: string;
  config: OrderConfig;
  pricing: OrderPricing;
  fileUrls: string[];
  status: OrderStatus;
  adminNotes: string;
  createdAt: Timestamp;
  seenAt?: Timestamp;
  updatedAt: Timestamp;
};
