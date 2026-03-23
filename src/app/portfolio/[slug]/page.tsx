import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";
import {
  getPortfolioItemBySlug,
  getPortfolioSlugs,
  getPortfolioItems,
} from "@/lib/portfolio-server";

// --- Static Params (SSG) ---
export const generateStaticParams = async () => {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
};

// --- Dynamic Metadata ---
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) return { title: "Proje Bulunamadı" };

  const title = `${item.title} — AI ${item.category === "reels" ? "Reels" : item.category === "product" ? "Ürün Görseli" : item.category === "campaign" ? "Kampanya Filmi" : item.category === "corporate" ? "Kurumsal Film" : "Prodüksiyon"} | MindID`;
  const description =
    item.seoDescription ||
    item.description ||
    `MindID tarafından yapay zeka ile üretilen ${item.title}. AI reklam prodüksiyon örneği.`;
  const descriptionEn =
    item.seoDescriptionEn ||
    item.descriptionEn ||
    `${item.titleEn || item.title} — AI production by MindID.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://mindid.shop/portfolio/${slug}`,
      languages: {
        "tr-TR": `https://mindid.shop/portfolio/${slug}`,
        "en-US": `https://mindid.shop/portfolio/${slug}`,
      },
    },
    openGraph: {
      title: `${item.titleEn || item.title} — AI Production | MindID`,
      description: descriptionEn,
      url: `https://mindid.shop/portfolio/${slug}`,
      type: "article",
      images: item.thumbnailUrl
        ? [{ url: item.thumbnailUrl, width: 400, height: 711, alt: item.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: item.titleEn || item.title,
      description: descriptionEn,
      images: item.thumbnailUrl ? [item.thumbnailUrl] : undefined,
    },
  };
};

// --- Category Labels ---
const categoryLabels: Record<string, { tr: string; en: string }> = {
  reels: { tr: "AI Instagram Reels", en: "AI Instagram Reels" },
  product: { tr: "AI Ürün Görseli", en: "AI Product Visual" },
  "product-photo": { tr: "AI Ürün Fotoğrafı", en: "AI Product Photo" },
  campaign: { tr: "AI Kampanya Filmi", en: "AI Campaign Film" },
  corporate: { tr: "AI Kurumsal Film", en: "AI Corporate Film" },
  avatar: { tr: "AI Avatar", en: "AI Avatar" },
};

