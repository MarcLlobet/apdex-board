const webpack = require('webpack');
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js'],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 5500
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/template.html')
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/favicon.ico'),
      cache: false,
      inject: true
    }),
    new webpack.ProvidePlugin({
      $: path.resolve(__dirname, 'src/helpers')
    })
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.scss', '.css'],
    alias: {
      data: path.resolve(__dirname, 'data/host-app-data.json')
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['css-to-string-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                exportGlobals: true,
                localIdentName: '[local]@[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      { test: /\.(woff2?|eot|(o|t)tf|svg|ico)$/, loader: 'file-loader' }
    ]
  }
};