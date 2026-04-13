const services = [
  {
    title: "Personalized Skincare Consultation",
    description:
      "I'll help you find the perfect routine for your skin type, concerns, and lifestyle. Whether you're dealing with dryness, aging, sensitivity, or just want to refresh your routine — I've got you.",
  },
  {
    title: "Virtual Beauty Experience",
    description:
      "Can't meet in person? No problem. I host fun, interactive virtual beauty sessions for you and your friends.",
  },
  {
    title: "Group Beauty Events",
    description:
      "Perfect for girls' nights, bridal parties, birthdays, or team bonding. I bring the products, the expertise, and the fun.",
  },
  {
    title: "One-on-One Mentoring",
    description:
      "Interested in building your own beauty business? I mentor women who want to turn their passion for beauty into income.",
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="mb-14 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
          What I offer
        </p>
        <h2 className="text-3xl text-charcoal sm:text-4xl md:text-5xl">
          Tailored beauty, on your terms
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.title}
            className="group relative rounded-2xl border border-blush-100 bg-white/80 p-8 backdrop-blur transition hover:border-blush-200 hover:shadow-md"
          >
            <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-blush-400 to-gold-500" />
            <h3 className="text-2xl text-charcoal">{service.title}</h3>
            <p className="mt-4 text-warm-gray leading-relaxed">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
