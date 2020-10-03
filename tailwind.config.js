const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      orange: colors.orange,
      red: colors.red,
      green: colors.green,
    },
    extend: {
      colors: {
        primary: {
          600: '#3182CE',
        },
        barbarian: '#FF7D01',
        bard: '#E6CC80',
        cleric: '#C0C0C0',
        druid: '#FF7D0A',
        fighter: '#C79C6E',
        monk: '#00FF96',
        paladin: '#F58CBA',
        ranger: '#ABD473',
        rogue: '#FFF569',
        sorcerer: '#FF4700',
        warlock: '#9482C9',
        wizard: '#69CCF0',
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    float: false,
  },
  purge: ['./**/*.tsx', './**/*.css'],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
}
