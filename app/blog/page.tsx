import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { getBlogPosts, getBlogCategories } from "@/lib/supabase";
import { BlogClient } from "@/app/blog/BlogClient";

export const metadata: Metadata = {
  title: "Blog — Energia Solar e Economia na Conta de Luz",
  description:
    "Artigos sobre energia solar por assinatura, geração distribuída, Lei 14.300 e como economizar na conta de luz no RS.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const [{ posts, total }, categories] = await Promise.all([
    getBlogPosts({ limit: 12 }),
    getBlogCategories(),
  ]);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-pe-green-950 pt-36 pb-16 px-4 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-400/10 border border-pe-solar-400/30 text-xs font-semibold text-pe-solar-400 uppercase tracking-widest mb-6">
          <BookOpen className="w-3.5 h-3.5" />
          Blog
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl mx-auto mb-4">
          Conteúdo sobre <span className="gold-gradient-text">energia solar</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Aprenda tudo sobre geração distribuída, Lei 14.300 e como economizar na conta de luz.
        </p>
      </section>

      {/* Blog content (client) */}
      <BlogClient initialPosts={posts} initialTotal={total} categories={categories} />
    </main>
  );
}
