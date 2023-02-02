// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
   purge: [
     'src/**/*.js',
     'src/**/*.jsx',
     'src/**/*.ts',
     'src/**/*.tsx',
     'public/**/*.html',
   ],
   theme: {
      extend: {
         fontFamily: {
            sans: ['montserrat', ...defaultTheme.fontFamily.sans],
         },
      },
    },
   variants: {},
   plugins: 
   [require("@tailwindcss/forms"),
   require('tailwind-scrollbar'),
   require('tw-elements/dist/plugin')],

}