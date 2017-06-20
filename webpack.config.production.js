var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var common = {

  entry: [
    path.resolve(__dirname, 'src/index')
  ],

  module: {
    loaders: [
      { test: /\.(html)$/, loader: "file-loader?name=dist/[name].[ext]" },
      { test: /.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } },
      { test: /\.scss$/, use: [ "style-loader", "css-loader?sourceMap", "sass-loader?sourceMap" ] },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader?sourceMap' ] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=dist/fonts/[name].[ext]" }
    ]
  },
};

module.exports = merge(common, {
  devtool: 'source-map',
  output: { path: __dirname, filename: 'dist/bundle.js' },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack-react'
    })
  ]
});
