/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkGray': '#212121',
        'darkerGray': '#171717',
        'accentBlue': '#3b82f6'
      }
    },
  },
  plugins: [],
}

