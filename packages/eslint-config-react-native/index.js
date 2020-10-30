const WARNING = 1;

module.exports = {
  env: {
    browser: false,
    'react-native/react-native': true,
  },
  extends: [
    '@poool/eslint-config-react',
    'plugin:react-native/all',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react-native',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/display-name': WARNING,
  },
};
