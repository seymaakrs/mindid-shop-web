"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { SocialPost, SocialPlatform, SocialPostStatus, SocialContentType } from "@/lib/firestore-types";
import { ImageUpload } from "./image-upload";
import { VideoUpload } from "./video-upload";
import { ConfirmDialog } from "./confirm-dialog";
import {
  Plus,
  X,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronUp,
  Edit3,
  Trash2,
  Eye,
  Lightbulb,
  Send,
  Clock,
  CheckCircle2,
  FileText,
  Info,
} from "lucide-react";

// ── Platform renkleri ve isimleri ──────────────────────────────────────────
const PLATFORMS: { id: SocialPlatform; label: string; color: string; bg: string }[] = [
  { id: "instagram", label: "Instagram", color: "#E1306C", bg: "rgba(225,48,108,0.12)" },
  { id: "tiktok",    label: "TikTok",    color: "#ffffff", bg: "rgba(255,255,255,0.08)" },
  { id: "linkedin",  label: "LinkedIn",  color: "#0A66C2", bg: "rgba(10,102,194,0.15)" },
  { id: "facebook",  label: "Facebook",  color: "#1877F2", bg: "rgba(24,119,242,0.15)" },
];

const STATUSES: { id: SocialPostStatus; label: string; icon: React.ElementType; color: string }[] = [
  { id: "idea",      label: "Fikir",         icon: Lightbulb,     color: "#a855f7" },
  { id: "draft",     label: "Taslak",        icon: FileText,      color: "#f59e0b" },
  { id: "scheduled", label: "Zamanlandı",    icon: Clock,         color: "#3b82f6" },
  { id: "published", label: "Yayınlandı",    icon: CheckCircle2,  color: "#ade94f" },
];

const CONTENT_TYPES: { id: SocialContentType; label: string }[] = [
  { id: "feed",      label: "Feed Gönderi"  },
  { id: "reel",      label: "Reels / TikTok"},
  { id: "story",     label: "Story"         },
  { id: "carousel",  label: "Carousel"      },
  { id: "video",     label: "Video"         },
];

// ── Boyut Rehberi ──────────────────────────────────────────────────────────
const SIZE_GUIDE = [
  {
    platform: "Instagram",
    color: "#E1306C",
    items: [
      { format: "Feed Kare",       size: "1080 × 1080 px",  ratio: "1:1"  },
      { format: "Feed Dikey",      size: "1080 × 1350 px",  ratio: "4:5"  },
      { format: "Reels & Story",   size: "1080 × 1920 px",  ratio: "9:16" },
      { format: "Kapak Fotoğrafı", size: "320 × 320 px",    ratio: "1:1"  },
    ],
    videoNote: "Reels: maks 90 sn · MP4/MOV · maks 1 GB",
  },
  {
    platform: "TikTok",
    color: "#ffffff",
    items: [
      { format: "Video (Dikey)",   size: "1080 × 1920 px",  ratio: "9:16" },
      { format: "Video (Yatay)",   size: "1920 × 1080 px",  ratio: "16:9" },
    ],
    videoNote: "15 sn – 10 dk · MP4/MOV · maks 2 GB",
  },
  {
    platform: "LinkedIn",
    color: "#0A66C2",
    items: [
      { format: "Paylaşım Görseli", size: "1200 × 627 px",  ratio: "1.91:1" },
      { format: "Kare Görsel",      size: "1080 × 1080 px", ratio: "1:1"    },
      { format: "Video",            size: "1920 × 1080 px", ratio: "16:9"   },
    ],
    videoNote: "Video: maks 10 dk · MP4 · maks 5 GB",
  },
  {
    platform: "Facebook",
    color: "#1877F2",
    items: [
      { format: "Paylaşım Görseli", size: "1200 × 630 px",  ratio: "1.91:1" },
      { format: "Kare Görsel",      size: "1080 × 1080 px", ratio: "1:1"    },
      { format: "Reels / Video",    size: "1080 × 1920 px", ratio: "9:16"   },
    ],
    videoNote: "Video: maks 240 dk · MP4 · maks 10 GB",
  },
];

