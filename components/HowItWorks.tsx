const steps = [
  {
    number: "01",
    title: "Take the quiz",
    description: "A free, 2-minute skincare quiz to learn about your skin.",
  },
  {
    number: "02",
    title: "Get your routine",
    description: "A personalized recommendation tailored to your skin goals.",
  },
  {
    number: "03",
    title: "Book a consultation",
    description: "Go deeper with a free one-on-one, in person or virtual.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="mb-14 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
          How it works
        </p>
        <h2 className="text-3xl text-charcoal sm:text-4xl md:text-5xl">
          Three simple steps to better skin
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative rounded-2xl border border-blush-100 bg-white/70 p-8 backdrop-blur transition hover:shadow-md"
          >
            <span className="font-serif text-5xl text-blush-300">{step.number}</span>
            <h3 className="mt-4 text-xl text-charcoal">{step.title}</h3>
            <p className="mt-3 text-warm-gray">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
