"use client";

import { FAQ_DATA } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";
import { HelpCircle, Zap } from "lucide-react";
import { LeadCta } from "@/components/ui/LeadCta";

export function FaqClient() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-pe-green-950 pt-36 pb-24 px-4 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-400/10 border border-pe-solar-400/30 text-xs font-semibold text-pe-solar-400 uppercase tracking-widest mb-6">
          <HelpCircle className="w-3.5 h-3.5" />
          Tire suas dúvidas
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl mx-auto mb-4">
          Perguntas <span className="gold-gradient-text">Frequentes</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Tudo que você precisa saber sobre energia solar por assinatura com a Plus Energy.
        </p>
      </section>

      {/* FAQ List */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <Accordion items={FAQ_DATA.map((item) => ({ question: item.question, answer: item.answer }))} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pe-slate-50 py-24 px-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-black mb-4">Não encontrou sua dúvida?</h2>
        <p className="text-pe-slate-500 mb-8">Fale com nossa equipe ou simule sua economia agora mesmo</p>
        <LeadCta label="Simule sua Economia" />
      </section>
    </main>
  );
}
