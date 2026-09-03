/* =====================================================================
   Lead form -> Google Sheets
   1. Follow README.md ("Connect the form to Google Sheets") to create a
      Google Apps Script from google-apps-script/Code.gs and deploy it.
   2. Paste the deployed Web App URL below.
   ===================================================================== */
var GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwm5mrSVY-lpNZZSbLNFeypTHekcLJN_YELyhXVhQRalGlr0Iy2rRtgpAE5ojuTku-j/exec";

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("leadForm");
  if (!form) return;
  var status = document.getElementById("formStatus");
  var btn = form.querySelector('button[type="submit"]');

  /* Phone: optional +, then digits with spaces/dashes/dots/() allowed, 7-15 digits total */
  var PHONE_RE = /^\+?[0-9][0-9\s\-().]{4,18}$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var validators = {
    name: function (v) {
      if (!v) return "Please enter your name.";
      if (v.length < 2) return "Name looks too short.";
      return "";
    },
    phone: function (v) {
      if (!v) return "Please enter your phone number.";
      if (!PHONE_RE.test(v)) return "Only digits, spaces, dashes and an optional + country code are allowed.";
      var d = v.replace(/\D/g, "");
      if (d.length < 7 || d.length > 15) return "A phone number should have 7-15 digits (include your country code).";
      return "";
    },
    email: function (v) {
      if (v && !EMAIL_RE.test(v)) return "Please enter a valid email address, or leave it blank.";
      return "";
    },
    message: function (v) {
      if (!v) return "Please describe your requirement briefly.";
      if (v.length < 10) return "Please add a few more details (at least 10 characters).";
      return "";
    }
  };

  function field(name) { return form.querySelector('[name="' + name + '"]'); }

  function setError(name, msg) {
    var input = field(name), wrap = input.closest(".form-field");
    var err = wrap.querySelector(".err-msg");
    if (!err) { err = document.createElement("span"); err.className = "err-msg"; wrap.appendChild(err); }
    err.textContent = msg;
    err.style.display = msg ? "block" : "none";
    input.classList.toggle("invalid", !!msg);
  }

  /* clear a field's error as soon as the user edits it */
  Object.keys(validators).forEach(function (name) {
    field(name).addEventListener("input", function () { setError(name, ""); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (field("company").value) return; // honeypot: silently drop bots

    var firstBad = null;
    Object.keys(validators).forEach(function (name) {
      var msg = validators[name](field(name).value.trim());
      setError(name, msg);
      if (msg && !firstBad) firstBad = field(name);
    });
    if (firstBad) {
      firstBad.focus();
      return show("err", "Please fix the highlighted fields and submit again.");
    }

    if (GOOGLE_SCRIPT_URL.indexOf("PASTE_YOUR") === 0) {
      return show("err", "The form is not connected yet. Please set GOOGLE_SCRIPT_URL in js/form.js (see README.md), or call us directly.");
    }

    /* all selected services, comma-separated, into the single "service" column */
    var services = Array.prototype.map.call(
      form.querySelectorAll('[name="services"]:checked'),
      function (c) { return c.value; }
    ).join(", ") || "Not specified";

    var data = new URLSearchParams();
    ["name", "phone", "email", "message"].forEach(function (f) {
      data.append(f, field(f).value.trim());
    });
    data.append("service", services);
    data.append("page", location.pathname);

    btn.disabled = true; btn.textContent = "Sending...";
    fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", body: data })
      .then(function () {
        form.reset();
        show("ok", "Thank you! Your request has been received. Our team will reach out to you within one working day.");
      })
      .catch(function () {
        show("err", "Something went wrong. Please try again or call us directly.");
      })
      .finally(function () { btn.disabled = false; btn.textContent = "Submit Request"; });
  });

  function show(type, msg) {
    status.className = "form-status " + type;
    status.textContent = msg;
    status.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});
