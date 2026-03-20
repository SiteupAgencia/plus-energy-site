"use client";

import { motion } from "framer-motion";
import { useRive } from "@rive-app/react-canvas";
import { OBJECTIONS } from "@/lib/constants";
import { ShieldCheck, DoorOpen, RefreshCw, BadgeCheck } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   COMO ADICIONAR ANIMAÇÕES RIVE:
   1. Acesse rive.app/community
   2. Baixe 4 .riv gratuitos (ex: shield, door, cycle, badge)
   3. Coloque em /public/rive/shield.riv, door.riv, cycle.riv, badge.riv
   4. Troque o src abaixo de null para o caminho correto
   ───────────────────────────────────────────────────────────── */

const RIVE_FILES = [
  { src: null as string | null, stateMachine: null as string | null }, // card 0 — shield
  { src: null as string | null, stateMachine: null as string | null }, // card 1 — door
  { src: null as string | null, stateMachine: null as string | null }, // card 2 — cycle
  { src: null as string | null, stateMachine: null as string | null }, // card 3 — badge
];

const fallbackIcons = [ShieldCheck, DoorOpen, RefreshCw, BadgeCheck];

const iconColors = [
  { bg: "bg-amber-50", border: "border-amber-200/60", iconColor: "text-pe-solar-500" },
  { bg: "bg-orange-50", border: "border-orange-200/60", iconColor: "text-orange-500" },
  { bg: "bg-emerald-50", border: "border-emerald-200/60", iconColor: "text-emerald-600" },
  { bg: "bg-amber-50", border: "border-amber-200/60", iconColor: "text-pe-solar-500" },
];

function RiveCard({ src, stateMachine, fallbackIcon: FallbackIcon, colorScheme, index }: {
  src: string | null;
  stateMachine: string | null;
  fallbackIcon: React.ComponentType<{ className?: string }>;
  colorScheme: typeof iconColors[0];
  index: number;
}) {
  const { RiveComponent, rive } = useRive(
    src
      ? {
          src,
          stateMachines: stateMachine ?? undefined,
          autoplay: false,
        }
      : { src: "" as string, autoplay: false },
    { shouldResizeCanvasToContainer: true }
  );

  const handleMouseEnter = () => {
    if (rive && src) rive.play();
  };
  const handleMouseLeave = () => {
    if (rive && src) rive.pause();
  };

  return (
    <motion.div
      custom={index}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1, y: 0,
          transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
        },
      }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex gap-5 rounded-2xl bg-white p-6 sm:p-7 shadow-[0px_2px_20px_0px_rgba(0,0,0,0.06)] border border-pe-slate-100 hover:shadow-[0px_6px_30px_0px_rgba(212,122,0,0.12)] hover:border-pe-solar-400/20 transition-all duration-300 cursor-default"
    >
      {/* Icon badge */}
      <div className="shrink-0">
        {src ? (
          <div className={`w-14 h-14 rounded-2xl ${colorScheme.bg} border ${colorScheme.border} flex items-center justify-center`}>
            <div className="w-9 h-9">
              <RiveComponent />
            </div>
          </div>
        ) : (
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
            className={`w-14 h-14 rounded-2xl ${colorScheme.bg} border ${colorScheme.border} flex items-center justify-center shadow-sm`}
          >
            <FallbackIcon className={`w-7 h-7 ${colorScheme.iconColor}`} />
          </motion.div>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="font-heading text-[1.05rem] font-semibold text-black leading-snug">
          &ldquo;{OBJECTIONS[index].objection}&rdquo;
        </p>
        <p className="mt-2 leading-relaxed text-pe-slate-500 text-sm">
          {OBJECTIONS[index].answer}
        </p>
      </div>
    </motion.div>
  );
}

export function ObjectionBreaker() {
  return (
    <section className="bg-white py-[var(--section-py-mobile)] lg:py-[var(--section-py)] overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="font-heading text-3xl font-bold text-black sm:text-4xl">
            Ainda tem <span className="text-pe-solar-400">dúvidas</span>?
          </h2>
          <p className="mt-3 text-lg text-pe-slate-500">
            Respondemos as objeções mais comuns
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {OBJECTIONS.map((_, index) => (
            <RiveCard
              key={index}
              index={index}
              src={RIVE_FILES[index].src}
              stateMachine={RIVE_FILES[index].stateMachine}
              fallbackIcon={fallbackIcons[index]}
              colorScheme={iconColors[index]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
