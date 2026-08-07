# Task 6 report — mobile navigation layout

## Root cause

At the mobile breakpoint, `.mobile-nav` was a `position: fixed` descendant of
the filtered sticky `.site-header`. That header establishes a containing block,
so the open panel used the header's box rather than the viewport and did not
paint with a usable height.

## Red evidence

The new focused layout contract was run before the CSS repair:

```text
node --test tests/mobile-nav-layout.test.mjs
FAIL open mobile navigation paints below the sticky header at the mobile breakpoint
Expected: /position:\\s*absolute\\s*;/
Actual:   position: fixed; inset: var(--header-height) 0 0;
```

## Green evidence

- The panel is now absolutely positioned one border-width below the sticky
  header and has `height: calc(100dvh - var(--header-height) - 1px)`,
  preserving its own vertical scrolling.
- Real in-app-browser verification at 390 × 844 after opening the menu:

```json
{
  "header": { "top": 0, "height": 81, "bottom": 81 },
  "nav": { "top": 81, "height": 763, "bottom": 844, "position": "absolute" },
  "links": [
    { "text": "Ana Sayfa", "visible": true },
    { "text": "Tüm Ürünler", "visible": true },
    { "text": "Kategoriyi incele", "visible": true }
  ]
}
```

- At the 1024 px desktop breakpoint, browser inspection reported
  `desktopDisplay: "flex"`, `mobileDisplay: "none"`, `mobileHidden: true`, and
  `toggleExpanded: "false"`.

## Verification

```text
node --test tests/mobile-nav-layout.test.mjs  → 1 passed
npm test                                     → 36 passed, 0 failed
npm run build                                → exit 0, 31 static pages built
```
