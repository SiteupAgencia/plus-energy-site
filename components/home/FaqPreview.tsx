"use client";

import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { FAQ_DATA } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";

export function FaqPreview() {
  const previewItems = FAQ_DATA.slice(0, 4).map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pe-solar-50 border border-pe-solar-200 text-xs font-semibold text-pe-solar-600 uppercase tracking-widest mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            Tire suas dúvidas
          </span>
          <h2 className="font-heading text-3xl font-bold text-black sm:text-4xl">
            Perguntas <span className="text-pe-solar-400">frequentes</span>
          </h2>
        </div>

        {/* Accordion */}
        <Accordion items={previewItems} />

        {/* Link to full FAQ */}
        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1 font-heading text-base font-semibold text-pe-green-700 transition-colors hover:text-pe-green-800"
          >
            Ver todas as perguntas &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
