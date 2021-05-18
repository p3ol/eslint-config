const WARNING = 1;
const ERROR = 2;

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
    ecmaVersion: 2021,
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
    'react/no-this-in-sfc': ERROR,
    'react/self-closing-comp': [WARNING, {
      component: true,
    }],
    'react/void-dom-elements-no-children': ERROR,
    'react/jsx-closing-bracket-location': [WARNING, 'line-aligned'],
    'react/jsx-closing-tag-location': WARNING,
    'react/jsx-curly-brace-presence': [WARNING, {
      props: 'never',
      children: 'never',
    }],
    'react/jsx-equals-spacing': [WARNING, 'never'],
    'react/jsx-pascal-case': WARNING,
    'react/jsx-props-no-multi-spaces': WARNING,
    'react/jsx-tag-spacing': [WARNING, {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
    'react/jsx-wrap-multilines': [WARNING, {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    }],

    'jsx-quotes': [WARNING, 'prefer-double'],

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
