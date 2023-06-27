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
        MAIN: "#1E1E24",
        PRIMARY: "#444140",
        COMPONENT_BG: "#E54B4B",
        COMPONENT_PRIMARY_BG: "#FFA987",
        MAIN_TEXT: "#1E1E24",
      },
    },
  },
  plugins: [],
};
