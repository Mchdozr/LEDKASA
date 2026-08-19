import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const distRoot = path.join(projectRoot, 'dist');
const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const contentType = (filePath) => ({
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
})[path.extname(filePath)] ?? 'text/html; charset=utf-8';

const resolveEdgeExecutable = ({ environment = process.env, fileExists = existsSync } = {}) => {
  const candidates = [environment.LEDKASA_BROWSER_EXECUTABLE, ...edgePaths].filter(Boolean);
  const executable = candidates.find(fileExists);

  if (!executable) {
    throw new Error(`Microsoft Edge was not found. Set LEDKASA_BROWSER_EXECUTABLE to the Edge executable path. Checked: ${candidates.join(', ')}`);
  }

  return executable;
};

const startStaticServer = () => new Promise((resolve) => {
  const server = createServer((request, response) => {
    const requestPath = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname).replace(/^\/+/, '');
    const relativePath = requestPath === '' ? 'index.html' : path.extname(requestPath) ? requestPath : path.join(requestPath, 'index.html');
    const filePath = path.resolve(distRoot, relativePath);

    if (!filePath.startsWith(distRoot) || !existsSync(filePath)) {
      response.writeHead(404).end();
      return;
    }

    response.writeHead(200, { 'content-type': contentType(filePath) });
    createReadStream(filePath).pipe(response);
  });

  server.listen(0, '127.0.0.1', () => resolve(server));
});

test('mobile menu paints below the sticky header with visible links at 390px', async (t) => {
  execFileSync(process.execPath, [path.join(projectRoot, 'node_modules', 'astro', 'bin', 'astro.mjs'), 'build'], { cwd: projectRoot, stdio: 'pipe' });
  const { chromium } = await import('playwright-core');
  let server;
  let browser;

  try {
    server = await startStaticServer();
    const { port } = server.address();
    browser = await chromium.launch({ executablePath: resolveEdgeExecutable(), headless: true });
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /menüyü aç/i }).click();

    const mobileLink = page.getByRole('link', { name: 'Ana Sayfa', exact: true });
    const layout = await page.locator('[data-mobile-nav]').evaluate((nav) => {
      const panel = nav.getBoundingClientRect();
      const header = document.querySelector('[data-site-header]').getBoundingClientRect();
      const firstLink = nav.querySelector('a');
      const link = firstLink?.getBoundingClientRect();
      return {
        panel: { top: panel.top, height: panel.height },
        headerBottom: header.bottom,
        firstLinkInViewport: Boolean(link && link.height > 0 && link.bottom > 0 && link.top < window.innerHeight),
      };
    });

    assert.ok(layout.panel.height > 0, 'The opened mobile panel must have visible height.');
    assert.ok(layout.panel.top >= layout.headerBottom, 'The panel must begin below the sticky header.');
    assert.equal(layout.firstLinkInViewport, true, 'At least one mobile navigation link must be in the viewport.');
    assert.equal(await mobileLink.isVisible(), true, 'The Ana Sayfa mobile navigation link must be visible.');
  } finally {
    try {
      await browser?.close();
    } finally {
      if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
  }
});

