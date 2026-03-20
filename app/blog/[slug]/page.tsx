import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getRelatedPosts } from "@/lib/supabase";
import { PostContent } from "@/app/blog/[slug]/PostContent";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post não encontrado" };

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: post.cover_url ? [{ url: post.cover_url }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(slug, post.category);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://plusenergy.com.br/blog/${slug}`,
    headline: post.title,
    description: post.excerpt,
    image: post.cover_url
      ? { "@type": "ImageObject", url: post.cover_url, width: 1200, height: 630 }
      : undefined,
    url: `https://plusenergy.com.br/blog/${slug}`,
    inLanguage: "pt-BR",
    articleSection: post.category,
    keywords: post.tags?.join(", "),
    wordCount: post.content?.split(/\s+/).length,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Organization",
      name: "Plus Energy",
      url: "https://plusenergy.com.br",
    },
    publisher: {
      "@type": "Organization",
      name: "Plus Energy",
      logo: {
        "@type": "ImageObject",
        url: "https://plusenergy.com.br/logo.svg",
        width: 300,
        height: 100,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://plusenergy.com.br/blog/${slug}`,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://plusenergy.com.br/#website",
    },
  };

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://plusenergy.com.br" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://plusenergy.com.br/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://plusenergy.com.br/blog/${slug}` },
    ],
  };

  // FAQ schema if FAQ exists
  const faqJsonLd =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <PostContent post={post} relatedPosts={relatedPosts} />
    </main>
  );
}
