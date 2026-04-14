import { ImageResponse } from "next/og";
import { getPortfolioItemBySlug } from "@/lib/portfolio-server";

export const runtime = "edge";
export const alt = "slowdays Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const categoryLabels: Record<string, string> = {
  reels: "AI REELS",
  product: "AI ÜRÜN FİLMİ",
  "product-photo": "AI ÜRÜN GÖRSELİ",
  campaign: "AI KAMPANYA",
  corporate: "AI KURUMSAL",
  avatar: "AI AVATAR",
};

const OGImage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);

  const title = item?.title || "slowdays Portfolio";
  const category = item?.category
    ? categoryLabels[item.category] || item.category.toUpperCase()
    : "AI PRODÜKSIYON";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #100a2c 0%, #1c1242 50%, #1c1242 100%)",
          padding: "60px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Category badge */}
        <div
          style={{
            display: "flex",
            padding: "8px 20px",
            borderRadius: "6px",
            background: "rgba(173, 233, 79, 0.15)",
            border: "2px solid rgba(173, 233, 79, 0.4)",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#ade94f",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: title.length > 30 ? "42px" : "52px",
            fontWeight: 900,
            color: "#eeeadc",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "20px",
            color: "rgba(241, 238, 226, 0.6)",
            textAlign: "center",
          }}
        >
          AI Prodüksiyon — slowdays
        </p>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "absolute",
            bottom: "40px",
            left: "60px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#ade94f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 900,
              color: "#100a2c",
            }}
          >
            M
          </div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#ade94f",
            }}
          >
            mindid.shop
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
};

export default OGImage;
