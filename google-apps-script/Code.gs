/**
 * Ever Wealth Legacy — lead form receiver + instant email alert.
 *
 * SETUP (one time):
 * 1. Open the production Google Sheet -> Extensions -> Apps Script.
 * 2. Replace everything with this file. Set NOTIFY_EMAILS below. Save.
 * 3. Run testEmailAlert once from the editor (Run button) and grant the
 *    permissions Google asks for (spreadsheet + send email). You should
 *    receive the test email.
 * 4. Deploy -> Manage deployments -> pencil icon -> Version: "New version"
 *    -> Deploy. (Editing the existing deployment keeps the same URL, so
 *    js/form.js does not need to change.)
 *
 * NOTE: after ANY future code edit, repeat step 4 — saving alone does not
 * update the live web app.
 */

var SHEET_NAME = "Leads";

/* Who gets the instant alert when a lead arrives.
   Comma-separate for multiple: "you@x.com, partner@x.com".  "" = no emails. */
var NOTIFY_EMAILS = "info@everwealthlegacy.com";

/* Optional but recommended: the sheet's ID (the long string in its URL,
   docs.google.com/spreadsheets/d/<THIS>/edit). Works even if the script
   is not attached to the sheet. "" = use the sheet this script lives in. */
var SHEET_ID = "";

function getSpreadsheet() {
  return SHEET_ID ? SpreadsheetApp.openById(SHEET_ID)
                  : SpreadsheetApp.getActiveSpreadsheet();
}

function doPost(e) {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "Email", "Service", "Message", "Page", "Status"]);
      sheet.setFrozenRows(1);
    }
    var p = e.parameter;
    sheet.appendRow([new Date(), p.name || "", p.phone || "", p.email || "",
                     p.service || "", p.message || "", p.page || "", "New"]);

    /* email alert AFTER the row is safely saved; a mail failure never loses the lead */
    try { sendLeadEmail(p, ss.getUrl()); } catch (mailErr) {}

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/* Health check: opening the /exec URL in a browser shows this message. */
function doGet() {
  return ContentService.createTextOutput("Ever Wealth Legacy lead endpoint is running.");
}

function sendLeadEmail(p, sheetUrl) {
  if (!NOTIFY_EMAILS) return;
  var subject = "New website lead: " + (p.name || "Unknown") +
                " — " + (p.service || "Not specified");
  var body =
    "A new lead just came in from the website.\n\n" +
    "Name:     " + (p.name || "-") + "\n" +
    "Phone:    " + (p.phone || "-") + "\n" +
    "Email:    " + (p.email || "-") + "\n" +
    "Services: " + (p.service || "-") + "\n" +
    "Message:  " + (p.message || "-") + "\n" +
    "Page:     " + (p.page || "-") + "\n\n" +
    "Open the leads sheet: " + (sheetUrl || "") + "\n";
  /* GmailApp (not MailApp): sends through the owner's real mailbox, so every
     alert is visible in Gmail's Sent folder - an auditable paper trail. */
  GmailApp.sendEmail(NOTIFY_EMAILS, subject, body);
}

/* Run this once from the editor to grant permissions and check delivery.
   Open the Execution log (View -> Logs / bottom panel) after running. */
function testEmailAlert() {
  Logger.log("Recipients: [" + NOTIFY_EMAILS + "]");
  Logger.log("Remaining daily email quota: " + MailApp.getRemainingDailyQuota());
  sendLeadEmail({
    name: "Test Lead", phone: "+91 00000 00000", email: "test@example.com",
    service: "Will Drafting, Legacy Planning", message: "This is a test alert.",
    page: "/manual-test"
  }, getSpreadsheet().getUrl());
  Logger.log("sendEmail call finished without an error.");
}
