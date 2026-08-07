# LEDKASA Corporate Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a fast, multi-page Turkish B2B LED equipment website that exports as static files for Plesk.

**Architecture:** Astro statically renders reusable layouts, components, content data and route templates into `dist/`. A PHP endpoint is copied unchanged into the output for the quote form. Product, navigation and SEO data is defined centrally so every detail page shares one source of truth.

**Tech Stack:** Astro, vanilla TypeScript/JavaScript, CSS, Node test runner, Plesk PHP.

## Global Constraints

- Turkish-language, B2B, quotation-led site; do not fabricate pricing, stock, certifications, addresses or customer references.
- Use only local, rights-cleared imagery; optimize assets and avoid hotlinking.
- Honor `prefers-reduced-motion`, keyboard navigation and semantic HTML.
- Publish from `dist/` after `npm run build`.

---

### Task 1: Foundation and validated content data

**Files:**
- Create: `package.json`, `astro.config.mjs`, `src/data/site.ts`, `tests/site-data.test.mjs`
- Modify: `.gitignore`

- [ ] Write Node tests that assert two product families, nine unique product slugs and absolute canonical URLs.
- [ ] Run `npm test` and verify the test fails because `src/data/site.ts` is absent.
- [ ] Add the product/content configuration with `Product` and `ProductCategory` interfaces.
- [ ] Add Astro build scripts and run tests until green.
- [ ] Commit: `feat: add Astro site foundation and product data`.

### Task 2: Shared rendering shell and navigation

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/Breadcrumbs.astro`, `src/styles/global.css`, `public/site.js`
- Test: `tests/render-contract.test.mjs`

- [ ] Write tests that require the two product category labels and all nine detail URLs in the navigation source.
- [ ] Run the tests and observe the expected missing-component failure.
- [ ] Implement semantic header, accessible desktop mega menu, mobile accordion, footer and page metadata/schema helpers.
- [ ] Implement Escape, focus and reduced-motion behavior in the shared JavaScript.
- [ ] Run tests and Astro build successfully.
- [ ] Commit: `feat: add accessible site shell and navigation`.

### Task 3: Product and conversion pages

**Files:**
- Create: `src/pages/urunler/index.astro`, `src/pages/urunler/[category]/index.astro`, `src/pages/urunler/[category]/[slug].astro`, `src/components/ProductCard.astro`, `src/components/QuoteCta.astro`, `src/pages/teklif-al.astro`, `public/contact.php`
- Test: `tests/routes.test.mjs`

- [ ] Write route tests for 2 category pages, 9 product pages, unique product title output and form honeypot handling.
- [ ] Run tests to verify route and form artifacts are absent.
- [ ] Render product listing/category/detail routes, breadcrumbs, related products and price-free Product schema.
- [ ] Add a consent-gated quote form with client validation and a PHP handler using a configurable recipient.
- [ ] Build and run tests.
- [ ] Commit: `feat: add product catalog and quote workflow`.

### Task 4: Corporate content and editorial discovery

**Files:**
- Create: `src/pages/index.astro`, `src/pages/hakkimizda.astro`, `src/pages/uygulama-alanlari/index.astro`, `src/pages/uygulama-alanlari/[slug].astro`, `src/pages/bilgi-merkezi/index.astro`, `src/pages/bilgi-merkezi/[slug].astro`, `src/pages/sss.astro`, `src/data/articles.ts`
- Test: `tests/content-pages.test.mjs`

- [ ] Write tests for the three application pages and five published information articles.
- [ ] Run tests to verify they fail before templates exist.
- [ ] Build the animated three-slide homepage, application pages, five evergreen articles, about page and visible FAQ sections.
- [ ] Add only evidence-neutral claims and centralize business contact placeholders.
- [ ] Run tests and build.
- [ ] Commit: `feat: add corporate and knowledge-center pages`.

### Task 5: SEO, legal pages, assets and deployment output

**Files:**
- Create: `public/robots.txt`, `public/favicon.svg`, `public/manifest.webmanifest`, `src/pages/404.astro`, `src/pages/kvkk-aydinlatma.astro`, `src/pages/gizlilik-politikasi.astro`, `src/pages/cerez-politikasi.astro`, `README.md`
- Modify: `astro.config.mjs`, asset references and metadata helpers
- Test: `tests/seo-output.test.mjs`

- [ ] Write output tests for sitemap, robots, canonical tags, JSON-LD, 404 page and no broken local image paths.
- [ ] Run tests to confirm missing SEO/deployment artifacts fail.
- [ ] Add sitemap integration/configuration, legal-template pages, Web App Manifest, social assets and asset optimization.
- [ ] Add Plesk upload, PHP recipient and HTTPS redirect instructions to README.
- [ ] Run all tests, build, static-link audit and browser checks.
- [ ] Commit: `feat: complete SEO and Plesk deployment package`.
