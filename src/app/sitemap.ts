import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const baseUrl = "https://mindid.shop";

  return [
    // Ana sayfalar
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/avatar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Hizmet konfigüratörleri — yüksek SEO değeri
    { url: `${baseUrl}/configure/reels`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/configure/product-photo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/configure/product`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/configure/campaign`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/configure/corporate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },

    // Blog
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },

    // İçerik sayfaları — GEO ve SEO için yüksek değer
    { url: `${baseUrl}/ai-vs-traditional`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/e-commerce`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
};

export default sitemap;
