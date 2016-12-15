'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const buildPath = path.resolve(__dirname, 'dist')
const contextPath = path.join(__dirname, '/client')
const entryPath = path.join(contextPath, '/app.js')

module.exports = {
  context: contextPath,
  entry: entryPath,
  resolve: ['', '.js', '.tag'],
  output: {
    path: buildPath,
    filename: 'js/bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
    new HtmlWebpackPlugin({
      title: 'Abibao Service / Administrator',
      template: 'index.ejs'
    })
  ],
  module: {
    noParse: ['riot'],
    preLoaders: [{
      test: /\.tag$/,
      loader: 'riotjs-loader',
      query: {type: 'babel?presets[]=riot,presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy,plugins[]=transform-object-rest-spread'},
      exclude: [nodeModulesPath]
    }],
    loaders: [
      {
        test: /\.js|\.tag$/,
        loader: 'babel-loader',
        query: {cacheDirectory: true, presets: ['es2015']}
      },
      {
        test: /index\.html/,
        loader: 'file?name=index.html'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: path.join(contextPath, 'assets/img'),
        loader: 'url-loader?limit=8192&name=img/[hash].[ext]'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        include: path.join(contextPath, 'assets/fonts'),
        loader: 'url-loader?limit=8192&name=fonts/[hash].[ext]',
        exclude: [nodeModulesPath]
      }
    ]
  }
}