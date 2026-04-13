import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-blush-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl text-charcoal">Shelley Kidder</p>
            <p className="mt-2 text-sm text-warm-gray">
              Beauty & Skincare Consultant
            </p>
            <p className="mt-1 text-sm text-warm-gray-light">Holiday, Florida</p>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
              Follow along
            </p>
            <ul className="space-y-2 text-sm text-warm-gray">
              <li>
                <a href="#" className="hover:text-blush-500">Instagram</a>
              </li>
              <li>
                <a href="#" className="hover:text-blush-500">Facebook</a>
              </li>
              <li>
                <a href="#" className="hover:text-blush-500">TikTok</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-warm-gray">
              <li>
                <Link href="/quiz" className="hover:text-blush-500">Skincare quiz</Link>
              </li>
              <li>
                <Link href="/#book" className="hover:text-blush-500">Book consultation</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blush-500">Privacy policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-blush-100 pt-8">
          <p className="text-xs leading-relaxed text-warm-gray-light">
            This is an independent personal website and is not endorsed by,
            affiliated with, or sponsored by any specific brand.
          </p>
          <p className="mt-3 text-xs text-warm-gray-light">
            © {year} Shelley Kidder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
