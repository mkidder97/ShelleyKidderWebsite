"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type {
  AgeRange,
  Concern,
  CurrentRoutine,
  QuizAnswers,
  RoutineRecommendation,
  SkinType,
  TimeCommitment,
} from "@/lib/quiz";
import { QuizResults } from "./QuizResults";

type Option<T extends string> = { value: T; label: string; hint?: string };

const SKIN_TYPE_OPTIONS: Option<SkinType>[] = [
  { value: "dry", label: "Dry", hint: "Feels tight or flaky" },
  { value: "oily", label: "Oily", hint: "Shiny by afternoon" },
  { value: "combination", label: "Combination", hint: "Oily T-zone, dry cheeks" },
  { value: "sensitive", label: "Sensitive", hint: "Reacts to new products" },
  { value: "unsure", label: "Not sure" },
];

const CONCERN_OPTIONS: Option<Concern>[] = [
  { value: "fine_lines", label: "Fine lines & wrinkles" },
  { value: "dark_spots", label: "Dark spots" },
  { value: "acne", label: "Acne & breakouts" },
  { value: "dullness", label: "Dullness" },
  { value: "dryness", label: "Dryness" },
  { value: "large_pores", label: "Large pores" },
  { value: "redness", label: "Redness" },
  { value: "uneven_texture", label: "Uneven texture" },
];

const ROUTINE_OPTIONS: Option<CurrentRoutine>[] = [
  { value: "none", label: "I don't really have one" },
  { value: "cleanser_only", label: "Cleanser only" },
  { value: "cleanser_moisturizer", label: "Cleanser + moisturizer" },
  { value: "full_routine", label: "Full routine — cleanser, toner, serum, moisturizer, SPF" },
  { value: "whatever_sale", label: "I use whatever's on sale" },
];

const AGE_OPTIONS: Option<AgeRange>[] = [
  { value: "under_25", label: "Under 25" },
  { value: "25_35", label: "25 – 35" },
  { value: "36_45", label: "36 – 45" },
  { value: "46_55", label: "46 – 55" },
  { value: "55_plus", label: "55+" },
];

const TIME_OPTIONS: Option<TimeCommitment>[] = [
  { value: "under_5", label: "Under 5 minutes" },
  { value: "5_10", label: "5 – 10 minutes" },
  { value: "whatever_it_takes", label: "I'll do whatever it takes" },
];

const TOTAL_STEPS = 7;

interface Draft {
  skin_type?: SkinType;
  concerns: Concern[];
  current_routine?: CurrentRoutine;
  age_range?: AgeRange;
  time_commitment?: TimeCommitment;
}

interface ResultState {
  name: string;
  recommendation: RoutineRecommendation;
}

