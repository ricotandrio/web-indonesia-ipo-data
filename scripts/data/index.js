import {
  checkInformationJSONValid,
  checkJson,
  checkStockJSONValid,
  checkStocksJSONValid,
  checkTemplateJSONValid,
  checkUnderwriterJSONValid,
  checkUnderwritersJSONValid,
} from "./check.js";
import { syncData } from "./sync.js";

const command = process.argv[2];

const commands = {
  "check:json": checkJson,
  "check:underwriter": checkUnderwriterJSONValid,
  "check:underwriters": checkUnderwritersJSONValid,
  "check:stock": checkStockJSONValid,
  "check:stocks": checkStocksJSONValid,
  "check:information": checkInformationJSONValid,
  "check:template": checkTemplateJSONValid,
  "sync:data": syncData,
};

if (!command) {
  console.error("Missing command. Use one of: " + Object.keys(commands).join(", "));
  process.exit(1);
}

const handler = commands[command];

if (!handler) {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}

handler();