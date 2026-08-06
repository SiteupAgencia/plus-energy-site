// ========================================
// Plus Energy — Roteamento único para o WhatsApp oficial
// ========================================
// Todo caminho do site termina no MESMO número (WhatsApp Cloud API / Chatwoot).
// O lead é sempre quem envia a primeira mensagem: isso abre a janela de 24h
// sem custo de template de abertura e já entrega origem + faixa da conta
// dentro do próprio texto, pronto pro roteamento no n8n/Chatwoot.

import { COMPANY } from "./constants";

export type WaOrigin =
  | "form_to_wa" // lead terminou o formulário e seguiu pro WhatsApp
  | "site_final_cta" // última seção da home
  | "site_float" // botão flutuante
  | "site_footer" // rodapé
  | "site_contato"; // página /contato

export type WaSegment = "pf" | "pj" | "condominio";

export interface WaLinkParams {
  origin: WaOrigin;
  segment?: WaSegment;
  /** Primeiro nome do lead, quando já conhecido (pós-formulário). */
  name?: string;
  /** Valor médio da conta de luz informado no simulador. */
  billValue?: number;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const UTM_STORAGE_KEY = "pe_utm";

/**
 * Guarda as UTMs da primeira visita para que sobrevivam à navegação interna.
 * Chamar uma vez, no client, o mais cedo possível.
 */
export function captureUtms(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }

  if (Object.keys(found).length === 0) return;

  try {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found));
  } catch {
    // sessionStorage bloqueado (modo privado): segue sem persistir
  }
}

/**
 * UTMs da sessão. Lê também a query string atual porque, na primeira
 * renderização depois do clique no anúncio, o `captureUtms` do efeito
 * ainda não rodou — sem isso o primeiro link perderia a campanha.
 */
export function getUtms(): Record<string, string> {
  if (typeof window === "undefined") return {};

  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(window.sessionStorage.getItem(UTM_STORAGE_KEY) ?? "{}");
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const current: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) current[key] = value;
  }

  return { ...stored, ...current };
}

/**
 * Faixa da conta — é o corte de qualificação que o comercial usa
 * (PF a partir de R$800, PJ/condomínio a partir de R$2.000).
 */
export function billBucket(billValue?: number): string {
  if (!billValue) return "na";
  if (billValue < 500) return "ate499";
  if (billValue < 800) return "500a799";
  if (billValue < 2000) return "800a1999";
  return "2000mais";
}

function buildRef(params: WaLinkParams, withUtm: boolean): string {
  const parts = [params.origin, params.segment ?? "pf", billBucket(params.billValue)];
  const campaign = withUtm ? getUtms().utm_campaign : undefined;
  if (campaign) parts.push(campaign.slice(0, 24));
  return parts.join("-");
}

const OPENERS: Record<WaSegment, (firstName?: string) => string> = {
  pf: (firstName) =>
    firstName
      ? `Olá! Sou ${firstName} e acabei de fazer a simulação no site da Plus Energy.`
      : "Olá! Vim pelo site da Plus Energy e quero simular o desconto na minha conta de luz.",
  pj: (firstName) =>
    firstName
      ? `Olá! Sou ${firstName}, tenho uma empresa e acabei de fazer a simulação no site da Plus Energy.`
      : "Olá! Vim pelo site da Plus Energy. Tenho uma empresa e quero simular a economia na conta de luz.",
  condominio: (firstName) =>
    firstName
      ? `Olá! Sou ${firstName}, cuido de um condomínio e acabei de fazer a simulação no site da Plus Energy.`
      : "Olá! Vim pelo site da Plus Energy. Cuido de um condomínio e quero simular a economia nas áreas comuns.",
};

/**
 * Monta a mensagem que o LEAD envia. Precisa soar como primeira pessoa —
 * quando não sabemos o valor da conta, deixamos a lacuna pro próprio lead
 * preencher: é o filtro de qualificação mais barato que existe.
 */
export function buildWhatsAppMessage(params: WaLinkParams, withUtm = true): string {
  const segment = params.segment ?? "pf";
  const firstName = params.name?.trim().split(" ")[0];

  const bill = params.billValue
    ? `Minha conta de luz fica em torno de R$ ${Math.round(params.billValue)} por mês.`
    : "Minha conta de luz fica em torno de R$ ____ por mês.";

  return `${OPENERS[segment](firstName)} ${bill} Quero receber a simulação. (ref: ${buildRef(params, withUtm)})`;
}

/**
 * `withUtm = false` produz o mesmo link no servidor e no cliente. É o que o
 * `useWhatsAppLink` usa na primeira renderização: um href divergente na
 * hidratação não é corrigido pelo React e congelaria a versão do servidor.
 */
export function getWhatsAppLink(params: WaLinkParams, withUtm = true): string {
  const text = encodeURIComponent(buildWhatsAppMessage(params, withUtm));
  return `https://wa.me/${COMPANY.whatsapp}?text=${text}`;
}
