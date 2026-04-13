import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Shelley Kidder",
  description: "How information collected on this website is used.",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <nav className="mb-10 text-sm">
          <Link href="/" className="text-warm-gray hover:text-blush-500">
            ← Back to home
          </Link>
        </nav>

        <h1 className="text-4xl text-charcoal sm:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-warm-gray-light">
          Last updated: April 13, 2026
        </p>

        <div className="mt-10 space-y-8 text-warm-gray leading-relaxed">
          <section>
            <h2 className="text-2xl text-charcoal">Who runs this site</h2>
            <p className="mt-3">
              This site is operated by Shelley Kidder, an independent beauty
              and skincare consultant based in Holiday, Florida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-charcoal">What I collect</h2>
            <p className="mt-3">
              When you take the skincare quiz or use the contact form, I
              collect the information you voluntarily provide — typically your
              name, email address, and the answers you submit.
            </p>
            <p className="mt-3">
              Basic, anonymized usage data (pages visited, approximate region,
              device type) is collected via standard web analytics to help
              improve the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-charcoal">How I use it</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To send your personalized routine recommendation.</li>
              <li>
                To follow up with helpful skincare tips and occasional updates.
                You can unsubscribe at any time from any email.
              </li>
              <li>To respond to questions you send through the contact form.</li>
              <li>
                To schedule and prepare for consultations you request.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-charcoal">What I don&rsquo;t do</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>I don&rsquo;t sell your data to anyone.</li>
              <li>I don&rsquo;t share your data with third parties for advertising.</li>
            </ul>
            <p className="mt-3">
              The only third-party tools used to process your information are
              service providers I rely on to operate the site (email delivery,
              scheduling, analytics, hosting). Those providers have their own
              privacy practices and handle data on my behalf.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-charcoal">Your choices</h2>
            <p className="mt-3">
              You can request access to, correction of, or deletion of your
              personal information at any time. Just reach out using the
              contact form and I&rsquo;ll take care of it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-charcoal">Disclaimer</h2>
            <p className="mt-3">
              This is an independent personal website and is not endorsed by,
              affiliated with, or sponsored by any specific brand.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-charcoal">Contact</h2>
            <p className="mt-3">
              Questions about this policy? Use the{" "}
              <Link href="/#book" className="text-blush-500 hover:text-blush-600">
                contact form
              </Link>{" "}
              and I&rsquo;ll be in touch.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
