import { collection, addDoc, doc, updateDoc, increment, Timestamp, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const FREE_SIGNUP_CREDITS = 50;
export const REFERRAL_CREDITS = 25;

export type CreditTransactionType = "signup_bonus" | "purchase" | "spend" | "refund" | "referral" | "promo";

export type CreditTransaction = {
  customerId: string;
  type: CreditTransactionType;
  amount: number; // positive = earned, negative = spent
  balanceAfter: number;
  description: string;
  metadata?: Record<string, string | number>;
  createdAt: Timestamp;
};

export const grantSignupBonus = async (customerId: string): Promise<void> => {
  const customerRef = doc(db, "mindid_customers", customerId);
  const snap = await getDoc(customerRef);
  if (!snap.exists()) return;
  const data = snap.data();
  if (data.signupBonusGiven) return;

  const newBalance = (data.credits || 0) + FREE_SIGNUP_CREDITS;
  await updateDoc(customerRef, {
    credits: newBalance,
    totalCreditsEarned: increment(FREE_SIGNUP_CREDITS),
    signupBonusGiven: true,
  });

  await addDoc(collection(db, "mindid_credit_transactions"), {
    customerId,
    type: "signup_bonus",
    amount: FREE_SIGNUP_CREDITS,
    balanceAfter: newBalance,
    description: "Hoş geldin hediyesi 🎉",
    createdAt: Timestamp.now(),
  });
};

export const spendCredits = async (
  customerId: string,
  amount: number,
  description: string,
  metadata?: Record<string, string | number>
): Promise<{ success: boolean; balanceAfter: number; error?: string }> => {
  const customerRef = doc(db, "mindid_customers", customerId);
  const snap = await getDoc(customerRef);
  if (!snap.exists()) return { success: false, balanceAfter: 0, error: "Müşteri bulunamadı" };

  const data = snap.data();
  const current = data.credits || 0;
  if (current < amount) {
    return { success: false, balanceAfter: current, error: `Yetersiz kredi. Mevcut: ${current}, Gereken: ${amount}` };
  }

  const newBalance = current - amount;
  await updateDoc(customerRef, {
    credits: newBalance,
    totalCreditsSpent: increment(amount),
  });

  await addDoc(collection(db, "mindid_credit_transactions"), {
    customerId,
    type: "spend",
    amount: -amount,
    balanceAfter: newBalance,
    description,
    metadata: metadata || {},
    createdAt: Timestamp.now(),
  });

  return { success: true, balanceAfter: newBalance };
};

export const addCredits = async (
  customerId: string,
  amount: number,
  type: CreditTransactionType,
  description: string,
  metadata?: Record<string, string | number>
): Promise<number> => {
  const customerRef = doc(db, "mindid_customers", customerId);
  const snap = await getDoc(customerRef);
  if (!snap.exists()) return 0;

  const newBalance = (snap.data().credits || 0) + amount;
  await updateDoc(customerRef, {
    credits: newBalance,
    totalCreditsEarned: increment(amount),
  });

  await addDoc(collection(db, "mindid_credit_transactions"), {
    customerId,
    type,
    amount,
    balanceAfter: newBalance,
    description,
    metadata: metadata || {},
    createdAt: Timestamp.now(),
  });

  return newBalance;
};
