const path = require('path');
const webpack = require('webpack');

// Plugins
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|svg|gif|ico)/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new Html({
      template: './public/index.html',
      inject: 'body'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new Copy([{ from: 'public' }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ]
};
