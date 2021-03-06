const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  rules: {
    camelcase: require('./rules/camelcase'),
    'no-extra-parens': require('./rules/no-extra-parens'),
    'no-unneeded-ternary': require('./rules/no-unneeded-ternary'),
  },
  configs: {
    recommended: {
      plugins: ['@poool/eslint-plugin'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        ecmaVersion: 2020,
      },
      rules: {
        'no-extra-parens': OFF,
        '@poool/no-extra-parens': WARNING,
        '@poool/camelcase': [ERROR, { allow: ['^UNSAFE_'] }],
        'no-unneeded-ternary': OFF,
        '@poool/no-unneeded-ternary': ERROR,
      },
    },
  },
};
