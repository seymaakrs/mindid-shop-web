import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type {
  PaymentInitParams,
  PaymentInitResult,
  PaymentProvider,
} from "./types";

// TODO: Owner — Update IBAN in BANK_DETAILS const after company bank account opens.
// These are placeholders. The "Ödeme Yaptım" button will not work correctly
// until real bank info is filled in. Do NOT publish placeholder IBAN to customers
// in production — gate the page if BANK_DETAILS.iban contains "0000".
export const BANK_DETAILS = {
  bankName: "Garanti BBVA",
  accountHolder: "MindID Yazılım ve Reklam Hizmetleri",
  iban: "TR00 0000 0000 0000 0000 0000 00",
} as const;

const generateReference = (): string => {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MID-${ts}-${rand}`;
};

export const bankTransferProvider: PaymentProvider = {
  id: "bank_transfer",
  displayName: "Banka Havalesi / EFT",

  async init(params: PaymentInitParams): Promise<PaymentInitResult> {
    const reference = generateReference();
    const now = Timestamp.now();

    const docRef = await addDoc(collection(db, "mindid_payment_sessions"), {
      orderId: params.orderId,
      customerId: params.customerId,
      customerEmail: params.customerEmail,
      amount: params.amount,
      currency: params.currency,
      method: "bank_transfer",
      status: "awaiting_confirmation",
      reference,
      createdAt: now,
      updatedAt: now,
    });

    return {
      sessionId: docRef.id,
      instructions: {
        bankName: BANK_DETAILS.bankName,
        accountHolder: BANK_DETAILS.accountHolder,
        iban: BANK_DETAILS.iban,
        reference,
        amount: params.amount,
        currency: params.currency,
      },
    };
  },
};
