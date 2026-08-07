(() => {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  const focusableSelector = 'a[href], button:not([disabled]), summary, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const syncMotionPreference = () => {
    document.documentElement.dataset.motion = prefersReducedMotion.matches ? 'reduced' : 'enabled';
  };
  syncMotionPreference();
  prefersReducedMotion.addEventListener?.('change', syncMotionPreference);

  const megaWrap = header.querySelector('[data-mega-wrap]');
  const megaToggle = header.querySelector('[data-mega-toggle]');
  const megaMenu = header.querySelector('[data-mega-menu]');

  const setMegaOpen = (open, returnFocus = false) => {
    if (!megaToggle || !megaMenu) return;
    megaToggle.setAttribute('aria-expanded', String(open));
    megaMenu.hidden = !open;
    if (returnFocus) megaToggle.focus();
  };

  megaToggle?.addEventListener('click', () => {
    setMegaOpen(megaToggle.getAttribute('aria-expanded') !== 'true');
  });
  megaToggle?.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();
    setMegaOpen(true);
    megaMenu?.querySelector(focusableSelector)?.focus();
  });
  megaWrap?.addEventListener('focusout', (event) => {
    if (event.relatedTarget && !megaWrap.contains(event.relatedTarget)) setMegaOpen(false);
  });
  document.addEventListener('pointerdown', (event) => {
    if (megaToggle?.getAttribute('aria-expanded') === 'true' && !megaWrap?.contains(event.target)) {
      setMegaOpen(false);
    }
  });

  const mobileToggle = header.querySelector('[data-mobile-toggle]');
  const mobileNav = header.querySelector('[data-mobile-nav]');

  const setMobileOpen = (open, returnFocus = false) => {
    if (!mobileToggle || !mobileNav) return;
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    mobileNav.hidden = !open;
    document.body.classList.toggle('nav-open', open);
    if (open) mobileNav.querySelector(focusableSelector)?.focus();
    if (returnFocus) mobileToggle.focus();
  };

  mobileToggle?.addEventListener('click', () => {
    const willOpen = mobileToggle.getAttribute('aria-expanded') !== 'true';
    setMobileOpen(willOpen, !willOpen);
  });

  header.querySelectorAll('[data-mobile-category]').forEach((details) => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      header.querySelectorAll('[data-mobile-category]').forEach((sibling) => {
        if (sibling !== details) sibling.open = false;
      });
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (megaToggle?.getAttribute('aria-expanded') === 'true') setMegaOpen(false, true);
    if (mobileToggle?.getAttribute('aria-expanded') === 'true') setMobileOpen(false, true);
  });

  const desktopMedia = window.matchMedia('(min-width: 64rem)');
  desktopMedia.addEventListener?.('change', () => {
    setMegaOpen(false);
    setMobileOpen(false);
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }
})();
