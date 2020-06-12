const { RuleTester } = require('eslint');

const rule = require('../../lib/rules/no-extra-parens');

const runner = new RuleTester({ parserOptions: { ecmaVersion: 2020 } });

runner.run('no-extra-parens', rule, {
  valid: [
    '(() => {})()',
    '() => ({ ...(true ? { foo: "bar" } : { bar: "foo" }) })',
    `() => ({
      ...(true ? {
        foo: 'bar',
      } : { bar: 'foo' }),
    })`,
    'const a = (1 + 1) * 2;',
  ],
  invalid: [
    {
      code: '() => { return (true); }',
      errors: ['Unnecessary parentheses around expression.'],
      output: '() => { return true; }',
    },
    {
      code: '() => ({ ...({ foo: "bar" }) })',
      errors: ['Unnecessary parentheses around expression.'],
      output: '() => ({ ...{ foo: "bar" } })',
    },
    {
      code: `() => ({
        ...((true) ? {
          foo: 'bar',
        } : { bar: 'foo' }),
      })`,
      errors: ['Unnecessary parentheses around expression.'],
      output: `() => ({
        ...(true ? {
          foo: 'bar',
        } : { bar: 'foo' }),
      })`,
    },
    {
      code: 'const a = (1 * 1) + 1;',
      errors: ['Unnecessary parentheses around expression.'],
      output: 'const a = 1 * 1 + 1;',
    },
  ],
});
