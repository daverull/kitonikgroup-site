(function () {
  var LANGS = ['kk', 'ru', 'en'];
  var d = document, h = d.documentElement;

  function save(l) { try { localStorage.setItem('sozim.lang', l); } catch (e) {} }

  function setLang(l) {
    h.lang = l;
    d.querySelectorAll('.lang button').forEach(function (b) {
      var on = b.getAttribute('data-lang') === l;
      b.className = on ? 'on' : '';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var t = h.getAttribute('data-t-' + l);
    if (t) d.title = t;
    var m = d.querySelector('meta[name="description"]'), md = h.getAttribute('data-d-' + l);
    if (m && md) m.setAttribute('content', md);
    d.querySelectorAll('[data-a-' + l + ']').forEach(function (el) {
      el.setAttribute('alt', el.getAttribute('data-a-' + l));
    });
  }

  d.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.getAttribute('data-lang');
      setLang(l); save(l);
    });
  });

  var q = (location.search.match(/[?&]lang=(kk|ru|en)/) || [])[1];
  var s = null; try { s = localStorage.getItem('sozim.lang'); } catch (e) {}
  if (LANGS.indexOf(s) < 0) s = null;
  if (q) save(q);
  setLang(q || s || h.getAttribute('data-def') || 'kk');

  d.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      (navigator.clipboard ? navigator.clipboard.writeText(b.getAttribute('data-c')) : Promise.reject()).then(function () {
        b.classList.add('done');
        setTimeout(function () { b.classList.remove('done'); }, 1500);
      }, function () {});
    });
  });
})();
