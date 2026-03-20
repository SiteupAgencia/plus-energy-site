"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ChevronDown, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/supabase";

type PostCard = Partial<BlogPost>;

interface BlogClientProps {
  initialPosts: PostCard[];
  initialTotal: number;
  categories: string[];
}

const POSTS_PER_PAGE = 12;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function PostCardComponent({ post, featured = false }: { post: PostCard; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <motion.article
        variants={fadeUp}
        className={`rounded-2xl border border-pe-slate-100 bg-pe-slate-50 overflow-hidden transition-all hover:border-pe-solar-300 hover:shadow-md ${featured ? "" : "h-full flex flex-col"}`}
      >
        {/* Cover image */}
        <div className={`relative overflow-hidden ${featured ? "aspect-[21/9]" : "aspect-[16/9]"}`}>
          {post.cover_url ? (
            <Image
              src={post.cover_url}
              alt={post.title ?? ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pe-green-950 to-pe-slate-800 flex items-center justify-center">
              <span className="text-white/20 font-heading text-4xl font-bold">PE</span>
            </div>
          )}
          {/* Category badge */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-pe-solar-400 text-pe-slate-950 text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className={`p-5 ${featured ? "" : "flex flex-col flex-1"}`}>
          <h3 className={`font-heading font-bold text-black leading-snug group-hover:text-pe-solar-600 transition-colors ${featured ? "text-2xl sm:text-3xl mb-3" : "text-lg mb-2"}`}>
            {post.title}
          </h3>

          {post.excerpt && (
            <p className={`text-pe-slate-500 leading-relaxed ${featured ? "text-base mb-4" : "text-sm mb-3 line-clamp-2 flex-1"}`}>
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-pe-slate-400">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.published_at)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.reading_time} min de leitura
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export function BlogClient({ initialPosts, initialTotal, categories }: BlogClientProps) {
  const [posts, setPosts] = useState<PostCard[]>(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(POSTS_PER_PAGE);

  const fetchPosts = useCallback(async (reset = true) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    params.set("order", order);
    params.set("limit", String(POSTS_PER_PAGE));
    params.set("offset", reset ? "0" : String(offset));

    try {
      const res = await fetch(`/api/blog?${params}`);
      const data = await res.json();
      if (reset) {
        setPosts(data.posts);
        setOffset(POSTS_PER_PAGE);
      } else {
        setPosts((prev) => [...prev, ...data.posts]);
        setOffset((prev) => prev + POSTS_PER_PAGE);
      }
      setTotal(data.total);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  }, [category, search, order, offset]);

  useEffect(() => {
    fetchPosts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, order]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(true);
  };

  const featured = posts[0];
  const gridPosts = posts.slice(1);
  const hasMore = posts.length < total;

  return (
    <>
      {/* Filter bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-pe-slate-400 shrink-0" />
            <button
              type="button"
              onClick={() => setCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                !category
                  ? "bg-pe-solar-400 text-pe-slate-950"
                  : "bg-pe-slate-100 text-pe-slate-600 hover:bg-pe-slate-200"
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat === category ? null : cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  category === cat
                    ? "bg-pe-solar-400 text-pe-slate-950"
                    : "bg-pe-slate-100 text-pe-slate-600 hover:bg-pe-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Order */}
            <div className="relative">
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value as "desc" | "asc")}
                className="appearance-none bg-pe-slate-50 border border-pe-slate-200 rounded-xl px-4 py-2.5 pr-9 text-sm text-pe-slate-700 focus:outline-none focus:ring-2 focus:ring-pe-solar-400 cursor-pointer"
              >
                <option value="desc">Mais recentes</option>
                <option value="asc">Mais antigos</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pe-slate-400 pointer-events-none" />
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pe-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar pelo conteúdo"
                className="w-full sm:w-56 pl-10 pr-4 py-2.5 rounded-xl border border-pe-slate-200 bg-pe-slate-50 text-sm text-black placeholder:text-pe-slate-400 focus:outline-none focus:ring-2 focus:ring-pe-solar-400"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-pe-slate-400 text-lg">Nenhum post encontrado.</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mb-8"
              >
                <PostCardComponent post={featured} featured />
              </motion.div>
            )}

            {/* Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {gridPosts.map((post) => (
                  <PostCardComponent key={post.id} post={post} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load more */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  type="button"
                  onClick={() => fetchPosts(false)}
                  disabled={loading}
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-pe-slate-200 bg-white text-sm font-semibold text-pe-slate-700 hover:border-pe-solar-400 hover:text-pe-solar-600 transition-all disabled:opacity-50"
                >
                  {loading ? "Carregando..." : "Carregar mais artigos"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
