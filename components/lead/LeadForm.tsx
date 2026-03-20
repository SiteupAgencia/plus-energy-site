"use client";

import { useState, useCallback } from "react";
import { User, Phone, Mail, Loader2 } from "lucide-react";

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
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
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});

  const validate = useCallback((): boolean => {
    const newErrors: Partial<LeadFormData> = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = "Informe seu nome completo";
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      newErrors.phone = "Informe um telefone válido";
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Informe um e-mail válido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      await onSubmit(formData);
    },
    [formData, validate, onSubmit]
  );

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, phone: formatPhone(e.target.value) }));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="lead-name" className="block text-sm font-medium text-pe-slate-700 mb-1">
          Nome completo
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pe-slate-400" />
          <input
            id="lead-name"
            type="text"
            placeholder="Seu nome"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
              errors.name ? "border-red-400 bg-red-50" : "border-pe-slate-200 bg-white"
            } text-pe-slate-900 placeholder:text-pe-slate-400 focus:outline-none focus:ring-2 focus:ring-pe-green-500/30 focus:border-pe-green-500 transition`}
          />
        </div>
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-medium text-pe-slate-700 mb-1">
          Telefone (WhatsApp)
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pe-slate-400" />
          <input
            id="lead-phone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={formData.phone}
            onChange={handlePhoneChange}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
              errors.phone ? "border-red-400 bg-red-50" : "border-pe-slate-200 bg-white"
            } text-pe-slate-900 placeholder:text-pe-slate-400 focus:outline-none focus:ring-2 focus:ring-pe-green-500/30 focus:border-pe-green-500 transition`}
          />
        </div>
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="lead-email" className="block text-sm font-medium text-pe-slate-700 mb-1">
          E-mail
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pe-slate-400" />
          <input
            id="lead-email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
              errors.email ? "border-red-400 bg-red-50" : "border-pe-slate-200 bg-white"
            } text-pe-slate-900 placeholder:text-pe-slate-400 focus:outline-none focus:ring-2 focus:ring-pe-green-500/30 focus:border-pe-green-500 transition`}
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
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
