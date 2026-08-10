// ========================================
// Plus Energy — GTM DataLayer Helpers
// ========================================

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushEvent(event: string, params?: Record<string, unknown>) {
  window.dataLayer?.push({ event, ...params });
}

// ── Lead Funnel Events ──────────────────────────────────────────

export function trackPopupOpen(source: string, billValue?: number) {
  pushEvent("lead_popup_open", { lead_source: source, bill_value: billValue });
}

export function trackPopupClose(step: string) {
  pushEvent("lead_popup_close", { lead_step: step });
}

export function trackLeadStep(step: string, billValue: number) {
  pushEvent("lead_step_view", { lead_step: step, bill_value: billValue });
}

export function trackLeadSubmit(data: {
  billValue: number;
  distributor: string;
  estimatedDiscount: number;
  phone: string;
}) {
  pushEvent("generate_lead", {
    currency: "BRL",
    value: data.estimatedDiscount,
    bill_value: data.billValue,
    distributor: data.distributor,
    lead_phone: data.phone,
  });
}

export function trackLeadSuccess(data: {
  billValue: number;
  monthlySavings: number;
  phone: string;
}) {
  pushEvent("lead_conversion", {
    bill_value: data.billValue,
    monthly_savings: data.monthlySavings,
    lead_phone: data.phone,
  });
}

// ── CTA & Interaction Events ────────────────────────────────────

export function trackCtaClick(label: string, location: string) {
  pushEvent("cta_click", { cta_label: label, cta_location: location });
}

export function trackWhatsAppClick(location: string) {
  pushEvent("whatsapp_click", { click_location: location });
}

export function trackSimulatorInteraction(billValue: number) {
  pushEvent("simulator_interaction", { bill_value: billValue });
}

export function trackSimulatorAutoTrigger(billValue: number) {
  pushEvent("simulator_auto_trigger", { bill_value: billValue });
}

// ── Contact Form Events ─────────────────────────────────────────

export function trackContactSubmit() {
  pushEvent("contact_form_submit", { form_type: "contato" });
}

export function trackContactSuccess() {
  pushEvent("contact_form_success", { form_type: "contato" });
}
