"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { TeamMember } from "@/lib/firestore-types";
import { DataTable, type Column } from "./data-table";
import { ConfirmDialog } from "./confirm-dialog";
import { Plus, X } from "lucide-react";

const ICON_OPTIONS = ["Brain", "Palette", "Volume2", "BarChart3", "Camera", "Code", "Megaphone", "Lightbulb"];

const emptyItem: Omit<TeamMember, "id"> = {
  role: "",
  roleEn: "",
  description: "",
  descriptionEn: "",
  iconName: "Brain",
  order: 0,
  visible: true,
};

export const TeamEditor = () => {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const q = query(collection(db, "mindid_team"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember)));
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

  const openEdit = (item: TeamMember) => {
    setEditing(item);
    setForm({
      role: item.role,
      roleEn: item.roleEn,
      description: item.description,
      descriptionEn: item.descriptionEn,
      iconName: item.iconName,
      order: item.order,
      visible: item.visible,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editing?.id) {
      await updateDoc(doc(db, "mindid_team", editing.id), { ...form });
    } else {
      await addDoc(collection(db, "mindid_team"), { ...form });
    }
    setShowForm(false);
    fetchItems();
  };

  const handleDelete = async () => {
    if (deleteTarget?.id) {
      await deleteDoc(doc(db, "mindid_team", deleteTarget.id));
      setDeleteTarget(null);
      fetchItems();
    }
  };

  const toggleVisibility = async (item: TeamMember) => {
    if (item.id) {
      await updateDoc(doc(db, "mindid_team", item.id), { visible: !item.visible });
      fetchItems();
    }
  };

  const columns: Column<TeamMember>[] = [
    { key: "order", label: "Sıra" },
    { key: "role", label: "Rol" },
    { key: "iconName", label: "İkon" },
  ];

  if (loading) return <div className="text-[var(--gray)]">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[var(--cream)]">Takım Yönetimi</h2>
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
              <h3 className="font-black text-[var(--cream)]">{editing ? "Düzenle" : "Yeni Üye"}</h3>
              <button onClick={() => setShowForm(false)} className="text-[var(--gray)] hover:text-[var(--cream)] cursor-pointer"><X size={20} /></button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[var(--gray)] mb-1">Rol (TR)</label>
                  <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--gray)] mb-1">Rol (EN)</label>
                  <input value={form.roleEn} onChange={(e) => setForm({ ...form, roleEn: e.target.value })} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[var(--gray)] mb-1">Açıklama (TR)</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--gray)] mb-1">Açıklama (EN)</label>
                  <textarea value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} rows={2} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none resize-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--gray)] mb-1">İkon</label>
                <div className="flex flex-wrap gap-2">
                  {ICON_OPTIONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setForm({ ...form, iconName: icon })}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all ${
                        form.iconName === icon
                          ? "bg-[var(--lime)] text-[var(--dark-blue)] border-2 border-[var(--dark-blue)]"
                          : "bg-[var(--electric-blue)]/20 text-[var(--cream)] border-2 border-[var(--electric-blue)]/30"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
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
