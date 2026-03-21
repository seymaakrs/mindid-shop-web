import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

admin.initializeApp();

// Yeni sipariş geldiğinde loglama
// İleride email bildirimi eklenebilir
export const onNewOrder = onDocumentCreated(
  "mindid_orders/{orderId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const order = snapshot.data();
    const orderId = event.params.orderId;

    console.log(
      `New order: ${orderId} | Service: ${order.serviceName} | Customer: ${order.customer?.name} | Price: ${order.pricing?.totalAI} TRY`,
    );
  },
);
