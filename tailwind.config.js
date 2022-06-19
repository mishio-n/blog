module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: 'media',
  theme: {
    screens: {
      xs: { min: '320px', max: '639px' },
      sm: { min: '640px', max: '819px' },
      md: { min: '820px', max: '1023px' },
      lg: { min: '1024px', max: '1279px' },
      xl: { min: '1280px', max: '1535px' },
      '>1024': { min: '1024px' },
      '<800': { max: '800px' },
      '>800': { min: '800px' },
    },
    extend: {
      borderRadius: {
        5: '5px',
        harf: '50%',
      },
      width: {
        md: '820px',
        lg: '1024px',
        xl: '1280px',
        blog: '960px',
        thumbnail: '335px',
      },
      height: {
        thumbnail: '176px',
      },
    },
  },
  variants: {
    padding: ['first'],
    borderWidth: ['last'],
    borderStyle: ['last'],
    borderColor: ['last'],
  },
  plugins: [],
};
