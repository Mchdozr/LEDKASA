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
  const desktopMedia = window.matchMedia('(min-width: 64rem)');

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

  let megaHoverTimer;
  const openMegaOnHover = () => {
    if (!desktopMedia.matches) return;
    window.clearTimeout(megaHoverTimer);
    setMegaOpen(true);
  };
  const closeMegaOnHoverLeave = () => {
    if (!desktopMedia.matches) return;
    megaHoverTimer = window.setTimeout(() => setMegaOpen(false), 160);
  };
  // Sadece Ürünler butonuna hover ile aç; wrap'taki tam genişlik hit-area kullanma
  megaToggle?.addEventListener('mouseenter', openMegaOnHover);
  megaMenu?.addEventListener('mouseenter', openMegaOnHover);
  megaToggle?.addEventListener('mouseleave', closeMegaOnHoverLeave);
  megaMenu?.addEventListener('mouseleave', closeMegaOnHoverLeave);
  megaWrap?.addEventListener('focusin', openMegaOnHover);

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
  const responsiveFocusTarget = header.querySelector('[data-responsive-focus-target]');
  let previousMobileFocus = null;

  const setMobileOpen = (open, restoreFocus = false) => {
    if (!mobileToggle || !mobileNav) return;
    if (open && mobileToggle.getAttribute('aria-expanded') !== 'true') {
      previousMobileFocus = document.activeElement;
    }
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    mobileNav.hidden = !open;
    document.body.classList.toggle('nav-open', open);
    if (open) mobileNav.querySelector(focusableSelector)?.focus();
    if (!open) {
      const focusTarget = previousMobileFocus;
      previousMobileFocus = null;
      if (restoreFocus) focusTarget?.focus?.();
    }
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
    if (event.key === 'Tab' && mobileToggle?.getAttribute('aria-expanded') === 'true' && mobileNav) {
      const focusableItems = [mobileToggle, ...mobileNav.querySelectorAll(focusableSelector)];
      const firstItem = focusableItems[0];
      const lastItem = focusableItems.at(-1);
      const focusIsOutside = !focusableItems.includes(document.activeElement);

      if (event.shiftKey && (document.activeElement === firstItem || focusIsOutside)) {
        event.preventDefault();
        lastItem?.focus();
      } else if (!event.shiftKey && (document.activeElement === lastItem || focusIsOutside)) {
        event.preventDefault();
        firstItem?.focus();
      }
      return;
    }
    if (event.key !== 'Escape') return;
    if (megaToggle?.getAttribute('aria-expanded') === 'true') setMegaOpen(false, true);
    if (mobileToggle?.getAttribute('aria-expanded') === 'true') setMobileOpen(false, true);
  });

  desktopMedia.addEventListener?.('change', (event) => {
    const mobileWasOpen = event.matches && mobileToggle?.getAttribute('aria-expanded') === 'true';
    if (mobileWasOpen) (responsiveFocusTarget ?? mobileToggle)?.focus();
    setMegaOpen(false);
    setMobileOpen(false);
  });

  const hero = document.querySelector('[data-hero]');
  if (hero?.matches?.('[data-hero]')) {
    const slides = [...hero.querySelectorAll('[data-hero-slide]')];
    const previousButton = hero.querySelector('[data-hero-previous]');
    const nextButton = hero.querySelector('[data-hero-next]');
    const pauseButton = hero.querySelector('[data-hero-pause]');
    const status = hero.querySelector('[data-hero-status]');
    const announcement = hero.querySelector('[data-hero-announcement]');
    const transitionMs = 980;
    let activeIndex = 0;
    let paused = false;
    let timer;
    let animating = false;
    let clearExitTimer;

    const transitionClasses = [
      'is-active',
      'is-exit-left',
      'is-exit-right',
      'is-enter-from-left',
      'is-enter-from-right',
    ];

    const updatePauseButton = () => {
      if (!pauseButton) return;
      if (prefersReducedMotion.matches) {
        pauseButton.disabled = true;
        pauseButton.removeAttribute('aria-pressed');
        pauseButton.setAttribute('aria-label', 'Otomatik geçiş azaltılmış hareket tercihi nedeniyle kapalı');
        pauseButton.textContent = 'Otomatik geçiş kapalı';
        return;
      }
      pauseButton.disabled = false;
      pauseButton.setAttribute('aria-pressed', String(paused));
      pauseButton.setAttribute('aria-label', paused ? 'Slayt gösterisini devam ettir' : 'Slayt gösterisini duraklat');
      pauseButton.textContent = paused ? 'Devam ettir' : 'Duraklat';
    };

    const announce = (message) => {
      if (announcement) announcement.textContent = message;
    };

    const syncSlideState = (nextIndex) => {
      slides.forEach((slide, index) => {
        const isActive = index === nextIndex;
        transitionClasses.forEach((name) => slide.classList.remove(name));
        slide.hidden = false;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });
    };

    const showSlide = (nextIndex, { shouldAnnounce = false, direction = 1, instant = false } = {}) => {
      const normalized = (nextIndex + slides.length) % slides.length;
      if (normalized === activeIndex && slides[normalized]?.classList?.contains?.('is-active')) {
        if (status) status.textContent = `${activeIndex + 1} / ${slides.length}`;
        return;
      }

      const reduceMotion = prefersReducedMotion.matches || instant;
      const previousIndex = activeIndex;

      if (reduceMotion || previousIndex === normalized || !slides[previousIndex]?.classList?.contains?.('is-active')) {
        activeIndex = normalized;
        syncSlideState(activeIndex);
        if (status) status.textContent = `${activeIndex + 1} / ${slides.length}`;
        if (shouldAnnounce) announce(`${activeIndex + 1} / ${slides.length}. slayt gösteriliyor.`);
        animating = false;
        return;
      }

      if (animating) return;

      animating = true;
      window.clearTimeout(clearExitTimer);

      const outgoing = slides[previousIndex];
      const incoming = slides[normalized];
      const exitClass = direction > 0 ? 'is-exit-left' : 'is-exit-right';
      const enterClass = direction > 0 ? 'is-enter-from-right' : 'is-enter-from-left';

      transitionClasses.forEach((name) => {
        outgoing.classList.remove(name);
        incoming.classList.remove(name);
      });

      outgoing.classList.add(exitClass);
      outgoing.setAttribute('aria-hidden', 'true');

      incoming.classList.add(enterClass);
      incoming.setAttribute('aria-hidden', 'false');
      void incoming.offsetWidth;
      incoming.classList.remove(enterClass);
      incoming.classList.add('is-active');

      activeIndex = normalized;
      if (status) status.textContent = `${activeIndex + 1} / ${slides.length}`;
      if (shouldAnnounce) announce(`${activeIndex + 1} / ${slides.length}. slayt gösteriliyor.`);

      clearExitTimer = window.setTimeout(() => {
        outgoing.classList.remove(exitClass);
        animating = false;
      }, transitionMs);
    };

    const stopAutoplay = () => {
      window.clearInterval(timer);
      timer = undefined;
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (paused || prefersReducedMotion.matches || document.hidden) return;
      timer = window.setInterval(() => showSlide(activeIndex + 1, { direction: 1 }), 7000);
    };

    const selectSlide = (nextIndex, direction) => {
      showSlide(nextIndex, { shouldAnnounce: true, direction });
      startAutoplay();
    };

    previousButton?.addEventListener('click', () => selectSlide(activeIndex - 1, -1));
    nextButton?.addEventListener('click', () => selectSlide(activeIndex + 1, 1));
    pauseButton?.addEventListener('click', () => {
      paused = !paused;
      updatePauseButton();
      announce(paused ? 'Otomatik slayt geçişi duraklatıldı.' : 'Otomatik slayt geçişi devam ediyor.');
      startAutoplay();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    prefersReducedMotion.addEventListener?.('change', () => {
      updatePauseButton();
      showSlide(activeIndex, { instant: true });
      startAutoplay();
    });

    hero.classList.add('hero-ready');
    showSlide(0, { instant: true });
    updatePauseButton();
    startAutoplay();
  }

  document.querySelectorAll('[data-product-media-slideshow]').forEach((root) => {
    const slides = [...root.querySelectorAll('[data-product-media-slide]')];
    const previousButton = root.querySelector('[data-product-media-previous]');
    const nextButton = root.querySelector('[data-product-media-next]');
    const status = root.querySelector('[data-product-media-status]');
    const announcement = root.querySelector('[data-product-media-announcement]');
    const dots = [...root.querySelectorAll('[data-product-media-dot]')];
    if (slides.length < 2) return;

    let activeIndex = 0;
    let timer;

    const sync = (nextIndex, shouldAnnounce = false) => {
      activeIndex = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });
      dots.forEach((dot, index) => {
        if (index === activeIndex) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      if (status) status.textContent = `${activeIndex + 1} / ${slides.length}`;
      if (shouldAnnounce && announcement) announcement.textContent = `${activeIndex + 1} / ${slides.length}. görsel gösteriliyor.`;
    };

    const stopAutoplay = () => {
      window.clearInterval(timer);
      timer = undefined;
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (prefersReducedMotion.matches || document.hidden) return;
      timer = window.setInterval(() => sync(activeIndex + 1), 5000);
    };

    const select = (nextIndex) => {
      sync(nextIndex, true);
      startAutoplay();
    };

    previousButton?.addEventListener('click', () => select(activeIndex - 1));
    nextButton?.addEventListener('click', () => select(activeIndex + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => select(index)));
    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });
    prefersReducedMotion.addEventListener?.('change', () => {
      sync(activeIndex);
      startAutoplay();
    });

    root.classList.add('is-ready');
    sync(0);
    startAutoplay();
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    try {
      document.documentElement.classList.add('js-ready');
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealItems.forEach((item) => revealObserver.observe(item));
    } catch {
      document.documentElement.classList.remove('js-ready');
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }
  }

  document.querySelectorAll('[data-cabinet-photo-gallery]').forEach((gallery) => {
    const dialog = gallery.querySelector('[data-cabinet-lightbox]');
    const image = dialog?.querySelector('[data-lightbox-image]');
    const caption = dialog?.querySelector('[data-lightbox-caption]');
    const closeButton = dialog?.querySelector('[data-lightbox-close]');
    if (!dialog || !image || !caption) return;

    gallery.querySelectorAll('.cabinet-photo-thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        image.src = thumb.dataset.lightboxSrc ?? '';
        image.alt = thumb.dataset.lightboxAlt ?? '';
        caption.textContent = thumb.dataset.lightboxCaption ?? '';
        if (typeof dialog.showModal === 'function') dialog.showModal();
      });
    });

    closeButton?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      dialog.close();
    });
  });

})();
