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
    // Anthropic / Claude
    {
      userAgent: "ClaudeBot",
      allow: "/",
      disallow: ["/admin"],
    },
    {
      userAgent: "anthropic-ai",
      allow: "/",
      disallow: ["/admin"],
    },
    // Meta AI
    {
      userAgent: "Meta-ExternalAgent",
      allow: "/",
      disallow: ["/admin"],
    },
    // Mistral AI
    {
      userAgent: "MistralBot",
      allow: "/",
      disallow: ["/admin"],
    },
    // Cohere AI
    {
      userAgent: "cohere-ai",
      allow: "/",
      disallow: ["/admin"],
    },
    // Common Crawl (AI eğitim veri setleri)
    {
      userAgent: "CCBot",
      allow: "/",
      disallow: ["/admin"],
    },
    // Apple AI
    {
      userAgent: "Applebot-Extended",
      allow: "/",
      disallow: ["/admin"],
    },
  ],
  sitemap: "https://mindid.shop/sitemap.xml",
});

export default robots;
