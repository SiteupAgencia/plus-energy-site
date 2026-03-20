"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Mail, Phone } from "lucide-react"
import { COMPANY, NAV_LINKS } from "@/lib/constants"

const LEGAL_LINKS = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
  { label: "Contato", href: "/contato" },
]

const FOOTER_NAV_LINKS = [
  ...NAV_LINKS,
  { label: "Cases", href: "/cases" },
  { label: "Sustentabilidade", href: "/sustentabilidade" },
]

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch(COMPANY.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "website-newsletter",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      console.error("Failed to send newsletter signup");
    }
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="pt-2">
        <p className="text-sm text-pe-green-400">Inscrito com sucesso!</p>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-pe-solar-400">
        Newsletter
      </p>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Seu e-mail"
          aria-label="Endereço de e-mail para newsletter"
          className="w-full rounded-lg border border-pe-green-700/50 bg-pe-green-800/40 px-3 py-2 text-sm text-white placeholder:text-pe-slate-500 focus:border-pe-solar-400/60 focus:outline-none focus:ring-1 focus:ring-pe-solar-400/40 transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 rounded-lg gold-gradient px-4 py-2 text-sm font-semibold text-pe-slate-950 transition-all hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-pe-green-950 text-white overflow-hidden">
      {/* Gradient mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 80% 20%, rgb(230 169 0 / 0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 10% 80%, rgb(212 122 0 / 0.03) 0%, transparent 60%)",
        }}
      />
      {/* Gold top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pe-solar-500/40 to-transparent" />

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <Image
                  src="/simbolo.png"
                  alt="Plus Energy"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgb(230_169_0/0.5)]"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-heading text-base font-extrabold tracking-widest text-white uppercase">Plus Energy</span>
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-pe-solar-400 uppercase">Usina Solar</span>
                </div>
              </Link>
              <p className="text-sm font-semibold text-pe-solar-400">
                {COMPANY.tagline}
              </p>
              <p className="text-sm leading-relaxed text-pe-slate-400">
                Economize até 25% na sua conta de luz sem instalar nada.
                Energia limpa direto da usina solar para o seu medidor,
                regulamentado pela ANEEL.
              </p>

              {/* Newsletter */}
              <NewsletterForm />
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-pe-solar-400">
                Navegação
              </h3>
              <ul className="space-y-3">
                {FOOTER_NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-pe-slate-400 hover:text-pe-solar-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-pe-solar-400">
                Legal
              </h3>
              <ul className="space-y-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-pe-slate-400 hover:text-pe-solar-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Social */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-pe-solar-400">
                Contato
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-pe-slate-400 hover:text-pe-solar-400 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="inline-flex items-center gap-2 text-sm text-pe-slate-400 hover:text-pe-solar-400 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {COMPANY.email}
                  </a>
                </li>
              </ul>

              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-pe-solar-400">
                  Redes sociais
                </p>
                <div className="flex gap-3">
                  {[
                    { href: "https://www.instagram.com/plusenergy.rs/", Icon: Instagram, label: "Instagram" },
                    { href: "https://www.facebook.com/profile.php?id=61579806653489", Icon: Facebook, label: "Facebook" },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-pe-green-700/40 bg-pe-green-800/30 text-pe-slate-400 hover:border-pe-solar-500/40 hover:text-pe-solar-400 transition-all"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-pe-green-800/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col items-center gap-3 text-xs text-pe-slate-500 sm:flex-row sm:justify-between">
              <p>&copy; 2025 {COMPANY.name} &mdash; Marcelino Ramos, RS</p>
              <p className="text-center">Regulamentado pela Lei 14.300/2022 &mdash; ANEEL</p>
              <p>CNPJ: {COMPANY.cnpj}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
