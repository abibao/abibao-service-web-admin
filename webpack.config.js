'use strict'

var path = require('path')
var webpack = require('webpack')

var buildPath = path.resolve(__dirname, 'dist')
var nodeModulesPath = path.resolve(__dirname, 'node_modules')
var contextPath = path.join(__dirname, '/client')
var entryPath = path.join(contextPath, '/app.js')

module.exports = {
  context: contextPath,
  entry: entryPath,
  resolve: ['', '.js', '.tag'],
  output: {
    path: buildPath,
    filename: 'js/app.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
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
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        include: path.join(contextPath, 'assets/fonts'),
        loader: 'url-loader?limit=8192&name=fonts/[hash].[ext]'
      }
    ]
  }
}
