/**
 * Ever Wealth Legacy — lead form receiver.
 * SETUP (one time, ~5 minutes):
 * 1. Create a Google Sheet named e.g. "EWL Website Leads".
 * 2. Extensions → Apps Script → paste this entire file, save.
 * 3. Deploy → New deployment → type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Copy the Web App URL and paste it into js/form.js (GOOGLE_SCRIPT_URL).
 * 5. Share the Sheet with teammates who need to see leads.
 */
var SHEET_NAME = "Leads";

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "Email", "Service", "Message", "Page", "Status"]);
      sheet.setFrozenRows(1);
    }
    var p = e.parameter;
    sheet.appendRow([new Date(), p.name || "", p.phone || "", p.email || "",
                     p.service || "", p.message || "", p.page || "", "New"]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
