export type SkinType =
  | "dry"
  | "oily"
  | "combination"
  | "sensitive"
  | "unsure";

export type Concern =
  | "fine_lines"
  | "dark_spots"
  | "acne"
  | "dullness"
  | "dryness"
  | "large_pores"
  | "redness"
  | "uneven_texture";

export type CurrentRoutine =
  | "none"
  | "cleanser_only"
  | "cleanser_moisturizer"
  | "full_routine"
  | "whatever_sale";

export type AgeRange = "under_25" | "25_35" | "36_45" | "46_55" | "55_plus";

export type TimeCommitment = "under_5" | "5_10" | "whatever_it_takes";

export interface QuizAnswers {
  skin_type: SkinType;
  concerns: Concern[];
  current_routine: CurrentRoutine;
  age_range: AgeRange;
  time_commitment: TimeCommitment;
}

export interface RoutineStep {
  step: string;
  why: string;
}

export interface RoutineRecommendation {
  headline: string;
  summary: string;
  morning: RoutineStep[];
  evening: RoutineStep[];
  habits: string[];
}

const SKIN_TYPE_LABEL: Record<SkinType, string> = {
  dry: "dry",
  oily: "oily",
  combination: "combination",
  sensitive: "sensitive",
  unsure: "balanced",
};

export function buildRecommendation(answers: QuizAnswers): RoutineRecommendation {
  const { skin_type, concerns, current_routine, age_range, time_commitment } = answers;
  const skinLabel = SKIN_TYPE_LABEL[skin_type];

  const morning: RoutineStep[] = [
    {
      step: "Gentle cleanser",
      why:
        skin_type === "dry" || skin_type === "sensitive"
          ? "A creamy, non-stripping cleanser keeps your moisture barrier intact."
          : skin_type === "oily"
            ? "A gel or foaming cleanser clears overnight oil without over-drying."
            : "A mild cleanser wakes up your skin without disrupting balance.",
    },
  ];

  if (concerns.includes("dark_spots") || concerns.includes("dullness")) {
    morning.push({
      step: "Vitamin C serum",
      why: "Brightens, evens tone, and boosts your SPF's antioxidant protection.",
    });
  }

  if (concerns.includes("redness") || skin_type === "sensitive") {
    morning.push({
      step: "Soothing serum (niacinamide or centella)",
      why: "Calms visible redness and strengthens a reactive moisture barrier.",
    });
  }

  morning.push({
    step: "Moisturizer",
    why:
      skin_type === "oily"
        ? "A light, oil-free lotion hydrates without clogging."
        : "A nourishing moisturizer locks in hydration for the day ahead.",
  });

  morning.push({
    step: "Broad-spectrum SPF 30+",
    why: "The single most effective anti-aging and brightening step you can take. Non-negotiable.",
  });

  const evening: RoutineStep[] = [
    {
      step: "Cleanse (double-cleanse if wearing makeup or SPF)",
      why: "Lifts sunscreen, makeup, and the day off your skin so treatments can work.",
    },
  ];

  if (concerns.includes("acne") || concerns.includes("large_pores")) {
    evening.push({
      step: "Gentle exfoliant 2–3x/week (BHA or AHA)",
      why: "Dissolves buildup inside pores and smooths texture over time.",
    });
  }

  if (
    concerns.includes("fine_lines") ||
    age_range === "36_45" ||
    age_range === "46_55" ||
    age_range === "55_plus"
  ) {
    evening.push({
      step: "Retinol or peptide serum",
      why: "Encourages cell turnover and supports firmer, smoother-looking skin.",
    });
  }

  if (concerns.includes("dryness") || skin_type === "dry") {
    evening.push({
      step: "Hydrating serum (hyaluronic acid)",
      why: "Pulls moisture into the skin before you seal it in.",
    });
  }

  evening.push({
    step: "Night moisturizer or cream",
    why: "Supports overnight repair — the time when your skin does its best work.",
  });

  if (concerns.includes("fine_lines") || age_range === "46_55" || age_range === "55_plus") {
    evening.push({
      step: "Eye cream",
      why: "The skin around your eyes is thinner and benefits from targeted care.",
    });
  }

  const habits: string[] = [
    "Drink water throughout the day — skin hydration starts from the inside.",
    "Change your pillowcase at least twice a week.",
    "Give any new product 4–6 weeks before judging results.",
  ];
  if (concerns.includes("redness") || skin_type === "sensitive") {
    habits.push("Patch-test new products on your inner arm for 48 hours first.");
  }
  if (time_commitment === "under_5") {
    habits.push(
      "On busy mornings, cleanser + moisturizer + SPF is enough — don't skip the SPF.",
    );
  }

  const simplifyForTime =
    time_commitment === "under_5" && current_routine !== "full_routine";

  const headline =
    skin_type === "unsure"
      ? "A gentle, balanced routine to start with"
      : `A routine designed for your ${skinLabel} skin`;

  const focusParts = concerns.slice(0, 2).map(concernLabel);
  const focusText = focusParts.length
    ? ` with a focus on ${formatList(focusParts)}`
    : "";

  const summary = simplifyForTime
    ? `Since time is tight, this is a streamlined ${skinLabel}-skin routine${focusText}. Start with the essentials and layer in extras as they become habit.`
    : `Here's a personalized routine for your ${skinLabel} skin${focusText}. Consistency matters more than complexity — small daily steps add up quickly.`;

  return {
    headline,
    summary,
    morning,
    evening,
    habits,
  };
}

function concernLabel(c: Concern): string {
  switch (c) {
    case "fine_lines":
      return "fine lines and firmness";
    case "dark_spots":
      return "dark spots and tone";
    case "acne":
      return "breakouts and clarity";
    case "dullness":
      return "brightness";
    case "dryness":
      return "hydration";
    case "large_pores":
      return "smooth texture";
    case "redness":
      return "calming redness";
    case "uneven_texture":
      return "smooth texture";
  }
}

function formatList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
