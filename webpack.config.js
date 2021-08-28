const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'browser-parser': './src/index.js',
        'browser-parser.min': './src/index.js',
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
