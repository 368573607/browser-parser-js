module.exports = {
    extends: 'airbnb-base',
    rules: {
        indent: ['error', 4],
        'no-console': 'off',
        'no-plusplus': 'off',
    },
    globals: {
        describe: 'readonly',
        it: 'readonly',
    },
};
