# LeadGenius AI

LeadGenius AI is a production-oriented SaaS starter for AI-powered lead enrichment and personalized outbound email generation.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS dark-mode SaaS UI
- Supabase Auth, Postgres, RLS, and Storage policies
- OpenAI API for research, pain-point detection, email generation, and reply classification
- Resend API for outbound email delivery
- CSV ingestion with validation and per-user data isolation

## Core workflows

1. Users sign up or log in with Supabase email/password auth.
2. Users upload a CSV containing `Name`, `Email`, `Company`, `Website`, and `LinkedIn URL`.
3. Leads are stored in Supabase under a campaign.
4. The research route fetches the company website, calls OpenAI with structured prompts, stores enrichment data, and creates four drafts:
   - Cold email
   - Follow-up #1
   - Follow-up #2
   - LinkedIn message
5. Email drafts can be sent through Resend with open tracking pixels.
6. Replies can be classified through the reply classification API and update lead status.
7. Dashboard metrics show total leads, generated emails, sent emails, reply rate, and meetings booked.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Create a Supabase project, run `supabase/schema.sql`, and fill in the environment variables.

## Environment variables

See `.env.example` for all required values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- Rate-limit and CSV upload settings

## Database schema

The schema includes:

- `users`
- `campaigns`
- `leads`
- `research_data`
- `emails`
- `analytics`

RLS policies enforce user-level isolation on every application table. A Supabase auth trigger creates a `public.users` row on signup.

## Security notes

- All dashboard routes are protected by middleware.
- API routes require an authenticated Supabase session except open tracking pixels.
- RLS limits every table to `auth.uid() = user_id`.
- Upload routes enforce file type, file size, and row-level validation.
- API routes include a lightweight in-memory rate limiter suitable for a starter deployment; move counters to Redis or Upstash for horizontally scaled production.
- Raw CSV files are parsed in memory by default. A private `lead-uploads` bucket and user-scoped policy are included if you later persist uploads.
