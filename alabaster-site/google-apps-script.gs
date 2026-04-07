function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || '';
    if (action !== 'list') {
      return buildResponse_({
        success: false,
        error: 'Unsupported action'
      }, e);
    }

    var spreadsheetId = '1ePby6F7tfyGqVOgyVERmI3AelMxetHQoSUHb4SULSyo';
    var sheetName = 'Sheet1';
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    var values = sheet.getDataRange().getValues();
    var rows = values.slice(1);

    var records = rows
      .map(function(row, index) {
        if (row.join('') === '') return null;
        return {
          id: 'row-' + (index + 2),
          created_at: toIsoString_(row[0]),
          name: row[1] || '',
          phone: row[2] || '',
          email: row[3] || '',
          address: row[4] || '',
          aduType: row[5] || '',
          budget: row[6] || '',
          financing: row[7] || '',
          message: row[8] || '',
          submittedAt: toIsoString_(row[9]) || toIsoString_(row[0])
        };
      })
      .filter(function(row) { return row; })
      .sort(function(a, b) {
        return new Date(b.submittedAt || b.created_at || 0) - new Date(a.submittedAt || a.created_at || 0);
      });

    return buildResponse_({
      success: true,
      total: records.length,
      data: records,
      updatedAt: new Date().toISOString()
    }, e);
  } catch (error) {
    return buildResponse_({
      success: false,
      error: String(error)
    }, e);
  }
}

function doPost(e) {
  try {
    var spreadsheetId = '1ePby6F7tfyGqVOgyVERmI3AelMxetHQoSUHb4SULSyo';
    var sheetName = 'Sheet1';
    var notifyEmail = 'contact@overnightprintingseattle.com';

    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    var data = JSON.parse(e.postData.contents || '{}');

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.address || '',
      data.aduType || '',
      data.budget || '',
      data.financing || '',
      data.message || '',
      data.submittedAt || ''
    ]);

    var subject = '[Alabaster ADU] New consultation request';
    var body =
      'A new consultation request was submitted.\n\n' +
      'Name: ' + (data.name || '') + '\n' +
      'Phone: ' + (data.phone || '') + '\n' +
      'Email: ' + (data.email || '') + '\n' +
      'Address: ' + (data.address || '') + '\n' +
      'ADU Type: ' + (data.aduType || '') + '\n' +
      'Budget: ' + (data.budget || '') + '\n' +
      'Financing: ' + (data.financing || '') + '\n' +
      'Message: ' + (data.message || '') + '\n' +
      'Submitted At: ' + (data.submittedAt || '');

    MailApp.sendEmail({
      to: notifyEmail,
      subject: subject,
      body: body
    });

    return buildResponse_({ success: true }, null);
  } catch (error) {
    return buildResponse_({
      success: false,
      error: String(error)
    }, null);
  }
}

function buildResponse_(payload, e) {
  var callback = e && e.parameter && e.parameter.callback;
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(payload) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function toIsoString_(value) {
  if (!value) return '';
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return value.toISOString();
  }

  var parsed = new Date(value);
  return isNaN(parsed.getTime()) ? String(value) : parsed.toISOString();
}
