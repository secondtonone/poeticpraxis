module.exports = {
    extends: "standard",
    plugins: ["standard"],
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 8,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: ["standard-jsx"],
    rules: {
        "no-unused-vars": 0,
        semi: 0,
        "eol-last": 0,
        indent: ['error', 4],
        "no-useless-constructor": 0,
        "react/jsx-no-bind": [
            "error",
            {
                allowArrowFunctions: true,
                allowBind: false,
                ignoreRefs: true
            }
        ],
        "react/no-did-update-set-state": "error",
        "react/no-unused-prop-types": "error",
        "jsx-quotes": 0,
        "react/jsx-boolean-value": "error",
        "react/jsx-curly-spacing": ["error", "never"],
        "react/jsx-equals-spacing": ["error", "never"],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-no-duplicate-props": "error",
        "react/jsx-no-undef": "error",
        "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/self-closing-comp": "error"
    }
};
