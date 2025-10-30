#!/usr/bin/env node
// Simple importer: reads CSV or JSON and writes a validated normalized JSON to data/cars_import_output.json
// Usage: node scripts/import_cars.js <path-to-file>

const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node scripts/import_cars.js <path-to-file.csv|.json>');
  process.exit(1);
}

if (process.argv.length < 3) usage();

const inPath = process.argv[2];
if (!fs.existsSync(inPath)) {
  console.error('Input file not found:', inPath);
  process.exit(2);
}

function parseCSV(content) {
  // Very small CSV parser for the template format. Assumes header row and comma-separated values.
  // Columns with commas should be quoted. This parser is minimal — for complex CSVs use a proper CSV parser.
  const lines = content.split(/\r?\n/).filter(l => l.trim() !== '');
  const header = lines.shift().split(',').map(h => h.trim());
  const rows = lines.map(line => {
    // split respecting quoted fields
    const values = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === ',' && !inQuotes) {
        values.push(cur);
        cur = '';
        continue;
      }
      cur += ch;
    }
    values.push(cur);
    const obj = {};
    header.forEach((h, idx) => {
      obj[h] = values[idx] !== undefined ? values[idx].trim() : '';
    });
    return obj;
  });
  return rows;
}

function normalizeRecord(raw) {
  // Minimal normalization / type coercion. Expect callers to provide variants as JSON string if complex.
  const rec = {};
  rec.id = raw.id || `${(raw.brand||'').toLowerCase().replace(/\s+/g,'-')}-${(raw.model||'').toLowerCase().replace(/\s+/g,'-')}-${raw.year||'2025'}`;
  rec.brand = raw.brand || '';
  rec.model = raw.model || '';
  rec.year = raw.year ? Number(raw.year) : undefined;
  rec.category = raw.category || '';
  rec.bodyType = raw.bodyType || raw.body_type || '';
  rec.seatingCapacity = raw.seatingCapacity ? Number(raw.seatingCapacity) : (raw.seating_capacity ? Number(raw.seating_capacity) : undefined);
  rec.budgetCategory = raw.budgetCategory || raw.budget_category || '';
  rec.description = raw.description || '';
  rec.pros = raw.pros ? raw.pros.split('|').map(s => s.trim()).filter(Boolean) : [];
  rec.cons = raw.cons ? raw.cons.split('|').map(s => s.trim()).filter(Boolean) : [];
  rec.videoReview = raw.videoReview || '';

  // Variants can be a JSON string in the CSV cell. If not present, try to create a minimal default variant.
  if (raw.variants) {
    try {
      rec.variants = JSON.parse(raw.variants);
    } catch (e) {
      // try to interpret as semicolon separated simple variants: id|name|exShowroom
      rec.variants = raw.variants.split(';').map(v => {
        const parts = v.split('|').map(p => p.trim());
        return { id: parts[0] || `${rec.id}-std`, name: parts[1] || 'Std', pricing: { exShowroom: Number(parts[2] || 0) } };
      });
    }
  } else {
    rec.variants = raw.variant_name ? [{ id: raw.variant_id || `${rec.id}-std`, name: raw.variant_name, pricing: { exShowroom: Number(raw.exShowroom || 0) } }] : [];
  }

  // image and colors
  rec.image = raw.image || '';
  rec.colors = raw.colors ? raw.colors.split('|').map(s => s.trim()).filter(Boolean) : [];

  return rec;
}

async function main() {
  const ext = path.extname(inPath).toLowerCase();
  let items = [];
  if (ext === '.json') {
    const raw = fs.readFileSync(inPath, 'utf8');
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) items = parsed;
      else if (parsed.cars && Array.isArray(parsed.cars)) items = parsed.cars;
      else {
        console.error('JSON file did not contain an array of records');
        process.exit(3);
      }
    } catch (e) {
      console.error('Invalid JSON:', e.message);
      process.exit(4);
    }
  } else if (ext === '.csv') {
    const raw = fs.readFileSync(inPath, 'utf8');
    items = parseCSV(raw);
  } else {
    console.error('Unsupported file type:', ext);
    usage();
  }

  const normalized = items.map(normalizeRecord);

  const outDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'cars_import_output.json');
  fs.writeFileSync(outPath, JSON.stringify(normalized, null, 2), 'utf8');
  console.log('Wrote', outPath, 'with', normalized.length, 'records');
  console.log('Next steps: review the file and merge/select records into data.js (window.indianCarsData) as needed.');
}

main().catch(err => { console.error(err); process.exit(99); });
