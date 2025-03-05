/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media", // or 'class' if you want to toggle dark mode manually
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-50": "#F2F8FD",
        "blue-100": "#DEEAEF",
        "blue-200": "#C0D6E1",
        "blue-300": "#95BACB",
        "blue-400": "#6294AE",
        "blue-500": "#467894",
        "blue-600": "#3D647D",
        "blue-700": "#375367",
        "blue-800": "#334657",
        "blue-900": "#2B3946",
        "blue-950": "#1B2631",
        "green-400": "#49BE95",
        "red-800": "#AC0808"
      },
    },
  },
  plugins: [],
};
