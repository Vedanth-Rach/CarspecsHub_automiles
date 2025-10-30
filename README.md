# CarspecsHub (Automiles)

Small demo app for browsing cars, with a login flow and wishlist. This project uses:

- Node.js + Express for the server
- MongoDB / Mongoose for user storage (optional, controlled by `MONGODB_URI`)
- Vanilla HTML/CSS/JS for client pages

Quick start

1. Copy `.env.example` to `.env` and fill in your values (do NOT commit your `.env`).

   ```powershell
   Copy-Item .env.example .env
   notepad .env
   ```

2. Install dependencies (if not already):

   ```powershell
   npm install
   ```

3. Start the server:

   ```powershell
   node server.js
   ```

4. Open http://localhost:3000 in your browser.

Notes

- If `MONGODB_URI` is set (for Atlas), the server will attempt a DB connection. If the DB connection fails, the server falls back to a mock test user for development.
- Do not commit real credentials. Use `.env` and keep it ignored by Git.

Useful commands

```powershell
# Start server
node server.js

# Create a snapshot branch (already performed)
# git checkout -b snapshot-before-option-b
# git push -u origin snapshot-before-option-b
```
