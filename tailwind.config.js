// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        shrikhand: ['Shrikhand', 'normal'],
        Pacifico: ['Pacifico', 'cursive'],
        fontWeight: ['400'],
        fontStyle: ['normal'],
      },
      },
    },
    variants: {
      extend: {},
    },
    plugins:[],
  };
  
  