"use client";

import { useI18n } from "@/lib/i18n";
import { useBlogPosts } from "@/lib/hooks/use-firestore";
import { ArrowLeft, Calendar, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  film: { tr: "Reklam Filmi", en: "Ad Film" },
  avatar: { tr: "Avatar", en: "Avatar" },
  visual: { tr: "Ürün Görseli", en: "Product Visual" },
  general: { tr: "Genel", en: "General" },
};

const CATEGORY_COLORS: Record<string, string> = {
  film: "var(--lime)",
  avatar: "var(--electric-blue)",
  visual: "#f59e0b",
  general: "var(--gray)",
};

export const BlogListPage = () => {
  const { lang } = useI18n();
  const { data: posts, loading } = useBlogPosts();

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--foreground)] hover:underline mb-6 text-sm font-bold"
        >
          <ArrowLeft size={16} />
          {lang === "en" ? "Home" : "Ana Sayfa"}
        </Link>

        <h1 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-2">
          {lang === "en" ? "AI Advertising Blog" : "AI Reklam Blogu"}
        </h1>
        <p className="text-[var(--gray)] mb-10">
          {lang === "en"
            ? "Guides, trends, and comparisons about AI ad films, avatars, and product visuals."
            : "AI reklam filmleri, avatar ve ürün görselleri hakkında rehberler, trendler ve karşılaştırmalar."}
        </p>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 p-6 animate-pulse"
              >
                <div className="h-4 bg-[var(--electric-blue)]/15 rounded w-1/4 mb-4" />
                <div className="h-6 bg-[var(--electric-blue)]/15 rounded w-3/4 mb-3" />
                <div className="h-3 bg-[var(--electric-blue)]/10 rounded w-full mb-2" />
                <div className="h-3 bg-[var(--electric-blue)]/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--gray)] text-lg mb-2">
              {lang === "en" ? "Blog posts coming soon!" : "Blog yazıları yakında!"}
            </p>
            <p className="text-[var(--electric-blue)] text-sm">
              {lang === "en"
                ? "We're preparing guides about AI ad films, avatars, and product visuals."
                : "AI reklam filmleri, avatar ve ürün görselleri hakkında rehberler hazırlıyoruz."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => {
              const title = lang === "en" ? post.titleEn || post.title : post.title;
              const excerpt = lang === "en" ? post.excerptEn || post.excerpt : post.excerpt;
              const catLabel = CATEGORY_LABELS[post.category]?.[lang] || post.category;
              const catColor = CATEGORY_COLORS[post.category] || "var(--gray)";
              const date = post.publishedAt?.toDate
                ? new Date(post.publishedAt.toDate()).toLocaleDateString(
                    lang === "en" ? "en-US" : "tr-TR",
                    { year: "numeric", month: "long", day: "numeric" },
                  )
                : "";

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 hover:border-[var(--lime)]/50 hover:shadow-[4px_4px_0px_var(--lime)] transition-all group overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {post.coverImage && (
                      <div className="md:w-48 md:h-auto h-48 bg-[var(--card)] shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.coverImage}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-5 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{ color: catColor, backgroundColor: `${catColor}20` }}
                        >
                          {catLabel}
                        </span>
                        {date && (
                          <span className="flex items-center gap-1 text-[11px] text-[var(--gray)]">
                            <Calendar size={11} /> {date}
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg font-black text-[var(--foreground)] mb-2 group-hover:text-[var(--lime)] transition-colors">
                        {title}
                      </h2>
                      <p className="text-sm text-[var(--gray)] line-clamp-2 mb-3">
                        {excerpt}
                      </p>
                      <div className="flex items-center gap-2">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 text-[10px] text-[var(--electric-blue)] bg-[var(--electric-blue)]/10 px-2 py-0.5 rounded"
                          >
                            <Tag size={9} /> {tag}
                          </span>
                        ))}
                        <span className="ml-auto text-[var(--lime)] text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {lang === "en" ? "Read" : "Oku"} <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
