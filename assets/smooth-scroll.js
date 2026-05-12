(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktopOnly = window.matchMedia('(min-width: 769px)');
  var lenis = null;
  var lenisLoading = null;
  var rafId = 0;

  function animationsDisabled() {
    return document.body && document.body.dataset.disableAnimations === 'true';
  }

  function shouldEnable() {
    return (
      !(window.Shopify && window.Shopify.designMode) &&
      !reduceMotion.matches &&
      desktopOnly.matches &&
      !animationsDisabled()
    );
  }

  function loadLenis() {
    if (typeof window.Lenis === 'function') return Promise.resolve();
    if (lenisLoading) return lenisLoading;
    if (!window.__ozellaLenisAsset) return Promise.reject(new Error('Missing Lenis asset URL'));

    lenisLoading = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = window.__ozellaLenisAsset;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return lenisLoading;
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
    if (lenis || !shouldEnable() || typeof window.Lenis !== 'function') return;

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
      loadLenis().then(function () {
        if (shouldEnable()) start();
      }).catch(function () {});
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
