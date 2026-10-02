# ROC Group website (russo-ops.com)

Next.js site for Russo Operational Consulting Group, rebuilt from the approved ChatGPT review build
(roc-group-website.erusso1223.chatgpt.site). Hosted on Vercel; job listings and contact details live in
Supabase (project `roc-website`, ref `kvnxzppebqbaxnqybzie`).

## Site manager — `/admin`

ROC signs in at **/admin** with email and password to:

- add, edit, close or delete **Opportunities** (shown on `/jobs`, each with its own page and Google Jobs data)
- change the **contact phone and email** shown across the site (the forms also send to this address)
- change their own **password**

Listings marked Published appear immediately; Draft and Closed stay off the site; a listing with a closing
date drops off automatically after that date.

### Giving someone access

1. Supabase dashboard → `roc-website` → Authentication → Users → **Add user** → enter email + password,
   tick **Auto Confirm User**.
2. SQL Editor → run (with their email):

   ```sql
   insert into public.admins (user_id) select id from auth.users where email = 'person@example.com';
   ```

To remove access: `delete from public.admins where user_id = (select id from auth.users where email = '...');`

Recommended once: Authentication → Sign In / Providers → turn **off** "Allow new users to sign up".
(Even with it on, a self-registered account cannot change anything — only users in `admins` can.)

Forgot password: reset it in Supabase → Authentication → Users → the user's "…" menu.

## Where to edit the code

| File | What it holds |
| --- | --- |
| `app/site-content.ts` | All service, industry, federal, candidate and about-page copy |
| `app/site-shell.tsx` | Header, footer, homepage, page templates, job pages, contact and talent-network forms |
| `app/globals.css` | The full visual system (colors, layout, responsive rules) |
| `app/admin/` | The site manager (login, opportunities, contact details, password) |
| `lib/data.ts` | Public database reads (with safe fallbacks if the database is unreachable) |
| `next.config.ts` | Permanent redirects from old Webflow URLs |
| `public/` | ROC logo, mark, favicon and social-preview image |

Database security is enforced by row-level security policies: the public can read only live listings and
the contact details; only users in `public.admins` can write.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Push to `main`; Vercel builds and deploys automatically. A daily Vercel cron calls `/api/keepalive` so the
free Supabase project never pauses for inactivity.

## Forms

Both forms open the visitor's email app with a message addressed to the contact email above (same behavior as
the approved build). Submissions are not stored.
