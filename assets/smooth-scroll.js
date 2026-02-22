(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktopOnly = window.matchMedia('(min-width: 769px)');
  var lenis = null;
  var rafId = 0;

  function animationsDisabled() {
    return document.body && document.body.dataset.disableAnimations === 'true';
  }

  function shouldEnable() {
    return (
      !(window.Shopify && window.Shopify.designMode) &&
      !reduceMotion.matches &&
      desktopOnly.matches &&
      !animationsDisabled() &&
      typeof window.Lenis === 'function'
    );
  }

  function onRaf(time) {
    if (!lenis) return;

    lenis.raf(time);
    rafId = window.requestAnimationFrame(onRaf);
  }

  function stop() {
    if (!lenis) return;

    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }

    lenis.destroy();
    lenis = null;
    delete window.__ozellaLenis;
  }

  function start() {
    if (lenis || !shouldEnable()) return;

    lenis = new window.Lenis({
      duration: 0.85,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      smoothWheel: true,
      smoothTouch: false,
      normalizeWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false
    });

    window.__ozellaLenis = lenis;

    rafId = window.requestAnimationFrame(onRaf);
  }

  function reevaluate() {
    if (shouldEnable()) {
      start();
    } else {
      stop();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reevaluate, { once: true });
  } else {
    reevaluate();
  }

  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', reevaluate);
    desktopOnly.addEventListener('change', reevaluate);
  } else {
    reduceMotion.addListener(reevaluate);
    desktopOnly.addListener(reevaluate);
  }

  document.addEventListener('page:loaded', reevaluate);
  window.addEventListener('beforeunload', stop);
})();
