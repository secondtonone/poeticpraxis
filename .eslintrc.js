module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    plugins: ['react'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    ignorePatterns: ["node_modules/"],
    rules: {
        'no-undef': 0,
        'no-console': 0,
        'no-unused-vars': 0,
        semi: 0,
        'eol-last': 0,
        indent: ['error', 4],
        'comma-dangle': 0,
        'no-useless-constructor': 0,
        'react/jsx-no-bind': [
            'error',
            {
                allowArrowFunctions: true,
                allowBind: false,
                ignoreRefs: true
            }
        ],
        'react/no-did-update-set-state': 'error',
        'react/no-unused-prop-types': 'error',
        'jsx-quotes': 0,
        'react/jsx-boolean-value': 'error',
        'react/jsx-curly-spacing': ['error', 'never'],
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-undef': 'error',
        'react/prop-types': 0,
        'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/self-closing-comp': 'error',
        'react/no-children-prop': 0,
        'react/react-in-jsx-scope': 0,
        "react/jsx-fragments": [ 0, 'syntax'],
        'react/jsx-key': 0,
        'react/display-name': 0,
        'react/no-unescaped-entities': 0
    }
};
