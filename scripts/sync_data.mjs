import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

const stockDir = path.join(rootDir, "public/data/stock");
const underwriterDir = path.join(rootDir, "public/data/underwriter");
const stocksIndexPath = path.join(rootDir, "public/data/stocks.json");
const underwritersIndexPath = path.join(rootDir, "public/data/underwriters.json");
const informationPath = path.join(rootDir, "public/data/information.json");

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

function main() {
  if (!fs.existsSync(stockDir)) {
    throw new Error(`Stock directory not found: ${stockDir}`);
  }

  const existingUnderwritersIndex = fs.existsSync(underwritersIndexPath)
    ? readJson(underwritersIndexPath)
    : [];
  const existingUnderwriterCodes = new Set(
    existingUnderwritersIndex
      .map((entry) => entry?.underwriter_code)
      .filter(Boolean),
  );

  const stockFiles = fs
    .readdirSync(stockDir)
    .filter((fileName) => fileName.endsWith(".json"))
    .sort((left, right) => left.localeCompare(right));

  const stockCodes = new Set();
  const underwriterIndex = [...existingUnderwritersIndex];
  const addedUnderwriterCodes = new Set();
  const underwriterStocks = new Map();
  const underwriterNamesByCode = new Map();

  for (const fileName of stockFiles) {
    const filePath = path.join(stockDir, fileName);
    const stockData = readJson(filePath);
    const tickerCode = normalizeTickerCode(fileName, stockData);

    if (tickerCode) {
      stockCodes.add(tickerCode);
    }

    for (const underwriter of collectUnderwriterEntries(stockData)) {
      if (underwriter.name && !underwriterNamesByCode.has(underwriter.code)) {
        underwriterNamesByCode.set(underwriter.code, underwriter.name);
      }

      if (
        underwriter.code &&
        !existingUnderwriterCodes.has(underwriter.code) &&
        !addedUnderwriterCodes.has(underwriter.code)
      ) {
        underwriterIndex.push({
          underwriter_code: underwriter.code,
          underwriter_name: underwriter.name,
        });
        addedUnderwriterCodes.add(underwriter.code);
      }

      if (!underwriterStocks.has(underwriter.code)) {
        underwriterStocks.set(underwriter.code, new Set());
      }

      underwriterStocks.get(underwriter.code).add(tickerCode);
    }
  }

  const sortedStocks = Array.from(stockCodes).sort((left, right) =>
    left.localeCompare(right),
  );

  const sortedUnderwriters = underwriterIndex
    .sort((left, right) => {
      const codeCompare = left.underwriter_code.localeCompare(
        right.underwriter_code,
      );
      if (codeCompare !== 0) {
        return codeCompare;
      }

      return left.underwriter_name.localeCompare(right.underwriter_name);
    })
    .map((entry) => ({
      underwriter_code: entry.underwriter_code,
      underwriter_name: entry.underwriter_name,
    }));

  writeJson(stocksIndexPath, sortedStocks);
  writeJson(underwritersIndexPath, sortedUnderwriters);

  fs.mkdirSync(underwriterDir, { recursive: true });

  for (const [underwriterCode, stockSet] of underwriterStocks.entries()) {
    const filePath = path.join(underwriterDir, `${underwriterCode}.json`);
    const existing = loadExistingUnderwriter(filePath);
    const underwriterInfo = existing?.underwriter ?? {};
    const fallbackInfo = {
      code: underwriterCode,
      name: underwriterNamesByCode.get(underwriterCode) || "",
    };
    const nextUnderwriter = {
      code: underwriterInfo.code || fallbackInfo.code,
      name: underwriterInfo.name || fallbackInfo.name,
      image: underwriterInfo.image || "",
    };

    writeJson(filePath, {
      underwriter: nextUnderwriter,
      stocks: Array.from(stockSet).sort((left, right) => left.localeCompare(right)),
    });
  }

  const existingInformation = fs.existsSync(informationPath)
    ? readJson(informationPath)
    : {};

  writeJson(informationPath, {
    ...existingInformation,
    updated_at: formatToday(),
  });

  console.log(
    `Updated ${sortedStocks.length} stocks and ${sortedUnderwriters.length} underwriters.`,
  );
}

main();