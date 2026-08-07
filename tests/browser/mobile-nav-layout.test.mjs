import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const distRoot = path.join(projectRoot, 'dist');
const edgeExecutable = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const contentType = (filePath) => ({
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
})[path.extname(filePath)] ?? 'text/html; charset=utf-8';

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
  const server = await startStaticServer();
  const { port } = server.address();
  const browser = await chromium.launch({ executablePath: edgeExecutable, headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  t.after(async () => {
    await browser.close();
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  });

  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /menüyü aç/i }).click();

  const layout = await page.locator('[data-mobile-nav]').evaluate((nav) => {
    const panel = nav.getBoundingClientRect();
    const header = document.querySelector('[data-site-header]').getBoundingClientRect();
    const firstLink = nav.querySelector('a');
    const link = firstLink?.getBoundingClientRect();
    return {
      panel: { top: panel.top, height: panel.height },
      headerBottom: header.bottom,
      firstLinkVisible: Boolean(link && link.height > 0 && link.bottom > 0 && link.top < window.innerHeight),
    };
  });

  assert.ok(layout.panel.height > 0, 'The opened mobile panel must have visible height.');
  assert.ok(layout.panel.top >= layout.headerBottom, 'The panel must begin below the sticky header.');
  assert.equal(layout.firstLinkVisible, true, 'At least one mobile navigation link must be visible.');
});
