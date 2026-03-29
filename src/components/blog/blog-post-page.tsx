"use client";

import { useI18n } from "@/lib/i18n";
import { useBlogPost } from "@/lib/hooks/use-firestore";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import DOMPurify from "dompurify";
import Link from "next/link";

type BlogPostPageProps = {
  slug: string;
};

export const BlogPostPage = ({ slug }: BlogPostPageProps) => {
  const { lang } = useI18n();
  const { data: post, loading } = useBlogPost(slug);

  if (loading) {
    return (
      <div className="min-h-screen relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-[var(--electric-blue)]/15 rounded w-1/4" />
            <div className="h-8 bg-[var(--electric-blue)]/15 rounded w-3/4" />
            <div className="h-64 bg-[var(--electric-blue)]/10 rounded-lg" />
            <div className="space-y-3">
              <div className="h-3 bg-[var(--electric-blue)]/10 rounded w-full" />
              <div className="h-3 bg-[var(--electric-blue)]/10 rounded w-5/6" />
              <div className="h-3 bg-[var(--electric-blue)]/10 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen relative z-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-[var(--foreground)] mb-4">
            {lang === "en" ? "Post not found" : "Yazı bulunamadı"}
          </h1>
          <Link
            href="/blog"
            className="text-[var(--foreground)] hover:underline font-bold"
          >
            {lang === "en" ? "Back to blog" : "Bloga dön"}
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === "en" ? post.titleEn || post.title : post.title;
  const content = lang === "en" ? post.contentEn || post.content : post.content;
  const excerpt = lang === "en" ? post.excerptEn || post.excerpt : post.excerpt;
  const publishedDate = post.publishedAt?.toDate
    ? new Date(post.publishedAt.toDate())
    : null;
  const date = publishedDate
    ? publishedDate.toLocaleDateString(
        lang === "en" ? "en-US" : "tr-TR",
        { year: "numeric", month: "long", day: "numeric" },
      )
    : "";

  // Basit okuma süresi tahmini (250 kelime/dk)
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 250));

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titleEn || post.title,
    description: post.excerptEn || post.excerpt,
    image: post.coverImage || undefined,
    datePublished: publishedDate?.toISOString(),
    dateModified: post.updatedAt?.toDate ? new Date(post.updatedAt.toDate()).toISOString() : publishedDate?.toISOString(),
    author: { "@type": "Organization", name: "MindID", url: "https://mindid.shop" },
    publisher: { "@type": "Organization", name: "MindID", url: "https://mindid.shop" },
    mainEntityOfPage: `https://mindid.shop/blog/${slug}`,
    wordCount,
    articleSection: post.category,
    keywords: post.tags?.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "MindID", item: "https://mindid.shop" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://mindid.shop/blog" },
      { "@type": "ListItem", position: 3, name: title, item: `https://mindid.shop/blog/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[var(--foreground)] hover:underline mb-6 text-sm font-bold"
        >
          <ArrowLeft size={16} />
          {lang === "en" ? "All Posts" : "Tüm Yazılar"}
        </Link>

        {/* Header */}
        <article>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {date && (
                <span className="flex items-center gap-1 text-xs text-[var(--gray)]">
                  <Calendar size={12} /> {date}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-[var(--gray)]">
                <Clock size={12} /> {readTime} {lang === "en" ? "min read" : "dk okuma"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4 leading-tight">
              {title}
            </h1>
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs text-[var(--electric-blue)] bg-[var(--electric-blue)]/10 px-2.5 py-1 rounded"
                  >
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="rounded-lg overflow-hidden border-3 border-[var(--electric-blue)]/20 mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content — basit markdown rendering */}
          <div
            className="prose max-w-none text-[var(--foreground)]/90 leading-relaxed
              [&_h2]:text-[var(--foreground)] [&_h2]:font-black [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-[var(--foreground)] [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:mb-4 [&_p]:text-sm
              [&_a]:text-[var(--electric-blue)] [&_a]:underline
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-sm
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-sm
              [&_li]:mb-1
              [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--lime)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[var(--gray)]
              [&_strong]:text-[var(--foreground)] [&_strong]:font-bold
              [&_code]:bg-[var(--electric-blue)]/10 [&_code]:px-1 [&_code]:rounded [&_code]:text-xs"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                content
                  .replace(/\n\n/g, "</p><p>")
                  .replace(/^## (.+)$/gm, "<h2>$1</h2>")
                  .replace(/^### (.+)$/gm, "<h3>$1</h3>")
                  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\*(.+?)\*/g, "<em>$1</em>")
                  .replace(/^- (.+)$/gm, "<li>$1</li>")
                  .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
                  .replace(/<\/ul>\s*<ul>/g, ""),
                { ALLOWED_TAGS: ["p", "h2", "h3", "strong", "em", "ul", "li", "a", "blockquote", "code", "ol", "br", "img"] }
              ),
            }}
          />

          {/* CTA */}
          <div className="mt-12 p-6 rounded-lg bg-[var(--card)] border-3 border-[var(--lime)] shadow-[4px_4px_0px_var(--lime)] text-center">
            <h3 className="text-lg font-black text-[var(--foreground)] mb-2">
              {lang === "en" ? "Ready to get started?" : "Başlamaya hazır mısınız?"}
            </h3>
            <p className="text-sm text-[var(--gray)] mb-4">
              {lang === "en"
                ? "Create your AI ad film, avatar, or product visuals today."
                : "AI reklam filminizi, avatarınızı veya ürün görsellerinizi bugün oluşturun."}
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] font-bold text-sm hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              {lang === "en" ? "View Services" : "Hizmetleri Gör"} &rarr;
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};
