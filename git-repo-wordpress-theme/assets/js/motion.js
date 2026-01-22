/*!
 * PROTO Atelier - motion.js
 * Subtle parallax + scroll reveal.
 * - No dependencies.
 * - Respects prefers-reduced-motion.
 */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    // Respect reduced motion: disable parallax/reveal animation but NEVER hide content.
    var rmEls = Array.prototype.slice.call(document.querySelectorAll(".proto-reveal"));
    rmEls.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  // --- Scroll reveal ---------------------------------------------------------
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".proto-reveal"));
  if (revealEls.length) {
    try {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { root: null, threshold: 0.18 });

      revealEls.forEach(function (el) { io.observe(el); });
    } catch (e) {
      // Old browsers: just show.
      revealEls.forEach(function (el) { el.classList.add("is-in"); });
    }
  }

  // --- Parallax --------------------------------------------------------------
  var layers = Array.prototype.slice.call(document.querySelectorAll("[data-proto-parallax]"));
  if (!layers.length) return;

  var ticking = false;
  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

  function update() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset || 0;

    layers.forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-proto-parallax") || "0.10");
      if (isNaN(speed)) speed = 0.10;

      // Keep the effect subtle and stable.
      var offset = clamp(-y * speed, -42, 42);
      el.style.transform = "translate3d(0," + offset.toFixed(2) + "px,0)";
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
