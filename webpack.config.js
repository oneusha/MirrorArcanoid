'use strict';

module.exports = {
  entry: './src/app',

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    library: 'app'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  }
}
