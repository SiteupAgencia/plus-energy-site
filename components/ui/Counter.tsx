"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  motion,
  animate,
} from "framer-motion";

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function Counter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    latest.toFixed(decimals)
  );

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, end, {
      duration: duration / 1000,
      ease: "easeOut" as const,
    });

    return () => controls.stop();
  }, [isInView, end, duration, motionValue]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (value) => {
      if (ref.current) {
        const formatted = Number(value).toLocaleString("pt-BR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [rounded, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
