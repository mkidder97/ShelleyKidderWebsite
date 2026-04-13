export function About() {
  return (
    <section id="about" className="bg-cream-100/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 md:grid-cols-2 md:items-center">
        <div className="order-2 md:order-1">
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold-400/30 via-blush-100 to-blush-200 shadow-lg ring-1 ring-black/5">
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <p className="font-serif text-sm italic text-warm-gray">
                REPLACE: Portrait or lifestyle photo of Shelley
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
            Meet Shelley
          </p>
          <h2 className="text-3xl text-charcoal sm:text-4xl md:text-5xl">
            A passion for helping women feel beautiful
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-warm-gray">
            <p>
              It started simply: Shelley was looking for quality skincare that
              actually worked for her. What she discovered along the way was
              something bigger — a love for helping other women find what works
              for their skin, too.
            </p>
            <p>
              Today she&rsquo;s a full-time beauty and skincare consultant and
              team mentor, known for warm, personalized recommendations — never
              one-size-fits-all.
            </p>
            <p>
              Based in Holiday, Florida, she serves clients in person around
              the Tampa Bay area and virtually anywhere you are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
