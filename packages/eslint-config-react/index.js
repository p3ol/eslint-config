const OFF = 0;

module.exports = {
  extends: ['@poool/eslint-config', 'plugin:react/recommended'],
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'babel',
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/display-name': OFF,
    'react/no-children-prop': OFF,
  },
};
