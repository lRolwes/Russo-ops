-- ROC website database (Neon / any Postgres): job listings, contact details, site-manager logins.
-- Run once: Neon console -> SQL Editor -> paste all -> Run.

create extension if not exists pgcrypto;

-- People who can sign in to /admin. Passwords are stored as bcrypt hashes, never as plain text.
create table admins (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);
create unique index admins_email_key on admins (lower(email));

-- Signed-in sessions. Only a SHA-256 hash of each browser's session token is stored.
create table admin_sessions (
  token_hash text primary key,
  admin_id uuid not null references admins(id) on delete cascade,
  expires_at timestamptz not null
);
create index admin_sessions_admin on admin_sessions (admin_id);

-- Job listings shown on /jobs
create table opportunities (
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

-- Site-wide contact details (single row)
create table site_settings (
  id int primary key default 1 check (id = 1),
  phone text not null,
  email text not null,
  updated_at timestamptz not null default now()
);
insert into site_settings (phone, email) values ('(636) 515-5645', 'ERusso@Russo-Ops.com');

-- ---------------------------------------------------------------------------------------------
-- Add a site-manager login (run separately, with the real password in place of CHANGE-ME):
--
--   insert into admins (email, password_hash)
--   values ('erusso@russo-ops.com', crypt('CHANGE-ME', gen_salt('bf', 10)));
--
-- Reset a forgotten password:
--
--   update admins set password_hash = crypt('NEW-PASSWORD', gen_salt('bf', 10))
--   where lower(email) = 'erusso@russo-ops.com';
-- ---------------------------------------------------------------------------------------------
