import fs from "fs";
import {
  informationPath,
  stockDir,
  stocksIndexPath,
  templateDir,
  underwriterDir,
  underwritersIndexPath,
} from "./utils.js";

function failIfNeeded(hasError) {
  if (hasError) {
    console.error("\n❌ Some JSON files are improperly formatted.");
    process.exit(1);
  }

  console.log("✅ All JSON files are correctly formatted.");
}

function checkUnderwriterJSONValid() {
  console.log("\n⏰ Checking .json in ../public/data/underwriter\n");

  let hasError = false;

  for (const file of fs.readdirSync(underwriterDir)) {
    if (!file.endsWith(".json")) {
      continue;
    }

    const filePath = `${underwriterDir}/${file}`;
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);

      if (Array.isArray(parsed.stocks)) {
        parsed.stocks.sort((left, right) => left.localeCompare(right));
      }

      const formatted = JSON.stringify(parsed, null, 2);

      if (raw.trim() !== formatted.trim()) {
        console.log(formatted);
        console.error(`❌ Format mismatch: ${file}`);
        hasError = true;
      }
    } catch (error) {
      console.error(`❌ Invalid JSON: ${file}`, error.message);
      hasError = true;
    }
  }

  failIfNeeded(hasError);
}

function checkStockJSONValid() {
  console.log("\n⏰ Checking .json in ../public/data/stock\n");

  let hasError = false;

  for (const file of fs.readdirSync(stockDir)) {
    if (!file.endsWith(".json")) {
      continue;
    }

    const filePath = `${stockDir}/${file}`;
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
    } catch (error) {
      console.error(`❌ Invalid JSON: ${file}`, error.message);
      hasError = true;
    }
  }

  failIfNeeded(hasError);
}

function checkUnderwritersJSONValid() {
  console.log("\n⏰ Checking in ../public/data/underwriters.json\n");

  let hasError = false;

  try {
    const raw = fs.readFileSync(underwritersIndexPath, "utf-8");
    const parsed = JSON.parse(raw);

    let sortedMismatch = false;

    if (Array.isArray(parsed)) {
      const originalOrder = JSON.stringify(parsed);

      parsed.sort((left, right) =>
        left.underwriter_code.localeCompare(right.underwriter_code),
      );

      const sortedOrder = JSON.stringify(parsed);
      if (originalOrder !== sortedOrder) {
        console.log(sortedOrder);
        console.error(`❌ Order mismatch: ${underwritersIndexPath}`);
        sortedMismatch = true;
        hasError = true;
      }
    }

    const formatted = JSON.stringify(parsed, null, 2);
    const normalizedRaw = JSON.stringify(JSON.parse(raw), null, 2);

    if (normalizedRaw !== formatted && !sortedMismatch) {
      console.log(formatted);
      console.error(`❌ Format mismatch: ${underwritersIndexPath}`);
      hasError = true;
    }
  } catch (error) {
    console.error(`❌ Invalid JSON: ${underwritersIndexPath}`, error.message);
    hasError = true;
  }

  failIfNeeded(hasError);
}

function checkStocksJSONValid() {
  console.log("\n⏰ Checking in ../public/data/stocks.json\n");

  let hasError = false;

  try {
    const raw = fs.readFileSync(stocksIndexPath, "utf-8");
    const parsed = JSON.parse(raw);

    let sortedMismatch = false;

    if (Array.isArray(parsed)) {
      const originalOrder = JSON.stringify(parsed);

      parsed.sort((left, right) => left.localeCompare(right));

      const sortedOrder = JSON.stringify(parsed);
      if (originalOrder !== sortedOrder) {
        console.log(sortedOrder);
        console.error(`❌ Order mismatch: ${stocksIndexPath}`);
        sortedMismatch = true;
        hasError = true;
      }
    }

    const formatted = JSON.stringify(parsed, null, 2);
    const normalizedRaw = JSON.stringify(JSON.parse(raw), null, 2);

    if (normalizedRaw !== formatted && !sortedMismatch) {
      console.log(formatted);
      console.error(`❌ Format mismatch: ${stocksIndexPath}`);
      hasError = true;
    }
  } catch (error) {
    console.error(`❌ Invalid JSON: stocks.json`, error.message);
    hasError = true;
  }

  failIfNeeded(hasError);
}

function checkInformationJSONValid() {
  console.log("\n⏰ Checking in ../public/data/information.json\n");

  let hasError = false;

  try {
    const raw = fs.readFileSync(informationPath, "utf-8");
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
  } catch (error) {
    console.error(`❌ Invalid JSON: information.json`, error.message);
    hasError = true;
  }

  failIfNeeded(hasError);
}

function checkTemplateJSONValid() {
  console.log("\n⏰ Checking .json in ../public/template\n");

  let hasError = false;

  for (const file of fs.readdirSync(templateDir)) {
    if (!file.endsWith(".json")) {
      continue;
    }

    const filePath = `${templateDir}/${file}`;
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
    } catch (error) {
      console.error(`❌ Invalid JSON: ${file}`, error.message);
      hasError = true;
    }
  }

  failIfNeeded(hasError);
}

function checkJson() {
  checkUnderwriterJSONValid();
  checkStockJSONValid();
  checkUnderwritersJSONValid();
  checkStocksJSONValid();
  checkInformationJSONValid();
  checkTemplateJSONValid();
  console.log("\n✅ All checks passed successfully.");
}

export {
  checkInformationJSONValid,
  checkJson,
  checkStockJSONValid,
  checkStocksJSONValid,
  checkTemplateJSONValid,
  checkUnderwriterJSONValid,
  checkUnderwritersJSONValid,
};