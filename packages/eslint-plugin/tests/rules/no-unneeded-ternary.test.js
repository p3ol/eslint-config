const { RuleTester } = require('eslint');

const rule = require('../../lib/rules/no-unneeded-ternary');

const runner = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

runner.run('no-unneeded-ternary', rule, {
  valid: [
    'const fooBar = x === 2 ? \'foo\': \'bar\';',
    'const fooBar = x === 2\n  ? \'foo\'\n  : \'bar\';',
    'const fooBar = x === 2 ? \'foo\' : x === 3 ? \'bar\' : \'test\';',
    'const fooBar = x === 2 ? <Loader /> : <Component />;',
    '() => { return x === 2 ? <Loader /> : <Component />; };',
  ],
  invalid: [
    {
      code: 'const fooBar = x === 2 ? true : false;',
      errors: [
        'Unnecessary use of boolean literals in conditional expression.',
      ],
      output: 'const fooBar = x === 2;',
    },
    {
      code: 'x === 2 ? cb() : x = 3;',
      errors: [
        'Unnecessary use of ternary expression instead of normal conditional ' +
        'expression.',
      ],
    },
    {
      code: 'x === 2?cb():x = 3',
      errors: [
        'Unnecessary use of ternary expression instead of normal conditional ' +
        'expression.',
      ],
    },
    {
      code: 'x === 2 ? cb() : x === 3 ? func() : x = 4;',
      errors: [
        'Unnecessary use of ternary expression instead of normal conditional ' +
        'expression.',
      ],
    },
    {
      code: 'x === 2 ? ReactDOM.render(<Loader />) : ' +
        'ReactDOM.render(<Component />);',
      errors: [
        'Unnecessary use of ternary expression instead of normal conditional ' +
        'expression.',
      ],
    },
  ],
});
