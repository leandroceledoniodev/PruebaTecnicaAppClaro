module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50: '#eef6f3',
          100: '#d5e9e1',
          500: '#2f7d64',
          600: '#256a54',
          700: '#1d5644',
        },
      },
    },
  },
  plugins: [],
};
