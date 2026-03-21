import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import type { ConfigState } from "@/lib/types";
import type { OrderConfig, OrderCustomer, OrderSubmission } from "@/lib/firestore-types";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

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
  if (config.colorCount != null && config.colorCount > 0) {
    result.colorCount = config.colorCount;
  }
  if (config.photoVisualStyle) {
    result.photoVisualStyle = { id: config.photoVisualStyle.id, label: config.photoVisualStyle.label, price: config.photoVisualStyle.price };
  }
  if (config.background) {
    result.background = { id: config.background.id, label: config.background.label, price: config.background.price };
  }

  return result;
};

const uploadFiles = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];
  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`Dosya çok büyük: ${file.name} (max 50 MB)`);
    }
    const timestamp = Date.now();
    const storageRef = ref(storage, `mindid-site/orders/${timestamp}_${file.name}`);
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

export const submitOrder = async (params: SubmitOrderParams): Promise<string> => {
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
