var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  output: { path: __dirname, filename: 'dist/bundle.js' },
  module: {
    loaders: [
      { test: /.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } },
      { test: /\.scss$/, use: [ "style-loader", "css-loader?sourceMap", "sass-loader?sourceMap" ] },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader?sourceMap' ] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
};
