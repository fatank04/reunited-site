/* Reunited: the signature move: "the name".
 *
 * The visitor types one first name in chapter II. It threads through chapter
 * IV (the peak) and chapter V, and then chapter V tells them the true thing:
 * the name never left this tab.
 *
 * That claim has to be literally true, so this file holds the name in a
 * closure variable and nothing else. No localStorage, no sessionStorage, no
 * fetch, no query string, no analytics. Refreshing forgets it, which is the
 * point and is said on screen.
 *
 * Bespoke page JS, not an engine change. The engine is the mechanism.
 */
(function () {
  'use strict';

  var name = '';                                   // the only place it lives
  var field = document.getElementById('who');
  var slots = document.querySelectorAll('[data-name]');
  var proof = document.querySelector('[data-proof]');
  var folio = document.querySelector('.folio');
  var folioN = folio && folio.querySelector('.folio__n');
  var folioT = folio && folio.querySelector('.folio__t');

  /* Untouched, the page still reads. Each slot keeps a sensible stand-in and
     only swaps once there is a real name, so a visitor who ignores the field
     never sees a blank or a bracketed placeholder. */
  var fallbacks = [];
  slots.forEach(function (el) { fallbacks.push(el.textContent); });

  function clean(v) {
    return v.replace(/\s+/g, ' ').trim().slice(0, 24);
  }

  function paint() {
    slots.forEach(function (el, i) {
      el.textContent = name || fallbacks[i];
    });
    if (!proof) return;
    proof.textContent = name
      ? 'You typed ' + name + ' a moment ago. It is still only in this tab. '
        + 'No request carried it anywhere, nothing stored it, and reloading '
        + 'this page forgets it completely. That is the same architecture the '
        + 'app runs on.'
      : 'You did not type a name, and this page still made no request. Scroll '
        + 'back and try it: nothing about that will change.';
  }

  if (field) {
    field.addEventListener('input', function () {
      name = clean(field.value);
      paint();
    });
    /* Enter should settle the field, not submit anything: there is no form
       here on purpose, so there is nothing that could post the name. */
    field.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); field.blur(); }
    });
  }
  paint();

  /* The folio reads the chapter you are actually in. Cheap and passive:
     one IntersectionObserver, no scroll handler. */
  var chapters = document.querySelectorAll('[data-sc-waypoint]');
  if (folio && chapters.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var parts = (en.target.getAttribute('data-sc-waypoint') || '|').split('|');
        if (folioN) folioN.textContent = parts[0] || '';
        if (folioT) folioT.textContent = parts[1] || '';
        /* The peak inverts the ground, so the folio has to invert with it or
           it disappears into the dark for a whole chapter. */
        document.body.classList.toggle('is-night', en.target.classList.contains('chapter--iv'));
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    chapters.forEach(function (c) { io.observe(c); });
  }
})();
