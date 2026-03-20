export default function BlogPostLoading() {
  return (
    <main className="bg-white">
      <section className="bg-pe-green-950 pt-36 pb-16 px-4">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-4 w-24 bg-white/10 rounded mb-4" />
          <div className="h-10 w-full bg-white/10 rounded-lg mb-3" />
          <div className="h-10 w-3/4 bg-white/10 rounded-lg mb-6" />
          <div className="h-4 w-48 bg-white/5 rounded" />
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-16 animate-pulse">
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 bg-pe-slate-100 rounded" style={{ width: `${75 + Math.random() * 25}%` }} />
          ))}
        </div>
      </section>
    </main>
  );
}
