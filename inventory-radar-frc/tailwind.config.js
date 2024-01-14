/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      dimWhite: "rgba(255, 255, 255, 0.7)",
      dimBlue: "rgba(9, 151, 124, 0.1)",
      dimRed: "rgba(151, 9, 9, 0.1)",
    },
    fontFamily: {
      poppins: ["Poppins"],
    },},
  },
  plugins: [],
}