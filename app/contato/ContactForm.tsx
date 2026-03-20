"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/constants";
import { trackContactSubmit, trackContactSuccess } from "@/lib/gtm";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    trackContactSubmit();

    try {
      await fetch(COMPANY.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          source: "website-contato",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      console.error("Failed to send contact form data");
    }

    setIsLoading(false);
    setSent(true);
    trackContactSuccess();
  }

  if (sent) {
    return (
      <div className="bg-pe-green-50 rounded-2xl border border-pe-green-200 p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-pe-green-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-pe-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-pe-green-900 mb-2">Mensagem enviada!</h3>
        <p className="text-pe-green-700 text-sm">Nossa equipe entrará em contato em breve.</p>
      </div>
    );
  }

  return (
    <div className="bg-pe-slate-50 rounded-2xl border border-pe-slate-100 p-8">
      <h2 className="font-heading text-xl font-bold text-black mb-6">Envie uma mensagem</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-pe-slate-700 mb-1.5">Nome completo</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl border border-pe-slate-200 bg-white text-black placeholder:text-pe-slate-400 focus:outline-none focus:ring-2 focus:ring-pe-solar-400 text-sm"
            placeholder="Seu nome"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-pe-slate-700 mb-1.5">WhatsApp</label>
          <input
            type="tel"
            name="phone"
            required
            className="w-full px-4 py-3 rounded-xl border border-pe-slate-200 bg-white text-black placeholder:text-pe-slate-400 focus:outline-none focus:ring-2 focus:ring-pe-solar-400 text-sm"
            placeholder="(54) 9 9999-9999"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-pe-slate-700 mb-1.5">Mensagem</label>
          <textarea
            name="message"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-pe-slate-200 bg-white text-black placeholder:text-pe-slate-400 focus:outline-none focus:ring-2 focus:ring-pe-solar-400 text-sm resize-none"
            placeholder="Como podemos te ajudar?"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-full gold-gradient font-heading font-bold text-pe-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] hover:brightness-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pe-solar-400 disabled:opacity-60"
        >
          {isLoading ? "Enviando..." : "Enviar mensagem"}
        </button>
      </form>
    </div>
  );
}
