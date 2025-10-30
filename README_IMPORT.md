# Importing a full India car dataset

This project ships a built-in `data.js` containing many cars. If you want to add "all remaining cars available in India (up to date)", there are two ways:

1) Provide a dataset file (CSV or JSON) and run the importer below to produce a normalized JSON file for review.
2) Ask me to fetch a public dataset (I will need your confirmation and network access/URL). I cannot pull data from the web without explicit permission and a source.

Files added in this commit:
- `scripts/import_cars.js` — Node.js importer. Usage: `node scripts/import_cars.js <path-to-file.csv|.json>`
- `data/cars_template.csv` — CSV template and examples to prepare your dataset.

How to use the importer:

1. Prepare a CSV export that follows the template header in `data/cars_template.csv`. For complex fields like `variants` you can include a JSON string in the CSV cell (see examples).

2. Run the importer from the repo root (PowerShell or any shell):

```powershell
node scripts/import_cars.js data/cars_template.csv
```

This will write `data/cars_import_output.json` containing normalized car objects.

3. Review `data/cars_import_output.json` and manually merge or replace `window.indianCarsData` in `data.js`.

Notes & recommendations:
- Adding every car model for India is a large dataset and often requires a trusted source (NAMA/official brand data, API or scraped listings). I recommend gathering a CSV/JSON export from a reputable source, then running the importer.
- If you want, I can implement a safe merge into `data.js` automatically, but I prefer producing a reviewable JSON output first.
- If you'd like me to fetch and import data from a public API or website, paste the source URL(s) or tell me which site to use and confirm you want me to fetch; I will then attempt to retrieve and transform the data.

If you want me to proceed now, choose one option:
- Provide a CSV/JSON file here (I'll run the importer and merge/add records).
- Ask me to fetch from a public source and give the source URL(s)/permission.
- Or I can add curated additional popular models manually (small batch), if you prefer.
