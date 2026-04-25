"use client";

import { useAuth } from "@/lib/auth-context";
import { usePaymentHistory } from "@/lib/hooks/use-customer";
import { PLAN_LIMITS, formatPrice } from "@/lib/payment";
import { CreditCard, Check, ArrowRight, Receipt } from "lucide-react";

const BillingPage = () => {
  const { customerData } = useAuth();
  const { payments, loading } = usePaymentHistory(customerData?.uid);
  const currentPlan = customerData?.plan || "free";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <CreditCard size={24} className="text-[var(--lime)]" /> Fatura & Ödeme
      </h1>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(PLAN_LIMITS).map(([key, plan]) => {
          const isActive = currentPlan === key;
          return (
            <div
              key={key}
              className={`rounded-2xl p-5 border transition-all ${
                isActive
                  ? "bg-[var(--lime)]/10 border-[var(--lime)]/30"
                  : "bg-white/5 border-white/5 hover:border-white/10"
              }`}
            >
              <h3 className={`text-sm font-bold ${isActive ? "text-[var(--lime)]" : "text-white"}`}>
                {plan.name}
              </h3>
              <p className="text-2xl font-black text-white mt-2">
                {plan.price === 0 ? "Ücretsiz" : formatPrice(plan.price)}
                {plan.price > 0 && <span className="text-xs text-gray-500 font-normal">/ay</span>}
              </p>
              <ul className="mt-3 space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                    <Check size={12} className="text-[var(--lime)] mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                disabled={isActive}
                className={`w-full mt-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[var(--lime)]/20 text-[var(--lime)] cursor-default"
                    : "bg-white/10 text-white hover:bg-[var(--lime)] hover:text-[#100a2c]"
                }`}
              >
                {isActive ? "Mevcut Plan" : "Yükselt"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment History */}
      <div className="bg-white/5 border border-white/5 rounded-2xl">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Receipt size={16} className="text-[var(--lime)]" /> Ödeme Geçmişi
          </h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Yükleniyor...</div>
        ) : payments.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">Henüz ödeme kaydı yok.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-white">{payment.description}</p>
                  <p className="text-[10px] text-gray-500">
                    {payment.createdAt && typeof payment.createdAt === "object" && "toDate" in payment.createdAt
                      ? (payment.createdAt as { toDate: () => Date }).toDate().toLocaleDateString("tr-TR")
                      : "—"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{formatPrice(payment.amount, payment.currency)}</p>
                  <span className={`text-[10px] font-bold ${
                    payment.status === "completed" ? "text-green-400" :
                    payment.status === "pending" ? "text-yellow-400" : "text-red-400"
                  }`}>
                    {payment.status === "completed" ? "Tamamlandı" :
                     payment.status === "pending" ? "Beklemede" : "Başarısız"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingPage;
