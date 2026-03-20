"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { FAQItem } from "@/lib/firestore-types";
import { DataTable, type Column } from "./data-table";
import { ConfirmDialog } from "./confirm-dialog";
import { Plus, X } from "lucide-react";

const emptyItem: Omit<FAQItem, "id"> = {
  question: "",
  questionEn: "",
  answer: "",
  answerEn: "",
  order: 0,
  visible: true,
};

export const FAQEditor = () => {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<FAQItem | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const q = query(collection(db, "mindid_faq"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FAQItem)));
    } catch {
      // empty
    }
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyItem, order: items.length });
    setShowForm(true);
  };

  const openEdit = (item: FAQItem) => {
    setEditing(item);
    setForm({
      question: item.question,
      questionEn: item.questionEn,
      answer: item.answer,
      answerEn: item.answerEn,
      order: item.order,
      visible: item.visible,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editing?.id) {
      await updateDoc(doc(db, "mindid_faq", editing.id), { ...form });
    } else {
      await addDoc(collection(db, "mindid_faq"), { ...form });
    }
    setShowForm(false);
    fetchItems();
  };

  const handleDelete = async () => {
    if (deleteTarget?.id) {
      await deleteDoc(doc(db, "mindid_faq", deleteTarget.id));
      setDeleteTarget(null);
      fetchItems();
    }
  };

  const toggleVisibility = async (item: FAQItem) => {
    if (item.id) {
      await updateDoc(doc(db, "mindid_faq", item.id), { visible: !item.visible });
      fetchItems();
    }
  };

  const columns: Column<FAQItem>[] = [
    { key: "order", label: "Sıra" },
    {
      key: "question",
      label: "Soru",
      render: (item) => (
        <span className="line-clamp-1">{item.question}</span>
      ),
    },
  ];

  if (loading) return <div className="text-[var(--gray)]">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[var(--cream)]">SSS Yönetimi</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] font-bold text-sm cursor-pointer hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          <Plus size={16} /> Yeni Ekle
        </button>
      </div>

      <DataTable
        columns={columns}
        data={items}
        onEdit={openEdit}
        onDelete={(item) => setDeleteTarget(item)}
        onToggleVisibility={toggleVisibility}
        isVisible={(item) => item.visible}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-auto pt-10 pb-10">
          <div className="bg-[var(--card)] border-3 border-[var(--lime)] rounded-lg p-6 max-w-lg w-full mx-4 shadow-[6px_6px_0px_var(--lime)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-[var(--cream)]">{editing ? "Düzenle" : "Yeni SSS"}</h3>
              <button onClick={() => setShowForm(false)} className="text-[var(--gray)] hover:text-[var(--cream)] cursor-pointer"><X size={20} /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[var(--gray)] mb-1">Soru (TR)</label>
                <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--gray)] mb-1">Soru (EN)</label>
                <input value={form.questionEn} onChange={(e) => setForm({ ...form, questionEn: e.target.value })} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--gray)] mb-1">Cevap (TR)</label>
                <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--gray)] mb-1">Cevap (EN)</label>
                <textarea value={form.answerEn} onChange={(e) => setForm({ ...form, answerEn: e.target.value })} rows={4} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[var(--gray)] mb-1">Sıra</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} className="accent-[var(--lime)]" />
                    <span className="text-sm text-[var(--cream)]">Görünür</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-md bg-[var(--electric-blue)]/20 border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm font-bold cursor-pointer">İptal</button>
              <button onClick={handleSave} className="px-4 py-2 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-2 border-[var(--dark-blue)] font-bold text-sm cursor-pointer">Kaydet</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
};
