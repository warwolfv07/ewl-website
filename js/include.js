/* =====================================================================
   Ever Wealth Legacy — site config + shared header/footer
   EDIT THE CONFIG BLOCK BELOW to update contact details & social links
   shown across every page (header, footer, WhatsApp button, contact page).
   ===================================================================== */
window.EWL = window.EWL || {};

EWL.config = {
  phone: "+91 98765 43210",              // display phone number
  phoneHref: "+919876543210",            // tel: link (no spaces)
  whatsapp: "919876543210",              // WhatsApp number (country code, digits only)
  email: "info@everwealthlegacy.in",
  address: "201, Placeholder Business Park, MG Road, Pune, Maharashtra 411001, India",
  hours: "Mon – Sat: 10:00 AM – 7:00 PM",
  social: {
    facebook:  "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin:  "https://linkedin.com/",
    youtube:   "https://youtube.com/"
  }
};

/* Base path: pages inside subfolders (e.g. /blog/) set window.EWL_BASE = "../" */
EWL.base = window.EWL_BASE || "";

/* Inline SVG icons */
EWL.icons = {
  fb:  '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V13h2.7v8h3.2z"/></svg>',
  ig:  '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z"/></svg>',
  li:  '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6.5 21H2.9V8.7h3.6V21zM4.7 7.1a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM21 21h-3.6v-6c0-1.4 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V21H9.5V8.7H13v1.7h.1c.5-.9 1.7-1.9 3.4-1.9 3.7 0 4.4 2.4 4.4 5.6V21z"/></svg>',
  yt:  '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z"/></svg>',
  wa:  '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.4 14.1c-.2.7-1.3 1.3-1.8 1.4-.5 0-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.3-.1.6.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2.1 1c.3.2.5.3.6.4 0 .1 0 .7-.2 1.4z"/></svg>'
};

/* Logo mark (SVG approximation — replace assets/logo.svg with the official file
   and swap the <svg> below for <img src="...assets/logo.svg"> if preferred). */
EWL.logoMark = function (size) {
  return '<img src="' + EWL.base + 'assets/logo.svg" alt="Ever Wealth Legacy logo" style="width:' + size + 'px;height:' + size + 'px">';
};

EWL.brandHTML = function () {
  return '<a class="brand" href="' + EWL.base + 'index.html">' + EWL.logoMark(52) +
    '<span><span class="brand-name">Ever<span class="gold">Wealth</span>Legacy</span><br>' +
    '<span class="brand-tag">Will &bull; Wealth &bull; Legacy</span></span></a>';
};

/* ---------- Header ---------- */
EWL.renderHeader = function () {
  var b = EWL.base, mount = document.getElementById("site-header");
  if (!mount) return;
  mount.className = "site-header";
  mount.innerHTML =
    '<div class="container header-inner">' + EWL.brandHTML() +
    '<nav class="main-nav" id="mainNav"><ul>' +
    '<li><a href="' + b + 'index.html" data-nav="home">Home</a></li>' +
    '<li><a href="' + b + 'about.html" data-nav="about">About Us</a></li>' +
    '<li class="has-drop"><a href="' + b + 'index.html#services" data-nav="services">Our Services</a><ul class="dropdown">' +
      '<li><a href="' + b + 'will-drafting.html">Will Drafting</a></li>' +
      '<li><a href="' + b + 'legacy-planning.html">Legacy Planning</a></li>' +
      '<li><a href="' + b + 'wealth-management.html">Wealth Management</a></li>' +
      '<li><a href="' + b + 'financial-planning.html">Financial Planning</a></li>' +
    '</ul></li>' +
    '<li><a href="' + b + 'why-us.html" data-nav="why">Why EverWealth</a></li>' +
    '<li><a href="' + b + 'resources.html" data-nav="resources">Resources</a></li>' +
    '<li><a href="' + b + 'contact.html" data-nav="contact">Contact Us</a></li>' +
    '</ul><a class="btn btn-gold nav-cta" href="' + b + 'contact.html#consult">Book a Consultation</a></nav>' +
    '<button class="nav-toggle" id="navToggle" aria-label="Menu">&#9776;</button></div>';

  var active = document.body.getAttribute("data-page");
  if (active) {
    var link = mount.querySelector('[data-nav="' + active + '"]');
    if (link) link.classList.add("active");
  }
  var nav = document.getElementById("mainNav"), toggle = document.getElementById("navToggle");
  var backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);
  function setMenu(open) {
    nav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.innerHTML = open ? "&#10005;" : "&#9776;";
  }
  toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  backdrop.addEventListener("click", function () { setMenu(false); });
  nav.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (a && !a.parentElement.classList.contains("has-drop")) setMenu(false);
  });
  window.addEventListener("resize", function () { if (window.innerWidth > 860) setMenu(false); });
  mount.querySelectorAll(".has-drop > a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (window.innerWidth <= 860) { e.preventDefault(); a.parentElement.classList.toggle("open"); }
    });
  });
};

