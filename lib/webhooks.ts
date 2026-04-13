export type WebhookResult =
  | { ok: true }
  | { ok: false; error: string };

export async function postToWebhook(
  url: string | undefined,
  payload: unknown,
): Promise<WebhookResult> {
  if (!url) {
    return { ok: false, error: "Webhook URL is not configured." };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `Webhook responded ${response.status}`,
      };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Webhook request failed.",
    };
  }
}
