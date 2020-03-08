const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const config = {
    mode: 'production',
    devtool: false,
    entry: {
        app: ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash:8].js',
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
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(svg)$/,
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
                test: /\.(png|jpg|jpeg|gif|mp3|ogg|woff|woff2|eot|ttf|otf)$/,
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
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
            /*  maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // получает имя, то есть node_modules/packageName/not/this/part.js
                        // или node_modules/packageName
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];

                        // имена npm-пакетов можно, не опасаясь проблем, использовать
                        // в URL, но некоторые серверы не любят символы наподобие @
                        return `npm.${packageName.replace('@', '')}`;
                    }
                }
            } */
        },
        noEmitOnErrors: true,
        concatenateModules: true,
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
        new PreloadWebpackPlugin({
            rel: 'preload',
            /* as(entry) {
                if (/\.woff2$/.test(entry)) return 'font';
                if (/\.css$/.test(entry)) return 'style';
                if (/worker/.test(entry)) return 'worker';
                if (/\.png$|.svg$/.test(entry)) return 'image';
                return 'script';
            },
            fileBlacklist: [
                /\.ttf/,
                /\.woff$/,
                /serviceworker/,
                /\.webmanifest/
            ], */
            include: /* 'allAssets' */ 'initial'
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/robots.txt',
                ignore: ['.DS_Store']
            },
            {
                from: 'public/sitemap.xml',
                ignore: ['.DS_Store']
            },
            {
                from: 'public/.htaccess',
                ignore: ['.DS_Store']
            },
            {
                from: 'public/img/Sign.svg',
                ignore: ['.DS_Store']
            },
            {
                from: 'public/audio',
                ignore: ['.DS_Store']
            },
            {
                from: 'public/dictionary',
                ignore: ['.DS_Store']
            }
        ]),
        new OfflinePlugin({
            appShell: '/',
            responseStrategy: 'network-first',
            safeToUseOptionalCaches: true,
            excludes: ['robots.txt', 'sitemap.xml', '.htaccess'],
            caches: 'all',
            externals: ['/', 'https://mc.yandex.ru/metrika/tag.js'],
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
