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
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'no-prototype-builtins': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
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
