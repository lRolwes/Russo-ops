# ROC Group website (russo-ops.com)

Next.js site for Russo Operational Consulting Group, rebuilt from the approved ChatGPT review build
(roc-group-website.erusso1223.chatgpt.site). Hosted on Vercel; job listings, contact details and
site-manager logins live in a Neon Postgres database connected through Vercel (`DATABASE_URL`).

## Site manager — `/admin`

ROC signs in at **/admin** with email and password to:

- add, edit, close or delete **Opportunities** (shown on `/jobs`, each with its own page and Google Jobs data)
- change the **contact phone and email** shown across the site (the forms also send to this address)
- change their own **password**

Listings marked Published appear immediately; Draft and Closed stay off the site; a listing with a closing
date drops off automatically after that date.

### Database setup (once)

Neon console → the project → **SQL Editor** → paste all of `db/schema.sql` → Run.

### Giving someone access / resetting a password

In the Neon SQL Editor (passwords are stored as bcrypt hashes, never plain text):

```sql
-- add a login
insert into admins (email, password_hash)
values ('person@example.com', crypt('their-password', gen_salt('bf', 10)));

-- reset a forgotten password
update admins set password_hash = crypt('new-password', gen_salt('bf', 10))
where lower(email) = 'person@example.com';

-- remove access
delete from admins where lower(email) = 'person@example.com';
```

## Where to edit the code

| File | What it holds |
| --- | --- |
| `app/site-content.ts` | All service, industry, federal, candidate and about-page copy |
| `app/site-shell.tsx` | Header, footer, homepage, page templates, job pages, contact and talent-network forms |
| `app/globals.css` | The full visual system (colors, layout, responsive rules) |
| `app/admin/` | The site manager (login, opportunities, contact details, password) |
| `lib/auth.ts` | Sign-in and sessions (database-backed, httpOnly cookie) |
| `lib/data.ts` | Public database reads (with safe fallbacks if the database is unreachable) |
| `db/schema.sql` | Database tables |
| `next.config.ts` | Permanent redirects from old Webflow URLs |
| `public/` | ROC logo, mark, favicon and social-preview image |

## Run locally

```bash
npm install
npm run dev
```

Without `DATABASE_URL` the public site still runs (no listings, default contact details); add it to
`.env.local` to work on the site manager.

## Deploy

Push to `main`; Vercel builds and deploys automatically. Public pages are cached and refresh hourly, and
immediately whenever something is saved in the site manager.

## Forms

Both forms open the visitor's email app with a message addressed to the contact email above (same behavior as
the approved build). Submissions are not stored.
