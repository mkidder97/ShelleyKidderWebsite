import type { Metadata } from "next";
import { QuizForm } from "@/components/QuizForm";

export const metadata: Metadata = {
  title: "Skincare Quiz — Shelley Kidder",
  description:
    "Take the free 2-minute skincare quiz and get a personalized routine recommendation from Shelley Kidder.",
};

export default function QuizPage() {
  return (
    <main className="min-h-screen">
      <QuizForm />
    </main>
  );
}
