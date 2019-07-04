module.exports = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/env',
            {
                targets: {
                    browsers: ['last 3 versions']
                },
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false
            }
        ]
    ],
    plugins: [
        'babel-plugin-styled-components',
        'react-hot-loader/babel',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties' /* ,
        [
            '@babel/plugin-transform-react-jsx',
            {
                pragma: 'h'
            }
        ] */
    ]
};
