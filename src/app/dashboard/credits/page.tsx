"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Coins, TrendingUp, TrendingDown, Sparkles, Plus, ArrowRight } from "lucide-react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import type { CreditTransactionType } from "@/lib/credits";

type TxRow = {
  id: string;
  type: CreditTransactionType;
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt?: Timestamp;
};

const TYPE_LABELS: Record<CreditTransactionType, string> = {
  signup_bonus: "Hoş Geldin Bonusu",
  purchase: "Kredi Satın Alma",
  spend: "Harcama",
  refund: "İade",
  referral: "Referans",
  promo: "Promosyon",
};

const formatDate = (ts?: Timestamp) => {
  if (!ts) return "—";
  try {
    return ts.toDate().toLocaleString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
};

const CreditsPage = () => {
  const { customerData } = useAuth();
  const [txs, setTxs] = useState<TxRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerData?.uid) return;
    const q = query(
      collection(db, "mindid_credit_transactions"),
      where("customerId", "==", customerData.uid),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows: TxRow[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            type: data.type,
            amount: data.amount,
            balanceAfter: data.balanceAfter,
            description: data.description,
            createdAt: data.createdAt,
          };
        });
        setTxs(rows);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, [customerData?.uid]);

  const balance = customerData?.credits ?? 0;
  const earned = txs.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const spent = txs.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Coins size={24} className="text-[var(--lime)]" /> Kredilerim
        </h1>
        <Link
          href="/dashboard/credits/buy"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--lime)] text-[#100a2c] text-sm font-bold hover:brightness-110 transition-all"
        >
          <Plus size={16} /> Kredi Satın Al
        </Link>
      </div>

      {/* Balance + summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 bg-[var(--card)] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[var(--lime)]/10 blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <Sparkles size={14} className="text-[var(--lime)]" /> Mevcut Bakiye
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-white leading-none">{balance}</span>
            <span className="text-sm font-semibold text-gray-400 mb-1">kredi</span>
          </div>
          <Link
            href="/dashboard/credits/buy"
            className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[var(--lime)] hover:underline"
          >
            Daha fazla kredi al <ArrowRight size={12} />
          </Link>
        </div>

        <div className="bg-[var(--card)] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <TrendingUp size={14} className="text-green-400" /> Kazanılan (son 50)
          </div>
          <p className="text-3xl font-bold text-white">+{earned}</p>
          <p className="text-xs text-gray-500 mt-1">Bonuslar, satın almalar, iadeler</p>
        </div>

        <div className="bg-[var(--card)] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <TrendingDown size={14} className="text-red-400" /> Harcanan (son 50)
          </div>
          <p className="text-3xl font-bold text-white">-{spent}</p>
          <p className="text-xs text-gray-500 mt-1">AI üretim çağrıları</p>
        </div>
      </div>

      {/* Transaction history */}
      <div className="bg-[var(--card)] border border-white/5 rounded-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-base font-bold text-white">İşlem Geçmişi</h2>
          <span className="text-xs text-gray-500">Son {txs.length} kayıt</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Yükleniyor...</div>
        ) : txs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-sm mb-4">Henüz işlem yok</p>
            <Link
              href="/dashboard/credits/buy"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--lime)] text-[#100a2c] text-sm font-bold hover:brightness-110 transition-all"
            >
              <Plus size={14} /> Kredi Satın Al
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {txs.map((t) => {
              const positive = t.amount > 0;
              return (
                <div
                  key={t.id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        positive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{t.description}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {TYPE_LABELS[t.type] || t.type} · {formatDate(t.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p
                      className={`text-sm font-bold ${
                        positive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {t.amount}
                    </p>
                    <p className="text-[10px] text-gray-500">Bakiye: {t.balanceAfter}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditsPage;
