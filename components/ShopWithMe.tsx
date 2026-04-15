const SHOP_URL =
  process.env.NEXT_PUBLIC_MK_SHOP_URL ?? "https://www.marykay.com/shelleykidder/en/home";

export function ShopWithMe() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <div className="rounded-3xl border border-gold-400/30 bg-gradient-to-br from-cream-100 to-blush-50 p-10 text-center shadow-sm sm:p-14">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
          Ready to shop?
        </p>
        <h2 className="text-2xl text-charcoal sm:text-3xl">
          Ready to explore the products I love and recommend?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-warm-gray">
          Browse my full catalog online — anytime, anywhere.
        </p>
        <div className="mt-8">
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-charcoal px-8 py-4 text-base font-medium text-white shadow-sm transition hover:bg-charcoal/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            Shop online with me, your Mary Kay Independent Beauty Consultant
          </a>
        </div>
      </div>
    </section>
  );
}
