// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
   purge: [],
   theme: {
     extend: {
        fontFamily: {
           sans: ['montserrat', ...defaultTheme.fontFamily.sans],
        },
     },
   },
  variants: {},
  plugins: [require("@tailwindcss/forms")],

};