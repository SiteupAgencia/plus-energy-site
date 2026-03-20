"use client";

import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import {
  Calculator,
  FileSignature,
  ArrowLeftRight,
  BadgePercent,
  Receipt,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  FileSignature,
  ArrowLeftRight,
  BadgePercent,
  Receipt,
};

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function HowItWorks() {
  const handleCTA = () => {
    window.dispatchEvent(new CustomEvent("open-lead-popup"));
  };

  return (
    <section
      id="como-funciona"
      className="relative bg-white py-[var(--section-py-mobile)] lg:py-[var(--section-py)] overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(230 169 0 / 0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-50 border border-pe-solar-200 text-xs font-semibold text-pe-solar-600 uppercase tracking-widest mb-6">
            <Calculator className="w-3.5 h-3.5" />
            Passo a passo
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-black">
            Como <span className="text-pe-solar-400">funciona</span>
          </h2>
          <p className="mt-3 text-lg text-pe-slate-500 max-w-xl mx-auto">
            Veja como é simples usar energia solar por assinatura
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Animated connecting line (desktop only) */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 origin-left"
            style={{
              background:
                "linear-gradient(to right, transparent, rgb(230 169 0 / 0.4) 20%, rgb(230 169 0 / 0.4) 80%, transparent)",
            }}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6"
          >
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const Icon = iconMap[step.icon];
              return (
                <motion.div
                  key={step.step}
                  custom={idx}
                  variants={fadeIn}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Icon circle with hover glow */}
                  <div className="relative z-10 w-24 h-24 rounded-full bg-white border-2 border-pe-solar-400/20 flex items-center justify-center mb-4 shadow-[0_4px_20px_rgb(0_0_0/0.06)] transition-all duration-300 group-hover:border-pe-solar-400/60 group-hover:shadow-[0_0_24px_rgb(230_169_0/0.2)] group-hover:-translate-y-1">
                    {Icon && (
                      <Icon className="w-9 h-9 text-pe-solar-500 transition-colors group-hover:text-pe-solar-400" />
                    )}
                    {/* Step number badge */}
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-pe-solar-400 text-pe-slate-950 text-xs font-bold flex items-center justify-center shadow-[0_0_10px_rgb(230_169_0/0.4)]">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-pe-slate-500 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-14 lg:mt-20 text-center">
          <Button variant="primary" size="lg" onClick={handleCTA} icon={<ArrowRight className="w-5 h-5" />}>
            Comece agora
          </Button>
        </div>
      </div>
    </section>
  );
}
