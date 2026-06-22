import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog-server";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = "https://mindid.shop";

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogEntries = posts
      .filter((post) => post.slug)
      .map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt
          ? new Date(post.publishedAt as unknown as string)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {
    // Blog fetch failed — continue with static entries
  }

  return [
    // Ana sayfa
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },

    // SaaS akışı
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/templates`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), changeFrequency: "daily", priority: 0.5 },

    // Özellik / use-case sayfaları
    { url: `${baseUrl}/ai-reklam-filmi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/ai-gorsel`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/avatar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/e-commerce`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Kurumsal
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },

    // Yasal
    { url: `${baseUrl}/kvkk`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/gizlilik`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/kullanim-kosullari`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },

    // Dinamik blog yazıları
    ...blogEntries,

    // EN
    { url: `${baseUrl}/en/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.5 },
    ...blogEntries.map((e) => ({ ...e, url: e.url.replace(baseUrl, `${baseUrl}/en`), priority: 0.5 })),
  ];
};

export default sitemap;
