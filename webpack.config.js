const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.html',
    }),
  ],
};
