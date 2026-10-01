# ROC Group website (russo-ops.com)

Next.js site for Russo Operational Consulting Group, rebuilt from the approved ChatGPT review build
(roc-group-website.erusso1223.chatgpt.site). Hosted on Vercel.

## Where to edit

| File | What it holds |
| --- | --- |
| `app/site-content.ts` | All service, industry, federal, candidate and about-page copy; phone and email |
| `app/site-shell.tsx` | Header, footer, homepage, page templates, contact and talent-network forms |
| `app/globals.css` | The full visual system (colors, layout, responsive rules) |
| `next.config.ts` | 301 redirects from old Webflow URLs |
| `public/` | ROC logo, mark, favicon and social-preview image |

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Push to `main`; Vercel builds and deploys automatically.

## Forms

Both forms currently open the visitor's email app with a message addressed to ERusso@Russo-Ops.com
(same behavior as the approved build). Nothing is stored server-side.
