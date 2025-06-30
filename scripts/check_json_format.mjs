import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isUnderwriterJSONValid() {
  console.log("⏰ Checking .json in ../public/data/underwriter\n");
  const dirPath = path.join(__dirname, "../public/data/underwriter");

  let hasError = false;

  for (const file of fs.readdirSync(dirPath)) {
    if (file.endsWith(".json")) {
      const filePath = path.join(dirPath, file);
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(raw);
        
        if (Array.isArray(parsed.stocks)) {
          parsed.stocks.sort((a, b) => a.localeCompare(b));
        }

        const formatted = JSON.stringify(parsed, null, 2);

        if (raw.trim() !== formatted.trim()) {
          console.log(formatted);
          console.error(`❌ Format mismatch: ${file}`);
          hasError = true;
        }
      } catch (err) {
        console.error(`❌ Invalid JSON: ${file}`, err.message);
        hasError = true;
      }
    }
  }

  if (hasError) {
    console.error("\n❌ Some JSON files are improperly formatted.");
    process.exit(1);
  } else {
    console.log("✅ All JSON files are correctly formatted.");
  }
}

function isStockJSONValid() {
  console.log("⏰ Checking .json in ../public/data/stock\n");
  const dirPath = path.join(__dirname, "../public/data/stock");

  let hasError = false;

  for (const file of fs.readdirSync(dirPath)) {
    if (file.endsWith(".json")) {
      const filePath = path.join(dirPath, file);
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(raw);
        const formatted = JSON.stringify(parsed, null, 2);

        if (raw.trim() !== formatted.trim()) {
          console.log(formatted);
          console.error(`❌ Format mismatch: ${file}`);
          hasError = true;
        }
      } catch (err) {
        console.error(`❌ Invalid JSON: ${file}`, err.message);
        hasError = true;
      }
    }
  }

  if (hasError) {
    console.error("\n❌ Some JSON files are improperly formatted.");
    process.exit(1);
  } else {
    console.log("✅ All JSON files are correctly formatted.");
  }
}

function isUnderwritersJSONValid() {
  console.log("⏰ Checking .json in ../public/data/underwriter\n");
  const dirPath = path.join(__dirname, "../public/data/underwriter");

  let hasError = false;

}

function isStocksJSONValid() {
  console.log("⏰ Checking in ../public/stocks.json\n");
  const dirPath = path.join(__dirname, "../public/stocks.json");

  let hasError = false;

}

function isInformationJSONValid() {
  console.log("⏰ Checking in ../public/information.json\n");
  const dirPath = path.join(__dirname, "../public/information.json");

  let hasError = false;

}

function main() {
  isUnderwriterJSONValid();
  isStockJSONValid();
  // isUnderwritersValid();
  // isStocksJSONValid();
  // isInformationValid();
  console.log("\n✅ All checks passed successfully.");
}

main()

export {
  isUnderwriterJSONValid,
  isStockJSONValid,
  isUnderwritersJSONValid,
  isStocksJSONValid,
  isInformationJSONValid
}