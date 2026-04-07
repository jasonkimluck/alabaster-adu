# Google Apps Script Setup

## 1. Create the spreadsheet

Create a Google Sheet and add this header row to `Sheet1`:

`createdAt | name | phone | email | address | aduType | budget | financing | message | submittedAt`

## 2. Add the Apps Script

1. In the Google Sheet, open `Extensions > Apps Script`.
2. Replace the default code with the contents of [google-apps-script.gs](/Users/onp/Documents/New%20project/alabaster-site/google-apps-script.gs).
3. Update these values:
   - `spreadsheetId`
   - `notifyEmail`

## 3. Deploy the web app

1. Click `Deploy > New deployment`.
2. Choose `Web app`.
3. Set `Execute as` to `Me`.
4. Set access to `Anyone`.
5. Deploy and copy the web app URL.
6. If you update the Apps Script later, deploy a new version so both form submit and admin list use the latest code.

## 4. Paste the web app URL into the site

Open [index.html](/Users/onp/Documents/New%20project/alabaster-site/index.html) and replace:

`PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE`

with your deployed web app URL.

## Notes

- The site now posts directly to Google Apps Script, so it works on static hosting.
- The form no longer shows a fake success message when the request fails.
- `admin.html` now reads from Google Sheets through the same Apps Script URL in read-only mode.
- The admin page keeps the old client-side login, so it is for convenience only, not strong security.
