import type { PaymentMethod, PaymentProvider } from "./types";
import { bankTransferProvider } from "./bank-transfer";
import { iyzicoProvider, isIyzicoConfigured } from "./iyzico";

const providers: Record<PaymentMethod, PaymentProvider> = {
  bank_transfer: bankTransferProvider,
  iyzico: iyzicoProvider,
  // TODO: implement Stripe provider when keys arrive. Falling back to bank transfer for now.
  stripe: bankTransferProvider,
  // TODO: implement credits-balance debit provider hooked to mindid_customers.credits.
  credits: bankTransferProvider,
};

export const getPaymentProvider = (method: PaymentMethod): PaymentProvider => {
  return providers[method] || providers.bank_transfer;
};

export type AvailablePaymentMethod = {
  id: PaymentMethod;
  name: string;
  description: string;
  recommended?: boolean;
  enabled: boolean;
  comingSoonLabel?: string;
};

export const getAvailablePaymentMethods = (): AvailablePaymentMethod[] => [
  {
    id: "bank_transfer",
    name: "Banka Havalesi / EFT",
    description: "1-2 saat içinde onaylanır. Komisyonsuz.",
    recommended: true,
    enabled: true,
  },
  {
    id: "iyzico",
    name: "Kredi Kartı (Iyzico)",
    description: "Anında onay. Tüm kartlar.",
    enabled: isIyzicoConfigured(),
    comingSoonLabel: "Yakında",
  },
  {
    id: "credits",
    name: "MindID Kredisi",
    description: "Hesabınızdaki kredi bakiyesinden öde.",
    enabled: false,
    comingSoonLabel: "Yakında",
  },
];

export * from "./types";
export { BANK_DETAILS } from "./bank-transfer";
