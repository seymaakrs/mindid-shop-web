import type { Metadata } from "next";
import { Header } from "@/components/header";
import { BlogPostPage } from "@/components/blog/blog-post-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";
import { getBlogPostBySlug } from "@/lib/blog-server";

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Yazısı Bulunamadı",
      description: "Aradığınız blog yazısı mevcut değil.",
    };
  }

  const title = post.title;
  const description = post.excerpt || post.title;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | slowdays Blog`,
      description,
      url: `https://mindid.shop/blog/${slug}`,
      type: "article",
      ...(post.coverImage && {
        images: [
          {
            url: post.coverImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | slowdays Blog`,
      description,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
    alternates: {
      canonical: `https://mindid.shop/blog/${slug}`,
    },
  };
};

const BlogPostRoute = async ({ params }: Props) => {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  const blogPostingSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt || post.title,
        image: post.coverImage || "https://mindid.shop/og-image.jpeg",
        url: `https://mindid.shop/blog/${slug}`,
        datePublished: (post.publishedAt as unknown as string) || new Date().toISOString(),
        dateModified: (post.updatedAt as unknown as string) || (post.publishedAt as unknown as string) || new Date().toISOString(),
        author: {
          "@type": "Organization",
          name: "slowdays",
          url: "https://mindid.shop",
        },
        publisher: {
          "@type": "Organization",
          name: "slowdays",
          logo: {
            "@type": "ImageObject",
            url: "https://mindid.shop/logo.png",
          },
        },
        inLanguage: "tr",
        keywords: (post.tags || []).join(", "),
      }
    : null;

  return (
    <>
      {blogPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      )}
      <ParallaxGrid />
      <Header />
      <main>
        <BlogPostPage slug={slug} />
      </main>
      <Footer />
    </>
  );
};

export default BlogPostRoute;
