"use client";

import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import type { GenerationJob, CustomerNotification, PaymentRecord } from "../firestore-types";

// Müşterinin AI üretim geçmişini canlı dinle
export const useCustomerGenerations = (customerEmail: string | undefined) => {
  const [generations, setGenerations] = useState<GenerationJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerEmail) {
      setGenerations([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "mindid_generations"),
      where("customerEmail", "==", customerEmail),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setGenerations(snap.docs.map((d) => ({ id: d.id, ...d.data() } as GenerationJob)));
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsubscribe();
  }, [customerEmail]);

  return { generations, loading };
};

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
