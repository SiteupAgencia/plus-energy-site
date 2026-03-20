import Link from "next/link";
import { LeadCta } from "@/components/ui/LeadCta";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-7xl font-heading font-extrabold gold-gradient-text mb-4">404</p>
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-black mb-3">
        Página não encontrada
      </h1>
      <p className="text-pe-slate-500 max-w-md mb-8">
        A página que você procura não existe ou foi movida. Que tal voltar para a home ou simular sua economia?
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-full border border-pe-slate-200 text-sm font-semibold text-black hover:bg-pe-slate-50 transition-colors"
        >
          Voltar para Home
        </Link>
        <LeadCta label="Simular economia" size="md" />
      </div>
    </section>
  );
}
