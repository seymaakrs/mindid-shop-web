import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
  name: "MindID — AI İçerik Stüdyosu",
  short_name: "MindID",
  description:
    "AI ile profesyonel reklam, ürün fotoğrafı, sosyal medya içeriği üret. Manken yok, stüdyo yok, %70 daha az maliyet.",
  start_url: "/",
  scope: "/",
  display: "standalone",
  orientation: "portrait",
  background_color: "#100a2c",
  theme_color: "#ade94f",
  lang: "tr",
  dir: "ltr",
  categories: ["business", "productivity", "design", "graphics"],
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
  screenshots: [
    {
      src: "/screenshot-mobile.png",
      sizes: "390x844",
      type: "image/png",
      form_factor: "narrow",
      label: "Ana ekran",
    },
    {
      src: "/screenshot-desktop.png",
      sizes: "1280x720",
      type: "image/png",
      form_factor: "wide",
      label: "Masaüstü ekran",
    },
  ],
  shortcuts: [
    {
      name: "Şablonlar",
      short_name: "Şablonlar",
      description: "Hazır içerik şablonları",
      url: "/templates",
    },
    {
      name: "Yeni Sipariş",
      short_name: "Yeni",
      description: "Hızlı sipariş başlat",
      url: "/#services",
    },
    {
      name: "Panel",
      short_name: "Panel",
      description: "Müşteri paneli",
      url: "/dashboard",
    },
  ],
  prefer_related_applications: false,
});

export default manifest;
