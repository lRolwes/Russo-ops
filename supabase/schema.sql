-- ROC website database: job listings, contact details, and who may manage them.
-- Run once in a new Supabase project: SQL Editor -> paste all -> Run.

-- ---------- Admin access ----------
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

-- Who may manage the site. A signed-in user who is not listed here can change nothing.
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
create policy "admins read own row" on public.admins
  for select to authenticated using (user_id = auth.uid());

create or replace function private.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

-- Emails listed here become admins automatically when their account is created.
create table private.admin_invites (email text primary key);
insert into private.admin_invites values ('erusso@russo-ops.com');

create or replace function private.grant_invited_admin() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if exists (select 1 from private.admin_invites where email = lower(new.email)) then
    insert into public.admins (user_id) values (new.id) on conflict do nothing;
  end if;
  return new;
end; $$;
revoke all on function private.grant_invited_admin() from public, anon, authenticated;

create trigger on_auth_user_created_grant_admin
  after insert on auth.users
  for each row execute function private.grant_invited_admin();

-- ---------- Shared helper ----------
create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end; $$;

-- ---------- Job listings shown on /jobs ----------
create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text not null default '',
  employment_type text not null default '',
  work_model text not null default '',
  travel text not null default '',
  clearance text not null default '',
  compensation text not null default '',
  summary text not null default '',
  details text not null default '',
  apply_url text not null default '',
  status text not null default 'draft' check (status in ('draft','published','closed')),
  posted_on date not null default current_date,
  closes_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.opportunities enable row level security;
create policy "public reads live listings" on public.opportunities
  for select to anon, authenticated
  using (status = 'published' and (closes_on is null or closes_on >= current_date));
create policy "admins read all" on public.opportunities
  for select to authenticated using ((select private.is_admin()));
create policy "admins insert" on public.opportunities
  for insert to authenticated with check ((select private.is_admin()));
create policy "admins update" on public.opportunities
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "admins delete" on public.opportunities
  for delete to authenticated using ((select private.is_admin()));
create trigger opportunities_touch before update on public.opportunities
  for each row execute function public.touch_updated_at();

-- ---------- Site-wide contact details (single row) ----------
create table public.site_settings (
  id int primary key default 1 check (id = 1),
  phone text not null,
  email text not null,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
create policy "public reads settings" on public.site_settings
  for select to anon, authenticated using (true);
create policy "admins update settings" on public.site_settings
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create trigger site_settings_touch before update on public.site_settings
  for each row execute function public.touch_updated_at();

insert into public.site_settings (phone, email) values ('(636) 515-5645', 'ERusso@Russo-Ops.com');
