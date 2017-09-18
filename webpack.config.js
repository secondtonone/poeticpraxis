const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');


const PORT = 9080;

module.exports = {
    devtool: 'eval-source-map',
    entry:{
        app: [
            'webpack-dev-server/client?http://localhost:'+PORT,
            'webpack/hot/only-dev-server',
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
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                use: ['react-hot-loader/webpack','babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    },{
                        loader: 'sass-resources-loader',
                        options: {
                            resources: ['./src/scss/_variables.scss', './src/scss/_mixins.scss']
                        }
                    }
                ]
            }, {
                test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
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
                use:[ 'ejs-loader?variable=data']
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
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
            inject: 'body',
            env:{
                Prod: false
            }
        }),
        new OfflinePlugin({
            publicPath: '/',
            externals: [
                '/'
            ],
            ServiceWorker: {
                navigateFallbackURL: '/'
            }
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        port: PORT,
        historyApiFallback: true,
        publicPath: '/'
    }
};
