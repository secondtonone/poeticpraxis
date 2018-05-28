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
        ],
        [
            '@babel/preset-stage-0',
            {
                decoratorsLegacy: true
            }
        ]
    ],
    plugins: [
        'react-hot-loader/babel',
        '@babel/plugin-transform-runtime',
        [
            '@babel/plugin-transform-react-jsx',
            {
                pragma: 'h'
            }
        ]
    ]
};
