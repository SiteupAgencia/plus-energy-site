import type { Metadata } from "next";
import Script from "next/script";
import { Sora, DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadPopup } from "@/components/lead/LeadPopup";
import "./globals.css";

const GTM_ID = "GTM-PDW865DV";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://plusenergy.com.br"),
  title: {
    default: "Plus Energy — Energia Solar por Assinatura | Até 25% de Desconto",
    template: "%s | Plus Energy",
  },
  description:
    "Pague até 25% menos na conta de luz sem instalar nada. Energia solar por assinatura para residências e empresas no RS. Sem obra, sem taxa de adesão, sem fidelidade.",
  keywords: [
    "energia solar por assinatura",
    "desconto conta de luz",
    "energia solar RS",
    "geração distribuída",
    "economia conta de luz",
    "Plus Energy",
    "energia renovável",
    "RGE desconto",
  ],
  authors: [{ name: "Plus Energy" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Plus Energy",
    title: "Plus Energy — Até 25% de Desconto na Conta de Luz",
    description:
      "Energia solar por assinatura. Sem instalar nada, sem taxa, sem fidelidade. 100% digital.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plus Energy — Energia Solar por Assinatura",
    description: "Até 25% de desconto na conta de luz sem instalar nada.",
  },
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${dmSans.variable}`}>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      <body className="min-h-screen flex flex-col antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <LeadPopup />
      </body>
    </html>
  );
}
