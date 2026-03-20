import type { Metadata } from "next";
import { Zap, MapPin, Shield, Users, Sun, Target, Building2 } from "lucide-react";
import { LeadCta } from "@/components/ui/LeadCta";

export const metadata: Metadata = {
  title: "Sobre a Plus Energy",
  description:
    "Conheça a Plus Energy. Empresa de energia solar por assinatura que opera usinas no Sul do Brasil, atendendo clientes da RGE no Rio Grande do Sul.",
};

export default function SobrePage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-pe-green-950 pt-36 pb-24 px-4 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-400/10 border border-pe-solar-400/30 text-xs font-semibold text-pe-solar-400 uppercase tracking-widest mb-6">
          <Zap className="w-3.5 h-3.5" />
          Sobre nós
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl mx-auto mb-4">
          Energia que <span className="gold-gradient-text">transforma</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Somos uma empresa gaúcha que democratiza o acesso à energia solar
          limpa e acessível para famílias e empresas no Rio Grande do Sul.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-50 border border-pe-solar-200 text-xs font-semibold text-pe-solar-600 uppercase tracking-widest mb-6">
              <Target className="w-3.5 h-3.5" />
              Nossa missão
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-black mb-5">
              Economia real, <span className="text-pe-solar-400">sem complicação</span>
            </h2>
            <p className="text-pe-slate-500 text-lg leading-relaxed mb-6">
              Levar economia real e energia limpa para todos os gaúchos, sem que
              precisem investir um centavo em instalação de painéis solares.
            </p>
            <p className="text-pe-slate-500 leading-relaxed">
              Através da Geração Distribuída regulamentada pela Lei 14.300/2022,
              operamos usinas solares próprias no Sul do Brasil e distribuímos os
              créditos de energia para nossos clientes via rede da RGE.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: MapPin, label: "Marcelino Ramos, RS", desc: "Sede da empresa" },
              { icon: Sun, label: "Usinas solares", desc: "Energia 100% limpa" },
              { icon: Shield, label: "Lei 14.300/2022", desc: "Regulamentado ANEEL" },
              { icon: Users, label: "CPF e CNPJ", desc: "Atendemos todos" },
            ].map((item) => (
              <div key={item.label} className="p-5 rounded-2xl bg-pe-slate-50 border border-pe-slate-100">
                <div className="w-10 h-10 rounded-xl bg-pe-solar-50 border border-pe-solar-200 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-pe-solar-600" />
                </div>
                <p className="font-heading font-bold text-black text-sm">{item.label}</p>
                <p className="text-xs text-pe-slate-400 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-pe-slate-50 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-50 border border-pe-solar-200 text-xs font-semibold text-pe-solar-600 uppercase tracking-widest mb-6">
              Nossos valores
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-black">
              O que nos <span className="text-pe-solar-400">move</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Transparência",
                desc: "Demonstrativo mensal detalhado mostrando cada centavo economizado. Sem letras miúdas.",
              },
              {
                icon: Users,
                title: "Acessibilidade",
                desc: "Energia solar para todos, sem investimento inicial, sem obras, sem complicação.",
              },
              {
                icon: Sun,
                title: "Sustentabilidade",
                desc: "Cada kWh consumido com a Plus Energy é energia limpa que reduz emissões de CO₂.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-white border border-pe-slate-100 shadow-[0_2px_12px_rgb(0_0_0/0.05)]">
                <div className="w-12 h-12 rounded-xl bg-pe-solar-50 border border-pe-solar-200 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-pe-solar-600" />
                </div>
                <h3 className="font-heading font-bold text-black mb-2">{item.title}</h3>
                <p className="text-sm text-pe-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal info */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-50 border border-pe-solar-200 text-xs font-semibold text-pe-solar-600 uppercase tracking-widest mb-6">
              <Building2 className="w-3.5 h-3.5" />
              Dados da empresa
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-black">
              Empresa <span className="text-pe-solar-400">registrada</span>
            </h2>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl bg-pe-slate-50 border border-pe-slate-100 space-y-4 text-sm text-pe-slate-500">
            <p><strong className="text-black font-semibold">Razão social:</strong> Plus Energy</p>
            <p><strong className="text-black font-semibold">CNPJ:</strong> 51.181.561/0001-75</p>
            <p><strong className="text-black font-semibold">Responsável legal:</strong> Daiana Costenaro Stolarski da Rosa</p>
            <p><strong className="text-black font-semibold">Foro legal:</strong> Marcelino Ramos — RS</p>
            <p><strong className="text-black font-semibold">Área de atuação:</strong> Rio Grande do Sul — rede distribuidora RGE (CPFL)</p>
            <p><strong className="text-black font-semibold">Regulamentação:</strong> Lei 14.300 de 2022 (ANEEL)</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pe-green-950 py-24 px-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white mb-4">Faça parte dessa transformação</h2>
        <p className="text-white/50 mb-8">Simulação gratuita · Sem compromisso · 100% digital</p>
        <LeadCta label="Quero economizar agora" />
      </section>
    </main>
  );
}
