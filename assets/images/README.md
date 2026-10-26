# Website images

Upload photos here using **exactly these file names**. Until a file exists, the
site shows a grey placeholder labelled with the path it expects.

| File | Where it shows | Suggested size |
| --- | --- | --- |
| `hero.jpg` | Top of home page (coach / client collage) | 900 × 1050 (portrait) |
| `og-image.jpg` | Preview image when the link is shared on WhatsApp / social | 1200 × 630 |
| `transformations/client-1.jpg` … `client-6.jpg` | "Real people. Real results." before/after photos | 600 × 750 (portrait) |
| `recipes/recipe-1.jpg` … `recipe-4.jpg` | "Fat loss with simple recipes" | 600 × 600 (square) |
| `reviews/review-1.jpg` … `review-3.jpg` | YouTube / Instagram review thumbnails | 640 × 360 (16:9) |

- To add more client photos or reviews, add a line in `js/config.js`
  (`transformations` / `reviews`) and upload the matching image.
- Keep photos under ~300 KB each (compress with https://squoosh.app) so the site loads fast on mobile.
- Use `.jpg` names as listed. If you use `.png`/`.webp`, update the path in `index.html` or `js/config.js`.
