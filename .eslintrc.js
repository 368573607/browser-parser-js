module.exports = {
    extends: 'airbnb-base',
    rules: {
        indent: ['error', 4],
        'no-console': 'off',
        'no-plusplus': 'off',
        'no-constant-condition': 'off',
        'no-restricted-syntax': 'off',
    },
    globals: {
        describe: 'readonly',
        it: 'readonly',
        window: true,
    },
};
