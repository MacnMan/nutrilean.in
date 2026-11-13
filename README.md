# nutrilean.in

Website for **nutrilean.in — Get fit with Piyush**. A static site (HTML, CSS, vanilla JS) with no build step,
hosted on GitHub + Vercel.

## Pages.

- `index.html` — home page: offer banner, hero, client transformations, simple recipes,
  consultation path, why choose us, Fat Loss Programme, what happens after you join, YouTube/Instagram reviews.
- `book.html` — 4-step "Book counselling" form (details → goal → health conditions → past attempts).

## Editing content

Most things you'll change regularly live in **`js/config.js`**:

- WhatsApp number, phone, email
- Offer banner text (e.g. Diwali sale) — set `offer.active: false` to hide it
- Instagram / YouTube links
- Client transformation photos and captions
- Review video links
- `formEndpoint` — optional Google Sheet to collect bookings (see `docs/google-apps-script.js`)

Text on the page itself is in `index.html`. Images: see [`assets/images/README.md`](assets/images/README.md).

## Where bookings go

After the form is submitted the visitor sees a **Continue on WhatsApp** button that opens a chat with
all their answers pre-filled. If `formEndpoint` is set, the answers are also saved to your Google Sheet.

## Run locally

```bash
npx serve .
```

Then open http://localhost:3000.

## Deploy (GitHub + Vercel)

1. Push this repo to GitHub.
2. On https://vercel.com → **Add New → Project** → import the repo.
3. Framework preset: **Other**. Leave build command and output directory empty. Click **Deploy**.
4. In the Vercel project → **Settings → Domains**, add `nutrilean.in` and `www.nutrilean.in`
   and set the DNS records Vercel shows at your domain registrar.

Every push to `main` redeploys automatically.
