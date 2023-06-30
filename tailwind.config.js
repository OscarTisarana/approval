/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'custom-gray': '#f3f3f3',  // custom color checkmark bg
      },
      width: {
        '128':'32rem',
        '144':'36rem',
      },
      height: {
        '128':'32rem',
        '144':'36rem',
      }
    },
  },
  plugins: [],
}