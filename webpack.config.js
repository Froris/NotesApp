const path = require('path');

module.exports = {
  entry: {
    index: ["@babel/polyfill", './src/index.js'],
    edit: ["@babel/polyfill", './src/edit.js']
  },
  output: {
    path: path.resolve(__dirname, './public/scripts'),
    filename: "[name]-boundle.js"
  },
  module: {
    rules: [{ 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader"
      }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    publicPath: '/scripts/'
  },
  devtool: "eval-source-map"
};