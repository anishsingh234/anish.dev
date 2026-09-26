/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)", "Impact", "sans-serif"],
        serif: ["var(--font-spectral)", "Georgia", "serif"],
        mono: ["var(--font-courier)", "ui-monospace", "monospace"],
        caveat: ["var(--font-caveat)", "cursive"],
      },
      colors: {
        desk: { DEFAULT: "#0D0C11", 2: "#161520", 3: "#1E1D2A" },
        ivory: "#F1EDE3",
        cream: "#E7DFC9",
        kraft: { DEFAULT: "#CDB28B", deep: "#8A6A43" },
        ink: "#111111",
        graphite: "#4A4852",
        marker: "#F8DD2E",
        pen: { DEFAULT: "#E62D5B", deep: "#B8163F" },
        cobalt: { DEFAULT: "#2F5FD0", soft: "#7C9BE6" },
        legal: "#F4E47C",
        blueprint: "#1C3553",
        // Legacy tokens still referenced by the /projects and /blog subpages.
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        muted: "rgb(var(--muted))",
        accent: "rgb(var(--accent))",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