// --- Page Component ---
const PortfolioDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) notFound();

  // Related items (same category, exclude current)
  const allItems = await getPortfolioItems();
  const relatedItems = allItems
    .filter((i) => i.category === item.category && i.id !== item.id && i.slug)
    .slice(0, 4);

  const catLabel = categoryLabels[item.category] || {
    tr: item.category,
    en: item.category,
  };

  // --- JSON-LD: VideoObject ---
  const videoSchema = item.videoUrl
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: item.title,
        description:
          item.seoDescription || item.description || `${item.title} — MindID AI prodüksiyon`,
        thumbnailUrl: item.thumbnailUrl || "https://mindid.shop/og-image.jpg",
        uploadDate:
          (item.completedAt as unknown as string) ||
          (item.createdAt as unknown as string) ||
          new Date().toISOString(),
        duration: item.duration || "PT30S",
        contentUrl: item.videoUrl,
        embedUrl: item.videoUrl,
        author: {
          "@type": "Organization",
          name: "MindID",
          url: "https://mindid.shop",
        },
        publisher: {
          "@type": "Organization",
          name: "MindID",
          logo: {
            "@type": "ImageObject",
            url: "https://mindid.shop/leopard-icon.svg",
          },
        },
      }
    : null;

  // --- JSON-LD: CreativeWork ---
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.seoDescription || item.description,
    url: `https://mindid.shop/portfolio/${slug}`,
    image: item.thumbnailUrl,
    author: {
      "@type": "Organization",
      name: "MindID",
      url: "https://mindid.shop",
    },
    dateCreated:
      (item.completedAt as unknown as string) ||
      (item.createdAt as unknown as string),
    genre: catLabel.en,
    inLanguage: "tr",
    keywords: [
      "AI reklam",
      "yapay zeka prodüksiyon",
      catLabel.tr,
      item.clientName ? `${item.clientName} reklam` : "",
    ]
      .filter(Boolean)
      .join(", "),
  };

  // --- JSON-LD: Breadcrumb ---
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "MindID", item: "https://mindid.shop" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolyo",
        item: "https://mindid.shop/portfolio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.title,
        item: `https://mindid.shop/portfolio/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumb,
            creativeWorkSchema,
            ...(videoSchema ? [videoSchema] : []),
          ]),
        }}
      />

      <ParallaxGrid />
      <Header />

      <main className="relative z-10 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-[var(--gray)]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--lime)] transition-colors"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-[var(--lime)] transition-colors"
                >
                  Portfolyo
                </Link>
              </li>
              <li>/</li>
              <li className="text-[var(--lime)] font-bold">{item.title}</li>
            </ol>
          </nav>

          {/* Category badge */}
          <span className="inline-block px-3 py-1 rounded-md bg-[var(--lime)]/10 border-2 border-[var(--lime)]/30 text-xs font-bold text-[var(--lime)] uppercase tracking-wider mb-4">
            {catLabel.tr}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--cream)] mb-4 leading-tight">
            {item.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--gray)] mb-8">
            {item.clientName && (
              <span>
                Müşteri: <strong className="text-[var(--cream)]">{item.clientName}</strong>
              </span>
            )}
            <span>
              Prodüksiyon: <strong className="text-[var(--lime)]">MindID</strong>
            </span>
            <span>Tür: {catLabel.tr}</span>
          </div>

          {/* Video Player */}
          {item.videoUrl && (
            <div className="mb-8">
              <div className="relative aspect-video rounded-lg overflow-hidden border-3 border-[var(--lime)] shadow-[6px_6px_0px_var(--electric-blue)]">
                <video
                  src={item.videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  poster={item.thumbnailUrl || undefined}
                  className="w-full h-full object-cover"
                >
                  <track kind="captions" />
                </video>
              </div>
            </div>
          )}

          {/* Thumbnail fallback */}
          {!item.videoUrl && item.thumbnailUrl && (
            <div className="mb-8">
              <div className="relative aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-3 border-[var(--lime)] shadow-[6px_6px_0px_var(--electric-blue)]">
                <Image
                  src={item.thumbnailUrl}
                  alt={`${item.title} — AI ${catLabel.tr} | MindID`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 400px"
                  priority
                />
              </div>
            </div>
          )}

          {/* Description — AI-friendly structured content */}
          <section className="mb-10">
            <h2 className="text-xl font-black text-[var(--lime)] mb-3">
              Proje Hakkında
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-[var(--cream)]/80 leading-relaxed">
                {item.description || item.seoDescription || `${item.title}, MindID tarafından yapay zeka teknolojileri kullanılarak üretilmiş bir ${catLabel.tr.toLowerCase()} projesidir. Geleneksel prodüksiyon yöntemlerine kıyasla %70'e varan maliyet tasarrufu sağlanmıştır.`}
              </p>
            </div>
          </section>

          {/* Techniques — GEO: AI motors love structured data */}
          {item.techniques && item.techniques.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-black text-[var(--lime)] mb-3">
                Kullanılan AI Teknikleri
              </h2>
              <div className="flex flex-wrap gap-2">
                {item.techniques.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-md bg-[var(--electric-blue)]/20 border-2 border-[var(--electric-blue)]/40 text-sm font-bold text-[var(--cream)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Results — GEO: Stats/citations boost visibility 40% */}
          <section className="mb-10 p-6 rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20">
            <h2 className="text-xl font-black text-[var(--lime)] mb-4">
              Sonuçlar ve Metrikler
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-[var(--lime)]">%70</div>
                <div className="text-xs text-[var(--gray)]">Maliyet Tasarrufu</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[var(--lime)]">48 Saat</div>
                <div className="text-xs text-[var(--gray)]">Teslim Süresi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[var(--lime)]">AI</div>
                <div className="text-xs text-[var(--gray)]">Prodüksiyon</div>
              </div>
            </div>
          </section>

          {/* Mini FAQ — GEO: AI motors directly use Q&A format */}
          <section className="mb-10">
            <h2 className="text-xl font-black text-[var(--lime)] mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <div className="space-y-4">
              <details className="group p-4 rounded-lg bg-[var(--card)] border-2 border-[var(--electric-blue)]/20">
                <summary className="font-bold text-[var(--cream)] cursor-pointer">
                  Bu {catLabel.tr.toLowerCase()} nasıl üretildi?
                </summary>
                <p className="mt-2 text-sm text-[var(--cream)]/70">
                  MindID&apos;in yapay zeka prodüksiyon hattı kullanılarak üretilmiştir. Geleneksel stüdyo, ekipman veya oyuncu gerekmeden, AI teknolojileri ile profesyonel kalitede sonuç elde edilmiştir.
                </p>
              </details>
              <details className="group p-4 rounded-lg bg-[var(--card)] border-2 border-[var(--electric-blue)]/20">
                <summary className="font-bold text-[var(--cream)] cursor-pointer">
                  Benzer bir proje ne kadar sürer?
                </summary>
                <p className="mt-2 text-sm text-[var(--cream)]/70">
                  AI prodüksiyon ile benzer projeler genellikle 24-72 saat içinde teslim edilir. Geleneksel yöntemlerle aynı kalite 2-4 hafta sürecektir.
                </p>
              </details>
              <details className="group p-4 rounded-lg bg-[var(--card)] border-2 border-[var(--electric-blue)]/20">
                <summary className="font-bold text-[var(--cream)] cursor-pointer">
                  Fiyatlandırma nasıl çalışır?
                </summary>
                <p className="mt-2 text-sm text-[var(--cream)]/70">
                  MindID&apos;de konfigüratör üzerinden ihtiyacınıza göre seçim yapabilirsiniz. Fiyatlar proje türü, süre ve ek seçeneklere göre belirlenir. Geleneksel yöntemlere göre %70&apos;e varan tasarruf sağlanır.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <div className="p-6 rounded-lg bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[6px_6px_0px_var(--dark-blue)] text-center mb-10">
            <h3 className="text-lg font-black text-[var(--dark-blue)] mb-2">
              Benzer bir proje mi istiyorsunuz?
            </h3>
            <p className="text-sm text-[var(--dark-blue)]/70 mb-4">
              Yapay zeka ile profesyonel prodüksiyon, geleneksel maliyetin %30&apos;u kadar.
            </p>
            <Link
              href={`/configure/${item.category === "reels" ? "reels" : item.category === "product-photo" ? "product-photo" : item.category === "campaign" ? "campaign" : item.category === "corporate" ? "corporate" : "product"}`}
              className="inline-block px-6 py-3 rounded-md bg-[var(--dark-blue)] text-[var(--lime)] font-bold text-sm border-3 border-[var(--dark-blue)] hover:bg-[var(--deep-blue)] transition-colors"
            >
              Teklif Al
            </Link>
          </div>

          {/* Related Projects — Internal linking */}
          {relatedItems.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-[var(--lime)] mb-4">
                Benzer Projeler
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {relatedItems.map((related) => (
                  <Link
                    key={related.id}
                    href={`/portfolio/${related.slug}`}
                    className="group aspect-[9/16] rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 overflow-hidden relative hover:border-[var(--lime)]/50 hover:shadow-[4px_4px_0px_var(--lime)] transition-all"
                  >
                    {related.thumbnailUrl && (
                      <Image
                        src={related.thumbnailUrl}
                        alt={`${related.title} — AI ${catLabel.tr} | MindID`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-end p-2">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                        {related.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
};

export default PortfolioDetailPage;
