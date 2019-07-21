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
        extensions: [
            '.js',
            '.json'
        ] /* ,
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
            'preact-compat': 'preact-compat/dist/preact-compat'
        }
    */
    },
    optimization: {
        namedModules: true, // NamedModulesPlugin()
        runtimeChunk: true,
        splitChunks: {
            // CommonsChunkPlugin()
            /* chunks: 'all',
            name: false */
            minChunks: 2,
            chunks: 'async'
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
                        properties: true,
                        keep_fargs: false,
                        pure_getters: true,
                        collapse_vars: true,
                        warnings: false,
                        inline: false,
                        reduce_vars: false,
                        sequences: true,
                        dead_code: true,
                        drop_debugger: true,
                        comparisons: true,
                        conditionals: true,
                        evaluate: true,
                        booleans: true,
                        loops: true,
                        unused: true,
                        hoist_funs: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: false,
                        pure_funcs: [
                            'classCallCheck',
                            '_classCallCheck',
                            '_possibleConstructorReturn',
                            'Object.freeze',
                            'invariant',
                            'warning'
                        ]
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
