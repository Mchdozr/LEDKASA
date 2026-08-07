import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { after, before, test } from 'node:test';
import vm from 'node:vm';

const projectRoot = resolve(import.meta.dirname, '..');
const outputRoot = mkdtempSync(join(tmpdir(), 'ledkasa-content-pages-'));

const applicationRoutes = [
  ['etkinlik-ve-sahne', 'Etkinlik ve Sahne'],
  ['magaza-ve-showroom', 'Mağaza ve Showroom'],
  ['kurumsal-ve-reklam', 'Kurumsal ve Reklam'],
];

const articleRoutes = [
  ['led-ekran-kasasi-nasil-secilir', 'LED Ekran Kasası Nasıl Seçilir?'],
  ['rental-led-ekran-kurulum-rehberi', 'Rental LED Ekran Kurulum Rehberi'],
  ['poster-led-ekran-kullanim-alanlari', 'Poster LED Ekran Kullanım Alanları'],
  ['led-ekran-kablolama-rehberi', 'LED Ekran Kablolama Rehberi'],
  ['kasa-secimi-cnc-kapaksiz-rental-kabinet', 'CNC, Kapaksız ve Rental Kabinet Karşılaştırması'],
];

const builtHtml = (route = '') =>
  readFileSync(resolve(outputRoot, ...route.split('/').filter(Boolean), 'index.html'), 'utf8');

before(() => {
  const build = spawnSync(process.execPath, ['node_modules/astro/astro.js', 'build', '--outDir', outputRoot], {
    cwd: projectRoot,
    encoding: 'utf8',
  });
  assert.equal(build.status, 0, `Astro build failed:\n${build.stdout}\n${build.stderr}`);
});

after(() => rmSync(outputRoot, { recursive: true, force: true }));

