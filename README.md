# Web Indonesia IPO Data

Welcome to the **Web Indonesia IPO Data** repository! Feel free to configure and contribute to this repository by following the guidelines below.

## 📂 File Structure & Update Guidelines

### **`/public/data`**
This directory contains key data files for the repository. Ensure these are updated correctly when making changes.

- **`information.json`**  
  - Update this file when making a pull request to ensure the data's timestamp is correct.

- **`stocks.json`**  
  - Update this file when adding a new stock.  
  - Please **rearrange entries in alphabetical order**.

- **`underwriters.json`**  
  - Update this file when adding a new underwriter (UW) or new stock.

### **`/public/data/underwriter`**
- When updating or adding a new stock, **ensure the stock is also added in this directory** under the respective UW code.
- If there's a new underwriter, use **`template_uw.json`** as a base and place it inside this folder.

### **`/public/data/stock`**
- If a new stock is added, use **`template_stock.json`** as a template and place the new stock file inside this folder.

## 🚀 Contribution Guidelines
1. **Fork** this repository.
2. **Clone** your fork to your local machine.
3. Make the necessary changes following the file update guidelines.
4. Ensure all JSON files remain **properly formatted**.
5. Submit a **pull request** with a clear description of the changes.

## 📢 Notes
- Always ensure data consistency and correctness before submitting updates.
- Follow the alphabetical ordering rule for stocks in `stocks.json`.

Thank you for contributing! 🎉
