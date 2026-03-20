import type { Metadata } from "next";
import { ParaEmpresasClient } from "@/app/para-empresas/ParaEmpresasClient";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Para Empresas — Desconto na Conta de Luz CNPJ",
  description:
    "Energia solar por assinatura para comércios e empresas no RS. Reduza até 25% na conta de luz sem instalação, sem obra e sem fidelidade.",
  openGraph: {
    title: "Energia Solar para Empresas — Plus Energy",
    description:
      "Até 25% de desconto na conta de luz CNPJ. Sem instalar nada, sem obra, sem fidelidade. 100% digital.",
  },
};

export default function ParaEmpresasPage() {
  return (
    <main className="bg-white">
      <JsonLd type="service" />
      <ParaEmpresasClient />
    </main>
  );
}
