import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const projectRoot = resolve(import.meta.dirname, '..');
const lockfile = JSON.parse(readFileSync(resolve(projectRoot, 'package-lock.json'), 'utf8'));

const versionAtLeast = (actual, minimum) => {
  const left = actual.split('.').map(Number);
  const right = minimum.split('.').map(Number);
  for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
    if ((left[index] ?? 0) > (right[index] ?? 0)) return true;
    if ((left[index] ?? 0) < (right[index] ?? 0)) return false;
  }
  return true;
};

test('locked Astro and esbuild toolchain versions include the audited security fixes', () => {
  const astro = lockfile.packages['node_modules/astro']?.version;
  const esbuild = lockfile.packages['node_modules/esbuild']?.version;
  assert.ok(astro, 'Astro must be locked.');
  assert.ok(esbuild, 'Astro\'s esbuild dependency must be locked.');
  assert.equal(versionAtLeast(astro, '7.2.0'), true, `Astro ${astro} is below the audited patched release 7.2.0.`);
  assert.equal(versionAtLeast(esbuild, '0.28.1'), true, `esbuild ${esbuild} is below the audited patched release 0.28.1.`);
});
