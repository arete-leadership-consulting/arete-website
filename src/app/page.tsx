export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <section className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur sm:p-12">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
          Development environment ready
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          ARETE Leadership &amp; Business Consulting
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          The client-owned website repository is now running on a clean Next.js foundation. Brand-led design and approved content come next.
        </p>
      </section>
    </main>
  );
}
