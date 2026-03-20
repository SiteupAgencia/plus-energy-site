"use client";

import {
  Wrench,
  Ban,
  Unlock,
  Smartphone,
  BadgePercent,
  Zap,
  ShieldCheck,
} from "lucide-react";

const items = [
  { icon: Wrench, text: "Sem instalação" },
  { icon: Ban, text: "Sem taxa de adesão" },
  { icon: Unlock, text: "Sem fidelidade" },
  { icon: Smartphone, text: "100% Digital" },
  { icon: BadgePercent, text: "Até 25% de desconto" },
  { icon: Zap, text: "Ativação em 30-60 dias" },
  { icon: ShieldCheck, text: "Regulamentado ANEEL" },
] as const;

// Triplicamos para garantir loop imperceptível em qualquer largura
const track = [...items, ...items, ...items];

export function TrustBar() {
  return (
    <div className="relative overflow-hidden">
      {/* Glassmorphism container */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(10,20,10,0.45) 50%, rgba(0,0,0,0.55) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Gold top border */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-pe-solar-400/60 to-transparent" />

        {/* Fade masks on edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7), transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,0.7), transparent)",
          }}
        />

        {/* Ticker track */}
        <div className="py-3 overflow-hidden">
          <div className="flex animate-[marquee_28s_linear_infinite] w-max">
            {track.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 shrink-0 px-7"
              >
                {/* Icon pill */}
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-pe-solar-400/15 border border-pe-solar-400/30 shadow-[0_0_8px_rgb(230_169_0/0.2)]">
                    <item.icon className="w-3.5 h-3.5 text-pe-solar-400" />
                  </span>
                  <span className="text-sm font-semibold text-white/85 whitespace-nowrap tracking-wide">
                    {item.text}
                  </span>
                </div>

                {/* Separator diamond */}
                <span
                  aria-hidden="true"
                  className="w-1 h-1 rounded-full bg-pe-solar-400/40"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gold bottom border */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-pe-solar-400/30 to-transparent" />
      </div>
    </div>
  );
}
