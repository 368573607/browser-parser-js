const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BannerPlugin } = require('webpack');

module.exports = {
    entry: {
        'browser-parser': path.resolve(__dirname, 'src', 'index.js'),
        'browser-parser.min': path.resolve(__dirname, 'src', 'index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: {
            name: 'browserParser',
            type: 'umd',
        },
    },
    devtool: 'source-map',
    mode: 'production',
    optimization: {
        minimizer: [new UglifyJsPlugin({
            include: 'browser-parser.min.js',
        })],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BannerPlugin('Browser-Parser (https://github.com/368573607/browser-parser.js)'),
    ],
};
