const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const { alias, configPaths } = require('react-app-rewire-alias')

const aliasMap = configPaths('./tsconfig.paths.json')

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)

module.exports = function override(config, env) {
    config.resolve.fallback = {
        crypto: require.resolve("crypto-browserify"), path: false,
        buffer: require.resolve("buffer/"),
        stream: require.resolve("stream-browserify"),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        // process: require.resolve('process/browser'),
        // os: require.resolve('os-browserify/browser'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
        new NodePolyfillPlugin(),
    );

    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

    return config;
}