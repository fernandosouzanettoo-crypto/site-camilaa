/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marinho: { DEFAULT: "#152A45", escuro: "#0E1D31", medio: "#1E3A5F" },
        dourado: "#C4AC8F",
        off: "#F7F4EE",
        claro: "#E6ECF2",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [],
};
