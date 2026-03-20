import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Star } from "lucide-react";
import { LeadCta } from "@/components/ui/LeadCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { CASES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cases — Clientes que Economizam com a Plus Energy",
  description: "Veja depoimentos e cases reais de clientes que estão economizando até 25% na conta de luz com a Plus Energy no RS.",
};

export default function CasesPage() {
  return (
    <main className="bg-white">
      <JsonLd type="reviews" />
      <section className="bg-pe-green-950 pt-36 pb-24 px-4 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-400/10 border border-pe-solar-400/30 text-xs font-semibold text-pe-solar-400 uppercase tracking-widest mb-6">
          <Star className="w-3.5 h-3.5" />
          Cases reais
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl mx-auto mb-4">
          Clientes que já <span className="gold-gradient-text">estão economizando</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Resultados reais de quem escolheu a Plus Energy no Rio Grande do Sul.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <div key={c.name} className="rounded-2xl border border-pe-slate-100 bg-pe-slate-50 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Image src={c.image} alt={c.name} width={40} height={40} className="w-10 h-10 rounded-full border-2 border-pe-solar-300 shrink-0 object-cover" />
                <div>
                  <p className="font-semibold text-black text-sm">{c.name}</p>
                  <p className="text-pe-slate-400 text-xs">{c.location} · {c.type}</p>
                </div>
              </div>
              <blockquote className="text-pe-slate-600 text-sm leading-relaxed italic border-l-2 border-pe-solar-300 pl-3">
                &ldquo;{c.testimonial}&rdquo;
              </blockquote>
              <div className="bg-white rounded-xl border border-pe-slate-100 p-4 grid grid-cols-2 gap-3 mt-auto">
                <div>
                  <p className="text-[10px] text-pe-slate-400 uppercase tracking-wider">Antes</p>
                  <p className="font-heading font-bold text-pe-slate-600">R$ {c.previousBill.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-[10px] text-pe-slate-400 uppercase tracking-wider">Depois</p>
                  <p className="font-heading font-bold text-pe-green-600">R$ {c.currentBill.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-pe-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pe-green-600 shrink-0" />
                  <p className="text-xs text-pe-slate-600">
                    <strong className="text-pe-green-700">R$ {c.totalSavings.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong> economizados em {c.months} meses
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-pe-slate-50 py-24 px-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-black mb-4">Seja o próximo case</h2>
        <p className="text-pe-slate-500 mb-8">Simulação gratuita · Sem compromisso · 100% digital</p>
        <LeadCta label="Quero economizar também" />
      </section>
    </main>
  );
}
