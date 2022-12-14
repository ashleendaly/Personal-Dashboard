/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'therapy-box': "url('/public/background.png')",
      }
    },
  },
  plugins: [],
}