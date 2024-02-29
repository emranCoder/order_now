/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cerulean': '#0295db',
        'off-gray': '#9d9da1',
        'geyser': '#e0e5e9',
        'mine-sbaft': '#262626',
      },
    },
  },
  plugins: [require("daisyui")],
}