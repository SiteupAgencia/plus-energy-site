"use client";

import { motion } from "framer-motion";
import { CheckCircle, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { calculateSavings } from "@/lib/constants";
import { useWhatsAppLink } from "@/lib/useWhatsAppLink";
import { trackWhatsAppClick } from "@/lib/gtm";

interface SuccessScreenProps {
  billValue: number;
  name: string;
  onClose: () => void;
}

export function SuccessScreen({ billValue, name, onClose }: SuccessScreenProps) {
  const savings = calculateSavings(billValue);
  const firstName = name.split(" ")[0];

  // O lead é quem abre a conversa: janela de 24h sem custo de template,
  // e a mensagem já chega com nome, faixa da conta e origem pro CRM.
  const whatsappUrl = useWhatsAppLink({ origin: "form_to_wa", name, billValue });

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
        Falta só um passo: toque no botão abaixo e envie a mensagem no WhatsApp.
        Nossa consultora <span className="font-semibold text-pe-green-700">Gabriela</span> já
        responde com a sua simulação.
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

      {/* Handoff para o WhatsApp oficial — CTA principal da tela */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("success_screen")}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 font-heading text-base font-bold text-white shadow-[0_6px_24px_rgba(37,211,102,0.4)] transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        <MessageCircle className="h-5 w-5 shrink-0" />
        Receber minha simulação no WhatsApp
      </motion.a>

      <p className="mt-3 text-xs text-pe-slate-400">
        A mensagem já vai escrita — é só tocar em enviar.
      </p>

      <button
        onClick={onClose}
        className="mt-5 text-sm text-pe-slate-400 hover:text-pe-slate-600 transition underline underline-offset-2"
      >
        Fechar
      </button>
    </motion.div>
  );
}
