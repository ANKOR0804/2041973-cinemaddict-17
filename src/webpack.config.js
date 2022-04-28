const path = require('path');  // path — встроенный в Node.js модуль
const CopyPlugin = require('copy-webpack-plugin'); // плагин для копирования фалов из /public в /build с бандлом

module.exports = {
  entry: './src/main.js', // точка входа
  output: {
    filename: 'bundle.js', // имя файла со сборкой
    path: path.resolve(__dirname, 'build'), // резолв путь до директории
    clean: true
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{from: 'public'}],
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }
    ]
  }
}

