# Task 5 report — SEO, legal pages, assets and deployment output

## Scope and result

Task 5 was implemented from base commit `7d43ba3`. The project now emits a Plesk-ready static `dist/` package with sitemap, robots policy, canonical/social metadata, JSON-LD, legal template pages, a noindex 404 page, manifest/favicon, the PHP contact handler and local optimized assets.

The pre-existing `.gitignore`, `docs/`, `.superpowers/` and `task-4-rereview.md` changes were not edited or included in the Task 5 commit.

## TDD evidence

The production change that `tests/seo-output.test.mjs` protects is a deployable build silently losing SEO artifacts, metadata, routes or local assets.

1. Added output tests before implementation.
2. Ran `node --test tests/seo-output.test.mjs` against the original implementation.
3. Observed the expected RED result: **0 passed, 7 failed**. Missing items were `robots.txt`, sitemap output, legal routes, `/iletisim/`, `404.html`, manifest/favicon, optimized WebP/editorial assets and source attribution. The local-link assertion also exposed the existing broken footer routes.
4. Implemented only after the failing output was observed.
5. Re-ran the same command and observed **7 passed, 0 failed**.

The SEO tests perform a real Astro production build in a temporary output directory and assert the generated behavior rather than source text. They cover:

- exact sitemap route inventory and 404 exclusion;
- robots-to-sitemap linkage;
- canonical, `tr-TR` alternate, local Open Graph image and JSON-LD on every indexable page;
- absence of `LocalBusiness` schema;
- noindex 404 output;
- manifest, favicon and `contact.php` output;
- every rendered local link/image target;
- WebP format and maximum 1400 px long edge;
- three rights-cleared editorial source pages and no competitor attribution.

## SEO and route output

Canonical host: `https://ledkasa.com.tr` (non-www). `@astrojs/sitemap` is configured with trailing slashes and filters the 404 route.

Build artifacts:

- `/robots.txt`
- `/sitemap-index.xml`
- `/sitemap-0.xml`
- `/favicon.svg`
- `/manifest.webmanifest`
- `/contact.php`
- `/404.html` (`noindex, nofollow`)
- `/assets/attributions.md`

The sitemap contains these 30 indexable routes:

- `/`, `/hakkimizda/`, `/iletisim/`, `/sss/`, `/teklif-al/`
- `/kvkk-aydinlatma/`, `/gizlilik-politikasi/`, `/cerez-politikasi/`
- `/urunler/`, both category routes and all 9 product routes
- `/uygulama-alanlari/` and all 3 application routes
- `/bilgi-merkezi/` and all 5 article routes

Every indexable route emits Organization and WebSite nodes plus the existing applicable WebPage/CollectionPage/AboutPage/ContactPage/Breadcrumb/Product/Article nodes. Product output still omits price, availability and offers. `LocalBusiness` is intentionally absent because a verified address and phone are unavailable.

## Legal and contact pages

Created Turkish template pages for KVKK disclosure, privacy and cookies. Each page states that it is a general template requiring company-specific completion and legal review. No company address, tax identifier, named officer, cookie vendor or analytics-use claim was invented.

Created `/iletisim/` because the shared footer already linked to that route and the original plan includes a contact page. It publishes only the verified `info@ledkasa.com.tr` email and explicitly leaves phone/location unpublished until verified.

## Asset pipeline and sources

Existing root `assets/` source files were preserved. `scripts/optimize-assets.mjs` uses `sharp@0.35.3` to produce public WebP copies with auto-rotation, maximum 1400 × 1400 inside fit, no enlargement and quality 84. It verifies each output before removing only the known superseded public PNG/JPG copies. Result: **14 verified WebP files** (9 products, 2 categories, 3 editorial images).

Exact editorial sources, all marked free under the Unsplash License when checked on 2026-08-07:

1. Araceli Magaña — concert stage with large screens  
   Source: https://unsplash.com/photos/concert-stage-with-blue-lights-and-large-screens-L6Wu14LSMU8  
   License: https://unsplash.com/license
2. Cova Software — retail display with digital screens  
   Source: https://unsplash.com/photos/retail-store-display-with-products-and-screens-G9sAr2jBkM8  
   License: https://unsplash.com/license
