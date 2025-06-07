const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2.5rem',
        xl: '3rem',
        '2xl': '4rem',
      },
    },

    extend: {
      colors: {
        brand: {
          DEFAULT: '#0891b2',
          light:   '#22d3ee',
          dark:    '#0e7490',
        },
        surface: {
          50 : '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
        },
        text: {
          DEFAULT: '#1E293B',
          subtle : '#475569',
          invert : '#FFFFFF',
        },
        danger: '#EF4444',
      },

      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },

      boxShadow: {
        brand: '0 4px 14px 0 rgba(6,182,212,.35)',
      },

      keyframes: {
        'fade-up': {
          '0%':   { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
