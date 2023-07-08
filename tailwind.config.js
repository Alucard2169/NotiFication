/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        MAIN: "#121212",
        PRIMARY: "#8f0043",
        COMPONENT_BG: "#8f0043",
        COMPONENT_PRIMARY_BG: "#FFA987",
        MAIN_TEXT: "#ff5e45",
      },
    },
  },
  plugins: [],
};
