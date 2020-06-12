const OFF = 0;
const ERROR = 2;

module.exports = {
  rules: {
    'no-extra-parens': require('./rules/no-extra-parens'),
  },
  configs: {
    recommended: {
      plugins: ['@poool/eslint-plugin'],
      rules: {
        'no-extra-parens': OFF,
        '@poool/no-extra-parens': ERROR,
      },
    },
  },
};
