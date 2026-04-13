"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-blush-200 bg-white p-8 text-center">
        <h3 className="text-2xl text-charcoal">Thank you!</h3>
        <p className="mt-2 text-warm-gray">
          Your message is on its way. I&rsquo;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-charcoal">
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-xl border border-blush-100 bg-white px-4 py-3 text-charcoal placeholder:text-warm-gray-light focus:border-blush-400 focus:outline-none focus:ring-2 focus:ring-blush-200"
          placeholder="Jane"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-charcoal">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-blush-100 bg-white px-4 py-3 text-charcoal placeholder:text-warm-gray-light focus:border-blush-400 focus:outline-none focus:ring-2 focus:ring-blush-200"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-charcoal">
          How can I help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-blush-100 bg-white px-4 py-3 text-charcoal placeholder:text-warm-gray-light focus:border-blush-400 focus:outline-none focus:ring-2 focus:ring-blush-200"
          placeholder="Tell me about your skin goals, or just say hi!"
        />
      </div>
      {status === "error" && errorMessage && (
        <p className="rounded-xl bg-blush-50 px-4 py-3 text-sm text-blush-600">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-blush-500 px-8 py-4 text-base font-medium text-white shadow-sm transition hover:bg-blush-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
