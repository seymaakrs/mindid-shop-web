"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { CustomerDoc } from "@/lib/firestore-types";
import { Users, Search, Mail, Phone, Building2, Calendar } from "lucide-react";

const PLAN_COLORS: Record<string, string> = {
  free: "text-gray-400 bg-gray-500/10",
  starter: "text-blue-400 bg-blue-500/10",
  growth: "text-purple-400 bg-purple-500/10",
  agency: "text-[var(--lime)] bg-[var(--lime)]/10",
};

const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState<CustomerDoc[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "mindid_customers"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setCustomers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as CustomerDoc)));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsubscribe();
  }, []);

  const filtered = search
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase()) ||
          c.company?.toLowerCase().includes(search.toLowerCase())
      )
    : customers;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Users size={24} className="text-[var(--lime)]" /> Müşteriler
          <span className="text-sm text-gray-500 font-normal">({customers.length})</span>
        </h1>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="İsim, e-posta veya şirket ara..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:border-[var(--lime)] focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto mb-4 text-gray-700" />
          <p className="text-gray-500">
            {search ? "Aramanızla eşleşen müşteri bulunamadı." : "Henüz kayıtlı müşteri yok."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((customer) => (
            <div
              key={customer.id}
              className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-bold text-white">{customer.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${PLAN_COLORS[customer.plan] || PLAN_COLORS.free}`}>
                      {customer.plan}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Mail size={12} /> {customer.email}</span>
                    {customer.phone && <span className="flex items-center gap-1"><Phone size={12} /> {customer.phone}</span>}
                    {customer.company && <span className="flex items-center gap-1"><Building2 size={12} /> {customer.company}</span>}
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {customer.createdAt && typeof customer.createdAt === "object" && "toDate" in customer.createdAt
                        ? (customer.createdAt as { toDate: () => Date }).toDate().toLocaleDateString("tr-TR")
                        : "—"}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-white">{customer.orderCount || 0} sipariş</p>
                  <p className="text-xs text-gray-500">₺{(customer.totalSpent || 0).toLocaleString("tr-TR")}</p>
                  <p className="text-[10px] text-gray-600">{customer.credits || 0} kredi</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCustomersPage;
