import { ContactForm } from "./ContactForm";

export function BookConsultation() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section id="book" className="bg-cream-100/60">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
            Let&rsquo;s connect
          </p>
          <h2 className="text-3xl text-charcoal sm:text-4xl md:text-5xl">
            Book a free consultation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-warm-gray">
            I&rsquo;d love to hear from you! Whether you have a skincare
            question, want to book a consultation, or are curious about hosting
            a beauty event — reach out.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-blush-100 bg-white shadow-sm">
              {calendlyUrl ? (
                <iframe
                  title="Book a free consultation with Shelley"
                  src={calendlyUrl}
                  className="h-[680px] w-full"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-[680px] flex-col items-center justify-center gap-3 p-10 text-center">
                  <p className="font-serif text-2xl text-charcoal">
                    Scheduling coming soon
                  </p>
                  <p className="max-w-md text-warm-gray">
                    Calendly embed will live here. Use the contact form to
                    reach out in the meantime.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
