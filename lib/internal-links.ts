/**
 * Injeta links internos automaticamente no conteúdo HTML dos blog posts.
 * Mapeia termos-chave para páginas internas do site, melhorando SEO e navegação.
 *
 * Regras:
 * - Cada termo só é linkado 1x por post (primeira ocorrência)
 * - Não linka dentro de headings, links existentes, ou tags HTML
 * - Não linka para o próprio post (evita link circular)
 * - Case-insensitive matching
 */

interface InternalLink {
  /** Termos que disparam o link (regex-safe, case-insensitive) */
  terms: string[];
  /** URL de destino */
  href: string;
  /** Title do link (tooltip) */
  title: string;
}

const INTERNAL_LINKS: InternalLink[] = [
  // Páginas do site
  {
    terms: ["energia solar por assinatura", "solar por assinatura"],
    href: "/como-funciona",
    title: "Saiba como funciona a energia solar por assinatura",
  },
  {
    terms: ["como funciona"],
    href: "/como-funciona",
    title: "Veja como funciona o processo",
  },
  {
    terms: ["para empresas", "conta cnpj", "energia para empresas"],
    href: "/para-empresas",
    title: "Energia solar para empresas",
  },
  {
    terms: ["cases reais", "cases de sucesso", "clientes que economizam"],
    href: "/cases",
    title: "Veja cases reais de clientes",
  },
  {
    terms: ["perguntas frequentes", "dúvidas frequentes", "faq"],
    href: "/faq",
    title: "Perguntas frequentes sobre energia solar",
  },
  {
    terms: ["simulação gratuita", "simule sua economia", "simulador"],
    href: "/contato",
    title: "Faça uma simulação gratuita",
  },
  {
    terms: ["sustentabilidade", "impacto ambiental", "energia limpa"],
    href: "/sustentabilidade",
    title: "Nosso compromisso com sustentabilidade",
  },

  // Blog posts (cross-linking)
  {
    terms: ["geração distribuída", "gd remota", "autoconsumo remoto"],
    href: "/blog/o-que-e-geracao-distribuida",
    title: "O que é geração distribuída?",
  },
  {
    terms: ["lei 14.300", "lei 14300", "marco legal"],
    href: "/blog/lei-14300-energia-solar-2025",
    title: "Entenda a Lei 14.300 da energia solar",
  },
  {
    terms: ["desconto na conta de luz", "desconto conta de luz"],
    href: "/blog/desconto-conta-luz-passo-fundo",
    title: "Como ter desconto na conta de luz",
  },
  {
    terms: ["economizar conta de luz", "economia na conta de luz", "economizar na conta"],
    href: "/blog/como-economizar-conta-luz-erechim",
    title: "Como economizar na conta de luz",
  },
];

/**
 * Escapa caracteres especiais de regex
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Injeta links internos no HTML do post.
 * @param html - Conteúdo HTML do post
 * @param currentSlug - Slug do post atual (para evitar link circular)
 * @returns HTML com links internos injetados
 */
export function injectInternalLinks(html: string, currentSlug: string): string {
  if (!html) return html;

  const currentPath = `/blog/${currentSlug}`;
  const linkedTerms = new Set<string>();

  let result = html;

  for (const link of INTERNAL_LINKS) {
    // Não linkar para o próprio post
    if (link.href === currentPath) continue;

    // Se já linkamos um termo deste grupo, pular
    const groupKey = link.href;
    if (linkedTerms.has(groupKey)) continue;

    for (const term of link.terms) {
      if (linkedTerms.has(groupKey)) break;

      // Regex: encontra o termo fora de tags HTML e fora de links existentes
      // Usa word boundary para não quebrar palavras parciais
      const pattern = new RegExp(
        `(?<![<\\/\\w])(?<!<a[^>]*>.*?)\\b(${escapeRegex(term)})\\b(?![^<]*<\\/a>)(?![^<]*>)`,
        "i"
      );

      const match = result.match(pattern);
      if (match && match.index !== undefined) {
        const original = match[1];

        // Verificar se não está dentro de um heading ou link
        const before = result.slice(0, match.index);
        const openH = (before.match(/<h[1-6][^>]*>/gi) || []).length;
        const closeH = (before.match(/<\/h[1-6]>/gi) || []).length;
        const openA = (before.match(/<a[^>]*>/gi) || []).length;
        const closeA = (before.match(/<\/a>/gi) || []).length;

        // Se está dentro de um heading ou link aberto, pular
        if (openH > closeH || openA > closeA) continue;

        const anchor = `<a href="${link.href}" title="${link.title}" class="text-pe-green-600 font-semibold hover:underline">${original}</a>`;
        result = result.slice(0, match.index) + anchor + result.slice(match.index + original.length);
        linkedTerms.add(groupKey);
      }
    }
  }

  return result;
}
