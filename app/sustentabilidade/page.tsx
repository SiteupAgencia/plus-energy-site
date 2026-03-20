import type { Metadata } from "next";
import { Leaf, TreePine, Zap, Wind } from "lucide-react";
import { LeadCta } from "@/components/ui/LeadCta";
import { ENVIRONMENTAL_STATS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sustentabilidade — Impacto Ambiental da Plus Energy",
  description: "Cada kWh gerado pela Plus Energy evita CO₂ na atmosfera. Veja o impacto ambiental real da energia solar por assinatura no RS.",
};

const stats = [
  { icon: Leaf, value: `${ENVIRONMENTAL_STATS.co2Avoided}t`, label: "CO₂ evitado", desc: "Toneladas de CO₂ que não foram lançadas na atmosfera" },
  { icon: TreePine, value: String(Math.round(ENVIRONMENTAL_STATS.treesPlanted)), label: "Árvores equivalentes", desc: "Em absorção de carbono no mesmo período" },
  { icon: Zap, value: `${(ENVIRONMENTAL_STATS.cleanKwh / 1000).toFixed(1)} MWh`, label: "Energia limpa gerada", desc: "Direto das usinas solares para os assinantes" },
  { icon: Wind, value: "100%", label: "Renovável", desc: "Toda a energia fornecida vem de fontes solares" },
];

export default function SustentabilidadePage() {
  return (
    <main className="bg-white">
      <section className="bg-pe-green-950 pt-36 pb-24 px-4 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-green-400/10 border border-pe-green-400/30 text-xs font-semibold text-pe-green-400 uppercase tracking-widest mb-6">
          <Leaf className="w-3.5 h-3.5" />
          Sustentabilidade
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl mx-auto mb-6">
          Energia limpa que faz{" "}
          <span className="gold-gradient-text">diferença de verdade</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Cada kWh que você consome com a Plus Energy é gerado por energia solar 100% renovável.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label, desc }) => (
            <div key={label} className="text-center p-6 rounded-2xl border border-pe-slate-100 bg-pe-slate-50">
              <div className="w-12 h-12 rounded-2xl bg-pe-green-50 border border-pe-green-100 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-pe-green-600" />
              </div>
              <div className="font-heading text-3xl font-extrabold text-black mb-1">{value}</div>
              <div className="font-semibold text-pe-green-700 text-sm mb-2">{label}</div>
              <p className="text-pe-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-pe-green-950 py-24 px-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white mb-4">Faça parte da mudança</h2>
        <p className="text-white/50 text-lg max-w-lg mx-auto mb-10">
          Ao assinar a Plus Energy, você economiza e ainda contribui para um futuro mais limpo no RS.
        </p>
        <LeadCta label="Quero energia limpa com desconto" />
      </section>
    </main>
  );
}
