import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "custom-bg": "var(--custom-bg)",
        "custom-dark-bg": "#1a1a1a",
        "custom-dark-panel": "#2a2a2a",
      },
      textColor: {
        "custom-dark-text": "#e0e0e0",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
