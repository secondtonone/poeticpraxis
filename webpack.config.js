var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        '/public/js/app.js': './app/index.js',
        '/public/css/style.css': './scss/style.scss'
    },
    output: {
        path: './',
        filename: '[name]'
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.scss$/,
            loader:
                ExtractTextPlugin.extract('style', ['css-loader?-url&-import', 'sass-loader'])

        }]

    },
    plugins: [
/*        new webpack.HotModuleReplacementPlugin(),*/
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('/public/css/style.css', {
            allChunks: true
        })
    ]
};