const SOCIAL_IMAGE_GUIDES = [
  { label: "Feed Kare (Instagram/LinkedIn/Facebook)", size: "1080×1080 px (1:1)", tip: "JPG/PNG, maks 8 MB" },
  { label: "Feed Dikey (Instagram)", size: "1080×1350 px (4:5)", tip: "JPG/PNG, maks 8 MB" },
  { label: "Story / Reels (Instagram/TikTok)", size: "1080×1920 px (9:16)", tip: "JPG/PNG, maks 8 MB" },
  { label: "LinkedIn / Facebook Yatay", size: "1200×627 px (1.91:1)", tip: "JPG/PNG, maks 8 MB" },
];

const SOCIAL_VIDEO_GUIDES = [
  { label: "Reels / TikTok (Dikey)", size: "1080×1920 px (9:16)", tip: "MP4, maks 2 GB, 90 sn" },
  { label: "YouTube / LinkedIn (Yatay)", size: "1920×1080 px (16:9)", tip: "MP4, maks 5 GB" },
  { label: "Feed Kare Video", size: "1080×1080 px (1:1)", tip: "MP4, maks 1 GB" },
];

// ── Yardımcı: Durum rozeti ──────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: SocialPostStatus }) => {
  const s = STATUSES.find((x) => x.id === status)!;
  const Icon = s.icon;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
      style={{ color: s.color, background: `${s.color}18`, border: `1px solid ${s.color}40` }}
    >
      <Icon size={9} />
      {s.label}
    </span>
  );
};

// ── Boş form ───────────────────────────────────────────────────────────────
const emptyPost: Omit<SocialPost, "id" | "createdAt"> = {
  caption: "",
  hashtags: [],
  platforms: [],
  mediaUrl: "",
  mediaType: "image",
  status: "idea",
  contentType: "feed",
  category: "",
  notes: "",
};

