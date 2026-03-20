"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "outline-dark";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode;
}

const springTransition = { type: "spring" as const, stiffness: 400, damping: 20 };

const sizeStyles: Record<ButtonSize, string> = {
  sm: "pl-5 pr-1.5 py-1.5 text-sm gap-3",
  md: "pl-6 pr-2   py-2   text-base gap-3",
  lg: "pl-7 pr-2   py-2   text-lg gap-4",
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "w-8 h-8 text-[13px]",
  md: "w-9 h-9 text-[15px]",
  lg: "w-10 h-10 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  onClick,
  href,
  type = "button",
  disabled = false,
  icon,
}: ButtonProps) {

  const isPrimary = variant === "primary" || variant === "accent";

  const base = cn(
    "group inline-flex items-center justify-center font-semibold whitespace-nowrap rounded-full transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pe-solar-400 focus-visible:ring-offset-2",
    disabled && "opacity-50 pointer-events-none",
  );

  /* ── Primary / Accent: split-pill layout ── */
  if (isPrimary) {
    const bgClass =
      variant === "primary"
        ? "gold-gradient shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_24px_rgb(212_122_0/0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_36px_rgb(230_169_0/0.65)] hover:brightness-105"
        : "bg-pe-solar-300 hover:bg-pe-solar-400 shadow-[0_4px_16px_rgb(235_184_0/0.3)]";

    const pillClass = cn(base, bgClass, sizeStyles[size], "text-pe-slate-950 min-h-[44px]", className);
    const badgeClass = cn(
      "rounded-full bg-pe-slate-950/15 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110",
      iconSizeStyles[size],
    );

    const inner = (
      <>
        <span>{children}</span>
        {icon && (
          <span className={badgeClass}>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springTransition} className="inline-flex">
          <Link href={href} className={pillClass} onClick={onClick}>{inner}</Link>
        </motion.div>
      );
    }
    return (
      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springTransition}
        type={type} className={pillClass} onClick={onClick} disabled={disabled} aria-disabled={disabled || undefined}>
        {inner}
      </motion.button>
    );
  }

  /* ── Outline / Ghost / Outline-dark: simple pill ── */
  const outlineClass = {
    outline:
      "border-2 border-pe-solar-500/60 text-pe-solar-400 hover:bg-pe-green-800/40 hover:border-pe-solar-400 backdrop-blur-sm",
    "outline-dark":
      "border-2 border-pe-slate-600/60 text-pe-slate-300 hover:bg-pe-slate-100/5 hover:border-pe-slate-400",
    ghost:
      "text-pe-solar-400 hover:bg-pe-green-800/40",
  }[variant as "outline" | "outline-dark" | "ghost"];

  const simplePillClass = cn(
    base,
    outlineClass,
    "px-6 py-3 gap-2 min-h-[44px]",
    size === "lg" && "px-8 py-4",
    size === "sm" && "px-4 py-2.5",
    className,
  );

  const simpleInner = (
    <>
      <span>{children}</span>
      {icon && <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springTransition} className="inline-flex">
        <Link href={href} className={simplePillClass} onClick={onClick}>{simpleInner}</Link>
      </motion.div>
    );
  }
  return (
    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springTransition}
      type={type} className={simplePillClass} onClick={onClick} disabled={disabled} aria-disabled={disabled || undefined}>
      {simpleInner}
    </motion.button>
  );
}
