import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        MAIN_BG: "#222831",
        COMPONENT_BG: "#00ADB5",
        PRIMARY_BG: "#393E46",
        NEUTRAL_BG: "#EEEEEE",
        DANGER_BG: "#7D0A0A",
      },
      colors: {
        MAIN: "#000000",
        NEUTRAL: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
export default config;
