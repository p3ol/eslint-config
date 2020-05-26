module.exports = {
  env: {
    browser: false,
    'react-native/react-native': true,
  },
  extends: [
    '@poool/eslint-config-react',
    'plugin:react-native/all',
  ],
  parser: 'babel-eslint',
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
};
