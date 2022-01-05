const path = require('path');

module.exports = {
    entry: {
        app: ['./src/index.tsx'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash:8].js',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.worker\.ts$/,
                use: { 
                    loader: 'worker-loader',
                    options: { publicPath: './' },
                },
            },
            { 
                test: /\.tsx?$/, 
                include: path.resolve(__dirname, 'src'),
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    }
                ] 
            },
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 5000,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|mp3|ogg|woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
            {
                test: /\.webmanifest$/,
                include: /public/,
                loader: [
                    'file-loader?name=[name].[ext]',
                    'webmanifest-loader',
                ].join('!'),
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        alias: {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
            '@components': path.join(__dirname, 'src/components'),
            '@containers': path.join(__dirname, 'src/containers'),
            '@utils': path.join(__dirname, 'src/utils'),
            '@styles': path.join(__dirname, 'src/styles'),
            '@store': path.join(__dirname, 'src/store'),
            '@modules': path.join(__dirname, 'src/modules'),
            '@hooks': path.join(__dirname, 'src/hooks'),
            '@typings': path.join(__dirname, 'src/typings'),
            '@contexts': path.join(__dirname, 'src/contexts'),
            '@routes': path.join(__dirname, 'src/routes'),
            '@translations': path.join(__dirname, 'src/translations'),
            '@icons': path.join(__dirname, 'src/components/IconSVG'),
            '@public': path.join(__dirname, 'public'),
        },
    },
    optimization: {
        namedModules: true,
        runtimeChunk: 'single',
        moduleIds: 'hashed',
        usedExports: true,
        splitChunks: {
            chunks: 'all',
            maxSize: 400000,
            cacheGroups: {
                tone: {
                    test: (module) => {
                        const context = module.context;
                        const target = 'tone';
                        return context && context.includes('node_modules') && context.includes(target);
                    },
                    name: 'tone',
                    chunks: 'all'
                }
            },
        },
        noEmitOnErrors: true,
    },
};
