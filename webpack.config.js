/* === dont forget to import scss to main.js file === */
/* ===> import './main.scss'; <=== */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const styleLintPlugin = require('stylelint-webpack-plugin');
require('es6-promise').polyfill();

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist"
  },
  plugins: [
    // Specify the resulting CSS filename
    new ExtractTextPlugin('css/app.css'),

    // Stylelint plugin
    new styleLintPlugin({
      configFile: '.stylelintrc',
      context: '',
      files: '**/*.scss',
      syntax: 'scss',
      failOnError: true,
      quiet: false
    })
  ],
  devServer: {
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  stats: {
    // Colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};