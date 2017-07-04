const path = require('path');
const webpack = require('webpack');

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    publicPath: 'js/',
    filename: 'build.js'
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
      compress: { warnings: false }
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
        loader: 'vue-loader'
      }
    ]
  }
}
