"use client";

import { motion } from "framer-motion";
import { MapPin, Zap, Building2, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/lib/constants";

/* Real RS boundary — derived from IBGE/GeoJSON data, viewBox 0 0 280 260 */
const RS_PATH =
  "M 197.2,175.1 L 190.7,182.5 L 195.8,192.9 L 178.3,231.7 L 148.1,258.1 L 147.5,251.3 L 151.1,234.7 L 159.5,223.0 L 173.4,223.4 L 176.6,197.7 L 172.5,200.2 L 172.5,207.7 L 155.3,216.3 L 144.9,210.7 L 138.0,198.5 L 133.5,192.1 L 124.9,189.0 L 109.5,172.3 L 96.7,167.6 L 90.9,165.4 L 83.4,159.4 L 77.7,152.5 L 70.0,147.5 L 65.0,153.4 L 57.5,150.1 L 53.7,142.5 L 48.0,135.2 L 42.1,130.1 L 35.7,123.6 L 28.5,117.4 L 18.9,118.7 L 12.0,124.3 L 0.5,121.1 L 14.1,105.6 L 29.4,93.1 L 43.3,77.6 L 53.8,62.3 L 64.8,50.1 L 71.0,42.0 L 80.0,36.1 L 88.8,30.1 L 96.5,25.1 L 104.6,16.5 L 112.0,13.4 L 120.8,11.6 L 129.8,4.0 L 144.2,3.7 L 160.8,0.9 L 174.3,7.9 L 188.9,8.4 L 203.0,17.1 L 217.2,19.9 L 233.2,34.1 L 245.9,48.3 L 263.2,54.0 L 273.9,54.2 L 277.7,60.1 L 271.4,65.4 L 271.2,74.9 L 268.2,81.4 L 263.9,84.2 L 270.2,82.8 L 276.8,91.2 L 255.0,137.1 L 205.1,188.3 L 195.3,185.3 L 215.6,176.3 L 228.3,163.7 L 237.5,148.8 L 246.4,128.9 L 249.9,126.7 L 242.0,125.3 L 232.4,128.3 L 226.9,122.0 L 223.4,115.4 L 224.5,125.8 L 224.7,132.2 L 217.7,155.7 L 206.1,163.4 L 198.2,173.2 Z";

const facts = [
  {
    icon: MapPin,
    title: "Marcelino Ramos — RS",
    desc: "Nossa sede e raízes gaúchas",
  },
  {
    icon: Zap,
    title: "Rede RGE (CPFL)",
    desc: "Cobrimos toda a área de distribuição RGE no RS",
  },
  {
    icon: ShieldCheck,
    title: "Regulamentado pela ANEEL",
    desc: "Lei 14.300/2022 — operamos dentro da lei",
  },
  {
    icon: Building2,
    title: `CNPJ ${COMPANY.cnpj}`,
    desc: "Empresa registrada e transparente",
  },
];

export function CoverageMap() {
  const handleCTA = () => {
    window.dispatchEvent(new CustomEvent("open-lead-popup"));
  };

  return (
    <section className="bg-white py-[var(--section-py-mobile)] lg:py-[var(--section-py)] overflow-hidden">
      {/* Subtle ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 75% 50%, rgba(230,169,0,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left — text ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-50 border border-pe-solar-200 text-xs font-semibold text-pe-solar-600 uppercase tracking-widest mb-6">
              <MapPin className="w-3.5 h-3.5" />
              Atuação regional
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-black leading-tight mb-5">
              Empresa 100% gaúcha,{" "}
              <span className="text-pe-solar-400">energia para os gaúchos</span>
            </h2>

            <p className="text-pe-slate-500 text-lg leading-relaxed mb-10">
              Nascemos no RS, operamos no RS. Nossa energia solar chega até você
              pela rede <strong className="text-black font-semibold">RGE (CPFL)</strong> —
              sem obra, sem instalação, e com{" "}
              <strong className="text-black font-semibold">25% de desconto</strong>{" "}
              na conta todo mês.
            </p>

            {/* Fact list */}
            <div className="space-y-4 mb-10">
              {facts.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-pe-slate-100 shadow-sm flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-pe-solar-500" />
                  </div>
                  <div>
                    <p className="text-black font-semibold text-sm leading-tight">{title}</p>
                    <p className="text-pe-slate-400 text-xs mt-0.5">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              type="button"
              onClick={handleCTA}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-2xl gold-gradient px-8 py-4 text-base font-heading font-bold text-pe-slate-950 shadow-[0_4px_24px_rgba(212,122,0,0.35)] hover:shadow-[0_4px_36px_rgba(230,169,0,0.5)] transition-shadow focus:outline-none focus:ring-4 focus:ring-pe-solar-500/30"
            >
              Quero minha economia
              <span aria-hidden="true">→</span>
            </motion.button>
          </motion.div>

          {/* ── Right — RS Map ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[520px]">
              {/* Ambient glow behind map */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 65% at 55% 50%, rgba(230,169,0,0.22) 0%, transparent 68%)",
                  filter: "blur(24px)",
                }}
              />

              <svg
                viewBox="0 0 280 260"
                className="relative w-full"
                aria-label="Mapa do Rio Grande do Sul"
              >
                <defs>
                  <linearGradient id="rsGradFill" x1="15%" y1="10%" x2="85%" y2="90%">
                    <stop offset="0%" stopColor="#EBB800" />
                    <stop offset="100%" stopColor="#C47000" />
                  </linearGradient>
                  <linearGradient id="rsGradGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E6A900" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#D47A00" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#C47000" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Shadow / glow layer */}
                <path
                  d={RS_PATH}
                  fill="#D47A00"
                  opacity="0.2"
                  filter="url(#mapShadow)"
                  transform="translate(0, 4)"
                />

                {/* Map fill */}
                <path
                  d={RS_PATH}
                  fill="url(#rsGradFill)"
                  stroke="#A85C00"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />

                {/* Subtle inner highlight */}
                <path
                  d={RS_PATH}
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  opacity="0.6"
                />

                {/* Dot texture overlay */}
                {Array.from({ length: 5 }, (_, row) =>
                  Array.from({ length: 6 }, (_, col) => (
                    <circle
                      key={`d-${row}-${col}`}
                      cx={28 + col * 44}
                      cy={28 + row * 44}
                      r="1.4"
                      fill="white"
                      opacity="0.18"
                    />
                  ))
                )}

                {/* ── Marcelino Ramos pin — upper right, coords 27.4°S 51.9°W → (202, 13) ── */}
                <g transform="translate(202, 13)">
                  {/* Pulse rings */}
                  <motion.circle
                    cx="0" cy="0" r="14"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    initial={{ opacity: 0.7, scale: 0.3 }}
                    animate={{ opacity: 0, scale: 2.5 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.circle
                    cx="0" cy="0" r="14"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    initial={{ opacity: 0.5, scale: 0.3 }}
                    animate={{ opacity: 0, scale: 3 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
                  />
                  {/* Dot */}
                  <circle cx="0" cy="0" r="6.5" fill="white" opacity="0.95" />
                  <circle cx="0" cy="0" r="4" fill="#C47000" />
                </g>

                {/* Label badge for Marcelino Ramos */}
                <rect x="148" y="1" width="90" height="15" rx="7.5" fill="rgba(0,0,0,0.55)" />
                <text
                  x="193"
                  y="11.5"
                  fontSize="7.2"
                  fill="white"
                  fontWeight="700"
                  textAnchor="middle"
                  fontFamily="system-ui, sans-serif"
                  letterSpacing="0.3"
                >
                  Marcelino Ramos
                </text>

              </svg>

              {/* Floating badge — "Somente RS" */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-pe-slate-100 shadow-md text-xs font-semibold text-pe-slate-700">
                  <span className="w-2 h-2 rounded-full bg-pe-solar-400 animate-pulse" />
                  Atendemos toda a rede RGE no RS
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
