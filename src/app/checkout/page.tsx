"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useAuth } from "@/lib/auth-context";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { trackEvent } from "@/lib/tracking";
import { trackGoogleAdsConversion } from "@/components/tracking/google-ads";
import {
  CheckCircle2,
  ArrowRight,
  User,
  LogIn,
  Clock,
  PartyPopper,
  Loader2,
} from "lucide-react";

type OrderSummary = {
  paymentStatus?: string;
  serviceId?: string;
  serviceName?: string;
  pricing?: { totalAI?: number; currency?: string };
};

const TIMELINE_BY_SERVICE: Record<string, string> = {
  video: "Üretim 3-5 iş günü içinde tamamlanır.",
  photo: "Çekim ve rötuş 2-4 iş günü içinde tamamlanır.",
  avatar: "AI Avatar üretimi 5-7 iş günü içinde tamamlanır.",
  social: "İlk içerikler 2-3 iş günü içinde teslim edilir.",
};

const CheckoutContent = () => {
  const { user, isCustomer } = useAuth();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const statusHint = searchParams.get("status"); // hint from /checkout/payment redirect
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const purchaseFiredRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "mindid_orders", orderId));
        if (!cancelled && snap.exists()) {
          setOrder(snap.data() as OrderSummary);
        }
      } catch {
        // permissions may block read for anon — fall back to URL hint
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const paymentStatus = order?.paymentStatus ?? statusHint ?? "pending";
  const isAwaiting = paymentStatus === "awaiting_confirmation";
  const isPaid = paymentStatus === "paid";

  useEffect(() => {
    if (!orderId || purchaseFiredRef.current) return;
    if (!isAwaiting && !isPaid) return;

    const key = `mindid_purchase_tracked_${orderId}`;
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem(key)) {
        purchaseFiredRef.current = true;
        return;
      }
    } catch {
      // ignore
    }

    purchaseFiredRef.current = true;
    try {
      if (typeof window !== "undefined") sessionStorage.setItem(key, "1");
    } catch {
      // ignore
    }

    const value = order?.pricing?.totalAI ?? 0;
    const currency = order?.pricing?.currency ?? "TRY";
    trackEvent("purchase", {
      value,
      currency,
      contentId: orderId,
      contentName: order?.serviceName,
      contentCategory: order?.serviceId,
      contents: [{ id: orderId, quantity: 1, price: value }],
      numItems: 1,
    });
    const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
    if (conversionLabel && value > 0) {
      trackGoogleAdsConversion(conversionLabel, value, currency);
    }
  }, [orderId, order, isAwaiting, isPaid]);

  const headline = isPaid
    ? "Ödemeniz Onaylandı!"
    : isAwaiting
    ? "Ödemeniz Onay Bekliyor"
    : "Siparişiniz Alındı!";

  const Icon = isPaid ? PartyPopper : isAwaiting ? Clock : CheckCircle2;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#100a2c] via-[#1c1242] to-[#100a2c]">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--lime)]/20 flex items-center justify-center mx-auto mb-6">
          {loading ? (
            <Loader2 size={32} className="text-[var(--lime)] animate-spin" />
          ) : (
            <Icon size={40} className="text-[var(--lime)]" />
          )}
        </div>

        <h1 className="text-2xl font-black text-white mb-3">{headline}</h1>

        {/* Payment status message */}
        {isAwaiting && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-4 text-left">
            <p className="text-sm text-amber-100 leading-relaxed">
              Banka havalesi onaylandığında size e-posta göndereceğiz. Genelde{" "}
              <strong>1-2 saat</strong> içinde tamamlanır. Açıklamada referans
              numaranız doğruysa süreç hızlanır.
            </p>
          </div>
        )}

        {isPaid && (
          <div className="bg-[var(--lime)]/10 border border-[var(--lime)]/30 rounded-2xl p-4 mb-4 text-left">
            <p className="text-sm text-white leading-relaxed">
              Üretim ekibimiz işe başladı.{" "}
              {order?.serviceId && TIMELINE_BY_SERVICE[order.serviceId] && (
                <span className="text-gray-300">
                  {TIMELINE_BY_SERVICE[order.serviceId]}
                </span>
              )}
            </p>
          </div>
        )}

        {!isAwaiting && !isPaid && (
          <p className="text-sm text-gray-400 mb-2">
            Ekibimiz en kısa sürede üretim sürecine başlayacak.
          </p>
        )}

        {orderId && (
          <p className="text-xs text-gray-500 mb-6">
            Sipariş No:{" "}
            <span className="font-mono text-[var(--lime)]">
              {orderId.slice(0, 12)}...
            </span>
          </p>
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          {user && isCustomer ? (
            <div>
              <p className="text-sm text-gray-400 mb-4">
                Siparişinizi panelden takip edebilirsiniz.
              </p>
              <Link
                href="/dashboard/orders"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--lime)] text-[#100a2c] font-bold text-sm hover:brightness-110 transition-all"
              >
                <User size={16} /> Siparişlerimi Gör
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-400 mb-3">
                Siparişinizi takip etmek için ücretsiz hesap oluşturun.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--lime)] text-[#100a2c] font-bold text-sm hover:brightness-110 transition-all"
                >
                  <User size={16} /> Ücretsiz Kaydol
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all"
                >
                  <LogIn size={16} /> Giriş Yap
                </Link>
              </div>
            </div>
          )}
        </div>

        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-gray-300 inline-flex items-center gap-1 transition-colors"
        >
          <ArrowRight size={12} className="rotate-180" /> Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
};

const CheckoutPage = () => (
  <Suspense fallback={<div className="min-h-screen bg-[#100a2c]" />}>
    <CheckoutContent />
  </Suspense>
);

export default CheckoutPage;
