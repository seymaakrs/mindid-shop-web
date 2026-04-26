import type { Timestamp } from "firebase/firestore";

export type PaymentMethod = "bank_transfer" | "iyzico" | "stripe" | "credits";
export type PaymentStatus =
  | "pending"
  | "awaiting_confirmation"
  | "paid"
  | "failed"
  | "refunded";

export type PaymentCurrency = "TRY" | "USD" | "EUR";

export type PaymentSession = {
  id: string;
  orderId: string;
  customerId: string;
  customerEmail: string;
  amount: number;
  currency: PaymentCurrency;
  method: PaymentMethod;
  status: PaymentStatus;
  metadata?: Record<string, string | number>;
  reference?: string; // for bank transfer reconciliation
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paidAt?: Timestamp;
};

export type BankTransferInstructions = {
  bankName: string;
  accountHolder: string;
  iban: string;
  reference: string;
  amount: number;
  currency: string;
};

export type PaymentInitResult = {
  sessionId: string;
  redirectUrl?: string; // for hosted checkout (iyzico/stripe)
  instructions?: BankTransferInstructions; // for manual
};

export type PaymentInitParams = {
  orderId: string;
  customerId: string;
  customerEmail: string;
  amount: number;
  currency: PaymentCurrency;
};

export interface PaymentProvider {
  readonly id: PaymentMethod;
  readonly displayName: string;
  init(params: PaymentInitParams): Promise<PaymentInitResult>;
  verifyWebhook?(payload: unknown, signature: string): Promise<boolean>;
}
