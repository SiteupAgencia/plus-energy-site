"use client";

import { motion } from "framer-motion";
import { CheckCircle, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { calculateSavings } from "@/lib/constants";

interface SuccessScreenProps {
  billValue: number;
  name: string;
  onClose: () => void;
}

export function SuccessScreen({ billValue, name, onClose }: SuccessScreenProps) {
  const savings = calculateSavings(billValue);
  const firstName = name.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", damping: 20 }}
      className="text-center py-6"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", damping: 12 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pe-green-100 mb-6"
      >
        <CheckCircle className="w-10 h-10 text-pe-green-600" />
      </motion.div>

      <h3 className="text-2xl font-heading font-bold text-pe-slate-900 mb-2">
        Pronto, {firstName}!
      </h3>

      <p className="text-pe-slate-600 mb-6 max-w-sm mx-auto">
        Em breve nossa consultora <span className="font-semibold text-pe-green-700">Gabriela</span>{" "}
        entrará em contato pelo WhatsApp para finalizar sua simulação.
      </p>

      {/* Savings reminder */}
      <div className="p-4 bg-gradient-to-br from-pe-green-50 to-pe-solar-50 rounded-xl border border-pe-green-200 mb-6">
        <p className="text-sm text-pe-slate-500 mb-1">Sua economia estimada</p>
        <p className="text-3xl font-heading font-extrabold text-pe-green-700">
          {formatCurrency(savings.monthly)}
          <span className="text-sm font-normal text-pe-slate-500">/mês</span>
        </p>
        <p className="text-xs text-pe-slate-400 mt-1">
          São {formatCurrency(savings.yearly)} por ano no seu bolso!
        </p>
      </div>

      {/* WhatsApp hint */}
      <div className="flex items-center justify-center gap-2 text-sm text-pe-slate-500">
        <MessageCircle className="w-4 h-4 text-pe-green-500" />
        <span>Fique de olho no WhatsApp!</span>
      </div>

      <button
        onClick={onClose}
        className="mt-6 text-sm text-pe-slate-400 hover:text-pe-slate-600 transition underline underline-offset-2"
      >
        Fechar
      </button>
    </motion.div>
  );
}
