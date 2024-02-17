/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cafe-100': '#f7f3ef',
        'cafe-200': '#e29655',
        'cafe-300': '#bc722d',
      },
    },
  },
  plugins: [require("daisyui")],
}