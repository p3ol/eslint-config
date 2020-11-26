const { RuleTester } = require('eslint');
const rule = require('eslint-plugin-import/lib/rules/order');

const options = require('../../index').rules['import/order'][1];

const runner = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
});

runner.run('import/order', rule, {
  valid: [{
    code: `
      import path from 'path';

      import { method } from 'external-module';
    `,
    options: [options],
  }],
  invalid: [{
    code: `
      import path from 'path';
      import { method } from 'external-module';
    `,
    options: [options],
    errors: ['There should be at least one empty line between import groups'],
    output: `
      import path from 'path';

      import { method } from 'external-module';
    `,
  }],
});
