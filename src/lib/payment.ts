/**
 * MindID Payment Module — Provider-Agnostic
 *
 * Modüler ödeme sistemi. İleride iyzico, Stripe veya başka bir
 * provider kolayca takılabilir.
 */

export type PaymentProvider = "iyzico" | "stripe" | "manual";

export type PaymentIntent = {
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerName: string;
  metadata?: Record<string, string>;
};

export type PaymentResult = {
  success: boolean;
  paymentId?: string;
  error?: string;
  redirectUrl?: string;
};

// Provider interface — her yeni provider bunu implement eder
export interface IPaymentProvider {
  name: PaymentProvider;
  createPayment(intent: PaymentIntent): Promise<PaymentResult>;
  verifyPayment(paymentId: string): Promise<{ verified: boolean; status: string }>;
  refundPayment(paymentId: string, amount?: number): Promise<{ success: boolean }>;
}

// Manual payment provider (MVP — admin onaylı)
class ManualPaymentProvider implements IPaymentProvider {
  name: PaymentProvider = "manual";

  async createPayment(intent: PaymentIntent): Promise<PaymentResult> {
    // Manuel süreçte ödeme kaydı oluşturulur, admin onaylar
    return {
      success: true,
      paymentId: `manual_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    };
  }

  async verifyPayment(): Promise<{ verified: boolean; status: string }> {
    return { verified: true, status: "pending_admin_approval" };
  }

  async refundPayment(): Promise<{ success: boolean }> {
    return { success: true };
  }
}

// Placeholder Stripe provider
class StripePaymentProvider implements IPaymentProvider {
  name: PaymentProvider = "stripe";

  async createPayment(intent: PaymentIntent): Promise<PaymentResult> {
    // TODO: Stripe API entegrasyonu
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({...});
    return {
      success: false,
      error: "Stripe entegrasyonu henüz aktif değil. Yakında!",
    };
  }

  async verifyPayment(): Promise<{ verified: boolean; status: string }> {
    return { verified: false, status: "not_configured" };
  }

  async refundPayment(): Promise<{ success: boolean }> {
    return { success: false };
  }
}

// Placeholder iyzico provider
class IyzicoPaymentProvider implements IPaymentProvider {
  name: PaymentProvider = "iyzico";

  async createPayment(intent: PaymentIntent): Promise<PaymentResult> {
    // TODO: iyzico API entegrasyonu
    // Taksit desteği, Türk kartları, 3D Secure
    return {
      success: false,
      error: "iyzico entegrasyonu henüz aktif değil. Yakında!",
    };
  }

  async verifyPayment(): Promise<{ verified: boolean; status: string }> {
    return { verified: false, status: "not_configured" };
  }

  async refundPayment(): Promise<{ success: boolean }> {
    return { success: false };
  }
}

// Provider factory
const providers: Record<PaymentProvider, IPaymentProvider> = {
  manual: new ManualPaymentProvider(),
  stripe: new StripePaymentProvider(),
  iyzico: new IyzicoPaymentProvider(),
};

export const getPaymentProvider = (name?: PaymentProvider): IPaymentProvider => {
  return providers[name || "manual"];
};

// Aktif provider'ı döndür
export const getActiveProvider = (): PaymentProvider => {
  // Env var'dan veya Firestore'dan okunabilir
  if (process.env.NEXT_PUBLIC_STRIPE_KEY) return "stripe";
  if (process.env.NEXT_PUBLIC_IYZICO_KEY) return "iyzico";
  return "manual";
};

// Fiyat formatlama yardımcıları
export const formatPrice = (amount: number, currency = "TRY"): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const PLAN_LIMITS: Record<string, { name: string; monthlyCredits: number; price: number; features: string[] }> = {
  free: {
    name: "Ücretsiz",
    monthlyCredits: 0,
    price: 0,
    features: ["Platformu keşfet", "Fiyat hesapla", "1 demo üretim"],
  },
  starter: {
    name: "Starter",
    monthlyCredits: 5,
    price: 4900,
    features: ["Ayda 5 üretim kredisi", "Standart kalite", "E-posta destek", "Dosya indirme"],
  },
  growth: {
    name: "Growth",
    monthlyCredits: 20,
    price: 14900,
    features: ["Ayda 20 üretim kredisi", "Yüksek kalite", "Öncelikli destek", "Sosyal medya yönetimi", "Analitik panel"],
  },
  agency: {
    name: "Agency",
    monthlyCredits: 100,
    price: 49900,
    features: ["Ayda 100 üretim kredisi", "Ultra kalite", "Dedicated destek", "White-label çıktı", "API erişimi", "Çoklu marka yönetimi"],
  },
};
