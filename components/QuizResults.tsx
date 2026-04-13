import Link from "next/link";
import type { RoutineRecommendation } from "@/lib/quiz";

export function QuizResults({
  name,
  recommendation,
}: {
  name: string;
  recommendation: RoutineRecommendation;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <div className="text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
          Your personalized results
        </p>
        <h1 className="text-4xl text-charcoal sm:text-5xl">
          {name ? `${name}, ` : ""}
          <span className="italic text-blush-500">{recommendation.headline}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-warm-gray">
          {recommendation.summary}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <RoutineCard label="Morning" steps={recommendation.morning} accent="blush" />
        <RoutineCard label="Evening" steps={recommendation.evening} accent="gold" />
      </div>

      <div className="mt-10 rounded-2xl border border-cream-200 bg-cream-100/60 p-8">
        <h3 className="text-xl text-charcoal">Habits that make it stick</h3>
        <ul className="mt-4 space-y-3 text-warm-gray">
          {recommendation.habits.map((habit) => (
            <li key={habit} className="flex gap-3">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
              <span>{habit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14 rounded-3xl bg-gradient-to-br from-blush-400 to-blush-500 p-10 text-center text-white shadow-lg">
        <h2 className="text-3xl sm:text-4xl">Want to go deeper?</h2>
        <p className="mx-auto mt-4 max-w-xl text-blush-50">
          Book a free one-on-one consultation and I&rsquo;ll help you pick the
          exact products that fit your skin, your schedule, and your budget.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/#book"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-medium text-blush-600 shadow-sm transition hover:bg-cream-100"
          >
            Book a free consultation
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-base font-medium text-white transition hover:bg-white/10"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function RoutineCard({
  label,
  steps,
  accent,
}: {
  label: string;
  steps: RoutineRecommendation["morning"];
  accent: "blush" | "gold";
}) {
  const badgeClass =
    accent === "blush"
      ? "bg-blush-100 text-blush-600"
      : "bg-cream-200 text-gold-600";
  return (
    <section className="rounded-2xl border border-blush-100 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${badgeClass}`}
        >
          {label}
        </span>
      </div>
      <ol className="space-y-5">
        {steps.map((s, i) => (
          <li key={`${label}-${i}`}>
            <p className="font-serif text-lg text-charcoal">
              <span className="mr-3 text-warm-gray-light">{i + 1}.</span>
              {s.step}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-warm-gray">{s.why}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
