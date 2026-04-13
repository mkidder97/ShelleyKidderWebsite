import { NextResponse } from "next/server";
import { postToWebhook } from "@/lib/webhooks";
import {
  buildRecommendation,
  type QuizAnswers,
  type AgeRange,
  type Concern,
  type CurrentRoutine,
  type SkinType,
  type TimeCommitment,
} from "@/lib/quiz";

const SKIN_TYPES: SkinType[] = ["dry", "oily", "combination", "sensitive", "unsure"];
const CONCERNS: Concern[] = [
  "fine_lines",
  "dark_spots",
  "acne",
  "dullness",
  "dryness",
  "large_pores",
  "redness",
  "uneven_texture",
];
const ROUTINES: CurrentRoutine[] = [
  "none",
  "cleanser_only",
  "cleanser_moisturizer",
  "full_routine",
  "whatever_sale",
];
const AGE_RANGES: AgeRange[] = ["under_25", "25_35", "36_45", "46_55", "55_plus"];
const TIME_COMMITMENTS: TimeCommitment[] = ["under_5", "5_10", "whatever_it_takes"];

function isString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

function isEmail(v: unknown): v is string {
  return typeof v === "string" && /.+@.+\..+/.test(v);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name;
  const email = body.email;
  const skin_type = body.skin_type;
  const concerns = body.concerns;
  const current_routine = body.current_routine;
  const age_range = body.age_range;
  const time_commitment = body.time_commitment;

  if (!isString(name)) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!isEmail(email)) return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  if (!SKIN_TYPES.includes(skin_type as SkinType))
    return NextResponse.json({ error: "Invalid skin_type." }, { status: 400 });
  if (
    !Array.isArray(concerns) ||
    concerns.length === 0 ||
    concerns.some((c) => !CONCERNS.includes(c as Concern))
  )
    return NextResponse.json({ error: "Invalid concerns." }, { status: 400 });
  if (!ROUTINES.includes(current_routine as CurrentRoutine))
    return NextResponse.json({ error: "Invalid current_routine." }, { status: 400 });
  if (!AGE_RANGES.includes(age_range as AgeRange))
    return NextResponse.json({ error: "Invalid age_range." }, { status: 400 });
  if (!TIME_COMMITMENTS.includes(time_commitment as TimeCommitment))
    return NextResponse.json({ error: "Invalid time_commitment." }, { status: 400 });

  const answers: QuizAnswers = {
    skin_type: skin_type as SkinType,
    concerns: concerns as Concern[],
    current_routine: current_routine as CurrentRoutine,
    age_range: age_range as AgeRange,
    time_commitment: time_commitment as TimeCommitment,
  };

  const recommendation = buildRecommendation(answers);

  const webhook = await postToWebhook(process.env.N8N_QUIZ_WEBHOOK_URL, {
    name,
    email,
    ...answers,
    submitted_at: new Date().toISOString(),
  });

  if (!webhook.ok) {
    console.error("Quiz webhook failed:", webhook.error);
  }

  return NextResponse.json({
    success: true,
    results: { recommendation },
  });
}