/* ---------- Footer + floating buttons ---------- */
EWL.renderFooter = function () {
  var b = EWL.base, c = EWL.config, mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.className = "site-footer";
  mount.innerHTML =
    '<div class="container"><div class="footer-grid">' +
    '<div class="footer-brand">' + EWL.brandHTML() +
      '<p>We help you build, protect and pass on your wealth with clarity, care and confidence. Plan today. Protect tomorrow. Pass on a legacy forever.</p>' +
      '<div class="social-links">' +
      '<a href="' + c.social.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + EWL.icons.fb + '</a>' +
      '<a href="' + c.social.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + EWL.icons.ig + '</a>' +
      '<a href="' + c.social.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + EWL.icons.li + '</a>' +
      '<a href="' + c.social.youtube + '" target="_blank" rel="noopener" aria-label="YouTube">' + EWL.icons.yt + '</a></div></div>' +
    '<div><h4>Quick Links</h4><ul>' +
      '<li><a href="' + b + 'index.html">Home</a></li>' +
      '<li><a href="' + b + 'about.html">About Us</a></li>' +
      '<li><a href="' + b + 'why-us.html">Why EverWealth</a></li>' +
      '<li><a href="' + b + 'resources.html">Resources</a></li>' +
      '<li><a href="' + b + 'contact.html">Contact Us</a></li></ul></div>' +
    '<div><h4>Our Services</h4><ul>' +
      '<li><a href="' + b + 'will-drafting.html">Will Drafting</a></li>' +
      '<li><a href="' + b + 'legacy-planning.html">Legacy Planning</a></li>' +
      '<li><a href="' + b + 'wealth-management.html">Wealth Management</a></li>' +
      '<li><a href="' + b + 'financial-planning.html">Financial Planning</a></li></ul></div>' +
    '<div><h4>Reach Us</h4><ul class="footer-contact">' +
      '<li><span class="ico">&#9906;</span><span>' + c.address + '</span></li>' +
      '<li><span class="ico">&#9990;</span><a href="tel:' + c.phoneHref + '">' + c.phone + '</a></li>' +
      '<li><span class="ico">&#9993;</span><a href="mailto:' + c.email + '">' + c.email + '</a></li>' +
      '<li><span class="ico">&#128337;</span><span>' + c.hours + '</span></li></ul></div>' +
    '</div></div>' +
    '<div class="footer-bottom">&copy; ' + new Date().getFullYear() + ' Ever Wealth Legacy. All Rights Reserved. &nbsp;|&nbsp; ' +
    '<a href="' + b + 'privacy.html">Privacy Policy</a> &nbsp;|&nbsp; <a href="' + b + 'terms.html">Terms &amp; Conditions</a></div>';

  /* WhatsApp float + back-to-top */
  var wa = document.createElement("a");
  wa.className = "whatsapp-float";
  wa.href = "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent("Hi, I would like to know more about your will & legacy planning services.");
  wa.target = "_blank"; wa.rel = "noopener"; wa.setAttribute("aria-label", "Chat on WhatsApp");
  wa.innerHTML = EWL.icons.wa;
  document.body.appendChild(wa);

  var bt = document.createElement("button");
  bt.className = "back-top"; bt.innerHTML = "&#8679;"; bt.setAttribute("aria-label", "Back to top");
  bt.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  document.body.appendChild(bt);
  window.addEventListener("scroll", function () {
    bt.classList.toggle("show", window.scrollY > 500);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  EWL.renderHeader();
  EWL.renderFooter();
});
