module.exports = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/env',
            {
                targets: {
                    browsers: ['last 2 versions']
                },
                useBuiltIns: 'usage',
                corejs: 3
            }
        ]
    ],
    plugins: [
        [
            'babel-plugin-styled-components',
            {
                pure: true
            }
        ],
        'react-hot-loader/babel',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        [
            '@babel/plugin-transform-react-jsx',
            {
                pragma: 'h',
                pragmaFrag: 'Fragment'
            }
        ]
    ]
};
