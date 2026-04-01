import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import type { ConfigState } from "@/lib/types";
import type { OrderConfig, OrderCustomer, OrderSubmission } from "@/lib/firestore-types";

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

export const submitOrder = async (params: SubmitOrderParams): Promise<string> => {
  validateCustomer(params.customer);
  const fileUrls = await uploadFiles(params.files);

  const now = Timestamp.now();
  const order: Omit<OrderSubmission, "id"> = {
    customer: params.customer,
    serviceId: params.serviceId,
    serviceName: params.serviceName,
    config: serializeConfig(params.config),
    pricing: { ...params.pricing, currency: "TRY" },
    fileUrls,
    status: "new",
    adminNotes: "",
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(collection(db, "mindid_orders"), order);
  return docRef.id;
};
