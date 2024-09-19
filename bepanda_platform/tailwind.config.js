/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Habilita Tailwind en archivos JS/JSX/TS/TSX
  ],
  theme: {
    extend: {
      colors: {
        'text-color': '#323338',
        'text-color-hover': '#BDCCAC',
        'panda-green': '#818770'
      },
      fontFamily: {
        'montserrat': ['Montserrat']
      }
    },
  },
  plugins: [],
}
