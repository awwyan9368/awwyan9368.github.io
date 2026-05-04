# RawReach Agency Website

Premium SMMA website for RawReach with separate Home, Services, Reviews, About Us, Contact, Privacy, and Terms routes.

## Publish on Vercel

1. Upload this repository folder to GitHub.
2. Open Vercel and choose `Add New Project`.
3. Import the GitHub repository.
4. Keep the framework preset as `Other`.
5. Leave the build command empty.
6. Deploy.

Vercel will serve the static pages from `public` and the backend endpoints from `api`.

## Run Locally

```powershell
npm start
```

The server uses port `4173` by default. Override it with `PORT`.

```powershell
$env:PORT=8080; npm start
```

## Backend

The project includes two backend modes:

- Local Node server through `server.js`
- Vercel serverless functions through `api/contact.js` and `api/review.js`

The backend includes:

- Static page serving with route aliases such as `/services` and `/contact`
- `/api/contact` for strategy call inquiries
- `/api/review` for moderated review intake
- `/healthz` for uptime checks
- Security headers
- Basic per-IP rate limiting
- Asset caching
- Optional multi-worker mode through `WEB_CONCURRENCY`

Local submissions are appended to:

- `data/inquiries.jsonl`
- `data/reviews.jsonl`

On Vercel, submissions are written to function logs by default. To send every lead to Google Sheets, Zapier, Make, a CRM, or an email workflow, add this Vercel environment variable:

```text
LEAD_WEBHOOK_URL=https://your-webhook-url
```

For high-volume production traffic, connect the API to a managed database or CRM. A reverse proxy or Vercel's edge network can handle static traffic while the serverless functions handle form submissions.

## Contact Routing

- WhatsApp chatbot button: `+91 74520 18506`
- Business phone: `+91 93682 82289`
- Emails: `adminrawreach@gmail.com`, `ayanrawreachhr@gmail.com`
