"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { MIN_QUALIFIED_BILL } from "@/lib/constants";

interface NotEligibleScreenProps {
  onClose: () => void;
}

export function NotEligibleScreen({ onClose }: NotEligibleScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", damping: 20 }}
      className="text-center py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", damping: 12 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pe-solar-50 mb-6"
      >
        <Info className="w-10 h-10 text-pe-solar-500" />
      </motion.div>

      <h3 className="text-2xl font-heading font-bold text-pe-slate-900 mb-2">
        Ainda não é o seu momento
      </h3>

      <p className="text-pe-slate-600 mb-6 max-w-sm mx-auto">
        Hoje a Plus Energy consegue gerar economia real a partir de contas de luz
        acima de <strong className="text-pe-slate-800">{formatCurrency(MIN_QUALIFIED_BILL)}/mês</strong>.
        Abaixo disso, o desconto não compensa o processo.
      </p>

      <div className="p-4 bg-pe-slate-50 rounded-xl border border-pe-slate-200 mb-6 text-left">
        <p className="text-sm text-pe-slate-600">
          Se sua conta variar bastante ao longo do ano, volte aqui num mês de consumo
          mais alto — ou acompanhe nosso Instagram, avisamos quando o mínimo mudar.
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-full py-3.5 px-6 bg-pe-slate-100 hover:bg-pe-slate-200 text-pe-slate-700 font-heading font-bold rounded-xl transition-all active:scale-[0.97]"
      >
        Entendi
      </button>
    </motion.div>
  );
}
