import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

type NotificationType = "order_update" | "payment" | "system" | "promo";

type SendNotificationParams = {
  customerId: string;
  type: NotificationType;
  title: string;
  message: string;
  actionUrl?: string;
};

export const sendNotification = async (params: SendNotificationParams): Promise<string> => {
  const docRef = await addDoc(collection(db, "mindid_notifications"), {
    customerId: params.customerId,
    type: params.type,
    title: params.title,
    message: params.message,
    actionUrl: params.actionUrl || null,
    read: false,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

// Order status change notification templates
const ORDER_STATUS_MESSAGES: Record<string, { title: string; message: string }> = {
  seen: {
    title: "Siparişiniz inceleniyor",
    message: "Ekibimiz siparişinizi incelemeye aldı. En kısa sürede üretim sürecine başlayacağız.",
  },
  "in-progress": {
    title: "Üretim başladı! 🎬",
    message: "Siparişinizin üretimi başladı. Tamamlandığında size bildirim göndereceğiz.",
  },
  completed: {
    title: "Siparişiniz hazır! 🎉",
    message: "Harika haber! Siparişiniz tamamlandı. Dosyalarınızı panelden indirebilirsiniz.",
  },
  cancelled: {
    title: "Sipariş iptal edildi",
    message: "Siparişiniz iptal edilmiştir. Sorularınız için bizimle iletişime geçebilirsiniz.",
  },
};

export const notifyOrderStatusChange = async (
  customerUid: string | undefined,
  orderId: string,
  newStatus: string
): Promise<void> => {
  if (!customerUid) return;

  const template = ORDER_STATUS_MESSAGES[newStatus];
  if (!template) return;

  try {
    await sendNotification({
      customerId: customerUid,
      type: "order_update",
      title: template.title,
      message: template.message,
      actionUrl: `/dashboard/orders`,
    });
  } catch (err) {
    console.error("Notification send error:", err);
  }
};