export function QuizForm() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({ concerns: [] });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultState | null>(null);

  const progress = useMemo(() => {
    if (result) return 100;
    return Math.round((step / TOTAL_STEPS) * 100);
  }, [step, result]);

  function next() {
    setError(null);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }
  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggleConcern(c: Concern) {
    setDraft((d) => {
      const has = d.concerns.includes(c);
      if (has) return { ...d, concerns: d.concerns.filter((x) => x !== c) };
      if (d.concerns.length >= 3) return d;
      return { ...d, concerns: [...d.concerns, c] };
    });
  }

  async function submit() {
    if (!name.trim()) return setError("Please add your name.");
    if (!/.+@.+\..+/.test(email)) return setError("Please use a valid email.");
    const answers: QuizAnswers | null =
      draft.skin_type &&
      draft.concerns.length > 0 &&
      draft.current_routine &&
      draft.age_range &&
      draft.time_commitment
        ? {
            skin_type: draft.skin_type,
            concerns: draft.concerns,
            current_routine: draft.current_routine,
            age_range: draft.age_range,
            time_commitment: draft.time_commitment,
          }
        : null;
    if (!answers) return setError("Looks like a question got skipped. Please go back.");

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), ...answers }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? "Something went wrong. Please try again.");
      setResult({ name: name.trim(), recommendation: body.results.recommendation });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return <QuizResults name={result.name} recommendation={result.recommendation} />;
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
      <nav className="mb-8 flex items-center justify-between text-sm text-warm-gray">
        <Link href="/" className="hover:text-blush-500">
          ← Back to home
        </Link>
        <span>
          {step === 0 ? "Start" : step >= TOTAL_STEPS ? "Almost done" : `Step ${step} of ${TOTAL_STEPS - 1}`}
        </span>
      </nav>

      <div className="mb-10 h-1.5 w-full overflow-hidden rounded-full bg-blush-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blush-400 to-gold-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="fade-up" key={step}>
        {step === 0 && (
          <StepWrap
            title="Find your perfect skincare routine"
            subtitle="A few quick questions and I'll put together a routine made for your skin. Takes about 2 minutes."
          >
            <PrimaryButton onClick={next}>Let&rsquo;s get started</PrimaryButton>
          </StepWrap>
        )}

        {step === 1 && (
          <StepWrap title="What's your skin type?" subtitle="Pick the one that sounds most like you.">
            <OptionGrid<SkinType>
              options={SKIN_TYPE_OPTIONS}
              selected={draft.skin_type ? [draft.skin_type] : []}
              onSelect={(v) => {
                setDraft((d) => ({ ...d, skin_type: v }));
                setTimeout(next, 180);
              }}
            />
            <NavRow onBack={back} />
          </StepWrap>
        )}

        {step === 2 && (
          <StepWrap
            title="What are your top skin concerns?"
            subtitle="Choose up to 3 — I'll focus the routine on what matters most to you."
          >
            <OptionGrid<Concern>
              multi
              options={CONCERN_OPTIONS}
              selected={draft.concerns}
              onSelect={toggleConcern}
            />
            <NavRow
              onBack={back}
              onNext={next}
              nextDisabled={draft.concerns.length === 0}
              nextLabel="Continue"
            />
          </StepWrap>
        )}

        {step === 3 && (
          <StepWrap
            title="What does your current routine look like?"
            subtitle="There's no wrong answer — I meet you where you are."
          >
            <OptionGrid<CurrentRoutine>
              options={ROUTINE_OPTIONS}
              selected={draft.current_routine ? [draft.current_routine] : []}
              onSelect={(v) => {
                setDraft((d) => ({ ...d, current_routine: v }));
                setTimeout(next, 180);
              }}
            />
            <NavRow onBack={back} />
          </StepWrap>
        )}

        {step === 4 && (
          <StepWrap title="What's your age range?" subtitle="Skin needs shift over time — I'll take that into account.">
            <OptionGrid<AgeRange>
              options={AGE_OPTIONS}
              selected={draft.age_range ? [draft.age_range] : []}
              onSelect={(v) => {
                setDraft((d) => ({ ...d, age_range: v }));
                setTimeout(next, 180);
              }}
            />
            <NavRow onBack={back} />
          </StepWrap>
        )}

        {step === 5 && (
          <StepWrap
            title="How much time do you want to spend on skincare daily?"
            subtitle="I'll design the routine to actually fit your life."
          >
            <OptionGrid<TimeCommitment>
              options={TIME_OPTIONS}
              selected={draft.time_commitment ? [draft.time_commitment] : []}
              onSelect={(v) => {
                setDraft((d) => ({ ...d, time_commitment: v }));
                setTimeout(next, 180);
              }}
            />
            <NavRow onBack={back} />
          </StepWrap>
        )}

        {step === 6 && (
          <StepWrap
            title="Your personalized routine is ready!"
            subtitle="Enter your name and email and I'll reveal your results."
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="quiz-name" className="mb-2 block text-sm font-medium text-charcoal">
                  First name
                </label>
                <input
                  id="quiz-name"
                  type="text"
                  autoComplete="given-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-blush-100 bg-white px-4 py-3 text-charcoal focus:border-blush-400 focus:outline-none focus:ring-2 focus:ring-blush-200"
                />
              </div>
              <div>
                <label htmlFor="quiz-email" className="mb-2 block text-sm font-medium text-charcoal">
                  Email
                </label>
                <input
                  id="quiz-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-blush-100 bg-white px-4 py-3 text-charcoal focus:border-blush-400 focus:outline-none focus:ring-2 focus:ring-blush-200"
                />
              </div>
              <p className="text-xs leading-relaxed text-warm-gray-light">
                I&rsquo;ll send your routine and occasional skincare tips. No spam — unsubscribe anytime.
              </p>
              {error && (
                <p className="rounded-xl bg-blush-50 px-4 py-3 text-sm text-blush-600">{error}</p>
              )}
            </div>
            <NavRow
              onBack={back}
              onNext={submit}
              nextLabel={submitting ? "Getting your results..." : "See my routine"}
              nextDisabled={submitting}
            />
          </StepWrap>
        )}
      </div>
    </div>
  );
}

function StepWrap({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl text-charcoal sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 text-lg text-warm-gray">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function OptionGrid<T extends string>({
  options,
  selected,
  onSelect,
  multi,
}: {
  options: Option<T>[];
  selected: T[];
  onSelect: (value: T) => void;
  multi?: boolean;
}) {
  return (
    <div className={`grid gap-3 ${multi ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            aria-pressed={isSelected}
            className={`group w-full rounded-xl border px-5 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 ${
              isSelected
                ? "border-blush-400 bg-blush-50 shadow-sm"
                : "border-blush-100 bg-white hover:border-blush-300 hover:bg-blush-50/40"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-charcoal">{opt.label}</span>
              <span
                aria-hidden
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                  isSelected
                    ? "border-blush-400 bg-blush-400 text-white"
                    : "border-blush-200 bg-white"
                }`}
              >
                {isSelected && (
                  <svg viewBox="0 0 12 12" className="h-3 w-3 fill-none stroke-current stroke-2">
                    <path d="M2.5 6.5L5 9l4.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </div>
            {opt.hint && (
              <p className="mt-1 text-sm text-warm-gray">{opt.hint}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}

function NavRow({
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="rounded-full px-4 py-2 text-sm font-medium text-warm-gray transition hover:text-charcoal"
        >
          ← Back
        </button>
      ) : (
        <span />
      )}
      {onNext && (
        <PrimaryButton onClick={onNext} disabled={nextDisabled}>
          {nextLabel ?? "Continue"}
        </PrimaryButton>
      )}
    </div>
  );
}

function PrimaryButton({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center rounded-full bg-blush-500 px-8 py-4 text-base font-medium text-white shadow-sm transition hover:bg-blush-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}
