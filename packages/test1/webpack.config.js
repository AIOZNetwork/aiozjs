/* eslint-env es6 */

const path = require('path');
const webpack = require('webpack');
// const GlobalsPolyfills = require('@esbuild-plugins/node-globals-polyfill');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


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
      Buffer: ['buffer', 'Buffer'],
      // process: 'process/browser',
    }),
    new NodePolyfillPlugin(),
  ],
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"), path: false,
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      // process: require.resolve('process/browser'),
      // os: require.resolve('os-browserify/browser'),
    }
  },
  // buildConfig: {
  //   plugins: [
  //       // NodeModulesPolyfills(),
  //       GlobalsPolyfills({
  //           process: true,
  //           buffer: true,
  //           define: { 'process.env.var': '"hello"' }, // inject will override define, to keep env vars you must also pass define here https://github.com/evanw/esbuild/issues/660
  //       }),
  //   ]
  // },
};
