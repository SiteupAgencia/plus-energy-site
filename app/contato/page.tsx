import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { LeadCta } from "@/components/ui/LeadCta";
import { ContactForm } from "@/app/contato/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contato — Plus Energy",
  description: "Entre em contato com a Plus Energy. Atendemos por WhatsApp, e-mail ou formulário. Estamos em Marcelino Ramos/RS.",
};

export default function ContatoPage() {
  return (
    <main className="bg-white">
      <JsonLd type="localBusiness" />
      <section className="bg-pe-green-950 pt-36 pb-24 px-4 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl mx-auto mb-4">
          Fale com a <span className="gold-gradient-text">Plus Energy</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Estamos prontos para tirar suas dúvidas e fazer sua simulação gratuita.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-black">Nossos canais</h2>
            {[
              { icon: Phone, label: "WhatsApp", value: "(54) 9 9715-0494", href: "https://wa.me/5554997150494" },
              { icon: Mail, label: "E-mail", value: "financeiro@plusenergy.net.br", href: "mailto:financeiro@plusenergy.net.br" },
              { icon: MapPin, label: "Localização", value: "Marcelino Ramos, RS", href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-xl border border-pe-slate-100 bg-pe-slate-50">
                <div className="w-10 h-10 rounded-xl bg-pe-green-50 border border-pe-green-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-pe-green-600" />
                </div>
                <div>
                  <p className="text-xs text-pe-slate-400 font-medium">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold text-black hover:text-pe-green-600 transition-colors">{value}</a>
                  ) : (
                    <p className="font-semibold text-black">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-4">
              <p className="text-xs text-pe-slate-400 mb-4">Ou faça sua simulação diretamente:</p>
              <LeadCta label="Simular economia agora" size="md" />
            </div>

            <div className="pt-4 border-t border-pe-slate-100">
              <p className="text-xs text-pe-slate-400">
                CNPJ: 51.181.561/0001-75 · Foro: Marcelino Ramos/RS
              </p>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
