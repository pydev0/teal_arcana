import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          400: "#2DD4BF",
          500: "#14B8A6",
          900: "#134E4A",
        },
        violet: {
          600: "#7C3AED",
          900: "#2E1065",
        },
        gold: "#F59E0B",
      },
      backgroundImage: {
        "gradient-teal-violet": "linear-gradient(135deg, #14B8A6, #7C3AED)",
      },
    },
  },
  plugins: [],
};

export default config;
