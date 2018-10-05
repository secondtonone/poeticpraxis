module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    browsers: ['last 3 versions']
                },
                useBuiltIns: 'usage',
                modules: false
            }
        ]
    ],
    plugins: [
        'babel-plugin-styled-components',
        'react-hot-loader/babel',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        [
            '@babel/plugin-transform-react-jsx',
            {
                pragma: 'h'
            }
        ]
    ]
};
