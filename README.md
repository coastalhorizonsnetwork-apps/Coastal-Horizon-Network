# Coastal Horizon Network

Custom responsive website for Coastal Horizon Network with a branded homepage, department sections, member login/signup UI, and dashboard foundation.

## Website files

- `index.html` — public homepage and authentication modal
- `dashboard.html` — member dashboard shell
- `styles.css` — responsive CHN design system
- `app.js` — authentication UI/API client
- `config.js` — public frontend configuration
- `assets/logo.svg` — CHN wave emblem based on the supplied community logo

## Google Sheets database connection

The frontend is prepared to connect to the Google Sheets database created with Google Apps Script.

1. Keep the existing database functions in the Apps Script project attached to your CHN Google Sheet.
2. Copy `google-apps-script/API.gs` into that Apps Script project.
3. Deploy the Apps Script as a Web App.
4. Put the deployed Web App URL into `CHN_CONFIG.apiBaseUrl` in `config.js`.
5. Set `discordEnabled` to `true` only after a real Discord OAuth backend is configured.

Expected API requests:

- `POST` with `{ action: "login", email, password }`
- `POST` with `{ action: "signup", firstName, lastName, email, password }`

Expected response shape:

- Success: `{ success: true, member: { ... } }`
- Failure: `{ success: false, message: "..." }`

No secrets should be committed to this repository. The current spreadsheet test database stores passwords directly in the sheet; replace this with proper password hashing/authentication before public launch.
