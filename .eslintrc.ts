module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint-config-airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { ignoreTypeReferences: true }],
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', './src'],
      },
    },
  },
}
