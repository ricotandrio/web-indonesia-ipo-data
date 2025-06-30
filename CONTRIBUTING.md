# Contributing to Web Indonesia IPO Data

> [!IMPORTANT]\
> We ask that all users read our [legal disclaimer](hhttps://github.com/ricotandrio/web-indonesia-ipo-data/blob/master/DISCLAIMER.md) before contributing to this repository.

## Contributing Guide

Contributions to **Web Indonesia IPO Data** are welcome and encouraged. Whether you're fixing errors, adding new data, or improving structure, your help is appreciated.

Before contributing, please review the guidelines below. If you're new to Git or GitHub, we recommend reading [GitHub's official contribution flow](https://guides.github.com/introduction/flow/) to get started.

## Table of Contents

* [Contribution Steps](#contribution-steps)

* [Repository Structure](#repository-structure)

  * [Data Directory Overview](#data-directory-overview)

  * [Project Structure](#project-structure)

* [Formatting Rules](#formatting-rules)

* [Data Validation Scripts](#data-validation-scripts)

### Contribution Steps

1. Fork this repository.
2. (Optional) Clone your fork locally:

   - Using SSH

     ```shell
     git clone --filter=tree:0 git@github.com:ricotandrio/web-indonesia-ipo-data.git
     ```

   - Using HTTPS

     ```shell
     git clone --filter=tree:0 https://github.com/ricotandrio/web-indonesia-ipo-data.git
     ```

   - Using GitHub CLI

     ```shell
     gh repo clone ricotandrio/web-indonesia-ipo-data -- --filter=tree:0
     ```

3. Create a new branch from the latest `master`

4. Make your changes following the [Structure]($project-structure) and [Formatting Rules](#formatting-rules)

5. Commit and push to the new branch

6. Make a pull request

### Repository Structure

### Data Directory Overview

The data can be accessed through the `/public/data` directory. This directory contains the core structured datasets used in the project. All files and folders within must be consistently maintained and properly formatted.

* **`information.json`**
  Stores the latest metadata reference, such as the most recent update timestamp. This file is automatically or manually updated whenever a change occurs in the dataset.

* **`stocks.json`**
  An alphabetically sorted index of all listed stocks. Each entry corresponds to a detailed stock data file located under `stock/`.

* **`underwriters.json`**
  An alphabetically sorted index of all underwriters involved in recent or past IPOs. Each underwriter listed must have a matching JSON file in `underwriter/`.

* **`underwriter/`**
  A directory containing individual JSON files for each underwriter. Each file uses the underwriter’s code as the filename and includes details such as the underwriter’s name and associated stocks.

* **`stock/`**
  A directory containing individual JSON files for each stock. Each file uses the stock ticker code as the filename and includes comprehensive IPO-related information such as offering periods, pricing, performance, and fundamental data.

### Project Structure 

Here is an overview of the key project files under the `/src` directory:

```
src/
├── assets/
│   ├── global.css
│   └── icons/
├── components/
├── pages/
├── router/
├── utils/
└── main.tsx
```

### Formatting Rules

Please adhere to the following formatting standards:

* All JSON files must be properly formatted using `2-space` indentation.
* Alphabetical sorting is required in:

  * `stocks.json`
  * `underwriters.json`
* Each stock or underwriter added must have a corresponding JSON file in the appropriate directory (`/stock/` or `/underwriter/`).
* Always validate your JSON using tools or linters before committing.
* Avoid trailing commas and inconsistent casing.
* Use `snake_case` for all object keys.
* For a new stock or underwriter, add it using the[template](https://github.com/ricotandrio/web-indonesia-ipo-data/public/template)

Here’s a clear and well-structured section you can add to your `README.md` or `CONTRIBUTING.md` under a heading like **Data Validation Scripts**:

## Data Validation Scripts

Before committing changes, use the following scripts to validate data consistency and formatting. These scripts help ensure that all entries conform to project standards and prevent malformed or misordered data from being merged.

You can run any of these with:

```bash
npm run <script-name>
```

### Available Scripts

| Script               | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `check:json`         | Validates that all JSON files are correctly formatted.       |
| `check:underwriter`  | Checks a specific underwriter file for correctness.          |
| `check:underwriters` | Validates the global `underwriters.json` index file.         |
| `check:stock`        | Checks a specific stock file for formatting and consistency. |
| `check:stocks`       | Validates the global `stocks.json` index file.               |
| `check:information`  | Validates the `information.json` metadata structure.         |
| `prettier`           | Run code formatter                                           |

> Tip: Run `check:json` first to catch general formatting errors, then use the more targeted scripts depending on what you’ve modified.
