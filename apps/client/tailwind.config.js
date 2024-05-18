/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      backgroundImage: {
        heroSign: "url('./src/assets/images/robert-bye-95vx5QVl9x4-unsplash-2.png')",
      },
      colors: {
        brown: '#6A4029',
        yellow: '#FFBA33',
      },
      boxShadow: {
        'shadow-button': '2px 4px 12px 2px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
