import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const order = (searchParams.get("order") as "asc" | "desc") || "desc";
  const limit = Math.min(Number(searchParams.get("limit")) || 12, 50);
  const offset = Number(searchParams.get("offset")) || 0;

  const { posts, total } = await getBlogPosts({ category, search, limit, offset, order });

  return NextResponse.json({ posts, total });
}
