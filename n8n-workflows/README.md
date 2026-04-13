# n8n Workflows — Shelley Kidder Marketing Funnel

Phase 1 automation workflows for the Shelley Kidder skincare marketing funnel. Import these JSON files directly into your n8n instance.

## Workflows

| # | File | Trigger | What It Does |
|---|------|---------|--------------|
| 01 | `01-quiz-to-lead-pipeline.json` | POST webhook from quiz form | Creates lead in Supabase, adds to Brevo email list, sends personalized quiz results email, notifies Michael |
| 02 | `02-contact-form-notification.json` | POST webhook from contact form | Emails Michael, auto-replies to sender, adds contact to Brevo |
| 03 | `03-consultation-booked-notification.json` | POST webhook from Calendly | Updates lead status, creates consultation record in Supabase, emails Michael, notifies Mom |
| 04 | `04-sale-logged-revenue-tracking.json` | POST webhook from sale log form | Inserts sale into Supabase, updates lead to "customer", emails Michael with revenue breakdown (including 25% cut) |

## Prerequisites

### 1. Supabase Tables

These workflows expect the following tables in your Supabase project (`nhpasiedrcbgtrffhagr`). Create them using the schema from the Tech Stack Notion page or run these SQL statements:

```sql
-- Leads table
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text,
  last_name text,
  email text UNIQUE,
  phone text,
  source text DEFAULT 'quiz',
  quiz_answers jsonb,
  skin_type text,
  top_concerns text[],
  status text DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Consultations table
CREATE TABLE public.consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id),
  scheduled_date timestamptz,
  completed boolean DEFAULT false,
  outcome text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Sales table
CREATE TABLE public.sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id),
  consultation_id uuid REFERENCES public.consultations(id),
  date date,
  amount_retail numeric,
  amount_wholesale numeric,
  net_profit numeric GENERATED ALWAYS AS (amount_retail - amount_wholesale) STORED,
  products text,
  source text DEFAULT 'funnel',
  is_repeat boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

-- Service role has full access (n8n uses service role key)
CREATE POLICY "Service role full access" ON public.leads FOR ALL USING (true);
CREATE POLICY "Service role full access" ON public.consultations FOR ALL USING (true);
CREATE POLICY "Service role full access" ON public.sales FOR ALL USING (true);
```

### 2. n8n Credentials to Configure

After importing each workflow, you'll need to set up credentials. The JSON files reference placeholder credential names — replace these with your actual credentials.

#### Supabase Credential
- **Name:** `Supabase - Kidder Systems`
- **Host:** `https://nhpasiedrcbgtrffhagr.supabase.co`
- **Service Role Key:** (from Supabase → Project Settings → API → service_role secret)

#### Brevo Credential
- **Name:** `Brevo - Kidder Systems`
- **API Key:** (from Brevo → SMTP & API → API Keys → Generate)

### 3. Brevo Email Lists

Create these lists in Brevo before activating workflows:

| List ID | Name | Purpose |
|---------|------|---------|
| 2 | Quiz Leads | People who completed the skincare quiz |
| 3 | Contact Form | People who submitted the contact form |

### 4. Brevo Sender Verification

Verify these sender emails in Brevo (Settings → Senders & IPs → Add a sender):
- `hello@shelleykidder.com` (or whatever domain you pick for Shelley)
- `notifications@kiddersystems.com`

### 5. Calendly Webhook (Workflow 03)

In Calendly:
1. Go to Integrations → Webhooks (requires Calendly Pro plan, or use Zapier free tier as bridge)
2. Add webhook URL: `https://YOUR_N8N_INSTANCE/webhook/shelley-calendly-webhook`
3. Subscribe to event: `invitee.created`

If Calendly Pro isn't available, alternative: use n8n's built-in Calendly trigger node instead of the webhook node (swap the first node).

### 6. Notification Webhooks

The notification nodes use HTTP Request to send alerts. Options:

**Option A: Slack Incoming Webhook**
1. Create a Slack app → Enable Incoming Webhooks
2. Add webhook to a channel (e.g., `#shelley-leads`)
3. Set the webhook URL in n8n as environment variable `NOTIFICATION_WEBHOOK_URL`

**Option B: Email Only**
If you don't use Slack, just delete the "Notify Michael (Slack/Webhook)" and "Notify Mom (Slack/SMS Webhook)" nodes. The Brevo email notifications will still fire.

**Option C: SMS via Twilio**
Replace the HTTP Request notification nodes with Twilio nodes to send SMS to Mom.

## How to Import

1. Open your n8n instance
2. Click **+ Add Workflow** (or from the workflow list)
3. Click the **three dots menu (⋯)** in the top right → **Import from File**
4. Select the JSON file
5. Configure credentials (click each node with a ⚠️ warning)
6. Test with the **Test URL** first (not the Production URL)
7. Once tested, toggle the workflow to **Active** to enable the Production URL

## Webhook URLs

After importing, n8n will generate webhook URLs. Use these in your environment variables:

| Env Variable | Workflow | Where to Put It |
|-------------|----------|-----------------|
| `N8N_QUIZ_WEBHOOK_URL` | 01 | ShelleyKidderWebsite `.env.local` |
| `N8N_CONTACT_WEBHOOK_URL` | 02 | ShelleyKidderWebsite `.env.local` |

Workflows 03 and 04 are triggered by Calendly and the sale-logging form (which will be built into the CRM portal), so they don't need env vars in the website.

## Testing Checklist

### Workflow 01 — Quiz Pipeline
```bash
curl -X POST https://YOUR_N8N/webhook-test/shelley-quiz-submit \
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
**Verify:** Lead appears in Supabase `leads` table, contact created in Brevo list 2, quiz results email sent, Michael notified.

### Workflow 02 — Contact Form
```bash
curl -X POST https://YOUR_N8N/webhook-test/shelley-contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Smith",
    "email": "sarah@example.com",
    "message": "Hi Shelley! I am interested in booking a group beauty event for my bridal party."
  }'
```
**Verify:** Michael gets email, sender gets auto-reply, contact added to Brevo list 3.

### Workflow 03 — Consultation Booked
Test by creating a real Calendly test booking, or manually POST the Calendly payload format to the webhook test URL.

### Workflow 04 — Sale Logged
```bash
curl -X POST https://YOUR_N8N/webhook-test/shelley-sale-logged \
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

## Architecture Diagram

```
[Shelley's Website]                    [Calendly]              [CRM Portal]
     |                                      |                       |
     |--- Quiz Submit ---> [WF 01] -------> Supabase (leads)       |
     |--- Contact Form --> [WF 02] -------> Brevo (contacts)       |
     |                          |                                    |
     |                     [Calendly Webhook] --> [WF 03] --------> Supabase (consultations)
     |                                                               |
     |                                              Sale Form ----> [WF 04] --> Supabase (sales)
     |                                                               |
     |                                                          Email Notifications
     |                                                          (Michael + Mom)
```
