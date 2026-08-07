import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const globalCss = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');

const ruleFor = (selector) => {
  const match = globalCss.match(new RegExp(`\\${selector}\\s*\\{([^}]*)\\}`));
  assert.ok(match, `Expected a ${selector} CSS rule.`);
  return match[1];
};

test('open mobile navigation paints below the sticky header at the mobile breakpoint', () => {
  const mobileNav = ruleFor('.mobile-nav');

  assert.match(mobileNav, /position:\s*absolute\s*;/);
  assert.match(mobileNav, /top:\s*calc\(100%\s*\+\s*1px\)\s*;/);
  assert.match(mobileNav, /left:\s*0\s*;/);
  assert.match(mobileNav, /right:\s*0\s*;/);
  assert.match(mobileNav, /height:\s*calc\(100dvh\s*-\s*var\(--header-height\)\s*-\s*1px\)\s*;/);
  assert.match(mobileNav, /overflow-y:\s*auto\s*;/);
});
