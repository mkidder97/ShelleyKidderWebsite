import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-blush-50 via-cream-100 to-white"
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full bg-blush-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-gold-400/20 blur-3xl"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pt-24 pb-20 text-center sm:pt-32 sm:pb-28 md:flex-row md:items-center md:gap-16 md:text-left">
        <div className="flex-1 fade-up">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gold-600">
            Beauty & Skincare Consultant
          </p>
          <h1 className="text-5xl leading-[1.05] text-charcoal sm:text-6xl md:text-7xl">
            Shelley <span className="italic text-blush-500">Kidder</span>
          </h1>
          <p className="mt-6 text-xl text-warm-gray sm:text-2xl">
            Helping you feel confident in your own skin.
          </p>
          <p className="mt-3 text-base text-warm-gray-light">
            Based in Holiday, Florida · Serving clients locally & virtually
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start md:gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full bg-blush-500 px-8 py-4 text-base font-medium text-white shadow-sm transition hover:bg-blush-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2"
            >
              Find Your Perfect Routine
            </Link>
            <a
              href="#book"
              className="inline-flex items-center justify-center rounded-full border border-charcoal/20 bg-white/70 px-8 py-4 text-base font-medium text-charcoal backdrop-blur transition hover:border-charcoal/40 hover:bg-white"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>

        <div className="flex-1 fade-up">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush-200 via-cream-100 to-gold-400/40 shadow-xl ring-1 ring-black/5">
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <p className="font-serif text-sm italic text-warm-gray">
                REPLACE: Shelley&rsquo;s headshot
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
