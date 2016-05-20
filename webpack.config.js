var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        '/public/js/app.js': ['./app/index.js', './scss/style.scss']
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
            loaders: ['style', 'css-loader?-url&-import', 'sass']
        }/*, {
            test: /\.(jpe?g|png|gif|svg|cur|woff|woff2|eot|ttf)$/,
            loader: 'ignore-loader'
        }*/]

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