// ── Ana Bileşen ─────────────────────────────────────────────────────────────
export const SosyalMedyaEditor = () => {
  const [posts, setPosts]             = useState<SocialPost[]>([]);
  const [loading, setLoading]         = useState(true);
  const [showGuide, setShowGuide]     = useState(false);
  const [showForm, setShowForm]       = useState(false);
  const [editing, setEditing]         = useState<SocialPost | null>(null);
  const [form, setForm]               = useState<Omit<SocialPost, "id" | "createdAt">>(emptyPost);
  const [deleteTarget, setDeleteTarget] = useState<SocialPost | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<SocialPlatform | "all">("all");
  const [filterStatus, setFilterStatus]     = useState<SocialPostStatus | "all">("all");
  const [hashtagInput, setHashtagInput]     = useState("");

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "mindid_social_posts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as SocialPost)));
    } catch {
      // boş
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  // ── İstatistikler ──────────────────────────────────────────────────────
  const stats = STATUSES.map((s) => ({
    ...s,
    count: posts.filter((p) => p.status === s.id).length,
  }));

  // ── Filtrelenmiş liste ─────────────────────────────────────────────────
  const filtered = posts.filter((p) => {
    const byPlatform = filterPlatform === "all" || p.platforms.includes(filterPlatform);
    const byStatus   = filterStatus   === "all" || p.status === filterStatus;
    return byPlatform && byStatus;
  });

  // ── Form işlemleri ─────────────────────────────────────────────────────
  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyPost });
    setHashtagInput("");
    setShowForm(true);
  };

  const openEdit = (post: SocialPost) => {
    setEditing(post);
    setForm({
      caption:     post.caption,
      hashtags:    post.hashtags,
      platforms:   post.platforms,
      mediaUrl:    post.mediaUrl ?? "",
      mediaType:   post.mediaType ?? "image",
      status:      post.status,
      contentType: post.contentType ?? "feed",
      category:    post.category ?? "",
      notes:       post.notes ?? "",
      scheduledAt: post.scheduledAt,
      publishedAt: post.publishedAt,
    });
    setHashtagInput(post.hashtags.join(" "));
    setShowForm(true);
  };

  const handleSave = async () => {
    const data = {
      ...form,
      hashtags: hashtagInput
        .split(/[\s,]+/)
        .map((h) => h.trim().replace(/^#/, ""))
        .filter(Boolean),
      updatedAt: Timestamp.now(),
    };

    if (editing?.id) {
      await updateDoc(doc(db, "mindid_social_posts", editing.id), data);
    } else {
      await addDoc(collection(db, "mindid_social_posts"), {
        ...data,
        createdAt: Timestamp.now(),
      });
    }
    setShowForm(false);
    fetchPosts();
  };

  const handleDelete = async () => {
    if (deleteTarget?.id) {
      await deleteDoc(doc(db, "mindid_social_posts", deleteTarget.id));
      setDeleteTarget(null);
      fetchPosts();
    }
  };

  const togglePlatform = (p: SocialPlatform) => {
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(p)
        ? f.platforms.filter((x) => x !== p)
        : [...f.platforms, p],
    }));
  };

  if (loading) return <div className="text-[var(--gray)] p-4">Yükleniyor...</div>;

  return (
    <div className="space-y-6">

      {/* ── Başlık ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-[var(--cream)]">Sosyal Medya Yönetimi</h2>
          <p className="text-xs text-[var(--gray)] mt-0.5">İçerik oluştur, zamanla, yönet</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuide((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-[var(--dark-blue)] border border-[var(--electric-blue)]/30 text-[var(--gray)] text-xs font-bold hover:text-[var(--lime)] hover:border-[var(--lime)]/40 transition-all cursor-pointer"
          >
            <Info size={14} />
            Boyut Rehberi
            {showGuide ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] font-bold text-sm cursor-pointer hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <Plus size={16} /> Yeni İçerik
          </button>
        </div>
      </div>

      {/* ── Boyut Rehberi (açılır) ───────────────────────────────────── */}
      {showGuide && (
        <div className="rounded-xl border border-[var(--lime)]/20 bg-[var(--dark-blue)] p-5">
          <p className="text-xs font-black text-[var(--lime)] uppercase tracking-wider mb-4">
            📐 Platform Boyut Rehberi
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {SIZE_GUIDE.map((pg) => (
              <div
                key={pg.platform}
                className="rounded-lg border p-3 space-y-2"
                style={{ borderColor: `${pg.color}30`, background: `${pg.color}08` }}
              >
                <p className="text-xs font-black" style={{ color: pg.color }}>
                  {pg.platform}
                </p>
                {pg.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start gap-2">
                    <span className="text-[10px] text-[var(--cream)]/60 leading-tight">{item.format}</span>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-bold text-[var(--cream)]">{item.size}</p>
                      <p className="text-[9px] text-[var(--gray)]">{item.ratio}</p>
                    </div>
                  </div>
                ))}
                <p className="text-[9px] text-[var(--gray)] pt-1 border-t border-white/5">{pg.videoNote}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── İstatistik Barı ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setFilterStatus(filterStatus === s.id ? "all" : s.id)}
              className="rounded-xl p-4 border transition-all text-left cursor-pointer hover:scale-[1.02]"
              style={{
                background: filterStatus === s.id ? `${s.color}18` : "var(--card)",
                borderColor: filterStatus === s.id ? `${s.color}60` : "rgba(28,18,66,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} style={{ color: s.color }} />
                <span className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
              <span className="text-2xl font-black" style={{ color: s.color }}>
                {s.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Filtre Barı ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterPlatform("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
            filterPlatform === "all"
              ? "bg-[var(--lime)] text-[var(--dark-blue)] border-[var(--dark-blue)]"
              : "text-[var(--gray)] border-[var(--electric-blue)]/30 hover:text-[var(--cream)]"
          }`}
        >
          Tümü
        </button>
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            onClick={() => setFilterPlatform(filterPlatform === p.id ? "all" : p.id)}
            className="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border"
            style={{
              background: filterPlatform === p.id ? p.bg : "transparent",
              color: filterPlatform === p.id ? p.color : "var(--gray)",
              borderColor: filterPlatform === p.id ? `${p.color}60` : "rgba(28,18,66,0.4)",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ── İçerik Listesi ─────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-dashed border-[var(--electric-blue)]/30">
          <p className="text-[var(--gray)] text-sm">Henüz içerik yok.</p>
          <button
            onClick={openNew}
            className="mt-3 text-xs text-[var(--lime)] font-bold hover:underline cursor-pointer"
          >
            İlk içeriği oluştur →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-[var(--electric-blue)]/20 bg-[var(--card)] overflow-hidden hover:border-[var(--lime)]/30 transition-all group"
            >
              {/* Medya önizleme */}
              {post.mediaUrl ? (
                post.mediaType === "video" ? (
                  <div className="h-32 bg-black/40 flex items-center justify-center relative">
                    <span className="text-3xl">🎬</span>
                    <span className="absolute bottom-2 left-2 text-[9px] text-white/50 font-bold">VIDEO</span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.mediaUrl}
                    alt="Gönderi görseli"
                    className="w-full h-32 object-cover"
                  />
                )
              ) : (
                <div className="h-32 bg-[var(--dark-blue)] flex items-center justify-center">
                  <span className="text-2xl opacity-20">📷</span>
                </div>
              )}

              {/* İçerik */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <StatusBadge status={post.status} />
                  {post.contentType && (
                    <span className="text-[9px] text-[var(--gray)] font-bold uppercase bg-[var(--dark-blue)] px-2 py-0.5 rounded-full">
                      {CONTENT_TYPES.find((c) => c.id === post.contentType)?.label ?? post.contentType}
                    </span>
                  )}
                </div>

                {/* Caption */}
                <p className="text-xs text-[var(--cream)]/80 leading-relaxed line-clamp-2">
                  {post.caption || <span className="text-[var(--gray)] italic">Caption girilmemiş</span>}
                </p>

                {/* Platformlar */}
                <div className="flex flex-wrap gap-1">
                  {post.platforms.map((p) => {
                    const pl = PLATFORMS.find((x) => x.id === p);
                    if (!pl) return null;
                    return (
                      <span
                        key={p}
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ color: pl.color, background: pl.bg }}
                      >
                        {pl.label}
                      </span>
                    );
                  })}
                </div>

                {/* Hashtagler */}
                {post.hashtags.length > 0 && (
                  <p className="text-[10px] text-[var(--electric-blue)] truncate">
                    #{post.hashtags.slice(0, 4).join(" #")}
                    {post.hashtags.length > 4 && (
                      <span className="text-[var(--gray)]"> +{post.hashtags.length - 4}</span>
                    )}
                  </p>
                )}

                {/* Aksiyon butonları */}
                <div className="flex items-center gap-2 pt-1 border-t border-[var(--electric-blue)]/10">
                  <button
                    onClick={() => openEdit(post)}
                    className="flex items-center gap-1 text-[10px] text-[var(--gray)] hover:text-[var(--lime)] font-bold cursor-pointer transition-colors"
                  >
                    <Edit3 size={11} /> Düzenle
                  </button>
                  <span className="text-[var(--electric-blue)]/30 text-xs">|</span>
                  <button
                    onClick={() => setDeleteTarget(post)}
                    className="flex items-center gap-1 text-[10px] text-[var(--gray)] hover:text-red-400 font-bold cursor-pointer transition-colors"
                  >
                    <Trash2 size={11} /> Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Form Modal ─────────────────────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 overflow-auto pt-8 pb-10">
          <div
            className="bg-[#160f3a] border-2 border-[var(--lime)]/40 rounded-xl p-6 max-w-xl w-full mx-4 shadow-2xl"
            style={{ boxShadow: "0 0 60px rgba(173,233,79,0.08)" }}
          >
            {/* Başlık */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-[var(--cream)]">
                {editing ? "İçerik Düzenle" : "Yeni İçerik Oluştur"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-[var(--gray)] hover:text-[var(--cream)] cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">

              {/* Durum + İçerik Tipi */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[var(--gray)] mb-1.5">Durum</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as SocialPostStatus })}
                    className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--gray)] mb-1.5">İçerik Tipi</label>
                  <select
                    value={form.contentType}
                    onChange={(e) => setForm({ ...form, contentType: e.target.value as SocialContentType })}
                    className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none"
                  >
                    {CONTENT_TYPES.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Platform Seçimi */}
              <div>
                <label className="block text-xs font-bold text-[var(--gray)] mb-2">
                  Platform Seçimi <span className="text-[var(--gray)]/60">(birden fazla seçebilirsin)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map((p) => {
                    const active = form.platforms.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => togglePlatform(p.id)}
                        className="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border-2"
                        style={{
                          background: active ? p.bg : "transparent",
                          color: active ? p.color : "var(--gray)",
                          borderColor: active ? `${p.color}80` : "rgba(28,18,66,0.5)",
                          boxShadow: active ? `0 0 12px ${p.color}30` : "none",
                        }}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-bold text-[var(--gray)] mb-1.5">Caption / Metin</label>
                <textarea
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  rows={4}
                  placeholder="Gönderi metni buraya..."
                  className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none resize-none"
                />
                <p className="text-[10px] text-[var(--gray)] mt-1">
                  {form.caption.length} karakter
                  {form.caption.length > 2200 && (
                    <span className="text-red-400 ml-1">— Instagram maks 2200</span>
                  )}
                </p>
              </div>

              {/* Hashtagler */}
              <div>
                <label className="block text-xs font-bold text-[var(--gray)] mb-1.5">
                  Hashtagler{" "}
                  <span className="text-[var(--gray)]/60">(boşlukla veya virgülle ayır, # zorunlu değil)</span>
                </label>
                <textarea
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  rows={2}
                  placeholder="#yapayzekareklam mindid aifilm ..."
                  className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none resize-none font-mono"
                />
                <p className="text-[10px] text-[var(--gray)] mt-1">
                  {hashtagInput.split(/[\s,]+/).filter((h) => h.trim()).length} hashtag
                  {" "}· Instagram önerisi: maks 30
                </p>
              </div>

              {/* Medya Tipi */}
              <div>
                <label className="block text-xs font-bold text-[var(--gray)] mb-2">Medya Tipi</label>
                <div className="flex gap-3">
                  {(["image", "video"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, mediaType: t })}
                      className="flex-1 py-2 rounded-md text-xs font-bold border-2 transition-all cursor-pointer"
                      style={{
                        background: form.mediaType === t ? "rgba(173,233,79,0.1)" : "transparent",
                        borderColor: form.mediaType === t ? "var(--lime)" : "rgba(28,18,66,0.5)",
                        color: form.mediaType === t ? "var(--lime)" : "var(--gray)",
                      }}
                    >
                      {t === "image" ? "🖼️ Görsel" : "🎬 Video"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medya Yükleme */}
              {form.mediaType === "image" ? (
                <ImageUpload
                  storagePath={`mindid-site/social/${editing?.id ?? Date.now()}/media.jpg`}
                  currentUrl={form.mediaUrl}
                  onUpload={(url) => setForm({ ...form, mediaUrl: url })}
                  label="Görsel Yükle"
                  sizeGuides={SOCIAL_IMAGE_GUIDES}
                />
              ) : (
                <VideoUpload
                  storagePath={`mindid-site/social/${editing?.id ?? Date.now()}/media.mp4`}
                  currentUrl={form.mediaUrl}
                  onUpload={(url) => setForm({ ...form, mediaUrl: url })}
                  label="Video Yükle"
                  sizeGuides={SOCIAL_VIDEO_GUIDES}
                />
              )}

              {/* Kategori + Notlar */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[var(--gray)] mb-1.5">Kategori</label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="ürün, tanıtım, eğlence..."
                    className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--gray)] mb-1.5">
                    Yayın Tarihi <span className="text-[var(--gray)]/60">(opsiyonel)</span>
                  </label>
                  <input
                    type="datetime-local"
                    onChange={(e) => {
                      const d = new Date(e.target.value);
                      setForm({ ...form, scheduledAt: Timestamp.fromDate(d) });
                    }}
                    className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Notlar */}
              <div>
                <label className="block text-xs font-bold text-[var(--gray)] mb-1.5">İç Notlar</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  placeholder="Sadece takım için not..."
                  className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Aksiyon */}
            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-[var(--electric-blue)]/15">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm font-bold cursor-pointer hover:border-[var(--electric-blue)]/60 transition-all"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-2 border-[var(--dark-blue)] font-bold text-sm cursor-pointer hover:brightness-105 transition-all"
              >
                <Send size={14} />
                {editing ? "Güncelle" : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
