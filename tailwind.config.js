/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/**/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#076FFE',
        'secondary': '#0A82AC',
        'line-grey': '#DDDFE2',
        'grey-bg': '#F7F7F7',
      },
    },
  },
  plugins: [],
}

