# Coastal Horizon Network

Custom responsive website for Coastal Horizon Network with a branded homepage, department sections, member login/signup UI, and dashboard foundation.

## Files

- `index.html` — public homepage and authentication modal
- `dashboard.html` — member dashboard shell
- `styles.css` — responsive CHN design system
- `app.js` — authentication UI/API client
- `config.js` — public frontend configuration
- `assets/logo.webp` — supplied CHN community logo

## Google Sheets database

The frontend is prepared to connect to the Google Sheets database created with Google Apps Script. Set `CHN_CONFIG.apiBaseUrl` in `config.js` to a secure backend/proxy endpoint that exposes the database operations.

Expected JSON API contract:

- `POST` with `{ action: "login", email, password }`
- `POST` with `{ action: "signup", firstName, lastName, email, password }`

The backend should return `{ success: true, member: {...} }` or `{ success: false, message: "..." }`.

No secrets should be committed to this repository. The temporary spreadsheet test database stores passwords directly in the sheet; replace that with proper password hashing/authentication before production.
