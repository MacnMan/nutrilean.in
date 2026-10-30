# Website images

Until an image file exists, the site shows a light-blue placeholder labelled with
the path it expects.

## Optimised images (WebP)

Client photos, recipe photos and `money-back` are stored as WebP in two sizes so phones download the small one:

- `<name>.webp` — 800 px wide (desktop / retina)
- `<name>-400.webp` — 400 px wide (mobile)

Reference only the 800 px file in `js/config.js`; the site picks the right size
automatically. Send new photos to Claude (put them in the `images/` folder) and they
will be converted and added.

## Other images (still placeholders)

| File | Where it shows | Suggested size |
| --- | --- | --- |
| `hero.jpg` | Top of home page (coach / client collage) | 900 × 1050 (portrait) |
| `og-image.jpg` | Preview when the link is shared on WhatsApp / social | 1200 × 630 |
| `reviews/review-1.jpg` … `review-3.jpg` | YouTube / Instagram review thumbnails | 640 × 360 (16:9) |
