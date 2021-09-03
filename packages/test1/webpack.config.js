const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  experiments: {
    topLevelAwait: true
  },
  mode: 'development',
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  ],
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"), path: false,
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify")
    }
  }
};
