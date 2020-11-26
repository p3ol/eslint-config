const { RuleTester } = require('eslint');
const rule = require('eslint-plugin-import/lib/rules/order');
const options = require('@poool/eslint-config').rules['import/order'][1];

const runner = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
});

runner.run('import/order', rule, {
  valid: [{
    code: `
      const path = require('path');

      const { method } = require('external-module');
    `,
    options: [options],
  }],
  invalid: [{
    code: `
      const path = require('path');
      const { method } = require('external-module');
    `,
    options: [options],
    errors: ['There should be at least one empty line between import groups'],
    output: `
      const path = require('path');

      const { method } = require('external-module');
    `,
  }],
});
