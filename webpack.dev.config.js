const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = require('./webpack.config');

const PORT = 9000;

module.exports = {
    ...baseConfig,
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    output: {
        ...baseConfig.output,
        sourceMapFilename: '[name].[hash:8].map',
        chunkFilename: '[id].[hash:8].js'
    },
    module: {
        rules: [
            ...baseConfig.module.rules,
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'head',
            minify: {
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            },
            env: {
                Prod: false
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: /\.js$/
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/audio',
                ignore: ['.DS_Store']
            },
            {
                from: 'public/dictionary',
                ignore: ['.DS_Store']
            }
        ])
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: PORT,
        historyApiFallback: true,
        publicPath: '/',
        watchOptions: {
            aggregateTimeout: 1000,
            poll: 1000
        }
    }
};
