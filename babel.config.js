module.exports = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['>0.25%', 'not ie 11', 'not op_mini all']
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
                pure: true,
                ssr: true
            }
        ],
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
};6
