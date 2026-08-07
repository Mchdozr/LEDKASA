import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
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
  ['modul-pitch-ve-kasa-uyumu', 'Modül Pitch ve LED Kasa Uyumu'],
  ['led-ekran-guc-ve-veri-planlama', 'LED Ekran Güç ve Veri Planlama'],
];

const builtHtml = (route = '') =>
  readFileSync(resolve(outputRoot, ...route.split('/').filter(Boolean), 'index.html'), 'utf8');

before(() => {
  const build = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', outputRoot], {
    cwd: projectRoot,
    encoding: 'utf8',
  });
  assert.equal(build.status, 0, `Astro build failed:\n${build.stdout}\n${build.stderr}`);
});

after(() => rmSync(outputRoot, { recursive: true, force: true }));

test('homepage renders one heading and exactly three progressively enhanced, user-controlled slides', () => {
  const html = builtHtml();
  const slideMarkup = [...html.matchAll(/<article[^>]*data-hero-slide[^>]*>([\s\S]*?)<\/article>/g)];
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /<meta property="og:type" content="website">/);
  assert.equal(slideMarkup.length, 3);
  for (const [, slide] of slideMarkup) {
    const imagePath = slide.match(/<img[^>]+src="(\/assets\/images\/products\/[^"]+)"/)?.[1];
    assert.ok(imagePath, 'each hero slide must use a local product image');
    assert.equal(existsSync(resolve(projectRoot, 'public', imagePath.slice(1))), true, `missing hero image: ${imagePath}`);
  }
  assert.match(html, /data-hero-previous/);
  assert.match(html, /data-hero-next/);
  assert.match(html, /data-hero-pause/);
  assert.match(html, /<div class="hero-track"[^>]*aria-live="off"/);
  assert.match(html, /data-hero-announcement[^>]+aria-live="polite"/);
  assert.doesNotMatch(html, /data-hero-status[^>]+aria-live="polite"/);
  assert.doesNotMatch(html, /data-hero-slide[^>]+hidden/);
  assert.match(html, /Projenizi üç adımda netleştirelim/);
  assert.match(html, /Sık sorulan sorular/);
});

test('desktop hero reserves one stable frame height for every slide image', () => {
  const css = readFileSync(resolve(projectRoot, 'src/styles/global.css'), 'utf8');

  assert.match(css, /--hero-slide-height:\s*clamp\(34rem,\s*62vw,\s*43rem\)/);
  assert.match(css, /height:\s*var\(--hero-slide-height\)/);
  assert.match(css, /\.hero-media\s*\{[^}]*height:\s*100%/s);
});

