const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'browser-parser': path.resolve(__dirname, 'src', 'index.js'),
        'browser-parser.min': path.resolve(__dirname, 'src', 'index.js'),
    },
    output: {
        path: './dist',
        filename: '[name].js',
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [new UglifyJsPlugin({
            include: 'browser-parser.min.js',
            minimize: true,
        })],
    },
};
