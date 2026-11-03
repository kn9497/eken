/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary, #1E140E)",
          dark: "var(--color-primary-dark, #161311)",
          container: "var(--color-primary-container, #2B231D)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary, #D1405D)",
          hover: "var(--color-secondary-hover, #B12747)",
          light: "var(--color-secondary-light, #FFD9DC)",
        },
        tertiary: {
          DEFAULT: "var(--color-tertiary, #BA8888)",
          container: "var(--color-tertiary-container, #311213)",
        },
        surface: {
          DEFAULT: "var(--color-surface, #F9F9F9)",
          container: "var(--color-surface-container, #EEEEEE)",
          low: "var(--color-surface-low, #F4F3F3)",
          high: "var(--color-surface-high, #E8E8E8)",
          dark: "var(--color-surface-dark, #161311)",
          limestone: "var(--color-surface-limestone, #E1DFDC)",
          parchment: "var(--color-surface-parchment, #F5F2ED)",
        },
        accent: {
          DEFAULT: "var(--color-accent, #58150E)",
          gold: "var(--color-accent-gold, #CEA642)",
        },
        "on-surface": {
          DEFAULT: "var(--color-on-surface, #1A1C1C)",
          variant: "var(--color-on-surface-variant, #4E4540)",
          muted: "var(--color-on-surface-muted, #706761)",
        },
        outline: {
          DEFAULT: "var(--color-outline, #80756F)",
          variant: "var(--color-outline-variant, #D1C4BD)",
          subtle: "var(--color-outline-subtle, rgba(30, 20, 14, 0.08))",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        serif: ["Playfair Display", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      aspectRatio: {
        "4/5": "4 / 5",
        "golden": "1.618 / 1",
      },
      boxShadow: {
        "tactile": "0 8px 30px rgba(30, 20, 14, 0.06), 0 2px 6px rgba(30, 20, 14, 0.04)",
        "tactile-hover": "0 16px 40px rgba(30, 20, 14, 0.12), 0 4px 12px rgba(30, 20, 14, 0.06)",
        "deep": "0 24px 60px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
}
