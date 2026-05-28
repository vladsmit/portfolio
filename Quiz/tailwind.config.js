/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        23: '5.75rem', // 92px
        123: '30.75rem', // 492px
        162: '40.5rem', // 648px
      },
      height: {
        23: '5.75rem', // 92px
      },
      animation: {
        wiggle: 'wiggle 1s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
};
