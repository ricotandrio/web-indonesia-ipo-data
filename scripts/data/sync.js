import fs from "fs";
import {
  collectUnderwriterEntries,
  formatToday,
  informationPath,
  loadExistingUnderwriter,
  normalizeTickerCode,
  readJson,
  stockDir,
  stocksIndexPath,
  underwriterDir,
  underwritersIndexPath,
  writeJson,
} from "./utils.js";

function syncData() {
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
    const filePath = `${stockDir}/${fileName}`;
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
    const filePath = `${underwriterDir}/${underwriterCode}.json`;
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
    count: {
      stocks: sortedStocks.length,
      underwriters: sortedUnderwriters.length,
    },
  });

  console.log(
    `Updated ${sortedStocks.length} stocks and ${sortedUnderwriters.length} underwriters.`,
  );
}

export { syncData };