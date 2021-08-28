module.exports = {
    extends: 'airbnb-base',
    rules: {
        indent: ['error', 4],
        'no-console': 'off',
    },
    global: {
        describe: 'readonly',
        it: 'readonly',
    },
};
