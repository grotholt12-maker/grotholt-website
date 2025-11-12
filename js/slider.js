// slider.js — compatible version for varying HTML structures

(function(){
  function qsa(root, sel){ return Array.from(root.querySelectorAll(sel)); }
  function qs(root, sel){ return root.querySelector(sel); }

  function initSlider(root){
    if (!root) return;

    const slides = qsa(root, '.slide');
    if (!slides.length) return;

    // Be flexible: buttons may be ".slider-btn prev/next" or just ".prev"/".next"
    const prev = qs(root, '.slider-btn.prev, .prev');
    const next = qs(root, '.slider-btn.next, .next');
    // Dots: any element with class "dot" inside the slider
    const dots = qsa(root, '.dot');

    let i = Math.max(0, slides.findIndex(s => s.classList.contains('active')));
    if (i < 0) i = 0;

    const setActive = (idx) => {
      slides.forEach((s, j) => {
        s.classList.toggle('active', j === idx);
        s.setAttribute('aria-hidden', String(j !== idx));
      });
      dots.forEach((d, j) => d.classList.toggle('active', j === idx));
    };

    const show = (n) => {
      i = (n + slides.length) % slides.length;
      setActive(i);
    };

    if (prev) prev.addEventListener('click', () => show(i - 1));
    if (next) next.addEventListener('click', () => show(i + 1));
    dots.forEach((d, idx) => d.addEventListener('click', () => show(idx)));

    setActive(i);
  }

  function boot(){
    document.querySelectorAll('.slider').forEach((slider) => {
      // A11y baseline
      if (!slider.hasAttribute('aria-live')) slider.setAttribute('aria-live', 'polite');

      // Label arrows if present
      qsa(slider, '.slider-btn.prev, .prev').forEach(b => b.setAttribute('aria-label', 'Vorheriges Bild'));
      qsa(slider, '.slider-btn.next, .next').forEach(b => b.setAttribute('aria-label', 'Nächstes Bild'));

      // Lazy-load from second image on
      const imgs = qsa(slider, '.slide img');
      imgs.forEach((img, idx) => {
        if (idx > 0 && !img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      });

      // Ensure dots have aria-labels
      qsa(slider, '.dot').forEach((d, idx) => {
        if (!d.hasAttribute('aria-label')) d.setAttribute('aria-label', `Slide ${idx + 1}`);
      });

      initSlider(slider);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Expose for non-module usage if needed
  window.__initSlider = initSlider;
})();
