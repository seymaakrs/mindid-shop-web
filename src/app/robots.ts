import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/*"],
    },
    // AI arama motorlarına özel izin — GEO stratejisi
    {
      userAgent: "GPTBot",
      allow: "/",
      disallow: ["/admin"],
    },
    {
      userAgent: "ChatGPT-User",
      allow: "/",
      disallow: ["/admin"],
    },
    {
      userAgent: "Google-Extended",
      allow: "/",
      disallow: ["/admin"],
    },
    {
      userAgent: "PerplexityBot",
      allow: "/",
      disallow: ["/admin"],
    },
    {
      userAgent: "Amazonbot",
      allow: "/",
      disallow: ["/admin"],
    },
  ],
  sitemap: "https://mindid.shop/sitemap.xml",
});

export default robots;
