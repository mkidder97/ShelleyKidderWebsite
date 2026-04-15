# n8n Workflows — Shelley Kidder Marketing Funnel

Phase 1 automation workflows for the Shelley Kidder skincare marketing funnel.

> **Deployed state (2026-04-14):** All four flows are consolidated into a single active workflow on `https://mkidder97.app.n8n.cloud/` (id `5MbQgUFtIPURGhfQ`). The JSON files in this directory were the original per-workflow scaffolds — the live source of truth is the n8n UI. Email delivery is handled by **Resend** (not Brevo — docs below reflect the deployed stack).

## Workflows (all combined in one n8n workflow)

| # | Entry point | What It Does |
|---|-------------|--------------|
| 01 | `POST /webhook/shelley-quiz-submit` | Upserts lead in Supabase, sends Resend results email to visitor, Resend notification to Michael |
| 02 | `POST /webhook/shelley-contact-form` | Resend email to Michael, Resend auto-reply to sender, upserts contact in `leads` table |
| 03 | `POST /webhook/shelley-calendly` *(see §5 below — needs to be wired up)* | Looks up lead by email, marks as `consultation_booked`, creates `consultations` row, emails Michael + Mom |
| 04 | `POST /webhook/shelley-sale-logged` | Inserts `sales` row with retail/wholesale/net/25% cut, updates lead to `customer`, emails Michael with breakdown |

## Prerequisites

### 1. Supabase Tables

Run [`schema.sql`](./schema.sql) in Supabase → SQL Editor. It creates `leads`, `consultations`, `sales` with UTM columns and RLS enabled for the service role.

### 2. n8n Credentials to Configure

#### Supabase Credential
- **Name:** `Supabase - Kidder Systems`
- **Host:** `https://nhpasiedrcbgtrffhagr.supabase.co`
- **Service Role Key:** Supabase → Project Settings → API → `service_role` secret

#### Resend Credential (Header Auth)
- **Name:** `Resend — Kidder Systems`
- **Type:** Header Auth
- **Name field:** `Authorization`
- **Value:** `Bearer re_YOUR_KEY` (from https://resend.com → API Keys)

All 8 HTTP Request nodes pointing at `api.resend.com/emails` should use this credential under **Authentication → Generic → Header Auth**. Remove any literal `Authorization` header rows.

### 3. Resend Domain Verification

In Resend → **Domains → Add Domain**, verify:
- `shelleykidder.com` — sender for `hello@shelleykidder.com`
- `kiddersystems.com` — sender for `notifications@kiddersystems.com`

Add the DKIM/SPF DNS records Resend shows to each registrar. Wait for **Verified** status before testing.

### 4. Placeholder Strings to Replace

In the deployed workflow, search the JSON bodies for these literal strings and replace:

| Placeholder | Replace with | Where |
|-------------|--------------|-------|
| `<__PLACEHOLDER_VALUE__Resend API Key__>` | Remove — credential handles it | All Resend nodes |
| `<__PLACEHOLDER_VALUE__Calendly booking URL__>` | Shelley's Calendly link | `Send Results Email via Resend`, `Auto-Reply — Contact` |
| `<__PLACEHOLDER_VALUE__Mom's Email__>` | Shelley's real email | `Email Mom — Booking` |

### 5. Calendly Webhook (currently unwired)

The `Format Booking Data` → `Lookup Lead — Calendly` → … → `Email Mom — Booking` branch exists but has **no trigger**. To activate:

**Option A — Calendly Pro webhook:**
1. In n8n: add a **Webhook** node (path `shelley-calendly`, method POST) and connect it to `Format Booking Data`.
2. In Calendly → Integrations → Webhooks → Create Subscription:
   - URL: `https://mkidder97.app.n8n.cloud/webhook/shelley-calendly`
   - Events: `invitee.created`, `invitee.canceled`

**Option B — no Calendly Pro:** Use n8n's built-in **Calendly Trigger** node (OAuth auth) in place of the new Webhook node.

### 6. Known Fixes Needed in the Live Workflow

Before activating production webhooks:

- **`Upsert Contact Lead`** node has empty params. Set `Table: leads`, operation `upsert`, conflict column `email`, and map `first_name/last_name/email/source='contact'/status='new'/notes=message`.
- **UTM expressions in `Insert Lead → Supabase`** currently reference `$('Format Lead Data').item.json.body.utm_*`, which won't resolve (the Set node doesn't carry `body`). Change each to `$('Quiz Submission Webhook').item.json.body.utm_*`.

