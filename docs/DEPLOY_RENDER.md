## Deploy to Render — quick settings

This file contains copy-paste settings and a checklist to deploy the project to Render.

### 1) Create a Web Service on Render
- Service type: Web Service
- Connect to: GitHub → select repository `CarspecsHub_automiles`
- Branch: `main`
- Root Directory: leave blank (use repo root)

### 2) Build & Start
- Build Command: (leave empty) — Render will run `npm install` automatically
- Start Command: `npm start`
  - (package.json includes: `"start": "node server.js"`)

### 3) Environment / runtime
- Environment: Node (Render detects Node automatically)
- Port: leave blank — Render sets `PORT` automatically; server uses `process.env.PORT || 3000`

### 4) Required Environment Variables (set under Service → Environment)
- `MONGODB_URI`
  - Example placeholder (DO NOT commit real credentials):
```
mongodb+srv://<db_user>:<password>@cluster0.xxxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
```
- `SESSION_SECRET` — a strong random string (eg. `openssl rand -base64 32`)
- `NODE_ENV` — recommended: `production` (optional; Render sets this automatically)
- (Optional dev only) `MOCK_USER_EMAIL` and `MOCK_USER_PASSWORD`

Add these in Render Dashboard → Service → Environment → Add Env Var.

### 5) Health & Scaling
- Instance type: start with the smallest plan for testing
- Health check: Render will check the assigned port. Use `/` for liveness.

### 6) Files to keep in repo root (already present)
- `package.json` (must contain `"start": "node server.js"`)
- `server.js`
- `index.html`, `dashboard.html`
- `app.js`, `data.js`, `styles.css`
- `/data` and `/public` or asset folders (images, fonts, etc.)
- `README.md`, `.gitignore`

### 7) Files NOT to commit (use Render env vars instead)
- `.env` (contains secrets) — `.gitignore` already lists `.env`
- Any files containing credentials, private keys, certificates

### 8) Important security notes
- We removed hard-coded MongoDB credentials from `server.js`. The app will now:
  - Attempt to connect only if `MONGODB_URI` is set; otherwise run in mock/no-DB mode and log a warning.
  - Avoid printing full connection strings in logs.
- If your MongoDB password was ever committed, rotate the DB credentials and clean git history (I can help).

### 9) Quick local deploy checklist (copyable)
```bash
# 1. Commit & push
git add .
git commit -m "Prepare for Render deploy"
git push origin main

# 2. On Render: create Web Service -> connect GitHub repo -> set Start Command: npm start

# 3. Add environment variables in Render Dashboard:
# - MONGODB_URI
# - SESSION_SECRET
# - NODE_ENV=production (optional)
```

### 10) Troubleshooting / logs
- If the service won't start, open Render Dashboard → Your service → Logs.
- Common problems:
  - Missing `MONGODB_URI`: server will warn and run in mock mode (DB features unavailable).
  - Incorrect `SESSION_SECRET`: sessions may be unstable; set a strong secret.
  - Port issues are unlikely — server reads `process.env.PORT`.

---

### Copyable Deploy Checklist (Markdown)

- [ ] Push branch `main` to GitHub
- [ ] Create Render Web Service (Web Service → GitHub → repo `CarspecsHub_automiles`)
- [ ] Start Command: `npm start`
- [ ] Add env var `MONGODB_URI` in Render
- [ ] Add env var `SESSION_SECRET` in Render
- [ ] Set `NODE_ENV=production` (optional)
- [ ] Deploy and monitor logs in Render Dashboard
