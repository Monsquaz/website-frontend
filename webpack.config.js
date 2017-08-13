const path = require('path');
const webpack = require('webpack');

var isProduction = process.env.NODE_ENV === 'production';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CssNano = require('cssnano')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: 'assets/',
    filename: 'scripts.js',
    chunkFilename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
    host: "0.0.0.0",
    allowedHosts: [
      'monsquaz.org'
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new ExtractTextPlugin("style.css"),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } },
      cssProcessor: CssNano ,
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      }
    ]
  }
}
