-- Shelley Kidder marketing funnel — Supabase schema
-- Run in: Supabase → SQL Editor → New query → paste → Run
-- Project: nhpasiedrcbgtrffhagr

-- ─────────────────────────────────────────────────────────────
-- Leads
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text,
  last_name text,
  email text UNIQUE NOT NULL,
  phone text,
  source text DEFAULT 'quiz',
  quiz_answers jsonb,
  skin_type text,
  top_concerns text,
  status text DEFAULT 'new',
  notes text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  first_touch_source text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads (email);
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads (status);

-- ─────────────────────────────────────────────────────────────
-- Consultations
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  scheduled_date timestamptz,
  calendly_event_uri text,
  completed boolean DEFAULT false,
  outcome text,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS consultations_lead_id_idx ON public.consultations (lead_id);

-- ─────────────────────────────────────────────────────────────
-- Sales
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  consultation_id uuid REFERENCES public.consultations(id) ON DELETE SET NULL,
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

CREATE INDEX IF NOT EXISTS sales_lead_id_idx ON public.sales (lead_id);
CREATE INDEX IF NOT EXISTS sales_date_idx ON public.sales (date);

-- ─────────────────────────────────────────────────────────────
-- RLS: service role only (n8n uses service role key)
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access" ON public.leads;
DROP POLICY IF EXISTS "Service role full access" ON public.consultations;
DROP POLICY IF EXISTS "Service role full access" ON public.sales;

CREATE POLICY "Service role full access" ON public.leads FOR ALL USING (true);
CREATE POLICY "Service role full access" ON public.consultations FOR ALL USING (true);
CREATE POLICY "Service role full access" ON public.sales FOR ALL USING (true);

-- ─────────────────────────────────────────────────────────────
-- updated_at auto-touch for leads
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_touch_updated_at ON public.leads;
CREATE TRIGGER leads_touch_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
