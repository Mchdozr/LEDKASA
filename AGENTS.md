# LEDKASA

Static corporate marketing site (LED display cases & cabling) — plain HTML/CSS/JS with no build step or dependencies.

- `index.html` — single-page site (Turkish), sections: hero, ürünler (products), iletişim (contact).
- `style.css` — all styling.
- `script.js` — mobile nav toggle only.
- `assets/` — product images.

## Cursor Cloud specific instructions

- No package manager, build step, or dependencies. There is nothing to compile; "running" the app means serving the static files.
- Serve locally with a zero-dependency static server, e.g. `python3 -m http.server 8000` from the repo root, then open `http://localhost:8000/`. Node is also available (`npx serve`) but requires a network install.
- There is no lint/test/build tooling in this repo. Do not invent one unless the task asks for it.