## Webhook URLs (already live)

| Env Variable | Production URL |
|--------------|----------------|
| `N8N_QUIZ_WEBHOOK_URL` | `https://mkidder97.app.n8n.cloud/webhook/shelley-quiz-submit` |
| `N8N_CONTACT_WEBHOOK_URL` | `https://mkidder97.app.n8n.cloud/webhook/shelley-contact-form` |
| *(sale-logging form — CRM portal only)* | `https://mkidder97.app.n8n.cloud/webhook/shelley-sale-logged` |
| *(Calendly — see §5 to enable)* | `https://mkidder97.app.n8n.cloud/webhook/shelley-calendly` |

Set the first two in the website's Vercel project env + `.env.local`.

## Testing Checklist

### Workflow 01 — Quiz Pipeline
```bash
curl -X POST https://mkidder97.app.n8n.cloud/webhook-test/shelley-quiz-submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "test@example.com",
    "skin_type": "combination",
    "concerns": ["fine lines", "dullness"],
    "current_routine": "cleanser + moisturizer",
    "age_range": "36-45",
    "time_commitment": "5-10 minutes"
  }'
```
**Verify:** Lead appears in Supabase `leads` table, quiz results email arrives at the submitter's inbox via Resend, Michael gets a notification email.

### Workflow 02 — Contact Form
```bash
curl -X POST https://mkidder97.app.n8n.cloud/webhook-test/shelley-contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Smith",
    "email": "sarah@example.com",
    "message": "Hi Shelley! I am interested in booking a group beauty event for my bridal party."
  }'
```
**Verify:** Michael gets email, sender gets auto-reply via Resend, contact row upserted into `leads` with `source='contact'`.

### Workflow 03 — Consultation Booked
Once the Calendly webhook is wired per §5, create a real Calendly test booking. Verify: `leads.status` flips to `consultation_booked`, a `consultations` row is created, and Michael + Mom both get emails.

### Workflow 04 — Sale Logged
```bash
curl -X POST https://mkidder97.app.n8n.cloud/webhook-test/shelley-sale-logged \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Jane Doe",
    "customer_email": "test@example.com",
    "date": "2026-04-15",
    "amount_retail": 150.00,
    "amount_wholesale": 75.00,
    "products": "TimeWise Set, Foundation",
    "source": "funnel",
    "is_repeat": false,
    "notes": "First purchase from quiz funnel"
  }'
```
**Verify:** Sale in Supabase `sales` table, lead status updated to "customer", Michael gets email with revenue breakdown showing $18.75 as 25% cut.

## Architecture

```
[Shelley's Website]                      [Calendly]            [CRM Portal]
     |                                        |                      |
     |-- Quiz Submit --> [WF 01] ---> Supabase (leads) ---> Resend (results + notify)
     |-- Contact -----> [WF 02] ---> Supabase (leads) ---> Resend (Michael + auto-reply)
     |
     |                           [Calendly Webhook] --> [WF 03] --> Supabase (consultations) --> Resend (Michael + Mom)
     |
     |                                              Sale Form -> [WF 04] --> Supabase (sales) --> Resend (Michael w/ 25% cut)
```

All error outputs funnel through a single `Error Catcher → Email Error Alert` branch that pings `michael@kidder.systems`.
