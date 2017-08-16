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
    new ExtractTextPlugin({ filename: "style.css", allChunks: true }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        },
        autoprefixer: {
          browsers: 'last 2 versions'
        }
      },
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
          loaders: {
            sass: ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    minimize: true
                  }
                }
              ],
              fallback: 'vue-style-loader'
            })
          }
        }
      }
    ]
  }
}
