import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
  name: "MindID — AI Reklam Prodüksiyon Stüdyosu",
  short_name: "MindID",
  description:
    "AI ile reklam filmi, dijital avatar oluşturma ve e-ticaret ürün görseli üretimi.",
  start_url: "/",
  display: "standalone",
  background_color: "#0a0f1c",
  theme_color: "#c8ff00",
  icons: [
    {
      src: "/logo.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  ],
});

export default manifest;
