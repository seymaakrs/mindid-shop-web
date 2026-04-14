import type { Metadata } from "next";
import { Header } from "@/components/header";
import { BlogListPage } from "@/components/blog/blog-list-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "AI Reklam Blogu — Film, Avatar & Görsel Trendleri",
  description:
    "Yapay zeka ile reklam filmi, avatar oluşturma ve ürün görseli hakkında rehberler, trendler ve karşılaştırmalar. slowdays blog.",
  alternates: {
    canonical: "https://mindid.shop/blog",
  },
  keywords: [
    "ai reklam blogu",
    "yapay zeka reklam trendleri",
    "ai avatar rehberi",
    "e-ticaret ai ürün görseli",
    "AI advertising blog",
  ],
  openGraph: {
    title: "AI Advertising Blog — Films, Avatars & Visual Trends",
    description:
      "Guides, trends, and comparisons about AI ad film production, avatar creation, and product visuals.",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "slowdays", item: "https://mindid.shop" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://mindid.shop/blog" },
  ],
};

const BlogRoute = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <BlogListPage />
      </main>
      <Footer />
    </>
  );
};

export default BlogRoute;
