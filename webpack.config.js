const ExtractTextPlugin = require('extract-text-webpack-plugin');

const THEME = 'shindig';

const THEME_DIR = './themes/' + THEME + '/static-src/';
// const extractStyles = new ExtractTextPlugin(THEME_DIR + 'css/style.css');
const extractStyles = new ExtractTextPlugin('css/style.css');

module.exports = {
  entry: {
    bundle: THEME_DIR + 'js/index.js',
    css: THEME_DIR + 'css/style.css',
  },
  output: {
    path: __dirname + '/themes/' + THEME + '/static',
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: extractStyles.extract({
          // loader: 'css-loader?importLoaders=1!postcss-loader',
          loader: [
            {
              loader: 'css-loader',
              options: {minimize: true},
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'file?name=css/fonts/[name].[ext]',
      },
    ],
  },
  plugins: [extractStyles],
};
