const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PORT = 9080;

module.exports = {
    entry: {
        app: ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },
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
            },
            {
                test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' }
            },
            {
                test: /\.webmanifest$/,
                include: /public/,
                loader: [
                    'file-loader?name=[name].[ext]',
                    'webmanifest-loader'
                ].join('!')
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat'
        }
    },
    optimization: {
        namedModules: true,
        splitChunks: {
            chunks: 'all'
        },
        noEmitOnErrors: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
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
            defer: /app/,
            defer: /\.js$/,
            preload: /\.mp3$/
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/audio'
            },
            {
                from: 'public/dictionary'
            }
        ])
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        liveReload: true,
        port: PORT,
        historyApiFallback: true,
        publicPath: '/'
    }
};
