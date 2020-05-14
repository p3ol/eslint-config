module.exports = {
  env: {
    browser: true,
  },
  extends: [require.resolve('./common'), 'plugin:react/recommended'],
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
};
