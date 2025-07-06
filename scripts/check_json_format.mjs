import fs from "fs";
import path, { parse } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isUnderwriterJSONValid() {
  console.log("\n⏰ Checking .json in ../public/data/underwriter\n");
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
  console.log("\n⏰ Checking .json in ../public/data/stock\n");
  const dirPath = path.join(__dirname, "../public/data/stock");

  let hasError = false;

  for (const file of fs.readdirSync(dirPath)) {
    if (file.endsWith(".json")) {
      const filePath = path.join(dirPath, file);
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(raw);
        const formatted = JSON.stringify(parsed, null, 2);

        const reParsedFormatted = JSON.parse(formatted);
        if (JSON.stringify(parsed) !== JSON.stringify(reParsedFormatted)) {
          console.log(formatted);
          console.error(`❌ Structural mismatch in: ${file}`);
          hasError = true;
        }

        const normalizedRaw = JSON.stringify(JSON.parse(raw), null, 2);

        if (normalizedRaw !== formatted) {
          console.log(formatted);
          console.error(`❌ Format mismatch in: ${file}`);
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
  console.log("\n⏰ Checking in ../public/data/underwriters.json\n");
  const filePath = path.join(__dirname, "../public/data/underwriters.json");

  let hasError = false;

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);

    let sortedMismatch = false;

    if (Array.isArray(parsed)) {
      const originalOrder = JSON.stringify(parsed);

      parsed.sort((a, b) =>
        a.underwriter_code.localeCompare(b.underwriter_code),
      );

      const sortedOrder = JSON.stringify(parsed);
      if (originalOrder !== sortedOrder) {
        console.log(sortedOrder);
        console.error(`❌ Order mismatch: ${filePath}`);
        sortedMismatch = true;
        hasError = true;
      }
    }

    const formatted = JSON.stringify(parsed, null, 2);
    const normalizedRaw = JSON.stringify(JSON.parse(raw), null, 2);

    if (normalizedRaw !== formatted && !sortedMismatch) {
      console.log(formatted);
      console.error(`❌ Format mismatch: ${filePath}`);
      hasError = true;
    }
  } catch (err) {
    console.error(`❌ Invalid JSON: ${filePath}`, err.message);
    hasError = true;
  }

  if (hasError) {
    console.error("\n❌ Some JSON files are improperly formatted.");
    process.exit(1);
  } else {
    console.log("✅ All JSON files are correctly formatted.");
  }
}

function isStocksJSONValid() {
  console.log("\n⏰ Checking in ../public/data/stocks.json\n");
  const filePath = path.join(__dirname, "../public/data/stocks.json");

  let hasError = false;

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);

    let sortedMismatch = false;

    if (Array.isArray(parsed)) {
      const originalOrder = JSON.stringify(parsed);

      parsed.sort((a, b) => a.localeCompare(b));

      const sortedOrder = JSON.stringify(parsed);
      if (originalOrder !== sortedOrder) {
        console.log(sortedOrder);
        console.error(`❌ Order mismatch: ${filePath}`);
        sortedMismatch = true;
        hasError = true;
      }
    }

    const formatted = JSON.stringify(parsed, null, 2);
    const normalizedRaw = JSON.stringify(JSON.parse(raw), null, 2);

    if (normalizedRaw !== formatted && !sortedMismatch) {
      console.log(formatted);
      console.error(`❌ Format mismatch: ${filePath}`);
      hasError = true;
    }
  } catch (err) {
    console.error(`❌ Invalid JSON: stocks.json`, err.message);
    hasError = true;
  }

  if (hasError) {
    console.error("\n❌ Some JSON files are improperly formatted.");
    process.exit(1);
  } else {
    console.log("✅ All JSON files are correctly formatted.");
  }
}

function isInformationJSONValid() {
  console.log("\n⏰ Checking in ../public/data/information.json\n");
  const filePath = path.join(__dirname, "../public/data/information.json");

  let hasError = false;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    const formatted = JSON.stringify(parsed, null, 2);

    const reParsedFormatted = JSON.parse(formatted);
    if (JSON.stringify(parsed) !== JSON.stringify(reParsedFormatted)) {
      console.log(formatted);
      console.error(`❌ Structural mismatch in: information.json`);
      hasError = true;
    }

    const normalizedRaw = JSON.stringify(JSON.parse(raw), null, 2);

    if (normalizedRaw !== formatted) {
      console.log(formatted);
      console.error(`❌ Format mismatch in: information.json`);
      hasError = true;
    }
  } catch (err) {
    console.error(`❌ Invalid JSON: information.json`, err.message);
    hasError = true;
  }

  if (hasError) {
    console.error("\n❌ Some JSON files are improperly formatted.");
    process.exit(1);
  } else {
    console.log("✅ All JSON files are correctly formatted.");
  }
}

function isTemplateJSONValid() {
  console.log("\n⏰ Checking .json in ../public/template\n");
  const dirPath = path.join(__dirname, "../public/template");

  let hasError = false;

  for (const file of fs.readdirSync(dirPath)) {
    if (file.endsWith(".json")) {
      const filePath = path.join(dirPath, file);
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(raw);
        const formatted = JSON.stringify(parsed, null, 2);

        const reParsedFormatted = JSON.parse(formatted);
        if (JSON.stringify(parsed) !== JSON.stringify(reParsedFormatted)) {
          console.log(formatted);
          console.error(`❌ Structural mismatch in: ${file}`);
          hasError = true;
        }

        const normalizedRaw = JSON.stringify(JSON.parse(raw), null, 2);

        if (normalizedRaw !== formatted) {
          console.log(formatted);
          console.error(`❌ Format mismatch in: ${file}`);
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

function main() {
  isUnderwriterJSONValid();
  isStockJSONValid();
  isUnderwritersJSONValid();
  isStocksJSONValid();
  isInformationJSONValid();
  isTemplateJSONValid();
  console.log("\n✅ All checks passed successfully.");
}

main();

export {
  isUnderwriterJSONValid,
  isStockJSONValid,
  isUnderwritersJSONValid,
  isStocksJSONValid,
  isInformationJSONValid,
  isTemplateJSONValid,
};
