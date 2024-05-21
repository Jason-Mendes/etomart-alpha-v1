// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
     screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        shrikhand: ['Shrikhand', 'cursive'],
        pacifico: ['Pacifico', 'cursive'],
        josefin_sans: ['Josefin Sans', 'sans-serif'],
        Agbalumo: ['Agbalumo', 'system-ui'],
        Kaushan: ['Kaushan Script', 'cursive'],
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
