module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "brand-blue": "var( --primary-color)",
        "font-color": "var(--font-color)",
        "bg-color": "var(--bg-color)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
