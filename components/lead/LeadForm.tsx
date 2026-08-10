"use client";

import { useState, useCallback } from "react";
import { Phone, Loader2 } from "lucide-react";

interface LeadFormData {
  phone: string;
}

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => Promise<void>;
  isLoading: boolean;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function LeadForm({ onSubmit, isLoading }: LeadFormProps) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 10) {
        setError("Informe um WhatsApp válido");
        return;
      }
      setError("");
      await onSubmit({ phone });
    },
    [phone, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Phone / WhatsApp — único dado pedido: o resto (nome, contexto) rola na conversa */}
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-medium text-pe-slate-700 mb-1">
          Seu WhatsApp
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pe-slate-400" />
          <input
            id="lead-phone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={handlePhoneChange}
            autoFocus
            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
              error ? "border-red-400 bg-red-50" : "border-pe-slate-200 bg-white"
            } text-pe-slate-900 placeholder:text-pe-slate-400 focus:outline-none focus:ring-2 focus:ring-pe-green-500/30 focus:border-pe-green-500 transition`}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-6 bg-accent hover:bg-accent-hover text-accent-foreground font-heading font-bold text-lg rounded-xl transition-all duration-200 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-pe-solar-500/20"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        ) : (
          "QUERO TER DESCONTO"
        )}
      </button>

      <p className="text-[11px] text-pe-slate-400 text-center mt-2">
        Ao enviar, você concorda com nossa Política de Privacidade.
        Seus dados estão seguros.
      </p>
    </form>
  );
}