test('desktop header centers the primary navigation between the brand and quote action', () => {
  const css = readFileSync(resolve(projectRoot, 'src/styles/global.css'), 'utf8');

  assert.match(css, /\.header-bar\s*\{[^}]*position:\s*relative/s);
  assert.match(
    css,
    /@media\s*\(min-width:\s*64rem\)\s*\{[\s\S]*?\.header-bar\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto\s+minmax\(0,\s*1fr\)/s,
  );
  assert.match(
    css,
    /@media\s*\(min-width:\s*64rem\)\s*\{[\s\S]*?\.desktop-nav\s*\{[\s\S]*?justify-self:\s*center/s,
  );
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

test('build emits evergreen articles with unique metadata, breadcrumbs and contextual links', () => {
  const titles = new Set();
  const descriptions = new Set();

  for (const [slug, heading] of articleRoutes) {
    const html = builtHtml(`bilgi-merkezi/${slug}`);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    const socialImage = html.match(/<meta property="og:image" content="https:\/\/ledkasa\.com\.tr(\/assets\/images\/[^"]+)"/)?.[1];
    assert.ok(title?.includes(heading), `missing title for ${slug}`);
    assert.ok(description, `missing description for ${slug}`);
    assert.equal(titles.has(title), false, `duplicate title: ${title}`);
    assert.equal(descriptions.has(description), false, `duplicate description: ${description}`);
    titles.add(title);
    descriptions.add(description);
    assert.match(html, new RegExp(`<h1[^>]*>\\s*${heading.replace('?', '\\?')}\\s*</h1>`));
    assert.match(html, new RegExp(`https://ledkasa\\.com\\.tr/bilgi-merkezi/${slug}/`));
    assert.match(html, /<meta property="og:type" content="article">/);
    assert.match(html, /"@type":"Article"/);
    assert.doesNotMatch(html, /"(?:datePublished|dateModified|author)"\s*:/);
    assert.ok(socialImage, `missing local social image for ${slug}`);
    assert.equal(existsSync(resolve(projectRoot, 'public', socialImage.slice(1))), true, `missing social image: ${socialImage}`);
    assert.match(html, /aria-label="Sayfa yolu"/);
    assert.match(html, /href="\/urunler\//);
    assert.match(html, /href="\/teklif-al\/"/);
  }

  assert.equal(titles.size, articleRoutes.length);
  assert.equal(descriptions.size, articleRoutes.length);
});

test('corporate, discovery and FAQ pages publish evidence-neutral content and email-only contact', () => {
  const routes = ['', 'hakkimizda', 'uygulama-alanlari', 'bilgi-merkezi', 'sss'];
  const combinedHtml = routes.map((route) => builtHtml(route)).join('\n');

  assert.match(builtHtml('hakkimizda'), /Çalışma yaklaşımımız/);
  assert.match(builtHtml('uygulama-alanlari'), /Etkinlik ve Sahne/);
  assert.match(builtHtml('bilgi-merkezi'), /LED Ekran Kasası Nasıl Seçilir\?/);
  assert.match(builtHtml('sss'), /<details[\s\S]*?<summary>/);
  assert.match(combinedHtml, /info@ledkasa\.com\.tr/);
  assert.match(combinedHtml, /\+90 530 405 67 68/);
  assert.doesNotMatch(combinedHtml, /FAQPage|sameAs|Sertifikalarımız|Referanslarımız/);
});

const bootHero = ({ reduced = false } = {}) => {
  const listeners = new Map();
  const makeElement = () => {
    const attributes = new Map();
    const elementListeners = new Map();
    return {
      hidden: false,
      disabled: false,
      textContent: '',
      classList: { add() {}, remove() {}, toggle() {} },
      addEventListener(type, listener) { elementListeners.set(type, listener); },
      dispatch(type) { if (!this.disabled) elementListeners.get(type)?.({}); },
      getAttribute(name) { return attributes.get(name) ?? null; },
      removeAttribute(name) { attributes.delete(name); },
      setAttribute(name, value) { attributes.set(name, String(value)); },
      matches() { return true; },
    };
  };

  const slides = [makeElement(), makeElement(), makeElement()];
  const previous = makeElement();
  const next = makeElement();
  const pause = makeElement();
  const status = makeElement();
  const announcement = makeElement();
  const track = makeElement();
  const hero = makeElement();
  hero.querySelectorAll = (selector) => selector === '[data-hero-slide]' ? slides : [];
  hero.querySelector = (selector) => ({
    '[data-hero-previous]': previous,
    '[data-hero-next]': next,
    '[data-hero-pause]': pause,
    '[data-hero-status]': status,
    '[data-hero-announcement]': announcement,
    '[data-hero-track]': track,
  })[selector] ?? null;

  const header = makeElement();
  header.querySelector = () => null;
  header.querySelectorAll = () => [];
  header.contains = () => false;

  const reducedMotion = {
    matches: reduced,
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
  let intervalCallback;
  const window = {
    clearInterval() { intervalCallback = undefined; },
    setInterval(callback) { intervalStarts += 1; intervalCallback = callback; return 1; },
    matchMedia(query) {
      return query.includes('prefers-reduced-motion') ? reducedMotion : desktopMedia;
    },
  };

  const script = readFileSync(resolve(projectRoot, 'public', 'site.js'), 'utf8');
  vm.runInNewContext(script, { document, window });

  return {
    announcement,
    intervalStarts: () => intervalStarts,
    next,
    pause,
    previous,
    runAutoplay: () => intervalCallback?.(),
    slides,
    status,
    track,
  };
};

test('hero autoplay changes the visible counter without generating a live-region announcement', () => {
  const hero = bootHero();

  assert.deepEqual(hero.slides.map((slide) => slide.hidden), [false, true, true]);
  assert.equal(hero.intervalStarts(), 1);
  assert.equal(hero.announcement.textContent, '');

  hero.runAutoplay();
  assert.deepEqual(hero.slides.map((slide) => slide.hidden), [true, false, true]);
  assert.equal(hero.status.textContent, '2 / 3');
  assert.equal(hero.announcement.textContent, '');
});

test('hero manual navigation and pause changes announce once and expose an accurate toggle state', () => {
  const hero = bootHero();

  hero.next.dispatch('click');
  assert.equal(hero.announcement.textContent, '2 / 3. slayt gösteriliyor.');

  hero.pause.dispatch('click');
  assert.equal(hero.pause.getAttribute('aria-pressed'), 'true');
  assert.equal(hero.pause.textContent, 'Duraklat');
  assert.equal(hero.announcement.textContent, 'Otomatik slayt geçişi duraklatıldı.');
  hero.runAutoplay();
  assert.equal(hero.status.textContent, '2 / 3');

  hero.pause.dispatch('click');
  assert.equal(hero.pause.getAttribute('aria-pressed'), 'false');
  assert.equal(hero.pause.textContent, 'Duraklat');
  assert.equal(hero.announcement.textContent, 'Otomatik slayt geçişi devam ediyor.');
  hero.runAutoplay();
  assert.equal(hero.status.textContent, '3 / 3');
  assert.equal(hero.announcement.textContent, 'Otomatik slayt geçişi devam ediyor.');
});

test('hero disables autoplay control under reduced motion while manual controls remain available', () => {
  const hero = bootHero({ reduced: true });

  assert.deepEqual(hero.slides.map((slide) => slide.hidden), [false, true, true]);
  assert.equal(hero.pause.disabled, true);
  assert.equal(hero.pause.getAttribute('aria-label'), 'Otomatik geçiş azaltılmış hareket tercihi nedeniyle kapalı');
  assert.equal(hero.pause.getAttribute('aria-pressed'), null);
  assert.equal(hero.intervalStarts(), 0);

  hero.next.dispatch('click');
  assert.deepEqual(hero.slides.map((slide) => slide.hidden), [true, false, true]);
  assert.equal(hero.status.textContent, '2 / 3');
  assert.equal(hero.announcement.textContent, '2 / 3. slayt gösteriliyor.');
  assert.equal(hero.intervalStarts(), 0);
});
