const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const baseConfig = require('./webpack.config');

const config = {
    ...baseConfig,
    mode: 'production',
    devtool: false,
    output: {
        ...baseConfig.output,
        filename: '[name].[chunkhash:8].js',
    },
    module: {
        rules: [
            ...baseConfig.module.rules,
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        ...baseConfig.optimization,
        concatenateModules: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: {
                    parallel: true,
                    output: {
                        comments: false,
                    },
                    mangle: true,
                    compress: {
                        keep_fargs: false,
                        hoist_funs: true,
                    },
                },
            }),
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'head',
            minify: {
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true,
            },
            env: {
                Prod: true,
            },
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: /\.js$/,
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
            include: /* 'asyncChunks' */ 'initial',
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/robots.txt',
                ignore: ['.DS_Store'],
            },
            {
                from: 'public/sitemap.xml',
                ignore: ['.DS_Store'],
            },
            {
                from: 'public/.htaccess',
                ignore: ['.DS_Store'],
            },
            {
                from: 'public/img/Sign.svg',
                ignore: ['.DS_Store'],
            },
            {
                from: 'public/audio',
                ignore: ['.DS_Store'],
            },
            {
                from: 'public/dictionary',
                ignore: ['.DS_Store'],
            },
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
                output: 'sworker.js',
            },
            AppCache: {
                events: true,
            },
        }),
    ],
};

if (process.env.ANALIZE) {
    config.plugins.push(new BundleAnalyzerPlugin());
    config.devtool = 'cheap-module-source-map';
}

module.exports = config;
