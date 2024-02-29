// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        shrikhand: ['Shrikhand', 'cursive'],
        pacifico: ['Pacifico', 'cursive'],
        'josefin-sans': ['Josefin Sans', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
      },
      fontStyle: {
        normal: 'normal',
      },
      fontOpticalSizing: {
        auto: 'auto',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
