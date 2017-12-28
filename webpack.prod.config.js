const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OfflinePlugin = require('offline-plugin');

module.exports = {
    entry: {
        app: [
            './src/main.js'
        ]
        /*,
                vendor: [
                    'preact',
                    'react-router-dom',
                    'redux',
                    'preact-redux'
                ]*/
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
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, {
                    loader: 'sass-loader'
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
                        limit: 10000
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
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[hash].js',
            minChunks: 2,
            children: true
        }),
        /*new BundleAnalyzerPlugin(),*/
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: /vendor/,
            defer: /\.js$/
        }),
        new HtmlWebpackPlugin({
            template: './public/index.ejs',
            inject: 'head',
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