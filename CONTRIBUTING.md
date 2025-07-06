# Contributing to Web Indonesia IPO Data

> [!IMPORTANT]\
> We ask that all users read our [legal disclaimer](hhttps://github.com/ricotandrio/web-indonesia-ipo-data/blob/master/DISCLAIMER.md) before contributing to this repository.

## Contributing Guide

Contributions to **Web Indonesia IPO Data** are welcome and encouraged. Whether you're fixing errors, adding new data, or improving structure, your help is appreciated.

Before contributing, please review the guidelines below. If you're new to Git or GitHub, we recommend reading [GitHub's official contribution flow](https://guides.github.com/introduction/flow/) to get started.

## Table of Contents

- [Contribution Steps](#contribution-steps)

- [Repository Structure](#repository-structure)
  - [Data Directory Overview](#data-directory-overview)

  - [Project Structure](#project-structure)

  - [Frontend Overview](#frontend-overview)

- [Formatting Rules](#formatting-rules)

- [Data Validation Scripts](#data-validation-scripts)

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

- **`information.json`**
  Stores the latest metadata reference, such as the most recent update timestamp. This file is automatically or manually updated whenever a change occurs in the dataset.

- **`stocks.json`**
  An alphabetically sorted index of all listed stocks. Each entry corresponds to a detailed stock data file located under `stock/`.

- **`underwriters.json`**
  An alphabetically sorted index of all underwriters involved in recent or past IPOs. Each underwriter listed must have a matching JSON file in `underwriter/`.

- **`underwriter/`**
  A directory containing individual JSON files for each underwriter. Each file uses the underwriter’s code as the filename and includes details such as the underwriter’s name and associated stocks.

- **`stock/`**
  A directory containing individual JSON files for each stock. Each file uses the stock ticker code as the filename and includes comprehensive IPO-related information such as offering periods, pricing, performance, and fundamental data.

### Frontend Overview

This project is a **React-based web application** built with modern frontend technologies. The frontend serves as the user interface for browsing and viewing Indonesian IPO data.

**Technology Stack:**

- **React 19** with **TypeScript** - Main framework and type safety
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **HeroUI** - UI component library
- **TailwindCSS** - Utility-first CSS framework
- **ESLint** & **Prettier** - Code quality and formatting

**Architecture:**

- **Single Page Application (SPA)** using React Router with hash-based routing
- **Component-based architecture** with reusable UI components
- **TypeScript interfaces** for type safety and better developer experience
- **Utility-first styling** with TailwindCSS and HeroUI components

**Directory Structure & Responsibilities:**

```
src/
├── assets/                    # Static assets and global styles
│   ├── global.css            # Global CSS styles and TailwindCSS imports
│   └── icons/                # SVG icons and image assets
├── components/               # Reusable UI components
│   ├── Navbar.tsx           # Main navigation component
│   └── SearchInput.tsx      # Search input component
├── pages/                   # Route-specific page components
│   ├── HomePage.tsx         # Landing page with stock listings
│   ├── StockPage.tsx        # Individual stock detail page
│   ├── UnderwriterPage.tsx  # Underwriter profile page
│   ├── SearchPage.tsx       # Search results page
│   └── ...                  # Other static pages
├── router/                  # Routing configuration
│   └── Router.tsx           # Main routing setup with React Router
├── utils/                   # Helper functions and utilities
│   ├── dateUtil.ts          # Date formatting utilities
│   └── numberUtil.ts        # Number/currency formatting utilities
└── main.tsx                 # Application entry point
```

**Development Setup:**

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

   This starts the Vite development server at `http://localhost:5173`

3. **Build for production:**

   ```bash
   npm run build
   ```

4. **Preview production build:**

   ```bash
   npm run preview
   ```

5. **Code quality checks:**
   ```bash
   npm run lint      # ESLint checking
   npm run prettier  # Code formatting
   ```

**Naming Conventions:**

- **Components:** PascalCase (e.g., `NavbarComponent`, `SearchInput`)
- **Pages:** PascalCase with "Page" suffix (e.g., `HomePage`, `StockPage`)
- **Utilities:** camelCase classes with descriptive names (e.g., `DateUtil`, `NumberUtil`)
- **Files:** Match the component/class name (e.g., `Navbar.tsx`, `dateUtil.ts`)
- **Imports:** Use path aliases (`@src/`, `@public/`, `@data/`)

**State Management:**

- **Local State:** React hooks (`useState`, `useEffect`) for component-level state
- **URL State:** React Router for navigation state and URL parameters
- **No Global State:** Currently no global state management (Redux, Zustand, etc.)

**Adding New Components:**

1. **Create the component file:**

   ```typescript
   // src/components/NewComponent.tsx
   import React from 'react';
   import '@src/assets/global.css';

   interface NewComponentProps {
     // Define props here
   }

   const NewComponent: React.FC<NewComponentProps> = ({ /* props */ }) => {
     return (
       <div>
         {/* Component content */}
       </div>
     );
   };

   export default NewComponent;
   ```

2. **Import and use in pages:**
   ```typescript
   import NewComponent from "@src/components/NewComponent";
   ```

**Adding New Pages:**

1. **Create the page file:**

   ```typescript
   // src/pages/NewPage.tsx
   import React from 'react';
   import '@src/assets/global.css';
   import NavbarComponent from '@src/components/Navbar';

   const NewPage: React.FC = () => {
     return (
     <>
       <NavbarComponent />
       <div className="m-14">
         {/* Page content */}
       </div>
     </>
     );
   };

   export default NewPage;
   ```

2. **Add route to router:**

   ```typescript
   // src/router/Router.tsx
   import NewPage from '@src/pages/NewPage';

   // Add to Routes component:
   <Route path="/new-page" element={<NewPage />} />
   ```

**Best Practices:**

- **Import Global CSS:** Always import `@src/assets/global.css` in page components
- **Use TypeScript:** Define interfaces for props and data structures
- **Responsive Design:** Use TailwindCSS responsive utilities (`sm:`, `md:`, `lg:`)
- **Error Handling:** Implement proper error boundaries and loading states
- **Accessibility:** Use semantic HTML and ARIA attributes where needed
- **Performance:** Lazy load components for better performance when needed

**Common Patterns:**

- **Data Fetching:** Use `useEffect` with `fetch` API to load JSON data from `/public/data/`
- **Navigation:** Use `useNavigate` hook for programmatic navigation
- **URL Parameters:** Use `useParams` hook to access route parameters
- **Styling:** Combine TailwindCSS utilities with HeroUI components
- **Icons:** Import SVG icons from `@src/assets/icons/`

**Example Commit Messages:**

- `feat: add new stock comparison component`
- `fix: resolve navigation issue in mobile view`
- `style: improve responsive design for tablet view`
- `refactor: extract common utility functions`
- `docs: update component documentation`

### Formatting Rules

Please adhere to the following formatting standards:

- All JSON files must be properly formatted using `2-space` indentation.
- Alphabetical sorting is required in:
  - `stocks.json`
  - `underwriters.json`

- Each stock or underwriter added must have a corresponding JSON file in the appropriate directory (`/stock/` or `/underwriter/`).
- Always validate your JSON using tools or linters before committing.
- Avoid trailing commas and inconsistent casing.
- Use `snake_case` for all object keys.
- For a new stock or underwriter, add it using the[template](https://github.com/ricotandrio/web-indonesia-ipo-data/public/template)

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
