(function () {
  var cfg = window.NUTRILEAN || {};

  function $all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function whatsappUrl(text) {
    return 'https://wa.me/' + cfg.whatsappNumber + (text ? '?text=' + encodeURIComponent(text) : '');
  }
  window.nutrileanWhatsappUrl = whatsappUrl;

  // Offer banner + offer text on CTAs
  if (cfg.offer && cfg.offer.active) {
    $all('[data-offer-bar]').forEach(function (el) { el.hidden = false; });
    $all('[data-offer-banner]').forEach(function (el) { el.textContent = cfg.offer.banner; });
    $all('[data-offer-cta]').forEach(function (el) { el.textContent = cfg.offer.cta; });
    $all('[data-offer-cta-wrap]').forEach(function (el) { el.hidden = false; });
  }

  // Contact + social links
  $all('[data-coach-name]').forEach(function (el) { el.textContent = cfg.coachName; });
  $all('[data-phone]').forEach(function (el) { el.textContent = cfg.phoneDisplay; });
  $all('[data-whatsapp-link]').forEach(function (el) {
    el.href = whatsappUrl('Hi ' + cfg.coachName + ', I want to know more about the nutrilean.in fat loss programme.');
  });
  $all('[data-email-link]').forEach(function (el) {
    el.href = 'mailto:' + cfg.email;
    el.textContent = cfg.email;
  });
  $all('[data-social]').forEach(function (el) {
    var url = cfg.social && cfg.social[el.dataset.social];
    if (url) el.href = url; else el.hidden = true;
  });
  $all('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Client transformations
  var tGrid = document.querySelector('[data-transformations]');
  if (tGrid && cfg.transformations) {
    // Optimised .webp images ship as name.webp (800px) + name-400.webp (400px)
    var responsive = function (src, sizes) {
      if (!/\.webp$/.test(src)) return '';
      return ' srcset="' + escapeHtml(src.replace(/\.webp$/, '-400.webp')) + ' 400w, ' + escapeHtml(src) + ' 800w" sizes="' + sizes + '"';
    };
    var photo = function (p, tag, alt) {
      return '<div class="transform-card__photo">' +
        '<img src="' + escapeHtml(p.image) + '"' + responsive(p.image, '(max-width: 600px) 50vw, 260px') +
        ' alt="' + escapeHtml(alt) + '" width="400" height="600" loading="lazy" decoding="async">' +
        (p.tag === false ? '' : '<span class="transform-card__tag transform-card__tag--' + tag + '">' + tag + (p.label ? ' · ' + escapeHtml(p.label) : '') + '</span>') +
        '</div>';
    };
    tGrid.innerHTML = cfg.transformations.map(function (t) {
      var media = t.before && t.after
        ? '<div class="transform-card__pair">' +
            photo(t.before, 'Before', t.name + ' before') +
            photo(t.after, 'After', t.name + ' after') +
          '</div>'
        : '<img class="transform-card__single" src="' + escapeHtml(t.image) + '"' + responsive(t.image, '(max-width: 600px) 100vw, 360px') +
          ' alt="' + escapeHtml(t.name + ' — ' + t.result) + '" width="800" height="1200" loading="lazy" decoding="async">';
      return '<figure class="transform-card reveal">' + media +
        '<figcaption><strong>' + escapeHtml(t.result) + '</strong><span>' + escapeHtml(t.name) + '</span></figcaption>' +
        '</figure>';
    }).join('');
  }

  // Client video stories — videos only download when played
  var vTrack = document.querySelector('[data-videos]');
  if (vTrack && cfg.videos) {
    vTrack.innerHTML = cfg.videos.map(function (v) {
      return '<figure class="video-card">' +
        '<div class="video-card__media">' +
        '<video src="' + escapeHtml(v.video) + '" poster="' + escapeHtml(v.poster) + '" preload="none" muted loop playsinline width="540" height="960" aria-label="' + escapeHtml(v.name) + '\'s story"></video>' +
        '</div>' +
        '<figcaption><strong>' + escapeHtml(v.result) + '</strong><span>' + escapeHtml(v.name) + '</span></figcaption>' +
        '</figure>';
    }).join('');

    // Stories play muted on hover (or when scrolled into view on touch screens)
    // and pause when the pointer leaves. Clicking a playing story toggles sound.
    var videos = Array.prototype.slice.call(vTrack.querySelectorAll('video'));
    var play = function (video) {
      videos.forEach(function (o) { if (o !== video) o.pause(); });
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    };
    var canHover = window.matchMedia('(hover: hover)').matches;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    videos.forEach(function (video) {
      if (canHover) {
        video.addEventListener('mouseenter', function () { play(video); });
        video.addEventListener('mouseleave', function () { video.pause(); });
      }
      video.addEventListener('click', function () {
        if (video.paused) { play(video); return; }
        video.muted = !video.muted;
      });
    });

    if (!canHover && !reduceMotion && 'IntersectionObserver' in window) {
      var vo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio >= 0.7) play(entry.target);
          else entry.target.pause();
        });
      }, { threshold: [0, 0.7] });
      videos.forEach(function (v) { vo.observe(v); });
    }

    var scrollBy = function (dir) {
      var card = vTrack.querySelector('.video-card');
      vTrack.scrollBy({ left: dir * (card ? card.offsetWidth + 16 : 280) * 2, behavior: 'smooth' });
    };
    var prev = document.querySelector('[data-video-prev]');
    var next = document.querySelector('[data-video-next]');
    if (prev) prev.addEventListener('click', function () { scrollBy(-1); });
    if (next) next.addEventListener('click', function () { scrollBy(1); });
  }

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      document.body.classList.toggle('nav-open', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  }

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal on scroll
  var revealEls = $all('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
