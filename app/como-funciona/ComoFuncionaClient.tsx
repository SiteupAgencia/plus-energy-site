"use client";

import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import {
  Calculator,
  FileSignature,
  ArrowLeftRight,
  BadgePercent,
  Receipt,
  Zap,
  Sun,
  Building2,
  Home,
  Plug,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  FileSignature,
  ArrowLeftRight,
  BadgePercent,
  Receipt,
};

export function ComoFuncionaClient() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-pe-green-950 pt-36 pb-24 px-4 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-400/10 border border-pe-solar-400/30 text-xs font-semibold text-pe-solar-400 uppercase tracking-widest mb-6">
          <Zap className="w-3.5 h-3.5" />
          Simples e 100% digital
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl mx-auto mb-4">
          Como funciona a energia solar{" "}
          <span className="gold-gradient-text">por assinatura</span>
        </h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          Em 5 passos simples você começa a economizar até 25% na conta de luz
          sem instalar nada no seu imóvel.
        </p>
      </section>

      {/* 5 Steps detailed */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-16">
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const Icon = iconMap[step.icon] || Calculator;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    !isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Icon side */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pe-green-500 to-pe-green-700 flex items-center justify-center shadow-lg shadow-pe-green-500/20">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-pe-solar-400 flex items-center justify-center font-heading font-bold text-pe-slate-900 text-lg shadow-md">
                        {step.step}
                      </div>
                    </div>
                  </div>

                  {/* Text side */}
                  <div className={`text-center md:text-left ${!isEven ? "md:text-right" : ""}`}>
                    <h3 className="text-2xl font-heading font-bold text-pe-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-pe-slate-600 text-lg leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How the energy arrives */}
      <section className="py-16 md:py-24 bg-pe-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-pe-slate-900 mb-4">
              Como a energia chega até você
            </h2>
            <p className="text-lg text-pe-slate-600 max-w-2xl mx-auto">
              A Plus Energy opera usinas solares próprias no Sul do Brasil.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Sun,
                title: "Usinas solares",
                desc: "Nossas usinas geram energia limpa no Sul do Brasil",
              },
              {
                icon: Plug,
                title: "Injeção na rede",
                desc: "A energia é injetada diretamente na rede da RGE",
              },
              {
                icon: Building2,
                title: "Créditos na conta",
                desc: "Você recebe os créditos dessa energia na sua conta",
              },
              {
                icon: Home,
                title: "Mesmos fios",
                desc: "A energia chega pelos mesmos fios de sempre — sem instalar nada",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white border border-pe-slate-200 shadow-sm"
              >
                <div className="w-14 h-14 rounded-xl bg-pe-green-100 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-pe-green-600" />
                </div>
                <h3 className="font-heading font-bold text-pe-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-pe-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulation */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-pe-green-50 to-pe-solar-50 border border-pe-green-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pe-green-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-pe-slate-900 mb-2">
                  Regulamentado por lei federal
                </h3>
                <p className="text-pe-slate-600 leading-relaxed">
                  A energia solar por assinatura é regulamentada pela{" "}
                  <strong>Lei 14.300 de 2022</strong> (Marco Legal da Geração Distribuída — ANEEL).
                  A modalidade é chamada de GD Remota / Autoconsumo Remoto, operada através da
                  distribuidora <strong>RGE (Grupo CPFL)</strong> no Rio Grande do Sul.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-pe-green-950 section-dark-pattern relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Pronto para economizar?
          </h2>
          <p className="text-pe-green-200 text-lg mb-8">
            Faça uma simulação gratuita e descubra quanto você pode economizar.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-popup"))}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-accent-foreground font-heading font-bold text-lg rounded-full transition-all active:scale-[0.97] shadow-lg"
          >
            <Zap className="w-5 h-5" />
            QUERO TER DESCONTO
          </button>
        </div>
      </section>
    </main>
  );
}
