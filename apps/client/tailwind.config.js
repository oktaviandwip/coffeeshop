/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['rubik', 'sans-serif'],
        poppins: ['poppins', 'sans-serif'],
      },
      container: {
        center: true,
      },
      colors: {
        primary: '#6A4029',
        secondary: '#FFBA33',
        third: '#bababa',
      },
      backgroundImage: {
        'bg-cart': "url('/src/assets/bg-cart.png')",
      },
    },
  },
  plugins: [],
};
