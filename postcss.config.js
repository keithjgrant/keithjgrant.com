var cssnext = require('postcss-cssnext');
var cssImport = require('postcss-import');

module.exports = {
  plugins: [
    cssImport,
    cssnext({
      features: {
        customProperties: false,
      },
    }),
  ],
};
