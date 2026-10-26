/*
 * Optional: save booking form submissions to a Google Sheet.
 *
 * 1. Create a Google Sheet. Add a header row:
 *    submittedAt | name | city | contact | gender | age | goal | conditions | tried | page
 * 2. Extensions → Apps Script. Paste this file, save.
 * 3. Deploy → New deployment → type "Web app".
 *    Execute as: Me. Who has access: Anyone. Deploy and copy the Web app URL.
 * 4. Paste that URL into js/config.js → formEndpoint.
 */
var COLUMNS = ['submittedAt', 'name', 'city', 'contact', 'gender', 'age', 'goal', 'conditions', 'tried', 'page'];

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var p = e.parameter || {};
  sheet.appendRow(COLUMNS.map(function (key) { return p[key] || ''; }));
  return ContentService.createTextOutput('ok');
}