test('homepage renders one heading and exactly three progressively enhanced, user-controlled slides', () => {
  const html = builtHtml();
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((html.match(/data-hero-slide\b/g) ?? []).length, 3);
  assert.equal((html.match(/<img[^>]+src="\/assets\/images\/products\//g) ?? []).length >= 3, true);
  assert.match(html, /data-hero-previous/);
  assert.match(html, /data-hero-next/);
  assert.match(html, /data-hero-pause/);
  assert.doesNotMatch(html, /data-hero-slide[^>]+hidden/);
  assert.match(html, /Projenizi üç adımda netleştirelim/);
  assert.match(html, /Sık sorulan sorular/);
});

test('build emits all three application routes with unique canonical URLs and useful catalog links', () => {
  const titles = new Set();

  for (const [slug, heading] of applicationRoutes) {
    const html = builtHtml(`uygulama-alanlari/${slug}`);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title?.includes(heading), `missing title for ${slug}`);
    assert.equal(titles.has(title), false, `duplicate title: ${title}`);
    titles.add(title);
    assert.match(html, new RegExp(`<h1[^>]*>\\s*${heading}\\s*</h1>`));
    assert.match(html, new RegExp(`https://ledkasa\\.com\\.tr/uygulama-alanlari/${slug}/`));
    assert.match(html, /href="\/urunler\//);
    assert.match(html, /aria-label="Sayfa yolu"/);
  }

  assert.equal(titles.size, 3);
});

test('build emits five evergreen articles with unique metadata, breadcrumbs and contextual links', () => {
  const titles = new Set();

  for (const [slug, heading] of articleRoutes) {
    const html = builtHtml(`bilgi-merkezi/${slug}`);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title?.includes(heading), `missing title for ${slug}`);
    assert.equal(titles.has(title), false, `duplicate title: ${title}`);
    titles.add(title);
    assert.match(html, new RegExp(`<h1[^>]*>\\s*${heading.replace('?', '\\?')}\\s*</h1>`));
    assert.match(html, new RegExp(`https://ledkasa\\.com\\.tr/bilgi-merkezi/${slug}/`));
    assert.match(html, /aria-label="Sayfa yolu"/);
    assert.match(html, /href="\/urunler\//);
    assert.match(html, /href="\/teklif-al\/"/);
  }

  assert.equal(titles.size, 5);
});

test('corporate, discovery and FAQ pages publish evidence-neutral content and email-only contact', () => {
  const routes = ['', 'hakkimizda', 'uygulama-alanlari', 'bilgi-merkezi', 'sss'];
  const combinedHtml = routes.map((route) => builtHtml(route)).join('\n');

  assert.match(builtHtml('hakkimizda'), /Çalışma yaklaşımımız/);
  assert.match(builtHtml('uygulama-alanlari'), /Etkinlik ve Sahne/);
  assert.match(builtHtml('bilgi-merkezi'), /LED Ekran Kasası Nasıl Seçilir\?/);
  assert.match(builtHtml('sss'), /<details[\s\S]*?<summary>/);
  assert.match(combinedHtml, /info@ledkasa\.com\.tr/);
  assert.doesNotMatch(combinedHtml, /FAQPage|sameAs|telephone|WhatsApp|Sertifikalarımız|Referanslarımız/);
  assert.doesNotMatch(combinedHtml, /\+90\s*\(?\d{3}\)?|\b\d{3}[ .-]\d{3}[ .-]\d{2}[ .-]\d{2}\b/);
});

test('hero keeps automatic advancing disabled under reduced motion while manual controls remain available', () => {
  const listeners = new Map();
  const makeElement = () => {
    const attributes = new Map();
    const elementListeners = new Map();
    return {
      hidden: false,
      textContent: '',
      classList: { add() {}, remove() {}, toggle() {} },
      addEventListener(type, listener) { elementListeners.set(type, listener); },
      dispatch(type) { elementListeners.get(type)?.({}); },
      getAttribute(name) { return attributes.get(name) ?? null; },
      setAttribute(name, value) { attributes.set(name, String(value)); },
      matches() { return true; },
    };
  };

  const slides = [makeElement(), makeElement(), makeElement()];
  const previous = makeElement();
  const next = makeElement();
  const pause = makeElement();
  const status = makeElement();
  const hero = makeElement();
  hero.querySelectorAll = (selector) => selector === '[data-hero-slide]' ? slides : [];
  hero.querySelector = (selector) => ({
    '[data-hero-previous]': previous,
    '[data-hero-next]': next,
    '[data-hero-pause]': pause,
    '[data-hero-status]': status,
  })[selector] ?? null;

  const header = makeElement();
  header.querySelector = () => null;
  header.querySelectorAll = () => [];
  header.contains = () => false;

  const reducedMotion = {
    matches: true,
    addEventListener(type, listener) { if (type === 'change') listeners.set('motion', listener); },
  };
  const desktopMedia = { matches: false, addEventListener() {} };
  const document = {
    activeElement: null,
    hidden: false,
    body: { classList: { toggle() {} } },
    documentElement: { dataset: {}, classList: { add() {}, remove() {} } },
    addEventListener() {},
    querySelector(selector) {
      if (selector === '[data-site-header]') return header;
      if (selector === '[data-hero]') return hero;
      return null;
    },
    querySelectorAll() { return []; },
  };
  let intervalStarts = 0;
  const window = {
    clearInterval() {},
    setInterval() { intervalStarts += 1; return 1; },
    matchMedia(query) {
      return query.includes('prefers-reduced-motion') ? reducedMotion : desktopMedia;
    },
  };

  const script = readFileSync(resolve(projectRoot, 'public', 'site.js'), 'utf8');
  vm.runInNewContext(script, { document, window });

  assert.deepEqual(slides.map((slide) => slide.hidden), [false, true, true]);
  assert.equal(pause.getAttribute('aria-pressed'), 'true');
  assert.equal(intervalStarts, 0);

  next.dispatch('click');
  assert.deepEqual(slides.map((slide) => slide.hidden), [true, false, true]);
  assert.equal(status.textContent, '2 / 3');
  assert.equal(intervalStarts, 0);
});
