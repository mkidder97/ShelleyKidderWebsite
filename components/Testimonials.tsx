const testimonials = [
  {
    quote:
      "Shelley helped me find a skincare routine that finally works for my sensitive skin. I've never felt more confident!",
    author: "[Name]",
    location: "[Location]",
  },
  {
    quote:
      "The virtual beauty party Shelley hosted for my bridal shower was so much fun. Everyone loved it!",
    author: "[Name]",
    location: "[Location]",
  },
  {
    quote:
      "I was overwhelmed by all the skincare options out there. Shelley made it simple and personal.",
    author: "[Name]",
    location: "[Location]",
  },
];

export function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-white to-cream-100/60">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
            Kind words
          </p>
          <h2 className="text-3xl text-charcoal sm:text-4xl md:text-5xl">
            What clients are saying
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl border border-blush-100 bg-white p-8 shadow-sm"
            >
              <span
                aria-hidden
                className="font-serif text-6xl leading-none text-blush-300"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-charcoal">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm text-warm-gray">
                <span className="font-medium text-charcoal">{t.author}</span>
                <span className="mx-2 text-warm-gray-light">·</span>
                {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
