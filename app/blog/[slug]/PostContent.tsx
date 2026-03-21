"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronRight, List, ArrowRight, Share2, RefreshCw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Accordion } from "@/components/ui/Accordion";
import { LeadCta } from "@/components/ui/LeadCta";
import type { BlogPost } from "@/lib/supabase";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function extractToc(html: string): TocItem[] {
  const regex = /<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gi;
  const items: TocItem[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    items.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ""),
    });
  }
  return items;
}

function injectMidCta(html: string): string {
  // Split content at roughly the middle paragraph
  const paragraphs = html.split("</p>");
  if (paragraphs.length < 4) return html;

  const midpoint = Math.floor(paragraphs.length / 2);
  const ctaHtml = `</p><div data-mid-cta="true"></div>`;

  paragraphs.splice(midpoint, 0, ctaHtml);
  return paragraphs.join("</p>");
}

interface PostContentProps {
  post: BlogPost;
  relatedPosts: Partial<BlogPost>[];
}

export function PostContent({ post, relatedPosts }: PostContentProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [tocOpen, setTocOpen] = useState(false);
  const contentWithCta = injectMidCta(post.content);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setToc(extractToc(post.content));
  }, [post.content]);

  useEffect(() => {
    // Mount the mid-CTA into the placeholder after content is rendered
    const el = contentRef.current;
    if (!el) return;
    const container = el.querySelector("[data-mid-cta]");
    if (container && !container.hasChildNodes()) {
      container.className = "not-prose my-12 rounded-2xl bg-gradient-to-r from-pe-green-950 to-pe-green-900 p-8 sm:p-10 text-center";
      container.innerHTML = `
        <p class="font-heading text-2xl font-bold text-white mb-2">Quer começar a economizar agora?</p>
        <p class="text-white/50 mb-6">Simulação gratuita · Sem compromisso · 100% digital</p>
        <div id="mid-cta-button"></div>
      `;
      const btnContainer = container.querySelector("#mid-cta-button");
      if (btnContainer) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "group inline-flex items-center gap-4 whitespace-nowrap rounded-full gold-gradient pl-7 pr-2.5 py-2.5 text-base font-heading font-bold text-pe-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_36px_rgb(212_122_0/0.4)] hover:brightness-105 hover:scale-105 transition-all";
        btn.innerHTML = 'Simular minha economia <span class="w-8 h-8 rounded-full bg-pe-slate-950/15 flex items-center justify-center shrink-0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>';
        btn.addEventListener("click", () => {
          window.dispatchEvent(new CustomEvent("open-lead-popup"));
        });
        btnContainer.appendChild(btn);
      }
    }
  });

  return (
    <article className="bg-white overflow-x-hidden">
      {/* Header */}
      <header className="bg-pe-green-950 pt-36 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-pe-solar-400">{post.category}</span>
          </nav>

          {/* Category badge */}
          <span className="inline-flex px-3 py-1 rounded-full bg-pe-solar-400 text-pe-slate-950 text-xs font-bold uppercase tracking-wider mb-4">
            {post.category}
          </span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/40">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.published_at)}
            </span>
            {post.updated_at && post.updated_at !== post.published_at && (
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
                Atualizado em {formatDate(post.updated_at)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.reading_time} min de leitura
            </span>
          </div>
        </div>
      </header>

      {/* Cover image */}
      {post.cover_url && (
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={post.cover_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* TOC sidebar (desktop) */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <h4 className="font-heading font-bold text-black text-sm mb-4 flex items-center gap-2">
                  <List className="w-4 h-4 text-pe-solar-500" />
                  Índice
                </h4>
                <nav className="space-y-1.5">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-xs leading-relaxed text-pe-slate-500 hover:text-pe-solar-600 transition-colors ${
                        item.level === 3 ? "pl-3" : ""
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* TOC mobile */}
          {toc.length > 0 && (
            <div className="lg:hidden mb-8">
              <button
                type="button"
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-pe-slate-50 border border-pe-slate-100 text-sm font-semibold text-black"
              >
                <span className="flex items-center gap-2">
                  <List className="w-4 h-4 text-pe-solar-500" />
                  Índice do artigo
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-90" : ""}`} />
              </button>
              {tocOpen && (
                <nav className="mt-2 px-4 py-3 rounded-xl bg-pe-slate-50 border border-pe-slate-100 space-y-2">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setTocOpen(false)}
                      className={`block text-sm text-pe-slate-500 hover:text-pe-solar-600 transition-colors ${
                        item.level === 3 ? "pl-4" : ""
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          )}

          {/* Content */}
          <div
            ref={contentRef}
            className="prose prose-slate prose-lg max-w-3xl prose-headings:font-heading prose-headings:font-bold prose-a:text-pe-green-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-black prose-table:text-sm prose-td:py-2 prose-th:py-2 overflow-x-hidden [&_table]:block [&_table]:overflow-x-auto [&_table]:w-full"
            dangerouslySetInnerHTML={{ __html: contentWithCta }}
          />
        </div>
      </div>

      {/* Share buttons */}
      <div className="max-w-3xl mx-auto px-4 pb-8">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-6 border-t border-pe-slate-100">
          <div className="flex items-center gap-1.5 mr-1">
            <Share2 className="w-3.5 h-3.5 text-pe-slate-400" />
            <span className="text-xs font-semibold text-pe-slate-500">Compartilhar:</span>
          </div>
          {[
            { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(post.title + " " + `https://plusenergy.net.br/blog/${post.slug}`)}` },
            { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://plusenergy.net.br/blog/${post.slug}`)}` },
            { label: "X", href: `https://x.com/intent/tweet?url=${encodeURIComponent(`https://plusenergy.net.br/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}` },
            { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://plusenergy.net.br/blog/${post.slug}`)}` },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-full border border-pe-slate-200 text-[11px] font-medium text-pe-slate-500 hover:border-pe-solar-400 hover:text-pe-solar-600 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* FAQ section */}
      {post.faq && post.faq.length > 0 && (
        <section className="bg-pe-slate-50 py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl font-extrabold text-black text-center mb-3">
              Perguntas frequentes
            </h2>
            <p className="text-pe-slate-500 text-center mb-8">
              Dúvidas comuns sobre este tema
            </p>
            <Accordion items={post.faq} />
          </div>
        </section>
      )}

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-2xl font-extrabold text-black text-center mb-10">
              Leia também
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block">
                  <div className="rounded-2xl border border-pe-slate-100 bg-pe-slate-50 overflow-hidden hover:border-pe-solar-300 hover:shadow-md transition-all h-full flex flex-col">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      {rp.cover_url ? (
                        <Image src={rp.cover_url} alt={rp.title ?? ""} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pe-green-950 to-pe-slate-800" />
                      )}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-pe-solar-400 text-pe-slate-950 text-xs font-bold uppercase tracking-wider">
                        {rp.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-heading font-bold text-black leading-snug text-base mb-2 group-hover:text-pe-solar-600 transition-colors">
                        {rp.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-pe-slate-400 mt-auto">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {rp.reading_time} min
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-white py-20 px-4 text-center border-t border-pe-slate-100">
        <h2 className="font-heading text-3xl font-extrabold text-black mb-4">
          Comece a economizar agora
        </h2>
        <p className="text-pe-slate-500 mb-8">Simulação gratuita · Sem compromisso · 100% digital</p>
        <LeadCta label="Quero minha simulação gratuita" />
      </section>
    </article>
  );
}