test('mobile quote fields and FAQ questions remain hit-testable below non-sticky intros', async () => {
  execFileSync(process.execPath, [path.join(projectRoot, 'node_modules', 'astro', 'bin', 'astro.mjs'), 'build'], { cwd: projectRoot, stdio: 'pipe' });
  const { chromium } = await import('playwright-core');
  let server;
  let browser;

  try {
    server = await startStaticServer();
    const { port } = server.address();
    browser = await chromium.launch({ executablePath: resolveEdgeExecutable(), headless: true });
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

    await page.goto(`http://127.0.0.1:${port}/teklif-al/`, { waitUntil: 'networkidle' });
    const controls = page.locator('.quote-form input:not([tabindex="-1"]), .quote-form select, .quote-form textarea');
    const controlCount = await controls.count();
    assert.ok(controlCount >= 6, 'The quote form must expose its user-facing controls.');

    for (let index = 0; index < controlCount; index += 1) {
      const control = controls.nth(index);
      await control.evaluate((element) => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
      const hitTest = await control.evaluate((element) => {
        const controlRect = element.getBoundingClientRect();
        const introRect = document.querySelector('.quote-intro').getBoundingClientRect();
        const intersects = controlRect.left < introRect.right
          && controlRect.right > introRect.left
          && controlRect.top < introRect.bottom
          && controlRect.bottom > introRect.top;
        const x = controlRect.left + controlRect.width / 2;
        const y = controlRect.top + controlRect.height / 2;
        return {
          intersects,
          hitIsControl: document.elementFromPoint(x, y) === element,
          visible: controlRect.bottom > 0 && controlRect.top < window.innerHeight,
          name: element.getAttribute('name'),
          controlRect: { top: controlRect.top, bottom: controlRect.bottom },
          viewportHeight: window.innerHeight,
          scrollY: window.scrollY,
        };
      });

      assert.equal(hitTest.visible, true, `${hitTest.name} must be visible after scrolling: ${JSON.stringify(hitTest)}.`);
      assert.equal(hitTest.intersects, false, `${hitTest.name} must not intersect the quote introduction.`);
      assert.equal(hitTest.hitIsControl, true, `${hitTest.name} must win elementFromPoint hit testing.`);
    }

    await page.goto(`http://127.0.0.1:${port}/sss/`, { waitUntil: 'networkidle' });
    await page.locator('.faq-list details').first().evaluate((element) => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    assert.equal(
      await page.locator('.faq-page-layout > div:first-child').evaluate((element) => getComputedStyle(element).position),
      'static',
      'The FAQ introduction must not stick over questions at mobile widths.',
    );

    await page.setViewportSize({ width: 1100, height: 844 });
    assert.equal(
      await page.locator('.faq-page-layout > div:first-child').evaluate((element) => getComputedStyle(element).position),
      'sticky',
      'The FAQ introduction must retain the desktop sticky sidebar behavior.',
    );
    await page.goto(`http://127.0.0.1:${port}/teklif-al/`, { waitUntil: 'networkidle' });
    assert.equal(
      await page.locator('.quote-intro').evaluate((element) => getComputedStyle(element).position),
      'sticky',
      'The quote introduction must retain the desktop sticky sidebar behavior.',
    );
  } finally {
    try {
      await browser?.close();
    } finally {
      if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
  }
});

test('representative light and dark surface text plus focus indicators meet WCAG AA contrast', async () => {
  execFileSync(process.execPath, [path.join(projectRoot, 'node_modules', 'astro', 'bin', 'astro.mjs'), 'build'], { cwd: projectRoot, stdio: 'pipe' });
  const { chromium } = await import('playwright-core');
  let server;
  let browser;

  const routes = [
    ['/', ['.home-section .eyebrow', '.process-intro p', '.section-heading .text-link']],
    ['/urunler/', ['.catalog-hero .eyebrow', '.catalog-hero p', '.quote-cta .eyebrow']],
    ['/urunler/led-ekran-kasalari/cnc-led-kasa/', ['.product-detail-heading .eyebrow', '.product-lead', '.product-actions .text-link']],
    ['/bilgi-merkezi/led-ekran-kasasi-nasil-secilir/', ['.article-hero .eyebrow', '.prose-content p', '.article-aside .eyebrow']],
    ['/teklif-al/', ['.quote-intro .eyebrow', '.quote-intro > p', '.quote-form-heading p']],
    ['/gizlilik-politikasi/', ['.content-hero .eyebrow', '.prose-content p']],
  ];

  try {
    server = await startStaticServer();
    const { port } = server.address();
    browser = await chromium.launch({ executablePath: resolveEdgeExecutable(), headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

    for (const [route, selectors] of routes) {
      await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle' });
      for (const selector of selectors) {
        const locator = page.locator(selector).first();
        assert.equal(await locator.count(), 1, `${route} must render ${selector}.`);
        const result = await locator.evaluate((element) => {
          const parse = (color) => {
            const channels = color.match(/[\d.]+/g)?.map(Number) ?? [];
            return channels.slice(0, 3);
          };
          const luminance = (channels) => channels
            .map((channel) => channel / 255)
            .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
            .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
          const contrast = (foreground, background) => {
            const light = Math.max(luminance(foreground), luminance(background));
            const dark = Math.min(luminance(foreground), luminance(background));
            return (light + 0.05) / (dark + 0.05);
          };
          const effectiveBackground = (start) => {
            for (let node = start; node instanceof Element; node = node.parentElement) {
              const color = getComputedStyle(node).backgroundColor;
              const channels = color.match(/[\d.]+/g)?.map(Number) ?? [];
              if (channels.length === 3 || (channels[3] ?? 0) >= 0.99) return channels.slice(0, 3);
            }
            return [255, 255, 255];
          };
          const foreground = parse(getComputedStyle(element).color);
          const background = effectiveBackground(element);
          return { foreground, background, ratio: contrast(foreground, background) };
        });
        assert.ok(
          result.ratio >= 4.5,
          `${route} ${selector} contrast ${result.ratio.toFixed(2)}:1 (${result.foreground} on ${result.background}) must be at least 4.5:1.`,
        );
      }
    }

    await page.goto(`http://127.0.0.1:${port}/teklif-al/`, { waitUntil: 'networkidle' });
    const focusContrast = await page.locator('input[name="name"]').evaluate((element) => {
      element.focus();
      const parse = (color) => (color.match(/[\d.]+/g)?.map(Number) ?? []).slice(0, 3);
      const luminance = (channels) => channels
        .map((channel) => channel / 255)
        .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
        .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
      const foreground = parse(getComputedStyle(element).outlineColor);
      const background = parse(getComputedStyle(element).backgroundColor);
      const light = Math.max(luminance(foreground), luminance(background));
      const dark = Math.min(luminance(foreground), luminance(background));
      return (light + 0.05) / (dark + 0.05);
    });
    assert.ok(focusContrast >= 3, `Visible focus contrast ${focusContrast.toFixed(2)}:1 must be at least 3:1.`);
  } finally {
    try {
      await browser?.close();
    } finally {
      if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
  }
});

test('Edge executable resolution prefers an explicit override', () => {
  assert.equal(
    resolveEdgeExecutable({
      environment: { LEDKASA_BROWSER_EXECUTABLE: 'D:\\Tools\\Edge\\msedge.exe' },
      fileExists: (candidate) => candidate === 'D:\\Tools\\Edge\\msedge.exe',
    }),
    'D:\\Tools\\Edge\\msedge.exe',
  );
});

test('Edge executable resolution falls back to a common install path', () => {
  assert.equal(
    resolveEdgeExecutable({
      environment: {},
      fileExists: (candidate) => candidate === edgePaths[1],
    }),
    edgePaths[1],
  );
});

test('Edge executable resolution explains how to configure a missing browser', () => {
  assert.throws(
    () => resolveEdgeExecutable({ environment: {}, fileExists: () => false }),
    /Set LEDKASA_BROWSER_EXECUTABLE/,
  );
});
