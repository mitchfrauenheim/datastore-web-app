/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'open-sans': ['"Open Sans"', 'sans-serif'],
      'glegoo': ['Glegoo', 'serif'],
      'inter': ['Inter', 'sans-serif']
    },
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
}
