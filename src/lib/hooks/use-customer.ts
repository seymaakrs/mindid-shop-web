"use client";

import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import type { OrderSubmission, CustomerNotification, PaymentRecord } from "../firestore-types";

// Müşterinin siparişlerini gerçek zamanlı dinle
export const useCustomerOrders = (customerEmail: string | undefined) => {
  const [orders, setOrders] = useState<OrderSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerEmail) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "mindid_orders"),
      where("customer.email", "==", customerEmail),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() } as OrderSubmission)));
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsubscribe();
  }, [customerEmail]);

  return { orders, loading };
};

// Müşteri bildirimlerini dinle
export const useCustomerNotifications = (customerId: string | undefined) => {
  const [notifications, setNotifications] = useState<CustomerNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!customerId) return;

    const q = query(
      collection(db, "mindid_notifications"),
      where("customerId", "==", customerId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as CustomerNotification));
      setNotifications(items);
      setUnreadCount(items.filter((n) => !n.read).length);
    });

    return () => unsubscribe();
  }, [customerId]);

  return { notifications, unreadCount };
};

// Ödeme geçmişi
export const usePaymentHistory = (customerId: string | undefined) => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerId) {
      setPayments([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "mindid_payments"),
      where("customerId", "==", customerId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setPayments(snap.docs.map((d) => ({ id: d.id, ...d.data() } as PaymentRecord)));
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsubscribe();
  }, [customerId]);

  return { payments, loading };
};
