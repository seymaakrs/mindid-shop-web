"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { LeadCapture, LeadStatus } from "@/lib/firestore-types";
import { Phone, Mail, MapPin, Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react";

type LeadDoc = LeadCapture & { id: string };

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Yeni",
  contacted: "Arandı",
  converted: "Müşteri Oldu",
  lost: "Vazgeçti",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-[var(--lime)]/20 text-[var(--dark-blue)] border-[var(--lime)]/50",
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  converted: "bg-emerald-100 text-emerald-800 border-emerald-200",
  lost: "bg-red-100 text-red-800 border-red-200",
};

const SOURCE_LABELS: Record<string, string> = {
  exit_intent: "Çıkış Popup'ı",
  popup: "Popup",
  footer: "Footer",
  other: "Diğer",
};

const LeadsPage = () => {
  const [leads, setLeads] = useState<LeadDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [selectedLead, setSelectedLead] = useState<LeadDoc | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, "mindid_leads"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setLeads(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<LeadCapture, "id">) }))
      );
    } catch {
      // koleksiyon henüz boş olabilir
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: LeadStatus) => {
    await updateDoc(doc(db, "mindid_leads", id), {
      status,
      updatedAt: Timestamp.now(),
    });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    if (selectedLead?.id === id) setSelectedLead((l) => l ? { ...l, status } : l);
  };

  const saveNotes = async () => {
    if (!selectedLead) return;
    setSaving(true);
    await updateDoc(doc(db, "mindid_leads", selectedLead.id), {
      notes,
      updatedAt: Timestamp.now(),
    });
    setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? { ...l, notes } : l)));
    setSelectedLead((l) => l ? { ...l, notes } : l);
    setSaving(false);
  };

  const formatDate = (ts: Timestamp) => {
    if (!ts?.toDate) return "-";
    return ts.toDate().toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);
  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
    lost: leads.filter((l) => l.status === "lost").length,
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[var(--cream)]">Potansiyel Müşteriler</h1>
        <p className="text-sm text-[var(--gray)]">Exit-intent popup ve formlardan gelen lead'ler</p>
      </div>

      {/* Filtre */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "new", "contacted", "converted", "lost"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-md text-xs font-bold border-2 transition-all cursor-pointer ${
              filter === s
                ? "bg-[var(--lime)] border-[var(--dark-blue)] text-[var(--dark-blue)]"
                : "bg-[var(--card)] border-[var(--electric-blue)]/20 text-[var(--gray)] hover:border-[var(--lime)]/40"
            }`}
          >
            {s === "all" ? "Tümü" : STATUS_LABELS[s]} ({counts[s]})
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-[var(--gray)] text-sm">Yükleniyor...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--gray)]">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Henüz lead yok. Ziyaretçiler popup'ı doldurunca burada görünecek.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Liste */}
          <div className="space-y-3">
            {filtered.map((lead) => (
              <div
                key={lead.id}
                onClick={() => { setSelectedLead(lead); setNotes(lead.notes || ""); }}
                className={`p-4 rounded-md bg-[var(--card)] border-2 cursor-pointer transition-all hover:border-[var(--lime)]/40 ${
                  selectedLead?.id === lead.id ? "border-[var(--lime)]" : "border-[var(--electric-blue)]/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-sm font-black text-[var(--cream)]">{lead.name}</p>
                    <p className="text-xs text-[var(--gray)]">
                      {SOURCE_LABELS[lead.source] ?? lead.source} · {lead.page}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold border ${STATUS_COLORS[lead.status]}`}>
                    {STATUS_LABELS[lead.status]}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 text-xs text-[var(--gray)]">
                  {lead.phone && (
                    <span className="flex items-center gap-1"><Phone size={11} />{lead.phone}</span>
                  )}
                  {lead.email && (
                    <span className="flex items-center gap-1"><Mail size={11} />{lead.email}</span>
                  )}
                  <span className="flex items-center gap-1"><Clock size={11} />{formatDate(lead.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Detay paneli */}
          {selectedLead && (
            <div className="p-5 rounded-md bg-[var(--card)] border-2 border-[var(--lime)]/30 self-start sticky top-4">
              <h2 className="text-lg font-black text-[var(--cream)] mb-1">{selectedLead.name}</h2>
              <div className="space-y-2 mb-4 text-sm text-[var(--gray)]">
                {selectedLead.phone && (
                  <p className="flex items-center gap-2"><Phone size={13} />{selectedLead.phone}</p>
                )}
                {selectedLead.email && (
                  <p className="flex items-center gap-2"><Mail size={13} />{selectedLead.email}</p>
                )}
                <p className="flex items-center gap-2"><MapPin size={13} />Sayfa: {selectedLead.page}</p>
                <p className="flex items-center gap-2"><Clock size={13} />Kayıt: {formatDate(selectedLead.createdAt)}</p>
              </div>

              {/* Durum güncelle */}
              <div className="mb-4">
                <p className="text-xs font-bold text-[var(--gray)] mb-2 uppercase tracking-wider">Durum Güncelle</p>
                <div className="flex flex-wrap gap-2">
                  {(["new", "contacted", "converted", "lost"] as LeadStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedLead.id, s)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold border-2 transition-all cursor-pointer ${
                        selectedLead.status === s
                          ? "bg-[var(--lime)] border-[var(--dark-blue)] text-[var(--dark-blue)]"
                          : "bg-transparent border-[var(--electric-blue)]/30 text-[var(--gray)] hover:border-[var(--lime)]/40"
                      }`}
                    >
                      {s === "converted" && <CheckCircle size={11} />}
                      {s === "lost" && <XCircle size={11} />}
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notlar */}
              <div>
                <p className="text-xs font-bold text-[var(--gray)] mb-2 uppercase tracking-wider">Notlar</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Arama notları, teklif durumu..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-md bg-[var(--dark-bg)] border-2 border-[var(--electric-blue)]/20 focus:border-[var(--lime)] outline-none text-sm text-[var(--cream)] placeholder-[var(--gray)]/30 resize-none transition-colors"
                />
                <button
                  onClick={saveNotes}
                  disabled={saving}
                  className="mt-2 px-4 py-1.5 rounded-md bg-[var(--lime)] border-2 border-[var(--dark-blue)] text-[var(--dark-blue)] text-xs font-black disabled:opacity-60 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  {saving ? "Kaydediliyor..." : "Notu Kaydet"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeadsPage;
