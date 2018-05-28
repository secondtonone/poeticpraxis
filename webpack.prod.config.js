const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = {
    entry: {
        app: ['./src/index.js']
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
        rules: [
            {
                test: /.js?$/,
                use: ['babel-loader'],
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
                /*                 use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "sass-loader"
                        },
                        {
                            loader: "sass-resources-loader",
                            options: {
                                resources: [
                                    "./src/scss/_variables.scss",
                                    "./src/scss/_mixins.scss"
                                ]
                            }
                        }
                    ]
                }) */
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
        extensions: ['.js', '.json'],
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
            'preact-compat': 'preact-compat/dist/preact-compat'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        /* new ExtractTextPlugin("style.[hash].css"), */
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 2,
            children: true,
            async: true
        }),
        /* new BundleAnalyzerPlugin(), */
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            mangle: true,
            sourceMap: true,
            compress: {
                properties: true,
                keep_fargs: false,
                pure_getters: true,
                collapse_vars: true,
                warnings: false,
                screw_ie8: true,
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
                cascade: true,
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
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: /app/,
            defer: /\.js$/
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
        new CopyWebpackPlugin([
            {
                from: 'public/robots.txt'
            },
            {
                from: 'public/sitemap.xml'
            },
            {
                from: 'public/.htaccess'
            }
        ]),
        new OfflinePlugin({
            safeToUseOptionalCaches: true,
            caches: {
                main: ['*.js', 'index.html'],
                additional: ['*.woff', '*.woff2'],
                optional: [':rest:']
            },
            ServiceWorker: {
                events: true
            },
            AppCache: {
                events: true
            }
        })
    ]
};
