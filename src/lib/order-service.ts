import { collection, addDoc, doc, updateDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import type { ConfigState } from "@/lib/types";
import type { OrderConfig, OrderCustomer, OrderSubmission } from "@/lib/firestore-types";
import { getPaymentProvider } from "@/lib/payments";
import type { PaymentInitResult, PaymentMethod } from "@/lib/payments";
import { renderOrderConfirmationEmail } from "@/lib/email-templates";

/**
 * Queue a transactional email via the Firestore "mail" collection.
 * Owner: Install Firebase Email Trigger extension OR connect to
 * Resend/SendGrid. (functions/src/index.ts already sends a Resend-based
 * confirmation on order create — this Firestore queue is a redundant,
 * decoupled fallback. Safe to ship even if neither is configured.)
 */
const queueEmail = async (params: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> => {
  try {
    await addDoc(collection(db, "mail"), {
      to: params.to,
      message: {
        subject: params.subject,
        html: params.html,
      },
      createdAt: Timestamp.now(),
    });
  } catch (err) {
    console.error("[mail queue] Failed to enqueue email:", err);
  }
};

const buildConfigLines = (config: OrderConfig): string[] => {
  const lines: string[] = [];
  if (config.duration) lines.push(`Süre: ${config.duration.label}`);
  if (config.scenario) lines.push(`Senaryo: ${config.scenario.label}`);
  if (config.voice) lines.push(`Ses: ${config.voice.label}`);
  if (config.music) lines.push(`Müzik: ${config.music.label}`);
  if (config.visualStyle) lines.push(`Görsel Stil: ${config.visualStyle.label}`);
  if (config.productCount) lines.push(`Ürün Sayısı: ${config.productCount.label}`);
  if (config.photoVisualStyle) lines.push(`Foto Stili: ${config.photoVisualStyle.label}`);
  if (config.background) lines.push(`Arka Plan: ${config.background.label}`);
  if (config.revision) lines.push(`Revizyon: ${config.revision.label}`);
  return lines;
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

const ALLOWED_FILE_TYPES = [
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml",
  "video/mp4", "video/quicktime", "video/webm",
  "application/pdf",
  "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip", "application/x-rar-compressed",
];

const sanitizeFileName = (name: string): string =>
  name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);

const serializeConfig = (config: ConfigState): OrderConfig => {
  const result: OrderConfig = {};

  if (config.duration) {
    result.duration = {
      id: config.duration.id,
      label: config.duration.label,
      seconds: config.duration.seconds,
      basePrice: config.duration.basePrice,
    };
  }
  if (config.scenario) {
    result.scenario = { id: config.scenario.id, label: config.scenario.label, price: config.scenario.price };
  }
  if (config.voice) {
    result.voice = { id: config.voice.id, label: config.voice.label, price: config.voice.price };
  }
  if (config.music) {
    result.music = { id: config.music.id, label: config.music.label, price: config.music.price };
  }
  if (config.visualStyle) {
    result.visualStyle = { id: config.visualStyle.id, label: config.visualStyle.label, price: config.visualStyle.price };
  }
  if (config.postProduction.length > 0) {
    result.postProduction = config.postProduction.map((pp) => ({
      id: pp.id,
      label: pp.label,
      price: pp.price,
    }));
  }
  if (config.revision) {
    result.revision = {
      id: config.revision.id,
      label: config.revision.label,
      count: config.revision.count,
      price: config.revision.price,
    };
  }
  if (config.productCount) {
    result.productCount = { id: config.productCount.id, label: config.productCount.label, price: config.productCount.price };
  }
  if (config.photoAngle) {
    result.photoAngle = { id: config.photoAngle.id, label: config.photoAngle.label, price: config.photoAngle.price, angleCount: config.photoAngle.angleCount };
  }
  if (config.photoModel) {
    result.photoModel = { id: config.photoModel.id, label: config.photoModel.label, price: config.photoModel.price };
  }
  if (config.colorPackage) {
    result.colorPackage = { id: config.colorPackage.id, label: config.colorPackage.label, price: config.colorPackage.price, includedColors: config.colorPackage.includedColors };
  }
  if (config.photoVisualStyle) {
    result.photoVisualStyle = { id: config.photoVisualStyle.id, label: config.photoVisualStyle.label, price: config.photoVisualStyle.price };
  }
  if (config.background) {
    result.background = { id: config.background.id, label: config.background.label, price: config.background.price };
  }
  if (config.photoRetouch) {
    result.photoRetouch = { id: config.photoRetouch.id, label: config.photoRetouch.label, price: config.photoRetouch.price };
  }

  return result;
};

const uploadFiles = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];
  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`Dosya çok büyük: ${file.name} (max 50 MB)`);
    }
    if (file.type && !ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error(`Desteklenmeyen dosya türü: ${file.name} (${file.type})`);
    }
    const timestamp = Date.now();
    const safeName = sanitizeFileName(file.name);
    const storageRef = ref(storage, `mindid-site/orders/${timestamp}_${safeName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }
  return urls;
};

type SubmitOrderParams = {
  customer: OrderCustomer;
  serviceId: string;
  serviceName: string;
  config: ConfigState;
  pricing: { basePrice: number; totalAI: number; totalTraditional: number; savings: number };
  files: File[];
  customerUid?: string;
  paymentMethod?: PaymentMethod;
};

const readStoredAttribution = (): OrderSubmission["attribution"] | undefined => {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem("mindid_utm");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as OrderSubmission["attribution"];
    return parsed && typeof parsed === "object" ? parsed : undefined;
  } catch {
    return undefined;
  }
};

export type SubmitOrderResult = {
  orderId: string;
  payment: PaymentInitResult;
  paymentMethod: PaymentMethod;
};

const validateCustomer = (customer: OrderCustomer) => {
  if (!customer.name || customer.name.length > 200) {
    throw new Error("Geçersiz isim");
  }
  if (!customer.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    throw new Error("Geçersiz e-posta adresi");
  }
  if (!customer.phone || customer.phone.length > 30) {
    throw new Error("Geçersiz telefon numarası");
  }
};

export const submitOrder = async (
  params: SubmitOrderParams
): Promise<SubmitOrderResult> => {
  validateCustomer(params.customer);
  const fileUrls = await uploadFiles(params.files);

  const paymentMethod: PaymentMethod = params.paymentMethod ?? "bank_transfer";
  const now = Timestamp.now();
  const attribution = readStoredAttribution();
  const order: Omit<OrderSubmission, "id"> = {
    customer: params.customer,
    serviceId: params.serviceId,
    serviceName: params.serviceName,
    config: serializeConfig(params.config),
    pricing: { ...params.pricing, currency: "TRY" },
    fileUrls,
    status: "new",
    adminNotes: "",
    ...(params.customerUid ? { customerUid: params.customerUid } : {}),
    ...(attribution ? { attribution } : {}),
    paymentMethod,
    paymentStatus: "pending",
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(collection(db, "mindid_orders"), order);

  // Initialize payment session via the chosen provider.
  let paymentResult: PaymentInitResult;
  try {
    const provider = getPaymentProvider(paymentMethod);
    paymentResult = await provider.init({
      orderId: docRef.id,
      customerId: params.customerUid ?? params.customer.email,
      customerEmail: params.customer.email,
      amount: params.pricing.totalAI,
      currency: "TRY",
    });
  } catch (err) {
    // Payment init failed — order is already created, but we mark it failed
    // so admin can follow up manually. Re-throw so caller can show error UI.
    await updateDoc(doc(db, "mindid_orders", docRef.id), {
      paymentStatus: "failed",
      updatedAt: Timestamp.now(),
    }).catch(() => undefined);
    throw err;
  }

  // Persist payment session reference + awaiting_confirmation status on order.
  await updateDoc(doc(db, "mindid_orders", docRef.id), {
    paymentSessionId: paymentResult.sessionId,
    paymentReference: paymentResult.instructions?.reference ?? null,
    updatedAt: Timestamp.now(),
  });

  // Update customer stats if logged in
  if (params.customerUid) {
    try {
      const { doc: firestoreDoc, updateDoc: updateDocLazy, increment } = await import("firebase/firestore");
      await updateDocLazy(firestoreDoc(db, "mindid_customers", params.customerUid), {
        orderCount: increment(1),
        totalSpent: increment(params.pricing.totalAI),
        updatedAt: now,
      });
    } catch {
      // Non-critical — don't fail the order
    }
  }

  // ─── Queue customer confirmation email (Firestore "mail" collection) ───
  // Awaits the doc write but swallows errors — order succeeds regardless.
  const bankInstr = paymentResult.instructions;
  await queueEmail({
    to: params.customer.email,
    subject: `Siparişin alındı! 🎬 — Sipariş #${docRef.id.slice(0, 8).toUpperCase()}`,
    html: renderOrderConfirmationEmail({
      orderId: docRef.id,
      customerName: params.customer.name,
      serviceName: params.serviceName,
      totalTRY: params.pricing.totalAI,
      configLines: buildConfigLines(serializeConfig(params.config)),
      paymentStatus:
        paymentMethod === "bank_transfer" ? "awaiting_confirmation" : undefined,
      bankInfo:
        paymentMethod === "bank_transfer" && bankInstr
          ? {
              bankName: bankInstr.bankName ?? "-",
              accountHolder: bankInstr.accountHolder ?? "-",
              iban: bankInstr.iban ?? "-",
              reference:
                bankInstr.reference ?? docRef.id.slice(0, 8).toUpperCase(),
            }
          : undefined,
      expectedDeliveryDays: 5,
    }),
  });

  return { orderId: docRef.id, payment: paymentResult, paymentMethod };
};

/**
 * Marks the bank-transfer-style payment as customer-claimed
 * (status: awaiting_confirmation). Admin must verify in bank statement
 * before flipping to "paid".
 */
export const markPaymentClaimed = async (orderId: string, paymentSessionId: string): Promise<void> => {
  const now = Timestamp.now();
  // Update the payment-session doc (customer-writable per Firestore rules).
  await updateDoc(doc(db, "mindid_payment_sessions", paymentSessionId), {
    status: "awaiting_confirmation",
    customerClaimedAt: now,
    updatedAt: now,
  });
  // Best-effort: bump the order doc too. If the customer is anon and rules deny
  // it, we swallow — admin reconciles via the session doc + admin UI.
  try {
    await updateDoc(doc(db, "mindid_orders", orderId), {
      paymentStatus: "awaiting_confirmation",
      updatedAt: now,
    });
  } catch {
    // permission denied for non-admin — acceptable
  }
};
