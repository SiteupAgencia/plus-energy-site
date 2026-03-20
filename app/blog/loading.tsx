export default function BlogLoading() {
  return (
    <main className="bg-white">
      <section className="bg-pe-green-950 pt-36 pb-24 px-4 text-center">
        <div className="h-8 w-48 bg-white/10 rounded-lg mx-auto mb-4 animate-pulse" />
        <div className="h-12 w-96 max-w-full bg-white/10 rounded-lg mx-auto mb-4 animate-pulse" />
        <div className="h-5 w-64 bg-white/5 rounded-lg mx-auto animate-pulse" />
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-pe-slate-100 bg-pe-slate-50 p-5 animate-pulse">
              <div className="h-44 bg-pe-slate-200 rounded-xl mb-4" />
              <div className="h-4 w-20 bg-pe-slate-200 rounded mb-3" />
              <div className="h-5 w-full bg-pe-slate-200 rounded mb-2" />
              <div className="h-4 w-3/4 bg-pe-slate-200 rounded" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
