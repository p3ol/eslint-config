const { RuleTester } = require('eslint');

const rule = require('../../lib/rules/no-extra-parens');

const runner = new RuleTester({ parserOptions: { ecmaVersion: 2020 } });

runner.run('no-extra-parens', rule, {
  valid: [
    '(() => {})()',
    '() => ({ ...(true ? { foo: "bar" } : { bar: "foo" }) })',
    '() => ({ ...([] || []) })',
    `() => ({
      ...(true ? {
        foo: 'bar',
      } : { bar: 'foo' }),
    })`,
    'const a = (1 + 1) * 2;',
    {
      code: 'const a = (true && true) || (true && true);',
      options: ['all', {
        nestedBinaryExpressions: false,
      }],
    },
    {
      code: 'let a; const q = []; while ((a = q.pop())) {}',
      options: ['all', {
        enforceForSequenceExpressions: false,
      }],
    },
    'async () => ({ ...(await Promise.resolve([])) })',
    'const foo = [...(new Date())];',
    {
      code: 'const foo = (new Date()).getTime();',
      options: ['all', {
        enforceForNewInMemberExpressions: false,
      }],
    },
    'async () => { const foo = !!(await Promise.resolve()); }',
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
    {
      code: 'const a = (true && true) && (true && true);',
      errors: ['Unnecessary parentheses around expression.'],
      output: 'const a = true && true && (true && true);',
    },
    {
      code: 'let a; const q = []; while ((a = q.pop())) {}',
      errors: ['Unnecessary parentheses around expression.'],
      output: 'let a; const q = []; while (a = q.pop()) {}',
    },
    {
      code: 'const foo = (new Date());',
      errors: ['Unnecessary parentheses around expression.'],
      output: 'const foo = new Date();',
    },
  ],
});
