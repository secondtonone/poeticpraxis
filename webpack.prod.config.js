const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = {
    entry: {
        app: [
            './src/main.js'
        ],
        vendor: [
            'preact',
            'react-router-dom',
            'redux',
            'preact-redux'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    module: {
        rules: [{
                test: /.js?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }, {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: ['./src/scss/_variables.scss', './src/scss/_mixins.scss']
                    }
                }]
            }, {
                test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000
                    }
                }]
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
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
                use: ['ejs-loader?variable=data']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: '[name].js',
        }),
        /*new webpack.optimize.AggressiveSplittingPlugin({
            minSize: 30000,
            maxSize: 50000
        }),
*/
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
        new ScriptExtHtmlWebpackPlugin({
            sync: /vendor/,
            async: /\.js$/
        }),
        new HtmlWebpackPlugin({
            template: './public/index.ejs',
            inject: 'body',
            env: {
                Prod: true
            }
        }),
        new CopyWebpackPlugin([{
            from: 'public/robots.txt'
        }, {
            from: 'public/sitemap.xml'
        }, {
            from: 'public/.htaccess'
        }]),
        new OfflinePlugin({
            publicPath: '/',
            externals: [
                '/'
            ],
            ServiceWorker: {
                navigateFallbackURL: '/'
            }
        })
    ]
};