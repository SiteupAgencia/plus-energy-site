import type { Metadata } from "next";
import { FaqClient } from "./FaqClient";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Perguntas Frequentes",
  description:
    "Tire todas as suas dúvidas sobre energia solar por assinatura da Plus Energy. Sem instalação, sem fidelidade, até 25% de desconto na conta de luz.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd type="faqPage" />
      <FaqClient />
    </>
  );
}
