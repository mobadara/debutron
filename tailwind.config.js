/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      colors: {
        debutron: {
          navy: '#0A2540',
          charcoal: '#2D3748',
          white: '#FFFFFF',
          gray: '#F7FAFC',
        },
      },
    },
  },
  plugins: [],
}

