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

    // import
    'import/order': [WARNING, {
      groups: [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling', 'index', 'unknown'],
      ],
      'newlines-between': 'always',
      pathGroups: [{
        pattern: 'styles',
        patternOptions: { matchBase: true, nocase: true },
        group: 'index',
        position: 'after',
      }, {
        pattern: '*.{svg,png,jpeg,jpg,gif}',
        patternOptions: { matchBase: true, nocase: true },
        group: 'index',
        position: 'after',
      }],
    }],
  },
};
