// ========================================
// Plus Energy — Constants & Data
// ========================================

export const COMPANY = {
  name: "Plus Energy",
  tagline: "Energia solar por assinatura",
  cnpj: "51.181.561/0001-75",
  responsible: "Daiana Costenaro Stolarski da Rosa",
  legalForum: "Marcelino Ramos — RS",
  coverage: "Rio Grande do Sul — rede distribuidora RGE (CPFL)",
  regulation: "Lei 14.300 de 2022 (ANEEL)",
  whatsapp: "5554997150494",
  whatsappMessage: "Olá! Vi o site da Plus Energy e quero saber mais sobre o desconto na conta de luz.",
  email: "financeiro@plusenergy.net.br",
  webhookUrl: "https://hook.siteup.com.br/webhook/1b025975-7069-402a-adb9-341e9de3e7d5",
} as const;

export const DISCOUNT_RATE = 0.25; // 25%
export const MIN_BILL = 350;
export const MAX_BILL = 5000;
export const DEFAULT_BILL = 500;

// CO2 per kWh in Brazil (average)
export const CO2_PER_KWH = 0.075; // kg
export const TREES_PER_TON_CO2 = 6.3;
export const AVG_PRICE_PER_KWH = 0.85; // R$ approximate

export function calculateSavings(billValue: number) {
  const discount = billValue * DISCOUNT_RATE;
  const monthly = discount;
  const yearly = monthly * 12;
  const twoYears = monthly * 24;

  // Approximate kWh from bill value
  const kwhMonthly = billValue / AVG_PRICE_PER_KWH;
  const co2MonthlyKg = kwhMonthly * CO2_PER_KWH;
  const co2YearlyTons = (co2MonthlyKg * 12) / 1000;
  const treesEquiv = Math.round(co2YearlyTons * TREES_PER_TON_CO2);

  return {
    monthly: Math.round(monthly * 100) / 100,
    yearly: Math.round(yearly * 100) / 100,
    twoYears: Math.round(twoYears * 100) / 100,
    co2YearlyTons: Math.round(co2YearlyTons * 100) / 100,
    treesEquiv,
    kwhMonthly: Math.round(kwhMonthly),
  };
}

export const NAV_LINKS = [
  { label: "Como Funciona", href: "/como-funciona" },
  { label: "Sobre", href: "/sobre" },
  { label: "Para Empresas", href: "/para-empresas" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contato", href: "/contato" },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Simulação gratuita",
    description: "Envie sua conta de luz e receba uma simulação mostrando o valor exato da sua economia.",
    icon: "Calculator",
  },
  {
    step: 2,
    title: "Assinatura digital",
    description: "Assine o contrato digital sem sair de casa, sem burocracia.",
    icon: "FileSignature",
  },
  {
    step: 3,
    title: "Troca de titularidade",
    description: "A conta passa para o nome da Plus Energy para que os créditos de energia solar sejam direcionados.",
    icon: "ArrowLeftRight",
  },
  {
    step: 4,
    title: "Desconto na conta",
    description: "Em 30 a 60 dias os créditos aparecem e o desconto chega todo mês automaticamente.",
    icon: "BadgePercent",
  },
  {
    step: 5,
    title: "Pagamento simplificado",
    description: "Você paga um único boleto da Plus Energy, já com o desconto aplicado.",
    icon: "Receipt",
  },
] as const;

export const CASE_MAICON = {
  name: "Maicon",
  company: "Mercado e Açougue RK LTDA",
  location: "Marcelino Ramos — RS",
  previousBill: 3785.54,
  currentBill: 2998.90,
  monthlySavings: 786.64,
  totalSavings: 5677.91,
  months: 8,
  discountRate: 25,
  testimonial:
    "Muito contente com nossa parceria que já conseguimos economizar R$5.677,91 em 8 meses!! Grato pela confiança",
  type: "CNPJ — Trifásico",
} as const;

