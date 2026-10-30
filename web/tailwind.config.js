/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forge: {
          bg: '#0F1115',
          card: '#161B22',
          border: '#30363D',
          primary: '#58A6FF',
          accent: '#BC8CFF',
          success: '#3FB950',
          warning: '#D29922',
          danger: '#F85149',
        },
      },
    },
  },
  plugins: [],
};
