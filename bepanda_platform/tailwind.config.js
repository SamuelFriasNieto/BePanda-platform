


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  
  ],
  theme: {
    extend: {
      colors: {
        'text-color': '#323338',
        'text-color-hover': '#BDCCAC',
        'panda-green': '#818770',
        'panda-green-darker': '#5A5E4E',
        'panda-yellow': '#CFA011',
        'panda-white': '#E6E6E5'
      },
      fontFamily: {
        'montserrat': ['Montserrat']
      }
    },
  },
  plugins: [

  ],
}