3. ThisisEngineering — electronics workshop/soldering  
   Source: https://unsplash.com/photos/person-holding-blue-and-black-plastic-toy-IpTPp_aPbYE  
   License: https://unsplash.com/license

The downloaded originals are retained under `assets/editorial/`; optimized copies are under `public/assets/images/editorial/`. These photos are used only on application, about and knowledge pages. No competitor product photo was downloaded or used. Full attribution is recorded in `public/assets/attributions.md` and ships in `dist/assets/attributions.md`.

## Commands and results

- `npm view @astrojs/sitemap version` → `3.7.3`
- `npm view sharp version` → `0.35.3`
- `npm install --save-dev @astrojs/sitemap@3.7.3 sharp@0.35.3` → installed successfully; versions are pinned exactly in `package.json`
- Unsplash downloads via `Invoke-WebRequest` from the three `/download?force=true&w=1800` endpoints → 3 local source JPG files
- `npm run assets:optimize` → `Optimized and verified 14 local WebP assets.`
- initial `node --test tests/seo-output.test.mjs` → 0/7 passed, expected missing-artifact failures
- final `node --test tests/seo-output.test.mjs` → 7/7 passed
- initial `npm test` → Astro cache race on Windows because three build suites wrote `.astro/` concurrently; no assertion regression was indicated
- changed the test runner to `--test-concurrency=1` so production-build suites use the shared Astro cache safely
- final `npm test` → **34 passed, 0 failed**
- `npm run build` → **31 pages built**, sitemap index created, exit 0
- static output audit (Node, against `dist/`) → **31 HTML files, 1,881 local references, 14 WebP images and 3 cited editorial sources; 0 broken targets**
- browser desktop check → title/H1 rendered, 11 homepage images, mega menu expanded with 12 links, no console errors
- browser application check → `/uygulama-alanlari/etkinlik-ve-sahne/` rendered correct title/H1; local editorial WebP loaded at natural width 1400; no console errors
- browser 404 check → unknown URL rendered the custom title/H1 and `noindex, nofollow`; no console errors
- browser mobile check at 390 × 844 → no horizontal overflow, mobile toggle visible, desktop nav hidden
- `npm audit --omit=dev` → **0 vulnerabilities** in the deployed runtime package
- `npm audit --json` → 3 advisories in the Astro 5 development/build toolchain (1 low, 2 high); npm proposes a major Astro 7 upgrade. The deployed `dist/` contains no Astro server runtime. A framework-major upgrade was not mixed into Task 5.

## Browser caveat outside Task 5

The mobile browser check found a pre-existing Task 4 layout defect: the mobile navigation becomes expanded in the DOM and focus behavior tests pass, but it paints at zero height in the browser. The cause is the fixed `.mobile-nav` being contained by `.site-header`, which establishes a containing block through `backdrop-filter`. The header close icon appears while the hero remains visible.

This was reported to the parent task and intentionally not changed in Task 5. The planned focused fix is to make the mobile panel absolute below the sticky header with viewport-height sizing, or move it outside the filtered header, then add a browser/layout regression check.

## Deployment caveats

- DNS still needs to resolve `ledkasa.com.tr` to `194.36.84.221`; live TLS and redirects cannot be verified before propagation.
- Deploy only the contents produced by `npm run build`; set the Plesk document root to the uploaded `dist` directory.
- Configure `LEDKASA_CONTACT_RECIPIENT` in the domain's PHP-FPM environment and verify real mail delivery plus SPF/DKIM. The code falls back to `info@ledkasa.com.tr` when the variable is absent or invalid.
- Obtain a Let's Encrypt certificate for the root domain and `www` only after both DNS names resolve correctly.
- Use Plesk's HTTPS and preferred-domain 301 controls. No arbitrary `.htaccess` redirect was added because the actual Apache/nginx stack is not yet confirmed.
- Submit `https://ledkasa.com.tr/sitemap-index.xml` to Google Search Console only after DNS, certificate and canonical redirects are live.
- The three legal pages remain transparent templates until verified company details and a company-specific legal review are available.
