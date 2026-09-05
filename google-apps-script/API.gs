/**
 * Coastal Horizon Network - Google Sheets API adapter
 *
 * Add these functions to the Apps Script project attached to your CHN database.
 * Deploy the Apps Script as a Web App and place its URL in config.js.
 *
 * The existing database functions can remain in Code.gs.
 */

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const action = String(body.action || '').toLowerCase();

    let result;

    if (action === 'login') {
      result = loginUser(body.email, body.password);
      if (result && result.success) {
        result.member = getMemberRecord(result.memberID);
      }
    } else if (action === 'signup') {
      result = createAccount(body.firstName, body.lastName, body.email, body.password);
      if (result && result.success) {
        result.member = getMemberRecord(result.memberID);
      }
    } else {
      result = { success: false, message: 'Unknown API action.' };
    }

    return jsonResponse(result);
  } catch (error) {
    return jsonResponse({
      success: false,
      message: 'API error: ' + error.message
    });
  }
}

function getMemberRecord(memberID) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Members');
  if (!sheet) return null;

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return null;

  const headers = values[0];
  const idCol = headers.indexOf('Member ID');

  if (idCol === -1) return null;

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idCol]) === String(memberID)) {
      const member = {};
      headers.forEach(function(header, index) {
        if (header !== 'Password') member[header] = values[i][index];
      });

      return {
        memberID: member['Member ID'] || '',
        displayName: member['Display Name'] || '',
        firstName: member['First Name'] || '',
        lastName: member['Last Name'] || '',
        email: member['Email'] || '',
        discordID: member['Discord ID'] || '',
        discordUsername: member['Discord Username'] || '',
        accountStatus: member['Account Status'] || '',
        joinDate: member['Join Date'] || '',
        lastLogin: member['Last Login'] || '',
        primaryDepartment: member['Primary Department'] || '',
        primaryRank: member['Primary Rank'] || '',
        staffStatus: member['Staff Status'] || ''
      };
    }
  }

  return null;
}

function doGet() {
  return jsonResponse({
    success: true,
    service: 'Coastal Horizon Network API',
    status: 'online'
  });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
