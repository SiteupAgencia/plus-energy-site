"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-6xl font-heading font-extrabold text-pe-slate-300 mb-4">Ops!</p>
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-black mb-3">
        Algo deu errado
      </h1>
      <p className="text-pe-slate-500 max-w-md mb-8">
        Ocorreu um erro inesperado. Tente novamente ou volte para a página inicial.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full gold-gradient font-heading font-bold text-pe-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] hover:brightness-105 transition-all"
        >
          Tentar novamente
        </button>
      </div>
    </section>
  );
}
