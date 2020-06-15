const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  rules: {
    camelcase: require('./rules/camelcase'),
    'no-extra-parens': require('./rules/no-extra-parens'),
  },
  configs: {
    recommended: {
      plugins: ['@poool/eslint-plugin'],
      parser: 'babel-eslint',
      parserOptions: {
        ecmaVersion: 2020,
      },
      rules: {
        'no-extra-parens': OFF,
        '@poool/no-extra-parens': ERROR,
        '@poool/camelcase': [ERROR, { allow: ['^UNSAFE_'] }],
      },
    },
  },
};
