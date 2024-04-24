module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'prettier',
        'prettier/vue'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'vue',
        'prettier'
    ],
    'rules': {
        'prettier/prettier': ['error'],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        'indent': ['error', 4],
        'semi': ['error', 'always']
    }
};
