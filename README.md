# Athul Sudhakaran · Portfolio

A Vite and React portfolio with a homepage, a project index and case studies, an About page, and a contact page.

## Development and hosting

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Publish the contents of `dist/` on a static host that serves directory indexes. The build renders the public routes to HTML so direct links and crawlers can read the pages without JavaScript. Configure the host to serve `404.html` for missing routes. Set `VITE_SITE_URL` to the production origin before building to generate canonical URLs, a sitemap, and its robots.txt entry.

## Contact form

Vercel runs `api/contact.js` at `/api/contact`. The form sends directly through Resend and sets the visitor's email as the reply address. Add these settings under the Vercel project's Environment Variables and redeploy.

- `RESEND_API_KEY` (required) — a Resend sending key. Keep it server-side.
- `CONTACT_FROM_EMAIL` — sender on a domain you verified in Resend, for example `Portfolio <contact@example.com>`. The default test sender, `onboarding@resend.dev`, can deliver only to the email associated with your Resend account.
- `CONTACT_TO_EMAIL` — destination inbox. Defaults to the email in `src/content.js`.

Use `vercel dev` to run the function locally. Plain Vite serves the UI. To use a different JSON form endpoint, set `VITE_CONTACT_ENDPOINT` to its public URL at build time.

## Portfolio content

Projects, work history, contact links, and the resume link live in `src/content.js`. Use each project's `live` and `github` properties when public links are available. The featured work uses responsive WebP versions of the supplied screenshots. Older imported case-study URLs are still accessible and excluded from indexing.
