var cssnext = require('postcss-cssnext');
var cssImport = require('postcss-import');
var simpleVars = require('postcss-simple-vars');

module.exports = {
  plugins: [
    cssImport,
    simpleVars,
    cssnext({
      features: {
        customProperties: false,
        rem: false,
        autoprefixer: {
          grid: false,
        },
      },
    }),
  ],
};
