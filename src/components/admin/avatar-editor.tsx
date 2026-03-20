"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AvatarSample } from "@/lib/firestore-types";
import { DataTable, type Column } from "./data-table";
import { VideoUpload } from "./video-upload";
import { ImageUpload } from "./image-upload";
import { ConfirmDialog } from "./confirm-dialog";
import { Plus, X } from "lucide-react";

const emptyItem: Omit<AvatarSample, "id"> = {
  title: "",
  thumbnailUrl: "",
  videoUrl: "",
  order: 0,
  visible: true,
};

export const AvatarEditor = () => {
  const [items, setItems] = useState<AvatarSample[]>([]);
  const [editing, setEditing] = useState<AvatarSample | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AvatarSample | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const q = query(collection(db, "mindid_avatarSamples"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as AvatarSample)));
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

  const openEdit = (item: AvatarSample) => {
    setEditing(item);
    setForm({
      title: item.title,
      thumbnailUrl: item.thumbnailUrl,
      videoUrl: item.videoUrl,
      order: item.order,
      visible: item.visible,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editing?.id) {
      await updateDoc(doc(db, "mindid_avatarSamples", editing.id), { ...form });
    } else {
      await addDoc(collection(db, "mindid_avatarSamples"), { ...form });
    }
    setShowForm(false);
    fetchItems();
  };

  const handleDelete = async () => {
    if (deleteTarget?.id) {
      await deleteDoc(doc(db, "mindid_avatarSamples", deleteTarget.id));
      setDeleteTarget(null);
      fetchItems();
    }
  };

  const toggleVisibility = async (item: AvatarSample) => {
    if (item.id) {
      await updateDoc(doc(db, "mindid_avatarSamples", item.id), { visible: !item.visible });
      fetchItems();
    }
  };

  const columns: Column<AvatarSample>[] = [
    { key: "order", label: "Sıra" },
    { key: "title", label: "Başlık" },
    {
      key: "thumbnailUrl",
      label: "Görsel",
      render: (item) =>
        item.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.thumbnailUrl} alt="" className="h-8 w-8 object-cover rounded" />
        ) : (
          <span className="text-[var(--gray)] text-xs">—</span>
        ),
    },
  ];

  if (loading) return <div className="text-[var(--gray)]">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[var(--cream)]">Avatar Örnekleri</h2>
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
              <h3 className="font-black text-[var(--cream)]">{editing ? "Düzenle" : "Yeni Örnek"}</h3>
              <button onClick={() => setShowForm(false)} className="text-[var(--gray)] hover:text-[var(--cream)] cursor-pointer"><X size={20} /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[var(--gray)] mb-1">Başlık</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none" />
              </div>

              <ImageUpload
                storagePath={`mindid-site/avatar-samples/${editing?.id ?? "new"}/thumbnail.jpg`}
                currentUrl={form.thumbnailUrl}
                onUpload={(url) => setForm({ ...form, thumbnailUrl: url })}
                label="Thumbnail Yükle"
              />

              <VideoUpload
                storagePath={`mindid-site/avatar-samples/${editing?.id ?? "new"}/video.mp4`}
                currentUrl={form.videoUrl}
                onUpload={(url) => setForm({ ...form, videoUrl: url })}
              />

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
