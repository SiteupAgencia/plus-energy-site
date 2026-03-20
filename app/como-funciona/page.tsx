import type { Metadata } from "next";
import { ComoFuncionaClient } from "./ComoFuncionaClient";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Como Funciona",
  description:
    "Entenda como funciona a energia solar por assinatura da Plus Energy. Em 5 passos simples você começa a economizar até 25% na conta de luz sem instalar nada.",
};

export default function ComoFuncionaPage() {
  return (
    <>
      <JsonLd type="howTo" />
      <ComoFuncionaClient />
    </>
  );
}
