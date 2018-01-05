module.exports = {
    "extends": "standard",
    "plugins": [
        "standard"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "no-unused-vars": 0,
        "semi": 0,
        "eol-last": 0,
        "indent": "off",
        "no-useless-constructor": 0
    }
};