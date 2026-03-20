"use client";

import { FAQ_DATA } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";
import { HelpCircle, Zap } from "lucide-react";

export function FaqClient() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-pe-green-50 to-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pe-green-100 text-pe-green-800 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Tire suas dúvidas
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-pe-slate-900 mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-pe-slate-600 max-w-xl mx-auto">
            Tudo que você precisa saber sobre energia solar por assinatura com a Plus Energy.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <Accordion items={FAQ_DATA.map((item) => ({ question: item.question, answer: item.answer }))} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-pe-green-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Zap className="w-10 h-10 text-pe-solar-500 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-pe-slate-900 mb-3">
            Não encontrou sua dúvida?
          </h2>
          <p className="text-pe-slate-600 mb-6">
            Fale com nossa equipe pelo WhatsApp ou simule sua economia agora mesmo.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-popup"))}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-primary-foreground font-heading font-bold text-lg rounded-full transition-all active:scale-[0.97]"
          >
            <Zap className="w-5 h-5" />
            Simule sua Economia
          </button>
        </div>
      </section>
    </div>
  );
}
