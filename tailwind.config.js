const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors you want to add go here
        transparent: "transparent",
        current: "currentColor",
        primary: colors.cyan,
        secondary: colors.emerald,
        gray: colors.slate,
      },
    },
  },
  plugins: [],
};
