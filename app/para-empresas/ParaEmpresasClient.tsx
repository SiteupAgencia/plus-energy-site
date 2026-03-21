"use client";

import { motion } from "framer-motion";
import {
  Building2,
  TrendingDown,
  Zap,
  Shield,
  ShoppingCart,
  UtensilsCrossed,
  Factory,
  Hotel,
  Briefcase,
  Tractor,
  Send,
  FileText,
  PiggyBank,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { LeadCta } from "@/components/ui/LeadCta";

/* ── data ── */

const stats = [
  { value: "+200", label: "empresas atendidas" },
  { value: "R$ 2M+", label: "economizados no RS" },
  { value: "25%", label: "de desconto médio" },
];

const segments = [
  { icon: ShoppingCart, label: "Mercados" },
  { icon: UtensilsCrossed, label: "Restaurantes e Padarias" },
  { icon: Factory, label: "Indústrias" },
  { icon: Hotel, label: "Hotéis e Pousadas" },
  { icon: Briefcase, label: "Escritórios" },
  { icon: Tractor, label: "Agronegócio" },
];

const steps = [
  {
    num: 1,
    icon: Send,
    title: "Envie sua conta",
    desc: "Mande uma foto da conta de luz CNPJ pelo WhatsApp ou formulário. Analisamos em até 24h.",
  },
  {
    num: 2,
    icon: FileText,
    title: "Assine digital",
    desc: "Contrato 100% digital, sem burocracia, sem fidelidade. Assinatura em menos de 5 minutos.",
  },
  {
    num: 3,
    icon: PiggyBank,
    title: "Economize todo mês",
    desc: "O desconto aparece automaticamente na próxima fatura. Sem instalar nada na sua empresa.",
  },
];

const benefits = [
  { icon: TrendingDown, title: "Até 25% de desconto", desc: "Economia direta na conta CNPJ todo mês, sem custo de instalação." },
  { icon: Zap, title: "Sem interrupção", desc: "A energia continua vindo da rede RGE normalmente. Nada muda na operação." },
  { icon: Shield, title: "Regulamentado pela ANEEL", desc: "Operamos sob a Lei 14.300/2022. Contrato digital, sem burocracia." },
  { icon: Building2, title: "Ideal para qualquer porte", desc: "Atendemos de pequenos comércios a grandes indústrias com conta RGE." },
];

const cases = [
  {
    name: "Mercado RK",
    segment: "Supermercado",
    location: "Marcelino Ramos/RS",
    before: "R$ 3.785",
    after: "R$ 2.999",
    saving: "R$ 5.677",
    period: "8 meses",
    quote: "Economizamos mais de R$5.000 em 8 meses sem mudar nada na operação.",
  },
  {
    name: "Padaria Sabor & Cia",
    segment: "Alimentação",
    location: "Erechim/RS",
    before: "R$ 2.400",
    after: "R$ 1.800",
    saving: "R$ 4.200",
    period: "7 meses",
    quote: "Achei que ia ser complicado por ser CNPJ, mas foi tudo digital e rápido.",
  },
  {
    name: "Hotel Thermas",
    segment: "Hotelaria",
    location: "Marcelino Ramos/RS",
    before: "R$ 8.200",
    after: "R$ 6.150",
    saving: "R$ 12.300",
    period: "6 meses",
    quote: "Com o volume que consumimos, o desconto fez uma diferença enorme no caixa.",
  },
];

const faqItems = [
  {
    question: "Preciso instalar algo na minha empresa?",
    answer: "Não. A energia continua vindo da rede RGE normalmente. Não há instalação de placas, equipamentos ou qualquer mudança na estrutura do seu imóvel. Tudo funciona via créditos de energia gerados nas nossas usinas solares.",
  },
  {
    question: "Muda algo no meu contrato com a RGE?",
    answer: "Não. Seu contrato com a distribuidora RGE permanece exatamente o mesmo. A Plus Energy atua como geradora de créditos de energia que são aplicados automaticamente na sua fatura.",
  },
  {
    question: "E se eu mudar de endereço?",
    answer: "Sem problema. Basta nos informar o novo endereço e transferimos os créditos para a nova unidade consumidora, desde que continue na área de cobertura da RGE no RS.",
  },
  {
    question: "Tem fidelidade ou multa de cancelamento?",
    answer: "Não. Nosso contrato não tem fidelidade. Você pode cancelar a qualquer momento, sem multa, bastando comunicar com 30 dias de antecedência.",
  },
  {
    question: "Como funciona a cobrança?",
    answer: "Você recebe uma Conta Única digital todo mês via WhatsApp e e-mail. Nela já está o valor com desconto. A conta da RGE é paga automaticamente pela Plus Energy.",
  },
];

/* ── animations ── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── component ── */

export function ParaEmpresasClient() {
  return (
    <main className="bg-white overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative bg-pe-green-950 pt-36 pb-24 px-4 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/solar-farm-bg.jpg')" }}
        />
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-pe-green-950/80" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-400/10 border border-pe-solar-400/30 text-xs font-semibold text-pe-solar-400 uppercase tracking-widest mb-6"
          >
            <Building2 className="w-3.5 h-3.5" />
            Para empresas e comércios
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl mx-auto mb-6"
          >
            Reduza o custo de energia{" "}
            <span className="gold-gradient-text">da sua empresa</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto mb-12"
          >
            Sem instalar nada, sem obra, sem fidelidade. Apenas desconto todo mês na conta CNPJ.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <LeadCta label="Solicitar simulação gratuita" />
          </motion.div>

          {/* stat cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl py-5 px-3"
              >
                <div className="font-heading text-2xl sm:text-3xl font-extrabold gold-gradient-text">
                  {s.value}
                </div>
                <div className="text-white/40 text-xs sm:text-sm mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ VAMOS NEGOCIAR ═══ */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center rounded-3xl border-2 border-pe-solar-400/30 bg-gradient-to-b from-pe-solar-50 to-white p-10 sm:p-14 relative overflow-hidden"
        >
          {/* subtle decorative glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-pe-solar-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-black leading-tight mb-4">
              Sua conta tem mais de{" "}
              <span className="gold-gradient-text">R$ 2 mil</span>{" "}
              de fatura por mês?
            </h2>
            <p className="text-pe-slate-500 text-lg max-w-lg mx-auto mb-8">
              Temos condições especiais para grandes consumidores. Fale direto com nosso time comercial.
            </p>
            <a
              href="https://wa.me/5554999999999?text=Ol%C3%A1%2C%20minha%20empresa%20tem%20conta%20acima%20de%20R%242.000%20e%20gostaria%20de%20negociar."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-pe-green-950 pl-8 pr-2.5 py-3 text-lg font-heading font-bold text-white hover:bg-pe-green-900 hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pe-green-600 focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-5 h-5" />
              Vamos negociar
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ═══ SEGMENTOS ═══ */}
      <section className="bg-pe-slate-50 py-24 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-extrabold text-black text-center mb-12"
          >
            Atendemos todos os segmentos
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
          >
            {segments.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center gap-2.5 sm:gap-3 bg-white rounded-2xl border border-pe-slate-100 p-4 sm:p-5 hover:border-pe-solar-300 hover:shadow-sm transition-all min-w-0"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-pe-green-50 border border-pe-green-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-pe-green-600" />
                </div>
                <span className="font-heading font-semibold text-black text-xs sm:text-sm leading-tight">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ COMO FUNCIONA ═══ */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-extrabold text-black text-center mb-4"
          >
            Como funciona para empresas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-pe-slate-500 text-center mb-14 max-w-lg mx-auto"
          >
            Processo 100% digital. Sua empresa começa a economizar em 30-60 dias.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {steps.map(({ num, icon: Icon, title, desc }) => (
              <motion.div
                key={num}
                variants={fadeUp}
                className="relative bg-pe-slate-50 rounded-2xl border border-pe-slate-100 p-6 text-center"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full gold-gradient flex items-center justify-center font-heading font-bold text-pe-slate-950 text-sm shadow-sm">
                  {num}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-pe-green-50 border border-pe-green-100 flex items-center justify-center mx-auto mt-4 mb-4">
                  <Icon className="w-6 h-6 text-pe-green-600" />
                </div>
                <h3 className="font-heading font-bold text-black mb-2">{title}</h3>
                <p className="text-pe-slate-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ BENEFÍCIOS ═══ */}
      <section className="bg-pe-slate-50 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-extrabold text-black text-center mb-12"
          >
            Por que escolher a Plus Energy?
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {benefits.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="flex gap-4 p-6 rounded-2xl border border-pe-slate-100 bg-white"
              >
                <div className="w-11 h-11 rounded-xl bg-pe-green-50 border border-pe-green-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-pe-green-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-black mb-1">{title}</h3>
                  <p className="text-pe-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CASES ═══ */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-extrabold text-black text-center mb-4"
          >
            Empresas que já <span className="gold-gradient-text">economizam</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-pe-slate-500 text-center mb-14"
          >
            Resultados reais de CNPJs no Rio Grande do Sul.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {cases.map((c) => (
              <motion.div
                key={c.name}
                variants={fadeUp}
                className="rounded-2xl border border-pe-slate-100 bg-pe-slate-50 p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pe-solar-100 border-2 border-pe-solar-300 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-pe-solar-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-black text-sm">{c.name}</p>
                    <p className="text-pe-slate-400 text-xs">{c.segment} · {c.location}</p>
                  </div>
                </div>

                <blockquote className="text-pe-slate-600 text-sm leading-relaxed italic border-l-2 border-pe-solar-300 pl-3">
                  &ldquo;{c.quote}&rdquo;
                </blockquote>

                <div className="bg-white rounded-xl border border-pe-slate-100 p-4 grid grid-cols-2 gap-3 mt-auto">
                  <div>
                    <p className="text-[10px] text-pe-slate-400 uppercase tracking-wider">Antes</p>
                    <p className="font-heading font-bold text-pe-slate-600">{c.before}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-pe-slate-400 uppercase tracking-wider">Depois</p>
                    <p className="font-heading font-bold text-pe-green-600">{c.after}</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-pe-slate-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pe-green-600 shrink-0" />
                    <p className="text-xs text-pe-slate-600">
                      <strong className="text-pe-green-700">{c.saving}</strong> economizados em {c.period}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ EMPRESARIAL ═══ */}
      <section className="bg-pe-slate-50 py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-extrabold text-black text-center mb-4"
          >
            Dúvidas frequentes de gestores
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-pe-slate-500 text-center mb-10"
          >
            As respostas que todo gestor precisa antes de fechar.
          </motion.p>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="bg-pe-slate-50 py-24 px-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-black mb-4">
          Pronto para reduzir custos?
        </h2>
        <p className="text-pe-slate-500 mb-8">Simulação gratuita · Sem compromisso · 100% digital</p>
        <LeadCta label="Quero desconto na conta CNPJ" />
      </section>
    </main>
  );
}
