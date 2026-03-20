"use client";

import { ArrowRight, Shield, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

const AVATARS = [
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=47",
  "https://i.pravatar.cc/150?img=32",
  "https://i.pravatar.cc/150?img=68",
];

// Subtle sparkle positions inside card
const SPARKLES = [
  { top: "12%", left: "8%", size: 3, delay: 0 },
  { top: "20%", right: "10%", size: 2, delay: 0.8 },
  { top: "70%", left: "5%", size: 2, delay: 1.4 },
  { top: "80%", right: "7%", size: 3, delay: 0.4 },
  { top: "45%", left: "3%", size: 1.5, delay: 1.1 },
  { top: "55%", right: "4%", size: 1.5, delay: 0.6 },
];

export function FinalCta() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-lead-popup"));
  };

  return (
    <section className="bg-white py-24 sm:py-32 px-4">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-2xl rounded-3xl overflow-hidden px-10 py-14 text-center shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
        style={{
          background: "linear-gradient(145deg, #0a1a0a 0%, #0f2a0f 60%, #102000 100%)",
        }}
      >
        {/* Gold glow top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(230,169,0,0.18) 0%, transparent 65%)",
          }}
        />

        {/* Gold glow bottom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 35% at 50% 100%, rgba(20,60,20,0.7) 0%, transparent 70%)",
          }}
        />

        {/* Sparkle dots */}
        {SPARKLES.map((s, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full bg-pe-solar-300/30"
            style={{
              width: s.size,
              height: s.size,
              top: s.top,
              left: "left" in s ? s.left : undefined,
              right: "right" in s ? s.right : undefined,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.6, 1] }}
            transition={{ duration: 2.5, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-400/10 border border-pe-solar-400/30 text-xs font-semibold text-pe-solar-400 uppercase tracking-widest mb-6"
        >
          <Zap className="w-3 h-3" />
          Simulação 100% gratuita
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4"
        >
          Comece a economizar{" "}
          <span className="gold-gradient-text">em 30-60 dias</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative text-white/50 text-base mb-8"
        >
          Sem instalação &bull; Sem burocracia &bull; 100% digital
        </motion.p>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative inline-flex items-center gap-3 mb-8 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10"
        >
          {/* Stacked avatars */}
          <div className="flex -space-x-2 shrink-0">
            {AVATARS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt=""
                width={28}
                height={28}
                className="w-7 h-7 rounded-full border-2 object-cover"
                style={{ borderColor: "#0f2a0f" }}
              />
            ))}
          </div>

          <div className="text-left">
            {/* Stars */}
            <div className="flex gap-0.5 mb-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-pe-solar-400 text-pe-solar-400" />
              ))}
            </div>
            <p className="text-white/60 text-xs leading-tight">
              Junte-se a <strong className="text-white/90">+200 famílias</strong> economizando no RS
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="relative"
        >
          <motion.button
            type="button"
            onClick={handleClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group inline-flex items-center gap-4 whitespace-nowrap rounded-full gold-gradient pl-10 pr-2.5 py-2.5 text-lg font-heading font-bold text-pe-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_36px_rgb(212_122_0/0.5)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_48px_rgb(230_169_0/0.7)] hover:brightness-105 animate-pulse-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pe-solar-400 focus-visible:ring-offset-2"
          >
            QUERO TER DESCONTO
            <span className="w-10 h-10 rounded-full bg-pe-slate-950/15 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </motion.button>
        </motion.div>

        {/* Guarantee badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="relative mt-5 inline-flex items-center gap-2 text-white/35 text-xs"
        >
          <Shield className="w-3.5 h-3.5 text-pe-green-500 shrink-0" />
          Sem fidelidade &nbsp;·&nbsp; Cancele quando quiser &nbsp;·&nbsp; Sem multa
        </motion.div>
      </motion.div>
    </section>
  );
}
