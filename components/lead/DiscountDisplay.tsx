"use client";

import { formatCurrency } from "@/lib/utils";
import { calculateSavings, DISCOUNT_RATE } from "@/lib/constants";
import { TrendingDown, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

interface DiscountDisplayProps {
  billValue: number;
}

export function DiscountDisplay({ billValue }: DiscountDisplayProps) {
  const savings = calculateSavings(billValue);
  const newBill = billValue - savings.monthly;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-pe-green-100 text-pe-green-800 rounded-full text-sm font-semibold">
        <TrendingDown className="w-4 h-4" />
        Desconto de {Math.round(DISCOUNT_RATE * 100)}%
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 mt-4">
        {/* Before */}
        <div className="text-center min-w-0">
          <p className="text-[10px] sm:text-xs text-pe-slate-400 uppercase tracking-wide mb-1">Conta atual</p>
          <p className="text-base sm:text-xl font-heading font-bold text-pe-slate-400 line-through truncate">
            {formatCurrency(billValue)}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pe-green-500 text-white shrink-0">
          <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        {/* After */}
        <div className="text-center min-w-0">
          <p className="text-[10px] sm:text-xs text-pe-green-600 uppercase tracking-wide mb-1 font-semibold">
            Com Plus Energy
          </p>
          <p className="text-lg sm:text-2xl font-heading font-extrabold text-pe-green-700 truncate">
            {formatCurrency(newBill)}
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-pe-solar-50 rounded-xl border border-pe-solar-200">
        <p className="text-sm text-pe-slate-600">
          Economia de{" "}
          <span className="font-bold text-pe-green-700">
            {formatCurrency(savings.monthly)}/mês
          </span>{" "}
          — são{" "}
          <span className="font-bold text-pe-green-700">
            {formatCurrency(savings.yearly)}/ano
          </span>{" "}
          no seu bolso!
        </p>
      </div>
    </motion.div>
  );
}
