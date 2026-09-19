import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#065f46",
          dark: "#064e3b",
          light: "#047857",
          50: "#ecfdf5",
          100: "#d1fae5",
        },
      },
    },
  },
  plugins: [],
};

export default config;
