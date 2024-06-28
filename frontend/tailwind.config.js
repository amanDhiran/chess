/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chessboard-bg': 'url("/chessboard-background.png")'
      }
    },
  },
  plugins: [],
}

