import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirPath = path.join(__dirname, '../public/data/underwriter');

let hasError = false;

for (const file of fs.readdirSync(dirPath)) {
  if (file.endsWith('.json')) {
    const filePath = path.join(dirPath, file);
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      const formatted = JSON.stringify(parsed, null, 2);

      if (raw.trim() !== formatted.trim()) {
        console.error(`❌ Format mismatch: ${file}`);
        hasError = true;
      } else {
        console.log(`✅ OK: ${file}`);
      }
    } catch (err) {
      console.error(`❌ Invalid JSON: ${file}`, err.message);
      hasError = true;
    }
  }
}

if (hasError) {
  console.error('\nSome JSON files are improperly formatted.');
  process.exit(1);
} else {
  console.log('\nAll JSON files are correctly formatted.');
}
