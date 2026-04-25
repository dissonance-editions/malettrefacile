-- ============================================================
-- MaLettreFacile — Supabase schema
-- Run this in Supabase SQL Editor (Database → SQL Editor)
-- ============================================================

-- Profiles: extra info per auth user
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  default_address jsonb,
  -- Subscription
  plan text not null default 'free' check (plan in ('free', 'unit', 'premium')),
  premium_since timestamptz,
  premium_until timestamptz,
  stripe_customer_id text,
  stripe_subscription_id text,
  -- Quotas (resets monthly via cron / on first send of the month)
  quota_simple_remaining int not null default 0,
  quota_recommande_remaining int not null default 0,
  quota_period_start timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================
-- Mailings: postal mail sends history
-- ============================================================
create table if not exists public.mailings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- Letter info
  letter_slug text not null,
  letter_title text not null,
  -- Mail config
  mail_type text not null check (mail_type in ('simple', 'recommande', 'recommande_ar')),
  pages int not null default 1,
  sender_address jsonb not null,
  recipient_address jsonb not null,
  -- Provider
  provider text not null,
  provider_ref text,
  tracking_url text,
  -- Status
  status text not null default 'pending' check (status in (
    'pending', 'paid', 'in_production', 'sent', 'delivered', 'failed', 'refunded'
  )),
  -- Pricing (in cents)
  price_cents int not null,
  used_quota boolean not null default false,
  stripe_payment_intent_id text,
  -- Audit
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  sent_at timestamptz,
  delivered_at timestamptz
);

alter table public.mailings enable row level security;

create policy "Users can view own mailings"
  on public.mailings for select
  using (auth.uid() = user_id);

-- Inserts/updates only via service role (server-side)


-- ============================================================
-- Leads: emails captured via free download
-- ============================================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  letter_slug text,
  opt_in_marketing boolean not null default true,
  format text,
  source text default 'free_download',
  created_at timestamptz default now()
);

alter table public.leads enable row level security;
-- No public read; only server-side via service role.


-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_mailings_user on public.mailings(user_id, created_at desc);
create index if not exists idx_mailings_status on public.mailings(status);
create index if not exists idx_leads_email on public.leads(email);
