"use client";

import { ArrowRight } from "lucide-react";
import { trackCtaClick } from "@/lib/gtm";

interface LeadCtaProps {
  label?: string;
  size?: "md" | "lg";
  className?: string;
  location?: string;
}

export function LeadCta({ label = "Quero minha simulação gratuita", size = "lg", className, location = "page" }: LeadCtaProps) {
  const handleClick = () => {
    trackCtaClick(label, location);
    window.dispatchEvent(new CustomEvent("open-lead-popup"));
  };

  const padding = size === "lg" ? "pl-6 sm:pl-8 pr-2.5 py-2.5 text-base sm:text-lg" : "pl-5 sm:pl-6 pr-2 py-2 text-sm sm:text-base";
  const badge = size === "lg" ? "w-9 h-9" : "w-8 h-8";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex items-center gap-3 sm:gap-4 rounded-full gold-gradient ${padding} font-heading font-bold text-pe-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_36px_rgb(212_122_0/0.4)] hover:brightness-105 hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pe-solar-400 focus-visible:ring-offset-2 ${className ?? ""}`}
    >
      {label}
      <span className={`${badge} rounded-full bg-pe-slate-950/15 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110`}>
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}
