const path = require('path');

module.exports = {
    entry: {
        app: ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash:8].js',
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
        moduleIds: 'hashed',
        splitChunks: {
            chunks: 'all'
        },
        noEmitOnErrors: true
    }
};
