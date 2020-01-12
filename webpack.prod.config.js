const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const config = {
    mode: 'production',
    entry: {
        app: ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js'
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
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
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
        namedModules: true, // NamedModulesPlugin()
        runtimeChunk: 'single',
        splitChunks: {
            /* minChunks: 2, */
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        noEmitOnErrors: true, // NoEmitOnErrorsPlugin
        concatenateModules: true, //ModuleConcatenationPlugin
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: {
                    parallel: true,
                    output: {
                        comments: false
                    },
                    mangle: true,
                    compress: {
                        keep_fargs: false,
                        hoist_funs: true
                    }
                }
            })
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body',
            minify: {
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true
            },
            env: {
                Prod: true
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: /app/,
            defer: /\.js$/
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/robots.txt'
            },
            {
                from: 'public/sitemap.xml'
            },
            {
                from: 'public/.htaccess'
            },
            {
                from: 'public/img/Sign.svg'
            },
            {
                from: 'public/audio'
            },
            {
                from: 'public/dictionary'
            }
        ]),
        new OfflinePlugin({
            appShell: '/',
            responseStrategy: 'network-first',
            safeToUseOptionalCaches: true,
            excludes: ['robots.txt', 'sitemap.xml', '.htaccess'],
            caches: 'all',
            externals: ['/', 'https://mc.yandex.ru/metrika/watch.js'],
            ServiceWorker: {
                events: true,
                output: 'sworker.js'
            },
            AppCache: {
                events: true
            }
        })
    ]
};

if (process.env.ANALIZE) {
    config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
