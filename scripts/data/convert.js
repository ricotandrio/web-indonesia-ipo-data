  import fs from "fs";
  import path from "path";

  const INPUT_CSV = './public/data/stocks.csv';
  const OUTPUT_DIR = './public/data/stock';

  /**
  * Assigns a value to a nested path in an object dynamically.
  * e.g., setNestedValue(obj, "warrant.code", "MINE-W")
  */
  function setNestedValue(obj, pathStr, value) {
    const keys = pathStr.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      
      // If it's the last key, assign the value
      if (i === keys.length - 1) {
        // Safely parse underwriters or other JSON arrays back to actual arrays
        if (typeof value === 'string' && (value.trim().startsWith('[') || value.trim().startsWith('{'))) {
          try {
            current[key] = JSON.parse(value);
          } catch {
            current[key] = value;
          }
        } else {
          // Parse numbers if possible, otherwise retain strings
        if (value !== '' && !isNaN(value) && !value.includes('.') && !key.includes('date') && !key.includes('opening') && !key.includes('closing')) {
          current[key] = Number(value);
        } else {
          current[key] = value;
        }
        }
      } else {
        // Build the nested structural object map if it doesn't exist yet
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {};
        }
        current = current[key];
      }
    }
  }

  /**
  * Naive CSV parser tailored to handle semicolon-separated lines and quoted values cleanly.
  */
  function parseCsvLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"'; // Handle escaped quotes ("")
          i++;
        } else {
          inQuotes = !inQuotes; // Toggle quote state
        }
      } else if (char === ';' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  function convertCSVtoJSON() {
    try {
      if (!fs.existsSync(INPUT_CSV)) {
        console.error(`Error: CSV target file '${INPUT_CSV}' not found.`);
        return;
      }
      
      const rawData = fs.readFileSync(INPUT_CSV, 'utf8');
      // Handle both Windows (\r\n) and UNIX (\n) line breaks safely
      const lines = rawData.split(/\r?\n/).filter(line => line.trim() !== '');
      
      if (lines.length <= 1) {
        console.log('CSV is empty or only contains headers.');
        return;
      }
      
      // 1. Process headers from row 0
      const headers = parseCsvLine(lines[0]);
      
      // 2. Loop rows and reconstruct deep JSON blueprints
      let processedCount = 0;
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      
      for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i]);
        const restoredJson = {};
        
        headers.forEach((header, index) => {
          const value = values[index] !== undefined ? values[index].trim() : '';
          setNestedValue(restoredJson, header, value);
        });
        
        // 3. Save file using ticker_code as filename
        const ticker = restoredJson.ticker_code;
        if (ticker) {
          const outFilePath = path.join(OUTPUT_DIR, `${ticker.toUpperCase()}.json`);
          fs.writeFileSync(outFilePath, JSON.stringify(restoredJson, null, 2), 'utf8');
          processedCount++;
        }
      }
      
      console.log(`Successfully restored ${processedCount} stock files into: ${OUTPUT_DIR}/`);
      
    } catch (error) {
      console.error('An error occurred during conversion processing:', error.message);
    }
  }

  export { convertCSVtoJSON };