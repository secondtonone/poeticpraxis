const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = {
    entry:{
        app: [
            './src/main.js'
        ],
        vendor: [
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
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: '[name].[hash].js',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.ejs',
            inject: 'body'
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/robots.txt'
            },{
                from: 'public/sitemap.xml'
            },{
                from: 'public/.htaccess'
            }
        ]),
        new OfflinePlugin()
    ]
};
