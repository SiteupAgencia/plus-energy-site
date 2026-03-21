"use client";

import Image from "next/image";
import { CASES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Quote, Star, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

type Case = (typeof CASES)[number];

/* ─── Featured card (Maicon) ─────────────────────────────────────── */
function FeaturedCard({ c }: { c: Case }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-pe-slate-100 shadow-[0_4px_24px_rgb(0_0_0/0.08)] lg:col-span-2 h-full">
      <div className="grid sm:grid-cols-2 h-full">
        {/* Left */}
        <div className="p-5 sm:p-7 bg-white">
          {/* Avatar + name */}
          <div className="flex items-center gap-3 mb-3">
            <Image src={c.image} alt={c.name} width={44} height={44} className="w-11 h-11 rounded-full border-2 border-pe-solar-300 shrink-0 object-cover" />
            <div className="min-w-0">
              <p className="font-heading font-bold text-black leading-tight">{c.name}</p>
              <p className="text-xs text-pe-slate-500 truncate">{c.company}</p>
            </div>
          </div>
          {/* Location */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pe-slate-50 border border-pe-slate-100 text-[11px] text-pe-slate-500 whitespace-nowrap">
              <MapPin className="w-2.5 h-2.5" />{c.location}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-3.5 rounded-xl bg-pe-slate-50 mb-3.5">
            <div className="text-center">
              <p className="text-[10px] text-pe-slate-400 uppercase tracking-wide mb-0.5">Antes</p>
              <p className="font-heading text-base sm:text-lg font-bold text-pe-slate-400 line-through">{formatCurrency(c.previousBill)}</p>
            </div>
            <TrendingDown className="w-5 h-5 text-pe-solar-500 shrink-0" />
            <div className="text-center">
              <p className="text-[10px] text-pe-green-600 uppercase tracking-wide mb-0.5 font-semibold">Agora</p>
              <p className="font-heading text-base sm:text-lg font-bold text-pe-green-600">{formatCurrency(c.currentBill)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div className="p-3 rounded-xl border border-pe-solar-200 bg-pe-solar-50 text-center">
              <p className="text-[10px] text-pe-slate-500 uppercase tracking-wide mb-1">Por mês</p>
              <p className="font-heading text-lg font-bold text-pe-solar-600">{formatCurrency(c.monthlySavings)}</p>
            </div>
            <div className="p-3 rounded-xl border border-pe-solar-300 bg-gradient-to-br from-pe-solar-50 to-pe-solar-100 text-center">
              <p className="text-[10px] text-pe-slate-500 uppercase tracking-wide mb-1">{c.months} meses</p>
              <p className="font-heading text-lg font-bold text-pe-solar-600">{formatCurrency(c.totalSavings)}</p>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pe-green-50 border border-pe-green-100 text-xs font-semibold text-pe-green-700">
              {c.type} · {c.discountRate}% de desconto
            </span>
          </div>
        </div>

        {/* Right — testimonial */}
        <div className="relative p-7 flex flex-col justify-between"
          style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #0f2a0f 60%, #1a2a00 100%)" }}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgb(230 169 0 / 0.12) 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-pe-solar-400 text-pe-solar-400" />)}
            </div>
            <Quote className="w-7 h-7 text-pe-solar-400/30 mb-3" aria-hidden="true" />
            <blockquote className="text-base text-white/90 leading-relaxed font-light italic">
              &ldquo;{c.testimonial}&rdquo;
            </blockquote>
            <p className="mt-4 text-xs text-pe-solar-400/70">&mdash; {c.name}, {c.company}</p>
          </div>
          <div className="relative z-10 mt-6 pt-5 border-t border-white/10">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Total economizado</p>
            <p className="font-heading text-3xl font-extrabold text-pe-solar-400 drop-shadow-[0_0_20px_rgb(230_169_0/0.4)]">
              {formatCurrency(c.totalSavings)}
            </p>
            <p className="text-xs text-white/40 mt-0.5">em {c.months} meses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Compact card (bottom row) ──────────────────────────────────── */
function CompactCard({ c }: { c: Case }) {
  return (
    <div className="rounded-2xl bg-white border border-pe-slate-100 shadow-[0_2px_12px_rgb(0_0_0/0.05)] p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <Image src={c.image} alt={c.name} width={36} height={36} className="w-9 h-9 rounded-full border-2 border-pe-solar-300 shrink-0 object-cover" />
        <div className="min-w-0">
          <p className="font-heading font-bold text-black text-sm leading-tight">{c.name}</p>
          <p className="text-[11px] text-pe-slate-400">{c.company}</p>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-pe-solar-50 to-pe-solar-100 border border-pe-solar-200 px-4 py-3">
        <p className="text-[10px] text-pe-slate-500 uppercase tracking-wide mb-0.5">Total economizado</p>
        <p className="font-heading text-xl font-extrabold text-pe-solar-600">{formatCurrency(c.totalSavings)}</p>
        <p className="text-[11px] text-pe-slate-400 mt-0.5">em {c.months} meses · {c.discountRate}% off</p>
      </div>

      <p className="text-xs text-pe-slate-500 italic leading-relaxed flex-1">
        &ldquo;{c.testimonial}&rdquo;
      </p>

      <span className="inline-flex items-center gap-1 text-[11px] text-pe-slate-400">
        <MapPin className="w-3 h-3" />{c.location}
      </span>
    </div>
  );
}

/* ─── Vertical ticker (right col, row 1) ─────────────────────────── */
function VerticalTicker({ cards }: { cards: readonly Case[] }) {
  const tripled = [...cards, ...cards, ...cards];

  return (
    <div className="overflow-hidden rounded-2xl relative group border border-pe-slate-100 bg-pe-slate-50/50" style={{ height: "100%" }}>
      {/* Fades */}
      <div className="absolute top-0 left-0 right-0 h-10 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(248,249,250,0.95), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-10 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(248,249,250,0.95), transparent)" }} />

      <div
        className="p-3 group-hover:[animation-play-state:paused]"
        style={{ animation: `tickerScrollDown ${cards.length * 6}s linear infinite` }}
      >
        {tripled.map((c, i) => (
          <div key={`${c.name}-${i}`} className="rounded-xl bg-white border border-pe-slate-100 shadow-[0_1px_8px_rgb(0_0_0/0.04)] p-3.5 mb-2.5 last:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <Image src={c.image} alt={c.name} width={32} height={32} className="w-8 h-8 rounded-full border-2 border-pe-solar-300 shrink-0 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-heading font-bold text-black text-sm leading-tight">{c.name}</p>
                <p className="text-[10px] text-pe-slate-400">{c.location}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-heading font-extrabold text-pe-solar-500 text-sm">{formatCurrency(c.totalSavings)}</p>
                <p className="text-[10px] text-pe-slate-400">{c.months} meses</p>
              </div>
            </div>
            <p className="text-[11px] text-pe-slate-500 italic leading-relaxed">
              &ldquo;{c.testimonial}&rdquo;
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes tickerScrollDown {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-${(100 / 3).toFixed(4)}%); }
        }
        .group:hover > div[style*="tickerScrollDown"] {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

/* ─── Main ────────────────────────────────────────────────────────── */
export function CaseMaicon() {
  const [featured, ana, pedro, familia, rodrigo, carlos] = CASES;

  return (
    <section className="relative bg-white py-[var(--section-py-mobile)] lg:py-[var(--section-py)] overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-50 border border-pe-solar-200 text-xs font-semibold text-pe-solar-600 uppercase tracking-widest mb-6">
            <Star className="w-3.5 h-3.5" />
            Casos reais
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-black">
            Economia real, <span className="text-pe-solar-400">comprovada</span>
          </h2>
          <p className="mt-3 text-lg text-pe-slate-500">
            Veja o resultado de quem já está economizando com a Plus Energy
          </p>
        </motion.div>

        {/* Bento — unified panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-pe-slate-100 shadow-[0_8px_48px_rgb(0_0_0/0.08)] overflow-hidden bg-pe-slate-50/40 p-3 flex flex-col gap-3"
        >
          {/* Row 1: Featured + Ticker */}
          {/* The ticker wrapper uses height:0 + minHeight:100% so it doesn't inflate the row */}
          <div className="grid lg:grid-cols-3 gap-3 items-stretch">
            <FeaturedCard c={featured} />
            <div style={{ height: 0, minHeight: "100%", overflow: "hidden" }}>
              <VerticalTicker cards={[ana, pedro] as unknown as readonly Case[]} />
            </div>
          </div>

          {/* Row 2: 3 compact cards */}
          <div className="grid sm:grid-cols-3 gap-3">
            <CompactCard c={familia} />
            <CompactCard c={rodrigo} />
            <CompactCard c={carlos} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
