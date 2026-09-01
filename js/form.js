/* =====================================================================
   Lead form → Google Sheets
   1. Follow README.md ("Connect the form to Google Sheets") to create a
      Google Apps Script from google-apps-script/Code.gs and deploy it.
   2. Paste the deployed Web App URL below.
   ===================================================================== */
var GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwXxfiygmvAfK_FuIJiCTnb-yxT1WhDqrKpXyMPOp4xclfGRRNIg2zvZlKdSccN7bLz0w/exec";

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("leadForm");
  if (!form) return;
  var status = document.getElementById("formStatus");
  var btn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (form.querySelector('[name="company"]').value) return; // honeypot: silently drop bots

    var phone = form.querySelector('[name="phone"]').value.replace(/[^0-9+]/g, "");
    if (phone.length < 10) return show("err", "Please enter a valid phone number.");

    if (GOOGLE_SCRIPT_URL.indexOf("PASTE_YOUR") === 0) {
      return show("err", "The form is not connected yet. Please set GOOGLE_SCRIPT_URL in js/form.js (see README.md), or call us directly.");
    }

    var data = new URLSearchParams();
    ["name", "phone", "email", "service", "message"].forEach(function (f) {
      data.append(f, form.querySelector('[name="' + f + '"]').value.trim());
    });
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