export const CASES = [
  {
    name: "Maicon R.",
    company: "Mercado e Açougue RK LTDA",
    location: "Marcelino Ramos — RS",
    previousBill: 3785.54,
    currentBill: 2998.90,
    monthlySavings: 786.64,
    totalSavings: 5677.91,
    months: 8,
    discountRate: 25,
    testimonial: "Muito contente com nossa parceria que já conseguimos economizar R$5.677,91 em 8 meses!! Grato pela confiança.",
    type: "Comércio — CNPJ",
    initials: "MR",
    image: "/images/cases/maicon.png",
    reviewDate: "2025-06-15",
  },
  {
    name: "Ana Cláudia S.",
    company: "Residência",
    location: "Passo Fundo — RS",
    previousBill: 487.00,
    currentBill: 365.25,
    monthlySavings: 121.75,
    totalSavings: 730.50,
    months: 6,
    discountRate: 25,
    testimonial: "Simples, rápido e sem dor de cabeça. Assinei pelo celular e já no segundo mês o desconto apareceu na conta. Recomendo pra todo mundo!",
    type: "Residencial — CPF",
    initials: "AS",
    image: "/images/cases/ana-claudia.png",
    reviewDate: "2025-09-20",
  },
  {
    name: "Pedro H. L.",
    company: "Farmácia Popular",
    location: "Erechim — RS",
    previousBill: 1240.00,
    currentBill: 930.00,
    monthlySavings: 310.00,
    totalSavings: 2790.00,
    months: 9,
    discountRate: 25,
    testimonial: "A gente sempre desconfiava dessas ofertas, mas é tudo regulamentado pela ANEEL. Já economizamos quase R$3 mil desde que entramos!",
    type: "Comércio — CNPJ",
    initials: "PL",
    image: "/images/cases/pedro.png",
    reviewDate: "2025-10-05",
  },
  {
    name: "Família Oliveira",
    company: "Residência",
    location: "Ijuí — RS",
    previousBill: 392.00,
    currentBill: 294.00,
    monthlySavings: 98.00,
    totalSavings: 588.00,
    months: 6,
    discountRate: 25,
    testimonial: "Nem acreditei quando vi o boleto mais barato! Sem instalar nada, sem nenhum custo. Pena que não conheci antes.",
    type: "Residencial — CPF",
    initials: "FO",
    image: "/images/cases/familia-oliveira.png",
    reviewDate: "2025-11-10",
  },
  {
    name: "Rodrigo M.",
    company: "Posto de Combustível",
    location: "Santo Ângelo — RS",
    previousBill: 2180.00,
    currentBill: 1635.00,
    monthlySavings: 545.00,
    totalSavings: 3270.00,
    months: 6,
    discountRate: 25,
    testimonial: "Conta alta todo mês virou rotina no posto. Com a Plus Energy cortamos quase R$550 por mês sem mudar absolutamente nada.",
    type: "Comércio — CNPJ",
    initials: "RM",
    image: "/images/cases/rodrigo.png",
    reviewDate: "2025-12-01",
  },
  {
    name: "Carlos B.",
    company: "Barbearia",
    location: "Cruz Alta — RS",
    previousBill: 620.00,
    currentBill: 465.00,
    monthlySavings: 155.00,
    totalSavings: 930.00,
    months: 6,
    discountRate: 25,
    testimonial: "Achei que ia ter complicação mas foi tudo pelo celular. Em dois meses já apareceu o desconto. Super indico!",
    type: "Comércio — CNPJ",
    initials: "CB",
    image: "/images/cases/carlos.png",
    reviewDate: "2026-01-15",
  },
] as const;

export const FAQ_DATA = [
  {
    question: "Precisa instalar placa solar?",
    answer:
      "Não. Você não instala absolutamente nada. A energia vem das usinas da Plus Energy e chega pela rede da RGE, pelos mesmos fios que já chegam na sua casa.",
  },
  {
    question: "A conta de luz vai para o nome de vocês?",
    answer:
      "Sim, a titularidade é transferida para a Plus Energy ou cooperativa parceira. Isso é necessário para a RGE liberar os créditos. Mas você continua ligando para a RGE se faltar luz. Na prática, nada muda no seu dia a dia.",
  },
  {
    question: "Tem fidelidade ou multa?",
    answer:
      "Não tem fidelidade. O contrato tem prazo de 3 meses com renovação automática. Para cancelar, você paga apenas o saldo de créditos de energia que ainda restam na conta — sem multa.",
  },
  {
    question: "Em quanto tempo o desconto aparece?",
    answer:
      "Em torno de 30 a 60 dias após a assinatura. A partir daí já vem descontado automaticamente todo mês.",
  },
  {
    question: "Posso fazer para mais de uma conta?",
    answer:
      "Sim! É feito um contrato para cada unidade consumidora.",
  },
  {
    question: "Funciona para empresa (CNPJ)?",
    answer:
      "Sim, atendemos pessoa jurídica com o mesmo desconto.",
  },
  {
    question: "O que é energia solar por assinatura?",
    answer:
      "É um modelo regulamentado pela Lei 14.300/2022 que permite consumidores utilizarem energia gerada por usinas remotas sem precisar instalar nada. O desconto aparece diretamente na conta de luz.",
  },
  {
    question: "Como faço para assinar?",
    answer:
      "Preencha o formulário no site com os dados da sua conta de luz, receba a simulação e, se quiser, assine o contrato digitalmente.",
  },
  {
    question: "Qual o desconto exato?",
    answer:
      "O desconto é de 25% para contas acima de R$500/mês. Para contas entre R$350 e R$500 o desconto é ajustado proporcionalmente.",
  },
] as const;

export const ENVIRONMENTAL_STATS = {
  co2Avoided: 8.09, // tons (from Maicon case)
  treesPlanted: 50.98,
  cleanKwh: 3390,
} as const;

export const OBJECTIONS = [
  {
    objection: "Parece bom demais para ser verdade",
    answer: "Regulamentado pela ANEEL (Lei 14.300/2022). Contrato transparente. Centenas de clientes no RS já economizando.",
    icon: "ShieldCheck",
  },
  {
    objection: "E se eu quiser cancelar?",
    answer: "Sem multa. Paga apenas o saldo de créditos em aberto. Contrato renovável a cada 3 meses.",
    icon: "DoorOpen",
  },
  {
    objection: "Vai mudar algo no meu dia a dia?",
    answer: "Nada muda. Mesma energia, mesmo fornecimento, mesmos fios. Você só paga menos.",
    icon: "RefreshCw",
  },
  {
    objection: "É confiável?",
    answer: "Empresa registrada com CNPJ ativo, contrato digital assinado, regulamentado por lei federal.",
    icon: "BadgeCheck",
  },
] as const;
