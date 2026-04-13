import { NextResponse } from "next/server";
import { postToWebhook } from "@/lib/webhooks";

function isString(v: unknown, min = 1): v is string {
  return typeof v === "string" && v.trim().length >= min;
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

  const { name, email, message } = body;

  if (!isString(name)) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!isEmail(email)) return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  if (!isString(message, 5))
    return NextResponse.json({ error: "Please include a short message." }, { status: 400 });

  const webhook = await postToWebhook(process.env.N8N_CONTACT_WEBHOOK_URL, {
    name,
    email,
    message,
    submitted_at: new Date().toISOString(),
  });

  if (!webhook.ok) {
    console.error("Contact webhook failed:", webhook.error);
    return NextResponse.json(
      { error: "We couldn't deliver your message. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
