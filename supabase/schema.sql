create extension if not exists "pgcrypto";

create type public.lead_status as enum ('new', 'researching', 'enriched', 'email_generated', 'sent', 'replied', 'meeting_booked', 'bounced');
create type public.email_kind as enum ('cold_email', 'follow_up_1', 'follow_up_2', 'linkedin_message');
create type public.email_status as enum ('draft', 'queued', 'sent', 'opened', 'replied', 'bounced');
create type public.campaign_status as enum ('draft', 'active', 'paused', 'completed');
create type public.subscription_plan as enum ('starter', 'growth', 'scale');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  plan public.subscription_plan not null default 'starter',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  description text,
  status public.campaign_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  name text not null,
  email text not null,
  company text not null,
  website text,
  linkedin_url text,
  status public.lead_status not null default 'new',
  enrichment jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, campaign_id, email)
);

create table public.research_data (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  lead_id uuid not null unique references public.leads(id) on delete cascade,
  company_description text,
  industry text,
  company_size text,
  products_services text[] not null default '{}',
  company_summary text,
  business_overview text,
  pain_points text[] not null default '{}',
  growth_opportunities text[] not null default '{}',
  business_goals text[] not null default '{}',
  outreach_angles text[] not null default '{}',
  source_url text,
  raw_response jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.emails (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  kind public.email_kind not null,
  subject text,
  body text not null,
  status public.email_status not null default 'draft',
  resend_message_id text,
  tracking_token uuid not null default gen_random_uuid(),
  sent_at timestamptz,
  opened_at timestamptz,
  replied_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.analytics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  campaign_id uuid unique references public.campaigns(id) on delete cascade,
  total_leads integer not null default 0,
  emails_generated integer not null default 0,
  emails_sent integer not null default 0,
  opens integer not null default 0,
  replies integer not null default 0,
  meetings_booked integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do update set email = excluded.email, full_name = excluded.full_name;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create trigger set_users_updated_at before update on public.users for each row execute procedure public.set_updated_at();
create trigger set_campaigns_updated_at before update on public.campaigns for each row execute procedure public.set_updated_at();
create trigger set_leads_updated_at before update on public.leads for each row execute procedure public.set_updated_at();
create trigger set_research_data_updated_at before update on public.research_data for each row execute procedure public.set_updated_at();
create trigger set_emails_updated_at before update on public.emails for each row execute procedure public.set_updated_at();
create trigger set_analytics_updated_at before update on public.analytics for each row execute procedure public.set_updated_at();

alter table public.users enable row level security;
alter table public.campaigns enable row level security;
alter table public.leads enable row level security;
alter table public.research_data enable row level security;
alter table public.emails enable row level security;
alter table public.analytics enable row level security;

create policy "Users can read themselves" on public.users for select using (auth.uid() = id);
create policy "Users can update themselves" on public.users for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Campaigns isolated by user" on public.campaigns for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Leads isolated by user" on public.leads for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Research isolated by user" on public.research_data for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Emails isolated by user" on public.emails for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Analytics isolated by user" on public.analytics for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index leads_user_campaign_idx on public.leads(user_id, campaign_id);
create index leads_user_status_idx on public.leads(user_id, status);
create index emails_user_lead_idx on public.emails(user_id, lead_id);
create index emails_tracking_token_idx on public.emails(tracking_token);
create index research_data_user_lead_idx on public.research_data(user_id, lead_id);

insert into storage.buckets (id, name, public)
values ('lead-uploads', 'lead-uploads', false)
on conflict (id) do nothing;

create policy "Users can manage own upload objects" on storage.objects
for all using (bucket_id = 'lead-uploads' and auth.uid()::text = (storage.foldername(name))[1])
with check (bucket_id = 'lead-uploads' and auth.uid()::text = (storage.foldername(name))[1]);
