/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        suncart_light: {
          "primary": "#FF6B35",
          "secondary": "#F7C59F",
          "accent": "#FFBE0B",
          "neutral": "#1a1a2e",
          "base-100": "#fffdf7",
          "base-200": "#fff8ee",
          "base-300": "#ffefd5",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
        suncart_dark: {
          "primary": "#FF6B35",
          "secondary": "#a0522d",
          "accent": "#FFBE0B",
          "neutral": "#f5f5f0",
          "base-100": "#0f0f1a",
          "base-200": "#1a1a2e",
          "base-300": "#16213e",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
    darkTheme: "suncart_dark",
  },
}
