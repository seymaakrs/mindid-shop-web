import type { Timestamp } from "firebase/firestore";

export type AdminDoc = {
  email: string;
  role: string;
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

export type AvatarSample = {
  id?: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  order: number;
  visible: boolean;
};

// Blog
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
  page: string;
  status: LeadStatus;
  notes: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// ─── SaaS Plans & Customers ──────────────────────────────────────────────────

export type CustomerPlan = "free" | "starter" | "growth" | "scale";

export type SubscriptionStatus = "active" | "cancelled" | "past_due" | "trialing";

export type CustomerDoc = {
  id?: string;
  uid: string;
  email: string;
  name: string;
  company: string;
  phone: string;
  sector?: string;
  plan: CustomerPlan;
  credits: number;
  totalCreditsEarned: number;
  totalCreditsSpent: number;
  signupBonusGiven: boolean;
  totalSpent: number;
  generationCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
  // Subscription
  subscriptionId?: string;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionEndDate?: Timestamp;
  // Payment
  paymentProvider?: "iyzico" | "stripe";
  paymentCustomerId?: string;
};

export type CustomerNotification = {
  id?: string;
  customerId: string;
  type: "generation" | "payment" | "system" | "promo";
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Timestamp;
};

export type PaymentRecord = {
  id?: string;
  customerId: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  provider: "iyzico" | "stripe" | "manual";
  status: "pending" | "completed" | "failed" | "refunded";
  providerPaymentId?: string;
  description: string;
  createdAt: Timestamp;
};

// ─── AI Generation Jobs (SaaS core) ──────────────────────────────────────────

export type GenerationKind = "video" | "image" | "avatar" | "social";

export type GenerationStatus = "queued" | "running" | "completed" | "failed";

export type GenerationJob = {
  id?: string;
  customerId: string;
  customerEmail: string;
  kind: GenerationKind;
  templateId?: string;
  prompt: string;
  status: GenerationStatus;
  creditsUsed: number;
  outputUrls: string[];
  errorMessage?: string;
  createdAt: Timestamp;
  startedAt?: Timestamp;
  completedAt?: Timestamp;
};

// ─── Template Gallery ────────────────────────────────────────────────────────

export type TemplateCategory =
  | "reels"
  | "product-photo"
  | "campaign"
  | "corporate"
  | "social"
  | "avatar";

export type Template = {
  id: string;
  title: string;
  description: string;
  category: TemplateCategory;
  kind: GenerationKind;
  previewUrl: string;
  previewType: "image" | "video";
  tags: string[];
  popularity: number;
  isNew?: boolean;
  isPro?: boolean;
  creditCost?: number;
  createdAt: Timestamp;
};
