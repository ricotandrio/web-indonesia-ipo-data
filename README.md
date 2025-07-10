<p align="center">
  <h3 align="center">Web Indonesia IPO Data</h3>
  <p align="center">
    Curated dataset of IPOs on the Indonesia Stock Exchange. Track underwriters, offering stats, and listings in a structured and version-controlled format. See the brief and templates before contributing.
  </p>
</p>

<p align="center"

</p>

## Overview

This repository organizes data on Indonesian IPOs into structured JSON files. It can be consumed by any frontend or backend application for public IPO visualization, analytics, or monitoring tools.

## Usage

> [!IMPORTANT]\
> We ask that all users read our [legal disclaimer](https://github.com/ricotandrio/web-indonesia-ipo-data/blob/master/DISCLAIMER.md) before using any data from this repository.

## General Usage

The core dataset for this project is publicly accessible in raw JSON format. For a detailed specification, see [Redocly Docs]().

### Base URL

```
https://web-idn-ipo-data.netlify.app/data/
```

## Available Endpoints

| URL                                  | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| `{BASE_URL}/information.json`        | Metadata about the dataset, including last update time. |
| `{BASE_URL}/stocks.json`             | Alphabetically sorted list of all stocks.               |
| `{BASE_URL}/underwriters.json`       | Alphabetically sorted list of all underwriters.         |
| `{BASE_URL}/stock/{ticker}.json`     | Detailed IPO data for a specific stock.                 |
| `{BASE_URL}/underwriter/{code}.json` | Information about a specific underwriter.               |

## Dashboard Access

You can access the live dashboard at the following URL:

🔗 [https://web-idn-ipo-data.netlify.app/](https://web-idn-ipo-data.netlify.app/)

## Notes

- All responses are served as raw JSON.
- Use the actual `ticker` or `code` (case-sensitive) when accessing `/stock/{ticker}.json` or `/underwriter/{code}.json`.
- Refer to `information.json` for the most recent update timestamp.

## Contribute

Information describing how to contribute can be found in the file [CONTRIBUTING.md](https://github.com/ricotandrio/web-indonesia-ipo-data/blob/master/CONTRIBUTING.md)
