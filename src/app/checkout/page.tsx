"use client";

import { useAuth } from "@/lib/auth-context";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, User, LogIn } from "lucide-react";
import { Suspense } from "react";

const CheckoutContent = () => {
  const { user, isCustomer } = useAuth();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#100a2c] via-[#1c1242] to-[#100a2c]">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--lime)]/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-[var(--lime)]" />
        </div>

        <h1 className="text-2xl font-black text-white mb-3">Siparişiniz Alındı! 🎉</h1>
        <p className="text-sm text-gray-400 mb-2">
          Ekibimiz en kısa sürede üretim sürecine başlayacak.
        </p>
        {orderId && (
          <p className="text-xs text-gray-500 mb-6">
            Sipariş No: <span className="font-mono text-[var(--lime)]">{orderId.slice(0, 12)}...</span>
          </p>
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          {user && isCustomer ? (
            <div>
              <p className="text-sm text-gray-400 mb-4">Siparişinizi panelden takip edebilirsiniz.</p>
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

        <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 inline-flex items-center gap-1 transition-colors">
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
