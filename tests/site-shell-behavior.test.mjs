import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const siteScript = readFileSync(new URL('../public/site.js', import.meta.url), 'utf8');
const globalCss = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const focusableSelector = 'a[href], button:not([disabled]), summary, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const makeClassList = () => {
  const values = new Set();
  return {
    add: (...tokens) => tokens.forEach((token) => values.add(token)),
    remove: (...tokens) => tokens.forEach((token) => values.delete(token)),
    toggle: (token, force) => force ? values.add(token) : values.delete(token),
    contains: (token) => values.has(token),
  };
};

const bootSiteScript = ({ revealItems = [], Observer = class { observe() {} unobserve() {} } } = {}) => {
  const documentListeners = new Map();
  const document = {
    activeElement: null,
    body: { classList: makeClassList() },
    documentElement: { dataset: {}, classList: makeClassList() },
    addEventListener(type, listener) {
      const listeners = documentListeners.get(type) ?? [];
      listeners.push(listener);
      documentListeners.set(type, listeners);
    },
    querySelector() { return header; },
    querySelectorAll(selector) { return selector === '[data-reveal]' ? revealItems : []; },
  };

  const makeElement = () => {
    const attributes = new Map();
    const listeners = new Map();
    return {
      hidden: false,
      classList: makeClassList(),
      addEventListener(type, listener) { listeners.set(type, listener); },
      contains(node) { return node === this; },
      dispatch(type, event = {}) { listeners.get(type)?.(event); },
      focus() { document.activeElement = this; },
      getAttribute(name) { return attributes.get(name) ?? null; },
      setAttribute(name, value) { attributes.set(name, String(value)); },
    };
  };

  const mobileToggle = makeElement();
  const responsiveFocusTarget = makeElement();
  const firstLink = makeElement();
  const lastLink = makeElement();
  const mobileNav = makeElement();
  mobileNav.hidden = true;
  mobileNav.querySelector = (selector) => selector === focusableSelector ? firstLink : null;
  mobileNav.querySelectorAll = (selector) => selector === focusableSelector ? [firstLink, lastLink] : [];
  mobileNav.contains = (node) => node === firstLink || node === lastLink;

  const header = makeElement();
  header.querySelector = (selector) => ({
    '[data-mobile-toggle]': mobileToggle,
    '[data-mobile-nav]': mobileNav,
    '[data-responsive-focus-target]': responsiveFocusTarget,
  })[selector] ?? null;
  header.querySelectorAll = () => [];

  const mediaQueries = new Map();
  const window = {
    IntersectionObserver: Observer,
    matchMedia(query) {
      const mediaQuery = {
        matches: false,
        changeListener: null,
        addEventListener(type, listener) {
          if (type === 'change') this.changeListener = listener;
        },
        dispatch(matches) {
          this.matches = matches;
          this.changeListener?.({ matches });
        },
      };
      mediaQueries.set(query, mediaQuery);
      return mediaQuery;
    },
  };
  vm.runInNewContext(siteScript, { document, window, IntersectionObserver: Observer });

  return {
    document,
    firstLink,
    lastLink,
    mobileNav,
    mobileToggle,
    responsiveFocusTarget,
    dispatchDesktopChange(matches = true) {
      mediaQueries.get('(min-width: 64rem)')?.dispatch(matches);
    },
    dispatchDocument(type, event) {
      for (const listener of documentListeners.get(type) ?? []) listener(event);
    },
  };
};

test('mobile menu traps forward and backward Tab focus within its controls', () => {
  const shell = bootSiteScript();
  shell.document.activeElement = shell.mobileToggle;
  shell.mobileToggle.dispatch('click');

  shell.document.activeElement = shell.lastLink;
  let forwardPrevented = false;
  shell.dispatchDocument('keydown', {
    key: 'Tab',
    shiftKey: false,
    preventDefault() { forwardPrevented = true; },
  });
  assert.equal(forwardPrevented, true);
  assert.equal(shell.document.activeElement, shell.mobileToggle);

  let backwardPrevented = false;
  shell.dispatchDocument('keydown', {
    key: 'Tab',
    shiftKey: true,
    preventDefault() { backwardPrevented = true; },
  });
  assert.equal(backwardPrevented, true);
  assert.equal(shell.document.activeElement, shell.lastLink);
});

test('closing the mobile menu restores the focus held before it opened', () => {
  const shell = bootSiteScript();
  const previousControl = { focus() { shell.document.activeElement = previousControl; } };
  shell.document.activeElement = previousControl;
  shell.mobileToggle.dispatch('click');
  shell.dispatchDocument('keydown', { key: 'Escape' });
  assert.equal(shell.document.activeElement, previousControl);
});

test('switching to the desktop breakpoint restores focus before hiding the mobile menu', () => {
  const shell = bootSiteScript();
  shell.document.activeElement = shell.mobileToggle;
  shell.mobileToggle.dispatch('click');
  shell.document.activeElement = shell.lastLink;

  shell.dispatchDesktopChange();

  assert.equal(shell.mobileNav.hidden, true);
  assert.equal(shell.mobileToggle.getAttribute('aria-expanded'), 'false');
  assert.equal(shell.document.activeElement, shell.responsiveFocusTarget);
});

test('reveal content remains visible until JavaScript enables enhancement', () => {
  assert.doesNotMatch(globalCss, /(?:^|\n)\[data-reveal\]\s*\{[^}]*opacity:\s*0/s);
  assert.match(globalCss, /\.js-ready \[data-reveal\]\s*\{[^}]*opacity:\s*0/s);
});

test('failed reveal initialization removes the JavaScript-only hidden state', () => {
  const reveal = { classList: makeClassList() };
  class FailingObserver { constructor() { throw new Error('observer unavailable'); } }
  let shell;
  assert.doesNotThrow(() => {
    shell = bootSiteScript({ revealItems: [reveal], Observer: FailingObserver });
  });

  assert.equal(shell.document.documentElement.classList.contains('js-ready'), false);
  assert.equal(reveal.classList.contains('is-visible'), true);
});
