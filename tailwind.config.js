const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|avatar|breadcrumbs|button|card|divider|dropdown|link|navbar|tabs|popover|ripple|spinner|menu).js",
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
