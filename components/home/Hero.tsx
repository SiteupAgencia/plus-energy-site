"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, ChevronDown, Wrench, Ban, Unlock, Smartphone, BadgePercent, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";

const tickerItems = [
  { icon: Wrench, text: "Sem instalação" },
  { icon: Ban, text: "Sem taxa de adesão" },
  { icon: Unlock, text: "Sem fidelidade" },
  { icon: Smartphone, text: "100% Digital" },
  { icon: BadgePercent, text: "Até 25% de desconto" },
  { icon: Zap, text: "Ativação em 30-60 dias" },
  { icon: ShieldCheck, text: "Regulamentado ANEEL" },
];
const tickerTrack = [...tickerItems, ...tickerItems, ...tickerItems];

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
  }),
};

export function Hero() {
  const handleCTA = () => {
    window.dispatchEvent(new CustomEvent("open-lead-popup"));
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById("como-funciona");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Dark overlay — gradient from left (darker) to right (lighter) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgb(0 0 0 / 0.88) 0%, rgb(0 0 0 / 0.75) 45%, rgb(0 0 0 / 0.45) 100%)",
        }}
      />

      {/* Gold atmospheric glow — bottom center */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgb(230 169 0 / 0.18) 0%, transparent 70%)",
        }}
      />

      {/* Noise grain overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 pt-32 lg:pt-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Eyebrow badge */}
            <motion.div custom={0} variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-pe-solar-500/30 text-xs font-semibold text-pe-solar-400 uppercase tracking-widest backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-pe-solar-400 animate-pulse" />
                Energia Solar por Assinatura — RS
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.1] text-white"
            >
              Pague até{" "}
              <span className="animate-shimmer">25%</span>{" "}
              menos na conta de luz{" "}
              <span className="text-pe-solar-400">sem instalar nada</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeInUp}
              className="mt-6 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
            >
              Energia solar por assinatura. Sem obra, sem taxa de adesão,
              sem fidelidade. 100% digital.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeInUp}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="lg" onClick={handleCTA} icon={<ArrowRight className="w-5 h-5" />}>
                Quero Economizar
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToHowItWorks} icon={<ChevronDown className="w-5 h-5" />}>
                Veja como funciona
              </Button>
            </motion.div>

            {/* Trust badge */}
            <motion.div custom={4} variants={fadeInUp} className="mt-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/15 text-sm text-white/70 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-pe-solar-400 shrink-0" />
                Regulamentado pela Lei 14.300/2022 &mdash; ANEEL
              </span>
            </motion.div>

            {/* Stats strip — count-up animado */}
            <motion.div custom={5} variants={fadeInUp} className="mt-10 flex items-center gap-8">
              <div className="text-center">
                <p className="font-heading text-2xl font-extrabold text-pe-solar-400">
                  <Counter end={25} suffix="%" duration={1800} className="font-heading text-2xl font-extrabold text-pe-solar-400" />
                </p>
                <p className="text-xs text-white/50 uppercase tracking-wide mt-0.5">de desconto</p>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-center">
                <p className="font-heading text-2xl font-extrabold text-pe-solar-400">R$ 0</p>
                <p className="text-xs text-white/50 uppercase tracking-wide mt-0.5">de investimento</p>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-center">
                <p className="font-heading text-2xl font-extrabold text-pe-solar-400">
                  <Counter end={100} suffix="%" duration={1600} className="font-heading text-2xl font-extrabold text-pe-solar-400" />
                </p>
                <p className="text-xs text-white/50 uppercase tracking-wide mt-0.5">digital</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side — Symbol showcase + decorative rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" as const }}
            aria-hidden="true"
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-[520px] h-[520px] flex items-center justify-center">
              {/* Rotating outer ring */}
              <div
                className="absolute inset-0 rounded-full border border-pe-solar-500/20"
                style={{ animation: "gold-spin 20s linear infinite" }}
              />
              {/* Dashed ring */}
              <div className="absolute inset-6 rounded-full border-2 border-dashed border-pe-solar-500/20 animate-[spin_30s_linear_infinite_reverse]" />
              {/* Glow ring */}
              <div className="absolute inset-12 rounded-full border border-pe-solar-400/25" />
              {/* Inner glow */}
              <div
                className="absolute inset-16 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgb(230 169 0 / 0.2) 0%, rgb(212 122 0 / 0.1) 50%, transparent 80%)",
                }}
              />

              {/* Symbol — center */}
              <div className="relative z-10 animate-float">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/simbolo.png"
                  alt="Plus Energy"
                  className="w-72 h-72 object-contain drop-shadow-[0_0_80px_rgb(230_169_0/0.75)]"
                />
              </div>

              {/* Orbiting dots */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-pe-solar-400 shadow-[0_0_12px_rgb(230_169_0/0.8)]" />
              <div className="absolute bottom-8 right-10 w-3 h-3 rounded-full bg-pe-solar-500/80 shadow-[0_0_8px_rgb(212_122_0/0.7)]" />
              <div className="absolute top-1/3 left-3 w-2 h-2 rounded-full bg-pe-solar-300/80" />
              <div className="absolute bottom-1/4 left-8 w-1.5 h-1.5 rounded-full bg-pe-solar-400/60" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgb(0 0 0 / 0.6))",
        }}
      />

      {/* Ticker strip — glassmorphism sobre a foto */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden">
        {/* Gold top line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-pe-solar-400/50 to-transparent" />

        <div
          className="overflow-hidden py-3"
          style={{
            background: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Fade edge masks */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
            style={{ background: "linear-gradient(to left, rgba(0,0,0,0.5), transparent)" }}
          />

          <div className="flex animate-[marquee_30s_linear_infinite] w-max">
            {tickerTrack.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 shrink-0 px-6">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pe-solar-400/20 border border-pe-solar-400/35">
                  <item.icon className="w-3 h-3 text-pe-solar-400" />
                </span>
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider whitespace-nowrap">
                  {item.text}
                </span>
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-pe-solar-400/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
