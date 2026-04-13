# Shelley Kidder Personal Brand Website — Build Spec

## Project Overview

Build a personal brand website for **Shelley Kidder**, a Mary Kay Independent Sales Director based in Holiday, Florida. This is **NOT** a Mary Kay website — it's a personal brand site that positions Shelley as a skincare and beauty expert who happens to sell Mary Kay products. The distinction is critical for MK compliance.

This site is **Layer 1 of an automated marketing funnel** managed through the Kidder Client Portal CRM. The funnel flow:

```
See content on social → Visit profile → Click link in bio → Land on THIS site
→ Take skincare quiz → Enter email nurture sequence → Book consultation
→ Shelley closes the sale → Revenue tracked in CRM
```

**Client:** Shelley Kidder (Client #1 for Kidder Systems LLC)
**Builder:** Michael Kidder (Kidder Systems LLC)
**Revenue Model:** 25% of net revenue (retail minus MK wholesale cost) from funnel-attributed sales
**Her role:** Record content bi-weekly, show up to consultations, close sales
**Your role (Michael):** Build and maintain everything else

---

## Mary Kay Compliance Rules (MUST FOLLOW — NON-NEGOTIABLE)

These rules come directly from Mary Kay's Internet Guidelines and Independent Beauty Consultant Agreement. Violating these could result in termination of Shelley's Mary Kay Agreement.

### What is NOT allowed on this website:
- No Mary Kay logos, trademarks, or trade names anywhere (except the one approved link — see below)
- No Mary Kay product images — do not use any images from marykay.com or MK marketing materials
- No Mary Kay product names (e.g., TimeWise, Botanical Effects, etc.) — these are trademarked
- No pricing of Mary Kay products
- No product claims that haven't been tested/supported by the company
- No implication that Mary Kay endorses this website
- No replication of any content from her MK Personal Web Site
- No selling or displaying Mary Kay products directly on this site
- No earnings claims or income representations
- No mention of the career car program without required disclaimers
- Do not create a browser or border environment around MK Personal Website material

### What IS allowed:
- A personal website about Shelley as a person, beauty expert, and entrepreneur
- Her personal story, photos of herself (not MK products), testimonials about HER (not MK products)
- General skincare tips and beauty advice (not tied to specific MK products)
- A booking/contact system for personalized beauty consultations
- Her own original content, photos, and text
- Links to her social media accounts
- A **single link** to her MK Personal Web Site using ONLY one of these approved link texts:
  - "Shop online with me, your Mary Kay Independent Beauty Consultant"
  - "Interested in a free makeover? Visit me, your Mary Kay Independent Beauty Consultant"
  - "Beauty is just a click away! Visit me, your Mary Kay Independent Beauty Consultant"
  - "Shop twenty-four hours a day! Visit me, your Mary Kay Independent Beauty Consultant"

### The linking site must NOT:
- Advertise or represent her Mary Kay business other than through approved link texts
- Imply Mary Kay Inc. is endorsing its contents
- Use any company trademarks or trade names other than those in approved link texts
- Contain offensive, controversial, or distasteful content
- Disparage Mary Kay Inc. or its products
- Present false or misleading information about Mary Kay or the MK career opportunity

---

## About Shelley

- **Name:** Shelley Kidder
- **Location:** Holiday, Florida
- **MK Title:** Independent Sales Director (do NOT use this on the website — use "Beauty & Skincare Consultant" or "Skincare Expert" instead)
- **Bio:** Shelley began with Mary Kay for the discount, but quickly turned her passion into a full-time career. Now she helps others feel confident through personalized beauty experiences and high-quality skincare.
- **Tone:** Warm, approachable, confident, genuine — a real person who cares about helping women feel beautiful, not a corporate sales pitch
- **Target audience:** Women in the Tampa Bay / Pasco County area (and virtually anywhere) who want personalized skincare guidance

---

## Tech Stack

- **Framework:** Next.js (App Router) — matches the Kidder Client Portal stack
- **Styling:** Tailwind CSS v4
- **Deployment:** Vercel (auto-deploy from main branch)
- **Analytics:** Vercel Analytics (built-in, free)
- **Forms:** Server actions or API routes (no external form services needed)
- **Quiz:** Custom-built skincare quiz (not Typeform — keep it on-site for better UX and data capture)
- **Email integration:** Brevo API (via n8n webhook — the site just POSTs form data to an n8n webhook URL)
- **Booking:** Calendly embed for consultation scheduling
- **Domain:** TBD (Shelley will choose — candidates: shelleykidder.com, beautybyshelley.com, or similar)

### Why Next.js (not plain React/HTML)
- Same stack as the Kidder Client Portal — shared knowledge, shared patterns
- Server components for SEO (critical for local search)
- API routes for quiz submission, contact form, webhook triggers
- Easy Vercel deployment
- Future-proof for adding a blog with MDX or CMS integration

---

## Site Structure & Pages

### Page 1: Landing Page (`/`) — The Funnel Entry Point

This is the primary conversion page. Every design decision serves one goal: **get the visitor to take the skincare quiz.**

#### Section 1: Hero
- Her name prominently: "Shelley Kidder"
- Tagline: "Your Personal Beauty & Skincare Consultant" or "Helping You Feel Confident in Your Own Skin"
- Subtitle: "Based in Holiday, Florida | Serving clients locally & virtually"
- Primary CTA button: "Find Your Perfect Routine" (links to quiz)
- Secondary CTA: "Book a Free Consultation" (links to booking section)
- Color palette: Warm, inviting — soft rose/blush tones, cream/ivory, gold accents, charcoal text. **Avoid hot pink or anything resembling official MK branding.**

#### Section 2: How It Works
- Step 1: Take the free 2-minute skincare quiz
- Step 2: Get your personalized routine recommendation
- Step 3: Book a free consultation to go deeper
- Clean icons, minimal text, clear flow

#### Section 3: About / Her Story
- Adapt her bio into a warm personal narrative:
  - Started her beauty journey looking for quality skincare for herself
  - Fell in love with helping other women discover what works for their skin
  - Now a full-time skincare and beauty consultant and team mentor
  - Passionate about personalized recommendations — not one-size-fits-all
  - Based in Holiday, FL, serving clients in person and virtually
- Do NOT mention "Mary Kay" in this section
- Photo placeholder (she'll provide her own photos)

#### Section 4: What I Offer / Services
- **Personalized Skincare Consultation** — "I'll help you find the perfect routine for your skin type, concerns, and lifestyle. Whether you're dealing with dryness, aging, sensitivity, or just want to refresh your routine — I've got you."
- **Virtual Beauty Experience** — "Can't meet in person? No problem. I host fun, interactive virtual beauty sessions for you and your friends."
- **Group Beauty Events** — "Perfect for girls' nights, bridal parties, birthdays, or team bonding. I bring the products, the expertise, and the fun."
- **One-on-One Mentoring** — "Interested in building your own beauty business? I mentor women who want to turn their passion for beauty into income."

#### Section 5: Testimonials
- Placeholder testimonial cards (Shelley will fill in real ones):
  - "Shelley helped me find a skincare routine that finally works for my sensitive skin. I've never felt more confident!" — [Name, Location]
  - "The virtual beauty party Shelley hosted for my bridal shower was so much fun. Everyone loved it!" — [Name, Location]
  - "I was overwhelmed by all the skincare options out there. Shelley made it simple and personal." — [Name, Location]

#### Section 6: Skincare Tips / Blog Preview
- 3-4 placeholder cards for future blog posts:
  - "5 Morning Skincare Habits That Changed My Skin"
  - "How to Build a Skincare Routine That Actually Works"
  - "Why Your Moisturizer Might Not Be Enough"
  - "Skincare Myths I Wish I'd Stopped Believing Sooner"
- These are general beauty content — NO Mary Kay product mentions
- Each card links to `/blog/[slug]` (Phase 2 — for now just anchor to the section)

#### Section 7: Shop With Me (THE COMPLIANT LINK)
- A small, tasteful section — NOT the main focus of the site
- Text: "Ready to explore the products I love and recommend?"
- The actual link must use one of the approved texts EXACTLY. Use:
  - **"Shop online with me, your Mary Kay Independent Beauty Consultant"**
- Link to: `https://www.marykay.com/shelley-kidder` (placeholder — Shelley will provide her actual MK Personal Web Site URL)
- This is the ONLY place "Mary Kay" should appear on the entire site

#### Section 8: Book a Consultation
- Calendly embed (or placeholder for Calendly embed)
- "I'd love to hear from you! Whether you have a skincare question, want to book a consultation, or are curious about hosting a beauty event — reach out."
- Simple contact form as backup: name, email, message
- Contact form submits to an API route that POSTs to n8n webhook

#### Section 9: Footer
- © 2026 Shelley Kidder. All rights reserved.
- Links to: Facebook, Instagram, TikTok
- **Disclaimer (required):** "This is an independent personal website and is not endorsed by, affiliated with, or sponsored by any specific brand."
- Privacy policy link (placeholder page)

### Page 2: Skincare Quiz (`/quiz`)

This is the **primary lead capture mechanism** — the most important conversion page on the site.

#### Quiz Flow:
1. **Welcome screen:** "Find Your Perfect Skincare Routine" — warm intro, takes 2 minutes
2. **Question 1:** What's your skin type? (Dry / Oily / Combination / Sensitive / Not sure)
3. **Question 2:** What are your top skin concerns? (Select up to 3: Fine lines & wrinkles / Dark spots / Acne & breakouts / Dullness / Dryness / Large pores / Redness / Uneven texture)
4. **Question 3:** What does your current skincare routine look like? (I don't really have one / Cleanser only / Cleanser + moisturizer / Full routine — cleanser, toner, serum, moisturizer, SPF / I use whatever's on sale)
5. **Question 4:** What's your age range? (Under 25 / 25-35 / 36-45 / 46-55 / 55+)
6. **Question 5:** How much time do you want to spend on skincare daily? (Under 5 minutes / 5-10 minutes / I'll do whatever it takes)
7. **Capture screen:** "Your personalized routine is ready!" — Enter name + email to see results
8. **Results screen:** Personalized routine recommendation based on answers (general skincare advice, NOT specific MK products — compliance). CTA: "Want to go deeper? Book a free consultation."

#### Technical:
- Multi-step form with progress indicator
- Smooth transitions between questions
- Mobile-first (most traffic will be from social media on phones)
- On submit: POST to `/api/quiz` which saves to local state and triggers n8n webhook
- Store quiz answers in URL params or session so results page can render without a database call
- Results page has strong CTA to book consultation

### Page 3: Privacy Policy (`/privacy`)
- Standard privacy policy placeholder
- Mention: data collection (name, email from quiz), use (personalized recommendations, email communication), no selling of data

---

## Design System

### Color Palette
- **Primary:** Soft rose/blush (`#D4A5A5` or similar warm pink)
- **Secondary:** Cream/ivory (`#FFF8F0`)
- **Accent:** Muted gold (`#C9A96E`)
- **Text:** Charcoal (`#2D2D2D`)
- **Light text:** Warm gray (`#6B6B6B`)
- **Background:** White to cream gradient
- **Avoid:** Hot pink, magenta, anything that looks like official MK branding

### Typography
- **Headings:** Elegant serif (Playfair Display, Cormorant Garamond, or similar from Google Fonts)
- **Body:** Clean sans-serif (Inter, DM Sans, or similar)
- **Scale:** Clear hierarchy — large hero text, medium section headers, readable body

### Imagery
- Use placeholder image areas that Shelley can replace with her own photos
- For now: tasteful gradient backgrounds, abstract beauty-themed patterns, or soft blurred backgrounds
- Photo slots should be clearly marked: "REPLACE: Your headshot here", "REPLACE: Consultation photo", etc.
- All images should use Next.js `<Image>` component for optimization

### Layout
- Mobile-first responsive design (most traffic from social media = phone users)
- Single-column on mobile, max-width container on desktop
- Generous whitespace — elegant, not cluttered
- Smooth scroll between sections
- Subtle animations on scroll (fade-in, not flashy)

---

## API Routes

### `POST /api/quiz`
Receives quiz submission, triggers n8n webhook.

```typescript
// Request body
{
  name: string;
  email: string;
  skin_type: string;
  concerns: string[];
  current_routine: string;
  age_range: string;
  time_commitment: string;
}

// Action: POST to n8n webhook URL (env var: N8N_QUIZ_WEBHOOK_URL)
// Response: { success: true, results: { routine_recommendation: string } }
```

### `POST /api/contact`
Receives contact form submission, triggers n8n webhook.

```typescript
// Request body
{
  name: string;
  email: string;
  message: string;
}

// Action: POST to n8n webhook URL (env var: N8N_CONTACT_WEBHOOK_URL)
// Response: { success: true }
```

---

## Environment Variables

```
# n8n webhook URLs (Michael configures these)
N8N_QUIZ_WEBHOOK_URL=       # Webhook for quiz submissions
N8N_CONTACT_WEBHOOK_URL=    # Webhook for contact form

# Calendly
NEXT_PUBLIC_CALENDLY_URL=   # Shelley's Calendly scheduling page URL

# MK Personal Web Site (the one compliant link)
NEXT_PUBLIC_MK_SHOP_URL=    # https://www.marykay.com/shelley-kidder (placeholder)

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS=true
```

---

## What NOT to Build Yet (Phase 2+)

- Blog/CMS system (placeholder cards only for now)
- Supabase direct integration (n8n handles data flow to Supabase)
- Email sending (n8n + Brevo handles this)
- User accounts or login
- E-commerce or product catalog
- Admin dashboard (use the Kidder Client Portal CRM for this)

---

## Compliance Checklist (Verify Before Deploy)

- [ ] "Mary Kay" appears ONLY in the one approved shop link text
- [ ] No MK logos, product images, or trademarked product names anywhere
- [ ] No implication that Mary Kay endorses this site
- [ ] No product pricing or earnings claims
- [ ] No replication of MK Personal Web Site content
- [ ] Footer disclaimer about independent personal website is present
- [ ] The approved link text is used EXACTLY as written
- [ ] The site focuses on Shelley as a person/expert, not on Mary Kay as a brand
- [ ] Quiz recommendations are general skincare advice, not specific MK product names

---

## Folder Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata, analytics
│   ├── page.tsx            # Landing page (all sections)
│   ├── quiz/
│   │   └── page.tsx        # Skincare quiz (multi-step form)
│   ├── privacy/
│   │   └── page.tsx        # Privacy policy
│   └── api/
│       ├── quiz/
│       │   └── route.ts    # Quiz submission → n8n webhook
│       └── contact/
│           └── route.ts    # Contact form → n8n webhook
├── components/
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Testimonials.tsx
│   ├── BlogPreview.tsx
│   ├── ShopWithMe.tsx
│   ├── BookConsultation.tsx
│   ├── Footer.tsx
│   ├── QuizForm.tsx        # Multi-step quiz component
│   ├── QuizResults.tsx     # Personalized results display
│   └── ContactForm.tsx
├── lib/
│   └── webhooks.ts         # n8n webhook helper functions
├── public/
│   └── images/             # Placeholder images (Shelley replaces later)
├── tailwind.config.ts
├── next.config.ts
└── BUILDER.md              # This file
```

---

## Claude Code Instructions

When working on this project:
1. Read this BUILDER.md first for full context
2. Use Next.js App Router with server components where possible
3. Use Tailwind CSS v4 for all styling — no CSS modules or styled-components
4. Mobile-first responsive design throughout
5. Use Google Fonts for typography (Playfair Display + Inter recommended)
6. All images use Next.js `<Image>` component
7. Keep the quiz experience smooth — no full page reloads between questions
8. API routes are thin — just validate and forward to n8n webhooks
9. Use environment variables for all external URLs (webhook, Calendly, MK shop link)
10. Run the compliance checklist before considering the build complete
