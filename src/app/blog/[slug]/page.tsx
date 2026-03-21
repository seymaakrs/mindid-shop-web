import { Header } from "@/components/header";
import { BlogPostPage } from "@/components/blog/blog-post-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

type Props = {
  params: Promise<{ slug: string }>;
};

const BlogPostRoute = async ({ params }: Props) => {
  const { slug } = await params;

  return (
    <>
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
