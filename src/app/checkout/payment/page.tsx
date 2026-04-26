"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { markPaymentClaimed } from "@/lib/order-service";
import { trackEvent } from "@/lib/tracking";
import {
  getAvailablePaymentMethods,
  BANK_DETAILS,
  type PaymentMethod,
} from "@/lib/payments";
import {
  Wallet,
  CreditCard,
  Building2,
  Copy,
  Check,
  Clock,
  AlertTriangle,
  Loader2,
  ArrowRight,
} from "lucide-react";

type SessionDoc = {
  orderId: string;
  amount: number;
  currency: string;
  reference: string;
  status: string;
};

type OrderDoc = {
  pricing: { totalAI: number; currency: string };
  serviceName: string;
};

const formatPrice = (amount: number, currency = "TRY") =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);

const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — ignore */
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--lime)]/15 hover:bg-[var(--lime)]/25 border border-[var(--lime)]/40 text-[var(--lime)] text-xs font-bold transition-all cursor-pointer"
      aria-label={`${label} kopyala`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Kopyalandı" : "Kopyala"}
    </button>
  );
};

const PaymentContent = () => {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("order");
  const sessionId = params.get("session");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [session, setSession] = useState<SessionDoc | null>(null);
  const [order, setOrder] = useState<OrderDoc | null>(null);
  const [method, setMethod] = useState<PaymentMethod>("bank_transfer");
  const [error, setError] = useState<string | null>(null);

  const methods = useMemo(() => getAvailablePaymentMethods(), []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!orderId || !sessionId) {
        setError("Geçersiz ödeme bağlantısı.");
        setLoading(false);
        return;
      }
      try {
        const [sSnap, oSnap] = await Promise.all([
          getDoc(doc(db, "mindid_payment_sessions", sessionId)),
          getDoc(doc(db, "mindid_orders", orderId)),
        ]);
        if (cancelled) return;
        if (!sSnap.exists()) {
          setError("Ödeme oturumu bulunamadı.");
        } else {
          setSession(sSnap.data() as SessionDoc);
        }
        if (oSnap.exists()) {
          const orderData = oSnap.data() as OrderDoc;
          setOrder(orderData);
          trackEvent("add_payment_info", {
            value: orderData.pricing?.totalAI,
            currency: orderData.pricing?.currency || "TRY",
            contentId: orderId,
            contentName: orderData.serviceName,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Sipariş bilgisi yüklenemedi."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [orderId, sessionId]);

  const onPaymentMade = async () => {
    if (!orderId || !sessionId || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await markPaymentClaimed(orderId, sessionId);
      router.push(`/checkout?order=${orderId}&status=awaiting_confirmation`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Bir hata oluştu. Lütfen tekrar deneyin."
      );
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#100a2c] via-[#1c1242] to-[#100a2c]">
        <Loader2 size={28} className="animate-spin text-[var(--lime)]" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#100a2c] via-[#1c1242] to-[#100a2c]">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-red-400" />
          </div>
          <h1 className="text-xl font-black text-white mb-2">Ödeme Yüklenemedi</h1>
          <p className="text-sm text-gray-400 mb-6">{error ?? "Bilinmeyen hata."}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const amount = session.amount ?? order?.pricing?.totalAI ?? 0;
  const currency = session.currency ?? order?.pricing?.currency ?? "TRY";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#100a2c] via-[#1c1242] to-[#100a2c] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[var(--lime)]/20 flex items-center justify-center">
            <Wallet size={20} className="text-[var(--lime)]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Ödeme</h1>
            <p className="text-xs text-gray-400">
              Sipariş No:{" "}
              <span className="font-mono text-[var(--lime)]">
                {orderId?.slice(0, 12)}...
              </span>
            </p>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400">Toplam Tutar</div>
              <div className="text-2xl font-black text-[var(--lime)]">
                {formatPrice(amount, currency)}
              </div>
            </div>
            {order?.serviceName && (
              <div className="text-right">
                <div className="text-xs text-gray-400">Hizmet</div>
                <div className="text-sm font-bold text-white">
                  {order.serviceName}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Method selector */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Ödeme Yöntemi
          </h2>
          <div className="space-y-2">
            {methods.map((m) => {
              const Icon =
                m.id === "bank_transfer"
                  ? Building2
                  : m.id === "iyzico"
                  ? CreditCard
                  : Wallet;
              const isActive = method === m.id;
              const disabled = !m.enabled;
              return (
                <button
                  key={m.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => !disabled && setMethod(m.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                    disabled
                      ? "border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed"
                      : isActive
                      ? "border-[var(--lime)] bg-[var(--lime)]/10 cursor-pointer"
                      : "border-white/10 bg-white/5 hover:border-white/30 cursor-pointer"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive ? "bg-[var(--lime)]/20" : "bg-white/5"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-[var(--lime)]" : "text-gray-400"}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{m.name}</span>
                      {m.recommended && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--lime)]/20 text-[var(--lime)]">
                          ÖNERİLEN
                        </span>
                      )}
                      {disabled && m.comingSoonLabel && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-gray-400">
                          {m.comingSoonLabel.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {m.description}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isActive
                        ? "border-[var(--lime)] bg-[var(--lime)]"
                        : "border-white/30"
                    }`}
                  >
                    {isActive && (
                      <Check size={12} className="text-[var(--dark-blue)]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bank transfer instructions */}
        {method === "bank_transfer" && (
          <div className="bg-white/5 border border-[var(--lime)]/30 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={16} className="text-[var(--lime)]" />
              <h3 className="text-sm font-bold text-white">
                Havale / EFT Bilgileri
              </h3>
            </div>

            <div className="space-y-3">
              <Row label="Banka" value={BANK_DETAILS.bankName} />
              <Row
                label="Hesap Sahibi"
                value={BANK_DETAILS.accountHolder}
                copyable
              />
              <Row label="IBAN" value={BANK_DETAILS.iban} copyable mono />
              <Row
                label="Tutar"
                value={formatPrice(amount, currency)}
                copyable
                copyValue={String(amount)}
                emphasized
              />
              <Row
                label="Referans Kodu"
                value={session.reference}
                copyable
                mono
                emphasized
              />
            </div>

            {/* Critical warning */}
            <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex gap-2">
              <AlertTriangle
                size={16}
                className="text-amber-400 shrink-0 mt-0.5"
              />
              <div className="text-xs text-amber-200 leading-relaxed">
                <div className="font-bold mb-1">Önemli</div>
                Açıklama kısmına SADECE referans numaranızı yazın:{" "}
                <span className="font-mono font-bold text-amber-100">
                  {session.reference}
                </span>
                . Aksi halde ödemenizin eşleştirilmesi gecikebilir.
              </div>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 flex gap-2">
              <Clock size={14} className="text-gray-400 shrink-0 mt-0.5" />
              <div className="text-xs text-gray-300">
                Havale onayı genellikle <strong>1-2 saat</strong> içinde tamamlanır.
                Onaylandığında e-posta ile bilgilendirileceksiniz.
              </div>
            </div>
          </div>
        )}

        {/* Confirm button */}
        <button
          type="button"
          onClick={onPaymentMade}
          disabled={submitting || method !== "bank_transfer"}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[var(--lime)] text-[#100a2c] font-black text-sm hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> İşleniyor...
            </>
          ) : (
            <>
              Ödeme Yaptım <ArrowRight size={16} />
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Ödeme yapamadıysanız endişelenmeyin — sipariş referansınızla 24 saat
          içinde tekrar deneyebilirsiniz.
        </p>
      </div>
    </div>
  );
};

const Row = ({
  label,
  value,
  copyable,
  copyValue,
  mono,
  emphasized,
}: {
  label: string;
  value: string;
  copyable?: boolean;
  copyValue?: string;
  mono?: boolean;
  emphasized?: boolean;
}) => (
  <div className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0">
    <div className="text-xs text-gray-400 shrink-0">{label}</div>
    <div className="flex items-center gap-2 min-w-0">
      <div
        className={`text-sm truncate ${
          mono ? "font-mono" : ""
        } ${emphasized ? "text-[var(--lime)] font-bold" : "text-white font-medium"}`}
      >
        {value}
      </div>
      {copyable && <CopyButton value={copyValue ?? value} label={label} />}
    </div>
  </div>
);

const PaymentPage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen bg-[#100a2c] flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-[var(--lime)]" />
      </div>
    }
  >
    <PaymentContent />
  </Suspense>
);

export default PaymentPage;
