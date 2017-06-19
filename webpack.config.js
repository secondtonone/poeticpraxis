const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry:{
        app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:9080',
            'webpack/hot/only-dev-server',
            './src/main.js'
        ],
        vendor: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:9080',
            'webpack/hot/only-dev-server',
            'babel-polyfill',
            'react',
            'react-dom',
            'react-router'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000
                        }
                    }
                ]
            }, {
                test: /\.(eot|ttf)$/,
                use:[
                    'file-loader'
                ]
            }, {
                test: /\.webmanifest$/,
                include: /public/,
                loader: [
                  'file-loader?name=[name].[ext]',
                  'webmanifest-loader'
                ].join('!')
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader?variable=data'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: '[name].[hash].js',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.ejs',
            inject: 'body'
        }),
        new OfflinePlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        port: 9080,
        historyApiFallback: true,
        publicPath: '/'
    }
};
