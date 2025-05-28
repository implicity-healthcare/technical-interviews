module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint/eslint-plugin'
    ],
    root: true,
    extends: [
        '@implicity-healthcare/eslint-config',
        'prettier',
    ],
    env: {
        node: true,
        jest: true,
    },
    settings: {
        "import/resolver": {
            "typescript": {}
        }
    }
};
