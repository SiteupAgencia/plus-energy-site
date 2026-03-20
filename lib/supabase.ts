import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ── Blog types ── */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_url: string | null;
  category: string;
  tags: string[];
  reading_time: number;
  meta_title: string | null;
  meta_description: string | null;
  faq: { question: string; answer: string }[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/* ── Blog queries ── */

export async function getBlogPosts({
  category,
  search,
  limit = 12,
  offset = 0,
  order = "desc",
}: {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
  order?: "asc" | "desc";
} = {}) {
  let query = supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_url, category, tags, reading_time, published_at", { count: "exact" })
    .eq("published", true)
    .order("published_at", { ascending: order === "asc" })
    .range(offset, offset + limit - 1);

  if (category) {
    query = query.eq("category", category);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { posts: (data ?? []) as Partial<BlogPost>[], total: count ?? 0 };
}

export async function getBlogPost(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return null;
  return data as BlogPost;
}

export async function getBlogCategories() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("category")
    .eq("published", true);

  if (error) return [];
  const categories = [...new Set((data ?? []).map((p) => p.category))];
  return categories.sort();
}

export async function getRelatedPosts(currentSlug: string, category: string, limit = 3) {
  // Try same category first
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_url, category, reading_time, published_at")
    .eq("published", true)
    .eq("category", category)
    .neq("slug", currentSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) return [];

  // If not enough same-category posts, fill with recent posts from other categories
  const posts = data ?? [];
  if (posts.length < limit) {
    const slugsToExclude = [currentSlug, ...posts.map((p) => p.slug)];
    const { data: more } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, cover_url, category, reading_time, published_at")
      .eq("published", true)
      .not("slug", "in", `(${slugsToExclude.map((s) => `"${s}"`).join(",")})`)
      .order("published_at", { ascending: false })
      .limit(limit - posts.length);
    posts.push(...(more ?? []));
  }

  return posts as Partial<BlogPost>[];
}
