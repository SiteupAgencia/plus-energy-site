"use client";

import { motion } from "framer-motion";
import { Smartphone, ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const benefits = [
  { icon: MessageCircle, label: "Conta única no WhatsApp e e-mail" },
  { icon: CheckCircle2, label: "Quanto você economizou, em detalhes" },
  { icon: CheckCircle2, label: "Conta da RGE paga automaticamente" },
];

/* floating bubbles config */
const bubbles = [
  { size: 180, top: "-10%", left: "-8%", delay: 0, duration: 7 },
  { size: 100, top: "60%", left: "-5%", delay: 1.2, duration: 9 },
  { size: 60,  top: "80%", left: "20%", delay: 0.6, duration: 6 },
  { size: 130, top: "-5%", right: "5%", delay: 0.3, duration: 8 },
  { size: 70,  top: "50%", right: "-3%", delay: 1.8, duration: 7.5 },
  { size: 45,  top: "30%", right: "18%", delay: 0.9, duration: 5.5 },
];

export function EnvironmentalImpact() {
  const handleCTA = () => {
    window.dispatchEvent(new CustomEvent("open-lead-popup"));
  };

  return (
    <section className="relative bg-pe-slate-50 py-[var(--section-py-mobile)] lg:py-[var(--section-py)] overflow-hidden">

      {/* ── Ambient bubbles ── */}
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: (b as any).left,
            right: (b as any).right,
            background: i % 2 === 0
              ? "radial-gradient(circle at 30% 30%, rgba(230,169,0,0.18), rgba(230,169,0,0.04))"
              : "radial-gradient(circle at 30% 30%, rgba(34,130,60,0.12), rgba(34,130,60,0.02))",
            border: "1px solid rgba(230,169,0,0.12)",
            backdropFilter: "blur(1px)",
          }}
          animate={{ y: [0, -14, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left — text ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-50 border border-pe-solar-200 text-xs font-semibold text-pe-solar-600 uppercase tracking-widest mb-6">
              <Smartphone className="w-3.5 h-3.5" />
              Conta digital
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-black leading-tight mb-5">
              Dê adeus às contas de luz{" "}
              <span className="text-pe-solar-400">complicadas</span>
            </h2>

            <p className="text-pe-slate-500 text-lg leading-relaxed mb-10">
              Com a Plus Energy, você tem tudo em uma única conta de luz — e o melhor:{" "}
              <strong className="text-black font-semibold">economia todo mês!</strong> Você passa a receber
              a sua Conta Única digital, por WhatsApp e e-mail, mostrando em detalhes quanto você está
              economizando. Sua antiga conta da RGE é paga automaticamente. Sem burocracia, sem obra.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-10">
              {benefits.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-pe-slate-100 shadow-sm flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-pe-solar-500" />
                  </div>
                  <p className="text-black font-medium text-sm">{label}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              type="button"
              onClick={handleCTA}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group inline-flex items-center gap-4 whitespace-nowrap rounded-full gold-gradient pl-7 pr-2 py-2 text-base font-heading font-bold text-pe-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_24px_rgba(212,122,0,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_36px_rgba(230,169,0,0.65)] hover:brightness-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pe-solar-400 focus-visible:ring-offset-2"
            >
              Quero minha conta mais barata
              <span className="w-8 h-8 rounded-full bg-pe-slate-950/15 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.button>
          </motion.div>

          {/* ── Right — mockup + effects ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center justify-center"
          >
            <div className="relative overflow-hidden sm:overflow-visible">

              {/* Large glow blob behind image */}
              <div
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                  inset: "-40px",
                  background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(230,169,0,0.2) 0%, rgba(34,130,60,0.08) 50%, transparent 75%)",
                  filter: "blur(28px)",
                }}
              />

              {/* Decorative ring */}
              <motion.div
                aria-hidden="true"
                className="absolute rounded-full border border-pe-solar-300/30 pointer-events-none"
                style={{ inset: "-28px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute rounded-full border border-dashed border-pe-green-400/20 pointer-events-none"
                style={{ inset: "-52px" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating mini badges */}
              <motion.div
                className="absolute left-0 sm:-left-10 top-1/4 z-20 bg-white rounded-2xl shadow-lg border border-pe-slate-100 px-3 py-2 flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                animate={{ y: [0, -6, 0] }}
              >
                <div className="w-7 h-7 rounded-full bg-pe-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-pe-green-600" />
                </div>
                <div>
                  <p className="text-[10px] text-pe-slate-400 leading-none">Economia</p>
                  <p className="text-xs font-bold text-pe-green-600 leading-tight">25% off</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-0 sm:-right-8 bottom-1/3 z-20 bg-white rounded-2xl shadow-lg border border-pe-slate-100 px-3 py-2 flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                animate={{ y: [0, 6, 0] }}
              >
                <div className="w-7 h-7 rounded-full bg-pe-solar-100 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4 text-pe-solar-600" />
                </div>
                <div>
                  <p className="text-[10px] text-pe-slate-400 leading-none">100%</p>
                  <p className="text-xs font-bold text-pe-slate-700 leading-tight">Digital</p>
                </div>
              </motion.div>

              {/* Mockup image */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/mockup-conta-de-luz.png"
                  alt="Mockup da conta digital Plus Energy"
                  width={480}
                  height={680}
                  className="drop-shadow-[0_32px_64px_rgba(0,0,0,0.18)] h-auto w-full"
                  priority
                />
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
