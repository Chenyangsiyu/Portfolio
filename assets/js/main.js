/* Yangsiyu Chen — portfolio
   Language switch, parallax and the slogan hover circle. No dependencies. */
(function () {
  'use strict';
  var KEY = 'cysy-lang';
  var pageLang = document.body.getAttribute('data-lang') || 'fr';
  var still = false;
  try { still = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function store(code) { try { window.localStorage.setItem(KEY, code); } catch (e) {} }
  function saved() { try { return window.localStorage.getItem(KEY); } catch (e) { return null; } }

  /* 1. Language ---------------------------------------------------------- */
  var btns = document.querySelectorAll('[data-lang][data-href]');
  Array.prototype.forEach.call(btns, function (b) {
    b.addEventListener('click', function () {
      var code = b.getAttribute('data-lang');
      store(code);
      if (code !== pageLang) {
        var href = b.getAttribute('data-href');
        window.location.href = href + (window.location.hash || '');
      }
    });
  });
  // On the first page of a visit, follow the language chosen last time.
  var s = saved(), first = false;
  try { first = !window.sessionStorage.getItem('cysy-visit'); window.sessionStorage.setItem('cysy-visit', '1'); } catch (e) {}
  if (first && (s === 'fr' || s === 'en' || s === 'zh') && s !== pageLang) {
    var target = document.querySelector('[data-lang="' + s + '"][data-href]');
    if (target) { window.location.replace(target.getAttribute('data-href') + (window.location.hash || '')); return; }
  }

  /* 2. Parallax ---------------------------------------------------------- */
  var pars = Array.prototype.slice.call(document.querySelectorAll('[data-par]'));
  var hero = document.querySelector('[data-hero]');
  var raf = null;
  function update() {
    raf = null;
    var vh = window.innerHeight || 800;
    pars.forEach(function (el) {
      var img = el.querySelector('img[data-k]');
      if (!img) return;
      var r = el.getBoundingClientRect();
      var p = Math.max(-1.2, Math.min(1.2, (r.top + r.height / 2 - vh / 2) / vh));
      var k = parseFloat(img.getAttribute('data-k')) || 50;
      img.style.transform = 'translateY(' + (p * -k).toFixed(1) + 'px) scale(1.12)';
    });
    if (hero) {
      var y = Math.min(window.scrollY || 0, 700);
      hero.style.transform = 'translateY(' + (y * -0.12).toFixed(1) + 'px)';
      hero.style.opacity = Math.max(0.2, 1 - y / 900).toFixed(3);
    }
  }
  function onScroll() { if (!raf) raf = window.requestAnimationFrame(update); }
  if (!still && (pars.length || hero)) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* 3. Slogan circle (home page) ----------------------------------------- */
  var slogan = document.querySelector('.slogan');
  var over = slogan && slogan.querySelector('.slogan-over');
  if (slogan && over) {
    var PAD = 100, R = 64, last = { x: 200, y: 80 }, shown = false, mraf = null;
    over.style.transition = still ? 'none' : 'clip-path .35s cubic-bezier(.2,.7,.2,1)';
    function paint() {
      over.style.clipPath = 'circle(' + (shown ? R : 0) + 'px at ' + Math.round(last.x + PAD) + 'px ' + Math.round(last.y + PAD) + 'px)';
    }
    paint();
    var spans = slogan.querySelectorAll('h1 span');
    function onText(cx, cy) {
      for (var i = 0; i < spans.length; i++) {
        var rs = spans[i].getClientRects();
        for (var j = 0; j < rs.length; j++) {
          var q = rs[j];
          if (cx >= q.left - 4 && cx <= q.right + 4 && cy >= q.top && cy <= q.bottom) return true;
        }
      }
      return false;
    }
    slogan.addEventListener('mousemove', function (e) {
      var r = slogan.getBoundingClientRect();
      var on = onText(e.clientX, e.clientY);
      var x = e.clientX - r.left, y = e.clientY - r.top;
      if (mraf) window.cancelAnimationFrame(mraf);
      mraf = window.requestAnimationFrame(function () {
        mraf = null;
        if (on) { last = { x: x, y: y }; shown = true; paint(); }
        else if (shown) { shown = false; paint(); }
      });
    });
    slogan.addEventListener('mouseleave', function () { shown = false; paint(); });
  }
})();
