/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'pulse-slower': 'pulse 10s ease-in-out infinite',
        float: 'float 8s ease-in-out infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
