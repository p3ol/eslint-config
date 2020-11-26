const OFF = 0;
const WARNING = 1;

module.exports = {
  extends: ['@poool/eslint-config', 'plugin:react/recommended'],
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
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
        pattern: '*.{styl,css}',
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
