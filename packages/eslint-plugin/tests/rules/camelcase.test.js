const { RuleTester } = require('eslint');

const rule = require('../../lib/rules/camelcase');

const runner = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: { ecmaVersion: 2020 },
});

runner.run('camelcase', rule, {
  valid: [
    'const fooBar = {};',
    {
      code: 'const bar = {}; const foo = bar.a_b;',
      options: [{ properties: 'always' }],
    },
    'const bar = {}; const foo = bar?.a_b;',
    'const bar = {}; const foo = bar?.fooBar;',
    {
      code: 'const UNSAFE_componentWillMount = () => {};',
      options: [{ allow: ['^UNSAFE_'] }],
    },
  ],
  invalid: [
    {
      code: 'const foo_bar = {};',
      errors: ["Identifier 'foo_bar' is not in camel case."],
    },
    {
      code: 'const foo = { a_b: true };',
      options: [{ properties: 'always' }],
      errors: ["Identifier 'a_b' is not in camel case."],
    },
    {
      code: 'const UNSAFE_componentWillMount = () => {};',
      errors: ["Identifier 'UNSAFE_componentWillMount' is not in camel case."],
    },
  ],
});
