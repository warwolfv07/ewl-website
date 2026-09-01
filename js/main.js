/* Ever Wealth Legacy — renders data-driven sections & UI behaviours */
(function () {
  var b = (window.EWL && EWL.base) || window.EWL_BASE || "";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m];
    });
  }

  /* ---------- Team ---------- */
  function teamCard(m) {
    var photo = m.photo
      ? '<img src="' + b + esc(m.photo) + '" alt="' + esc(m.name) + '" loading="lazy">'
      : '<div class="avatar-fallback">' + esc(m.name.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2)) + "</div>";
    return '<div class="team-card reveal"><div class="team-photo">' + photo + '</div>' +
      '<div class="team-info"><h3>' + esc(m.name) + '</h3><div class="role">' + esc(m.role) + '</div>' +
      '<p>' + esc(m.bio) + "</p></div></div>";
  }
  window.renderTeam = function (id, limit) {
    var el = document.getElementById(id);
    if (!el || !window.EWL_TEAM) return;
    var list = limit ? EWL_TEAM.slice(0, limit) : EWL_TEAM;
    el.innerHTML = list.map(teamCard).join("");
  };

  /* ---------- Cards ---------- */
  function blogCard(p) {
    var link = b + esc(p.link);
    var thumb = p.image ? '<img src="' + b + esc(p.image) + '" alt="" loading="lazy">' : "&#128218;";
    return '<article class="blog-card"><a href="' + link + '"><div class="blog-thumb">' + thumb + '</div></a>' +
      '<div class="blog-body"><div class="meta">' + esc(p.tag) + " &bull; " + esc(p.date) + "</div>" +
      '<h3><a href="' + link + '">' + esc(p.title) + '</a></h3><p>' + esc(p.excerpt) + "</p></div></article>";
  }
  function socialTile(s) {
    var cls = { youtube: "st-youtube", instagram: "st-instagram", facebook: "st-facebook", linkedin: "st-linkedin" }[s.platform] || "st-facebook";
    var thumb = s.youtubeId
      ? '<img src="https://i.ytimg.com/vi/' + esc(s.youtubeId) + '/hqdefault.jpg" alt="" loading="lazy"><span class="play">&#9658;</span>'
      : (s.thumbnail ? '<img src="' + b + esc(s.thumbnail) + '" alt="" loading="lazy"><span class="play">&#9658;</span>' : "&#9658;");
    return '<a class="social-tile" href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
      '<div class="social-thumb ' + cls + '">' + thumb + '</div>' +
      '<div class="social-body"><span class="platform">' + esc(s.platform) + " &bull; " + esc(s.type) + "</span>" +
      "<p>" + esc(s.caption) + "</p></div></a>";
  }
  function testiCard(t) {
    return '<div class="testi-card"><div class="stars">' + "★".repeat(t.stars || 5) + "</div>" +
      "<p>&ldquo;" + esc(t.quote) + '&rdquo;</p><div class="who">' + esc(t.name) + "<span>" + esc(t.detail) + "</span></div></div>";
  }

  /* ---------- Marquee (horizontally moving panel) ---------- */
  window.renderMarquee = function (id, items, renderer, secsPerItem) {
    var el = document.getElementById(id);
    if (!el || !items || !items.length) return;
    var html = items.map(renderer).join("");
    el.innerHTML = '<div class="marquee-track">' + html + html + "</div>"; // duplicate for seamless loop
    var track = el.querySelector(".marquee-track");
    track.style.setProperty("--speed", items.length * (secsPerItem || 6) + "s");
    /* touch devices have no hover: pause while touching, resume shortly after */
    el.addEventListener("touchstart", function () { track.style.animationPlayState = "paused"; }, { passive: true });
    el.addEventListener("touchend", function () { setTimeout(function () { track.style.animationPlayState = "running"; }, 1500); });
  };
  window.renderBlogsMarquee = function (id) { renderMarquee(id, window.EWL_BLOGS, blogCard, 7); };
  window.renderSocialMarquee = function (id) { renderMarquee(id, window.EWL_SOCIAL, socialTile, 5); };
  window.renderTestimonials = function (id) { renderMarquee(id, window.EWL_TESTIMONIALS, testiCard, 8); };

  /* ---------- Grids for resources page ---------- */
  window.renderBlogsGrid = function (id) {
    var el = document.getElementById(id);
    if (el && window.EWL_BLOGS) el.innerHTML = EWL_BLOGS.map(blogCard).join("");
  };
  window.renderSocialGrid = function (id) {
    var el = document.getElementById(id);
    if (el && window.EWL_SOCIAL) el.innerHTML = EWL_SOCIAL.map(socialTile).join("");
  };

  /* ---------- Optional page images (hero banner / section photos) ---------- */
  window.applyMedia = function (id, src, kind) {
    var el = document.getElementById(id);
    if (!el || !src) return; // no image set -> keep the logo placeholder
    if (kind === "hero") {
      el.innerHTML = '<img class="hero-photo" src="' + esc(src) + '" alt="Ever Wealth Legacy">';
    } else {
      el.classList.add("as-photo");
      el.innerHTML = '<img src="' + esc(src) + '" alt="">';
    }
  };

  /* ---------- FAQ accordion ---------- */
  document.addEventListener("click", function (e) {
    var q = e.target.closest(".faq-q");
    if (!q) return;
    var item = q.parentElement, ans = item.querySelector(".faq-a"), open = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(function (i) {
      i.classList.remove("open");
      i.querySelector(".faq-a").style.maxHeight = null;
    });
    if (!open) { item.classList.add("open"); ans.style.maxHeight = ans.scrollHeight + "px"; }
  });

  /* ---------- Reveal on scroll ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  });
})();
