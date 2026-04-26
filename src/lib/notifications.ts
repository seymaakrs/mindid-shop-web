import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { renderOrderStatusUpdateEmail } from "./email-templates";

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

const STATUS_EMAIL_SUBJECTS: Record<string, string> = {
  seen: "Siparişin inceleniyor 👀",
  "in-progress": "Üretim başladı! 🎬",
  completed: "Siparişin hazır! 🎉",
  cancelled: "Sipariş iptal bildirimi",
};

/**
 * Queue a status-change email via the Firestore "mail" collection.
 * Owner: Install Firebase Email Trigger extension OR connect Resend/SendGrid.
 */
const queueStatusEmail = async (params: {
  to: string;
  customerName: string;
  orderId: string;
  newStatus: string;
}): Promise<void> => {
  const subject = STATUS_EMAIL_SUBJECTS[params.newStatus] ?? "Sipariş durumu güncellendi";
  const shortId = params.orderId.slice(0, 8).toUpperCase();
  try {
    await addDoc(collection(db, "mail"), {
      to: params.to,
      message: {
        subject: `${subject} — Sipariş #${shortId}`,
        html: renderOrderStatusUpdateEmail({
          orderId: params.orderId,
          customerName: params.customerName,
          newStatus: params.newStatus,
        }),
      },
      createdAt: Timestamp.now(),
    });
  } catch (err) {
    console.error("[mail queue] Failed to enqueue status email:", err);
  }
};

/**
 * Notify a customer that an order's status changed.
 *
 * - Always writes an in-app notification doc (if customerUid is provided).
 * - If `customerEmail` is provided, also enqueues an HTML email to the
 *   "mail" collection (Firebase Email Trigger extension).
 *
 * Backward-compatible: existing callers passing only the first three args
 * keep working. The new `customer` param is optional.
 */
export const notifyOrderStatusChange = async (
  customerUid: string | undefined,
  orderId: string,
  newStatus: string,
  customer?: { email?: string; name?: string }
): Promise<void> => {
  const template = ORDER_STATUS_MESSAGES[newStatus];

  // 1. In-app notification (only if logged-in user)
  if (customerUid && template) {
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
  }

  // 2. Email notification (if email provided)
  if (customer?.email) {
    await queueStatusEmail({
      to: customer.email,
      customerName: customer.name || "Değerli müşterimiz",
      orderId,
      newStatus,
    });
  }
};
