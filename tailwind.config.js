/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'micro-5': ['"Micro 5", sans-serif'],
        'permanent-marker': ['"Permanent Marker", cursive'],
        'shadows-into-light': ['"Shadows Into Light", cursive'],
        'new-tegomin': ['"New Tegomin", serif'],
        'yuji-syuku': ['"Yuji Syuku", serif'],
        'dot-gothic-16': ['"DotGothic16", sans-serif'],
        'vt323': ['"VT323", monospace'],
        'raleway': ['"Raleway", sans-serif'],
        'lato': ['"Lato", sans-serif'],
      }
    },
  },
  plugins: [],
}

