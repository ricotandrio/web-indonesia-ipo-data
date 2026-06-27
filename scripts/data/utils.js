import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "../..");

const stockDir = path.join(rootDir, "public/data/stock");
const underwriterDir = path.join(rootDir, "public/data/underwriter");
const stocksIndexPath = path.join(rootDir, "public/data/stocks.json");
const underwritersIndexPath = path.join(rootDir, "public/data/underwriters.json");
const informationPath = path.join(rootDir, "public/data/information.json");
const templateDir = path.join(rootDir, "public/template");

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function formatToday() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date());
}

function normalizeTickerCode(stockFileName, stockData) {
  return stockData.ticker_code || path.parse(stockFileName).name;
}

function collectUnderwriterEntries(stockData) {
  const entries = [];

  if (stockData.participant_admin?.code) {
    entries.push({
      code: stockData.participant_admin.code,
      name: stockData.participant_admin.name || "",
    });
  }

  if (Array.isArray(stockData.underwriters)) {
    for (const underwriter of stockData.underwriters) {
      if (underwriter?.code) {
        entries.push({
          code: underwriter.code,
          name: underwriter.name || "",
        });
      }
    }
  }

  const uniqueEntries = new Map();

  for (const entry of entries) {
    const key = `${entry.code}|${entry.name}`;
    if (!uniqueEntries.has(key)) {
      uniqueEntries.set(key, entry);
    }
  }

  return Array.from(uniqueEntries.values());
}

function loadExistingUnderwriter(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return readJson(filePath);
  } catch {
    return null;
  }
}

export {
  collectUnderwriterEntries,
  formatToday,
  informationPath,
  loadExistingUnderwriter,
  normalizeTickerCode,
  readJson,
  rootDir,
  stockDir,
  stocksIndexPath,
  templateDir,
  underwriterDir,
  underwritersIndexPath,
  writeJson,
};