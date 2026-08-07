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
  execFileSync(process.execPath, [path.join(projectRoot, 'node_modules', 'astro', 'astro.js'), 'build'], { cwd: projectRoot, stdio: 'pipe' });
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
