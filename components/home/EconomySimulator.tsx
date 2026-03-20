"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_BILL, MIN_BILL, MAX_BILL, calculateSavings } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Leaf, TreePine, Zap } from "lucide-react";
import { trackSimulatorInteraction, trackSimulatorAutoTrigger, trackCtaClick } from "@/lib/gtm";

const IDLE_DELAY = 3000;

// Arc SVG params — 270-degree arc, gap at bottom
const R = 80;
const CX = 100;
const CY = 105;
const CIRC = 2 * Math.PI * R;      // ≈ 502.65
const ARC  = CIRC * 0.75;           // 270° portion ≈ 376.99

function ArcSlider({ percentage }: { percentage: number }) {
  const filled = ARC * Math.max(0, Math.min(1, percentage / 100));

  return (
    <svg viewBox="0 0 200 210" className="w-full h-full" aria-hidden="true">
      {/* Gradient definition */}
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d47a00" />
          <stop offset="100%" stopColor="#e6a900" />
        </linearGradient>
      </defs>

      {/* Track (background arc) */}
      <circle
        cx={CX} cy={CY} r={R}
        fill="none"
        stroke="rgba(0,0,0,0.10)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${ARC} ${CIRC - ARC}`}
        style={{ transform: "rotate(-225deg)", transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* Progress arc */}
      <circle
        cx={CX} cy={CY} r={R}
        fill="none"
        stroke="url(#arcGrad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${CIRC - filled}`}
        style={{
          transform: "rotate(-225deg)",
          transformOrigin: `${CX}px ${CY}px`,
          transition: "stroke-dasharray 0.1s ease-out",
          filter: "drop-shadow(0 0 8px rgba(230,169,0,0.6))",
        }}
      />
    </svg>
  );
}

export function EconomySimulator() {
  const [billValue, setBillValue] = useState(DEFAULT_BILL);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasAutoTriggeredRef = useRef(false);

  const savings = calculateSavings(billValue);
  const percentage = ((billValue - MIN_BILL) / (MAX_BILL - MIN_BILL)) * 100;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setBillValue(value);
    trackSimulatorInteraction(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!hasAutoTriggeredRef.current) {
      timerRef.current = setTimeout(() => {
        hasAutoTriggeredRef.current = true;
        trackSimulatorAutoTrigger(value);
        window.dispatchEvent(new CustomEvent("open-lead-popup", { detail: { billValue: value, source: "simulator_auto" } }));
      }, IDLE_DELAY);
    }
  }, []);

  const handleCTA = () => {
    hasAutoTriggeredRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    trackCtaClick("Quero esse desconto", "simulator");
    window.dispatchEvent(new CustomEvent("open-lead-popup", { detail: { billValue, source: "simulator_cta" } }));
  };

  return (
    <section className="relative py-[var(--section-py-mobile)] lg:py-[var(--section-py)] overflow-hidden">
      {/* Background — placas solares */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/imagens-placas.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{ filter: "blur(3px) brightness(1.05)", transform: "scale(1.05)" }}
      />
      {/* White wash overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(255,255,255,0.60)" }}
      />
      {/* Sun glow — warm gold burst from top center */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(230,169,0,0.30) 0%, rgba(255,200,50,0.12) 45%, transparent 70%)",
        }}
      />
      {/* Warm light fade bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(255,248,220,0.35))",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-50 border border-pe-solar-200 text-xs font-semibold text-pe-solar-600 uppercase tracking-widest mb-6">
            <Zap className="w-3.5 h-3.5" />
            Simulação gratuita
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-black">
            Simule sua <span className="text-pe-solar-400">economia</span>
          </h2>
          <p className="mt-2 text-base text-pe-slate-500">
            Arraste o slider e veja quanto você pode economizar
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
        >
          {/* ── Left — circular display + slider ── */}
          <div
            className="relative p-8 lg:p-10 flex flex-col items-center"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRight: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <p className="text-xs font-bold text-pe-slate-400 uppercase tracking-[0.2em] mb-6">
              Quanto você paga hoje?
            </p>

            {/* Circular display */}
            <div className="relative w-56 h-56">
              <ArcSlider percentage={percentage} />

              {/* Center value */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-pe-slate-400 mb-1">R$</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={billValue}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.15 }}
                    className="font-heading text-4xl font-extrabold text-black tabular-nums leading-none"
                  >
                    {billValue.toLocaleString("pt-BR")}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm text-pe-slate-400 mt-1">/mês</span>
                <span className="text-[10px] text-pe-slate-400 mt-1 text-center leading-tight">
                  valor da sua conta<br />de energia
                </span>
              </div>

              {/* Min / max labels */}
              <span className="absolute bottom-2 left-0 text-[10px] text-pe-slate-400 font-medium">
                {formatCurrency(MIN_BILL)}
              </span>
              <span className="absolute bottom-2 right-0 text-[10px] text-pe-slate-400 font-medium">
                {formatCurrency(MAX_BILL)}
              </span>
            </div>

            {/* Range input */}
            <div className="w-full mt-4 mb-6 px-2">
              <input
                type="range"
                min={MIN_BILL}
                max={MAX_BILL}
                step={50}
                value={billValue}
                onChange={handleChange}
                aria-label="Valor da conta de luz"
                className="w-full h-1.5 rounded-full appearance-none bg-black/10 cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-pe-solar-400
                  [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/40
                  [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgb(230_169_0/0.6)]
                  [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-pe-solar-400
                  [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/40"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {[
                { icon: Leaf, value: `${savings.co2YearlyTons}t`, label: "CO₂" },
                { icon: TreePine, value: `${savings.treesEquiv}`, label: "árvores equiv." },
                { icon: Zap, value: `${savings.kwhMonthly}`, label: "kWh gerado" },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center p-3 rounded-xl text-center"
                  style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <Icon className="w-4 h-4 text-pe-solar-400 mb-1.5" />
                  <span className="font-heading text-sm font-bold text-black">{value}</span>
                  <span className="text-[10px] text-pe-slate-400 leading-tight mt-0.5">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — savings result ── */}
          <div
            className="relative p-8 lg:p-10 flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #0f2a0f 60%, #102000 100%)" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(230,169,0,0.12) 0%, transparent 65%)" }}
            />

            <div className="relative z-10">
              <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">
                Sua economia estimada
              </p>

              {/* Monthly savings hero number */}
              <div className="mb-8">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-2">por mês</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={savings.monthly}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-end gap-1"
                  >
                    <span className="font-heading text-lg font-bold text-pe-solar-400 mb-2">R$</span>
                    <span
                      className="font-heading font-extrabold text-pe-solar-400 tabular-nums leading-none"
                      style={{
                        fontSize: "clamp(3rem, 8vw, 4.5rem)",
                        textShadow: "0 0 40px rgba(230,169,0,0.5)",
                      }}
                    >
                      {savings.monthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-white/40 text-base mb-2">/mês</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Year / 2-year */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pe-solar-400/60" />
                    <p className="text-xs text-white/40 uppercase tracking-widest">Por ano</p>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={savings.yearly}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="font-heading text-2xl font-bold text-white"
                    >
                      {formatCurrency(savings.yearly)}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pe-solar-400" />
                    <p className="text-xs text-white/40 uppercase tracking-widest">Em 2 anos</p>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={savings.twoYears}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="font-heading text-2xl font-bold text-pe-solar-400"
                    >
                      {formatCurrency(savings.twoYears)}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 mt-10">
              <motion.button
                type="button"
                onClick={handleCTA}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group w-full flex items-center justify-center gap-4 whitespace-nowrap rounded-full gold-gradient pl-8 pr-2.5 py-2.5 text-lg font-heading font-bold text-pe-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_30px_rgba(212,122,0,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_40px_rgba(230,169,0,0.65)] hover:brightness-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pe-solar-400 focus-visible:ring-offset-2"
              >
                Quero esse desconto
                <span className="w-9 h-9 rounded-full bg-pe-slate-950/15 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </motion.button>
              <p className="mt-3 text-center text-xs text-white/25">
                Simulação gratuita · Sem compromisso · 100% digital
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
