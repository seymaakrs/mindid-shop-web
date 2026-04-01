"use client";

import { useState } from "react";
import { useBlogPosts } from "@/lib/hooks/use-firestore";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BlogPost } from "@/lib/firestore-types";
import {
  Plus,
  Save,
  Trash2,
  X,
  Eye,
  EyeOff,
  FileText,
  Loader2,
} from "lucide-react";

type EditingPost = Omit<BlogPost, "id" | "publishedAt" | "updatedAt"> & {
  id?: string;
};

const EMPTY_POST: EditingPost = {
  title: "",
  titleEn: "",
  slug: "",
  excerpt: "",
  excerptEn: "",
  content: "",
  contentEn: "",
  coverImage: "",
  tags: [],
  category: "general",
  published: false,
};

export const BlogEditor = () => {
  const { data: posts, loading } = useBlogPosts(false);
  const [editing, setEditing] = useState<EditingPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[ğ]/g, "g")
      .replace(/[ü]/g, "u")
      .replace(/[ş]/g, "s")
      .replace(/[ı]/g, "i")
      .replace(/[ö]/g, "o")
      .replace(/[ç]/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 200);

  const sanitizeText = (text: string, maxLength: number) =>
    text.replace(/<[^>]*>/g, "").slice(0, maxLength);

  const validateImageUrl = (url: string): string => {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:") return "";
      return url;
    } catch {
      return "";
    }
  };

  const handleSave = async () => {
    if (!editing || !editing.title || !editing.slug) return;
    setSaving(true);
    try {
      const now = Timestamp.now();
      const data = {
        title: sanitizeText(editing.title, 300),
        titleEn: sanitizeText(editing.titleEn, 300),
        slug: generateSlug(editing.slug || editing.title),
        excerpt: sanitizeText(editing.excerpt, 1000),
        excerptEn: sanitizeText(editing.excerptEn, 1000),
        content: editing.content,
        contentEn: editing.contentEn,
        coverImage: validateImageUrl(editing.coverImage),
        tags: editing.tags.map((tag) => sanitizeText(tag, 50)).filter(Boolean),
        category: editing.category,
        published: editing.published,
        updatedAt: now,
        ...(editing.id ? {} : { publishedAt: now }),
      };

      if (editing.id) {
        await updateDoc(doc(db, "mindid_blog", editing.id), data);
      } else {
        await addDoc(collection(db, "mindid_blog"), { ...data, publishedAt: now });
      }
      setEditing(null);
      window.location.reload();
    } catch (err) {
      alert("Kaydetme hatası: " + (err instanceof Error ? err.message : "Bilinmeyen hata"));
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu blog yazısını silmek istediğinizden emin misiniz?")) return;
    try {
      await deleteDoc(doc(db, "mindid_blog", id));
      window.location.reload();
    } catch {
      // Silme işlemi başarısız
    }
  };

  const addTag = () => {
    if (!editing || !tagInput.trim()) return;
    if (!editing.tags.includes(tagInput.trim())) {
      setEditing({ ...editing, tags: [...editing.tags, tagInput.trim()] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    if (!editing) return;
    setEditing({ ...editing, tags: editing.tags.filter((t) => t !== tag) });
  };

  const inputClass =
    "w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm placeholder:text-[var(--gray)] focus:border-[var(--lime)] focus:outline-none";

  // Editing form
  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-[var(--cream)]">
            {editing.id ? "Yazıyı Düzenle" : "Yeni Blog Yazısı"}
          </h1>
          <button
            onClick={() => setEditing(null)}
            className="p-2 rounded-md text-[var(--gray)] hover:text-[var(--cream)] hover:bg-[var(--electric-blue)]/10 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 max-w-3xl">
          {/* Title TR */}
          <div>
            <label className="text-xs font-bold text-[var(--gray)] mb-1 block">Başlık (TR)</label>
            <input
              className={inputClass}
              value={editing.title}
              onChange={(e) => {
                const title = e.target.value;
                setEditing({
                  ...editing,
                  title,
                  slug: editing.id ? editing.slug : generateSlug(title),
                });
              }}
              placeholder="AI Reklam Filmi Nedir? 2026 Rehberi"
            />
          </div>

          {/* Title EN */}
          <div>
            <label className="text-xs font-bold text-[var(--gray)] mb-1 block">Başlık (EN)</label>
            <input
              className={inputClass}
              value={editing.titleEn}
              onChange={(e) => setEditing({ ...editing, titleEn: e.target.value })}
              placeholder="What is AI Ad Film Production? Complete Guide"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-xs font-bold text-[var(--gray)] mb-1 block">URL Slug</label>
            <input
              className={inputClass}
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              placeholder="ai-reklam-filmi-nedir"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold text-[var(--gray)] mb-1 block">Kategori</label>
            <select
              className={inputClass}
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value as EditingPost["category"] })
              }
            >
              <option value="film">Reklam Filmi</option>
              <option value="avatar">Avatar</option>
              <option value="visual">Ürün Görseli</option>
              <option value="general">Genel</option>
            </select>
          </div>

          {/* Excerpt TR */}
          <div>
            <label className="text-xs font-bold text-[var(--gray)] mb-1 block">Özet (TR)</label>
            <textarea
              className={inputClass}
              rows={2}
              value={editing.excerpt}
              onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
              placeholder="Kısa açıklama..."
            />
          </div>

          {/* Excerpt EN */}
          <div>
            <label className="text-xs font-bold text-[var(--gray)] mb-1 block">Özet (EN)</label>
            <textarea
              className={inputClass}
              rows={2}
              value={editing.excerptEn}
              onChange={(e) => setEditing({ ...editing, excerptEn: e.target.value })}
              placeholder="Short description..."
            />
          </div>

          {/* Content TR */}
          <div>
            <label className="text-xs font-bold text-[var(--gray)] mb-1 block">İçerik (TR) — Markdown</label>
            <textarea
              className={`${inputClass} font-mono`}
              rows={12}
              value={editing.content}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              placeholder="## Başlık&#10;&#10;Paragraf metni...&#10;&#10;- Liste öğesi 1&#10;- Liste öğesi 2"
            />
          </div>

          {/* Content EN */}
          <div>
            <label className="text-xs font-bold text-[var(--gray)] mb-1 block">İçerik (EN) — Markdown</label>
            <textarea
              className={`${inputClass} font-mono`}
              rows={12}
              value={editing.contentEn}
              onChange={(e) => setEditing({ ...editing, contentEn: e.target.value })}
              placeholder="## Heading&#10;&#10;Paragraph text...&#10;&#10;- List item 1&#10;- List item 2"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="text-xs font-bold text-[var(--gray)] mb-1 block">Kapak Görseli URL</label>
            <input
              className={inputClass}
              value={editing.coverImage}
              onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}
              placeholder="https://..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-bold text-[var(--gray)] mb-1 block">Etiketler</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {editing.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] px-2 py-1 rounded"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-red-400 cursor-pointer">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className={inputClass}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Etiket ekle + Enter"
              />
              <button
                onClick={addTag}
                className="px-3 rounded-md bg-[var(--electric-blue)]/20 text-[var(--electric-blue)] text-sm font-bold hover:bg-[var(--electric-blue)]/30 cursor-pointer"
              >
                Ekle
              </button>
            </div>
          </div>

          {/* Published toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditing({ ...editing, published: !editing.published })}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 font-bold text-sm cursor-pointer transition-all ${
                editing.published
                  ? "bg-[var(--lime)]/10 border-[var(--lime)] text-[var(--lime)]"
                  : "bg-[var(--gray)]/10 border-[var(--gray)]/30 text-[var(--gray)]"
              }`}
            >
              {editing.published ? <Eye size={14} /> : <EyeOff size={14} />}
              {editing.published ? "Yayında" : "Taslak"}
            </button>
          </div>

          {/* Save */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving || !editing.title || !editing.slug}
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] font-bold text-sm cursor-pointer hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-6 py-3 rounded-md border-2 border-[var(--gray)]/30 text-[var(--gray)] font-bold text-sm cursor-pointer hover:border-[var(--cream)] hover:text-[var(--cream)] transition-all"
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Post list
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[var(--cream)]">Blog Yönetimi</h1>
          <p className="text-sm text-[var(--gray)]">{posts.length} yazı</p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY_POST })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] font-bold text-sm cursor-pointer hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          <Plus size={16} /> Yeni Yazı
        </button>
      </div>

      {loading ? (
        <div className="text-[var(--gray)]">Yükleniyor...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-[var(--gray)]">
          <FileText size={48} className="mx-auto mb-4 opacity-30" />
          <p className="mb-2">Henüz blog yazısı yok</p>
          <p className="text-sm">Yukarıdaki &quot;Yeni Yazı&quot; butonuna tıklayarak başlayın.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => {
            const date = post.publishedAt?.toDate
              ? new Date(post.publishedAt.toDate()).toLocaleDateString("tr-TR")
              : "";
            return (
              <div
                key={post.id}
                className="flex items-center gap-4 p-4 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 hover:border-[var(--lime)]/30 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-2 h-2 rounded-full ${post.published ? "bg-[var(--lime)]" : "bg-[var(--gray)]"}`}
                    />
                    <h3 className="text-sm font-bold text-[var(--cream)] truncate">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--gray)]">
                    <span>{post.category}</span>
                    <span>/blog/{post.slug}</span>
                    {date && <span>{date}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      setEditing({
                        id: post.id,
                        title: post.title,
                        titleEn: post.titleEn,
                        slug: post.slug,
                        excerpt: post.excerpt,
                        excerptEn: post.excerptEn,
                        content: post.content,
                        contentEn: post.contentEn,
                        coverImage: post.coverImage,
                        tags: post.tags || [],
                        category: post.category,
                        published: post.published,
                      })
                    }
                    className="p-2 rounded-md text-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/10 cursor-pointer"
                  >
                    <FileText size={16} />
                  </button>
                  <button
                    onClick={() => post.id && handleDelete(post.id)}
                    className="p-2 rounded-md text-red-400 hover:bg-red-500/10 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
