import path from 'node:path';

import eslint, { type Linter } from 'eslint';

import { configs } from './index';

const config = [
  ...configs.recommended as Linter.Config[],
  {
    languageOptions: {
      parserOptions: {
        project: '../tsconfig.json',
        tsconfigRootDir: path.resolve(__dirname),
      },
    },
  },
];

describe('@poool/eslint-config', () => {
  const linter = new eslint.Linter();

  describe('comma-dangle', () => {
    it('should pass with trailing comma', () => {
      const code = `
        const foo = {
          bar: 1,
        };
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'comma-dangle' }),
        ]));
    });

    it('should warn on missing comma-dangle', () => {
      const code = `
        const foo = {
          bar: 1
        };
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'comma-dangle',
          message: 'Missing trailing comma.',
          severity: 1,
        })]));
    });
  });

  describe('no-unused-vars', () => {
    it('should pass with unused vars', () => {
      const code = `
        const foo = 1;
        console.log(foo);
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'no-unused-vars' }),
        ]));
    });

    it('should warn on unused vars', () => {
      const code = `
        const foo = 1;
        const bar = foo + 1;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'no-unused-vars',
          message: expect
            .stringContaining('\'bar\' is assigned a value but never used.'),
          severity: 1,
        })]));
    });
  });

  describe('no-multiple-empty-lines', () => {
    it('should pass with no multiple empty lines', () => {
      const code = `
        const foo = 1;

        const bar = 2;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'no-multiple-empty-lines' }),
        ]));
    });

    it('should warn on multiple empty lines', () => {
      const code = `
        const foo = 1;


        const bar = 2;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'no-multiple-empty-lines',
          message: 'More than 1 blank line not allowed.',
          severity: 1,
        })]));
    });
  });

  describe('eol-last', () => {
    it('should pass with eol', () => {
      // explicit bad indent to avoid having content on eof line
      const code = `
        const foo = 1;
`;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'eol-last' }),
        ]));
    });

    it('should warn on missing eol', () => {
      const code = `
        const foo = 1;`;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'eol-last',
          message: 'Newline required at end of file but not found.',
          severity: 1,
        })]));
    });
  });

  describe('no-trailing-spaces', () => {
    it('should pass with no trailing spaces', () => {
      const code = `const foo = 1;`;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'no-trailing-spaces' }),
        ]));
    });

    it('should warn on trailing spaces', () => {
      const code = `const foo = 1;  `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'no-trailing-spaces',
          message: 'Trailing spaces not allowed.',
          severity: 1,
        })]));
    });
  });

  describe('no-console', () => {
    it('should pass with console', () => {
      const code = `
        console.warn('foo');
        console.error('foo');
        console.time('foo');
        console.timeEnd('foo');
        console.timeStamp('foo');
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'no-console' }),
        ]));
    });

    it('should warn on console', () => {
      const code = `console.log('foo');`;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'no-console',
          message: 'Unexpected console statement.',
          severity: 1,
        })]));
    });
  });

  describe('padded-blocks', () => {
    it('should pass with non-padded blocks', () => {
      const code = `
        if (true) {
          console.log('foo');
        }
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'padded-blocks' }),
        ]));
    });
  });

  describe('padding-line-between-statements', () => {
    it('should pass with padding between blocks', () => {
      const code = `
        const foo = 1;

        if (foo === 1) {
          console.log('foo');
        }
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: 'padding-line-between-statements',
          }),
        ]));
    });

    it('should warn on missing padding between blocks (if)', () => {
      const code = `
        const foo = 1;
        if (foo === 1) {
          console.log('foo');
        }
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'padding-line-between-statements',
          message: 'Expected blank line before this statement.',
          severity: 1,
        })]));
    });

    it('should warn on missing padding between blocks (return)', () => {
      const code = `
        const foo = 1;
        return foo;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'padding-line-between-statements',
          message: 'Expected blank line before this statement.',
          severity: 1,
        })]));
    });
  });

  describe('spaced-comment', () => {
    it('should pass with spaced comments', () => {
      const code = `
        // foo
        // bar
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'spaced-comment' }),
        ]));
    });

    it('should warn on missing spaced comments', () => {
      const code = `
        //foo
        //bar
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'spaced-comment',
          message: 'Expected space or tab after \'//\' in comment.',
          severity: 1,
        })]));
    });
  });

  describe('space-before-function-paren', () => {
    it('should pass with space before function paren', () => {
      const code = `
        function foo (){}
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'space-before-function-paren' }),
        ]));
    });

    it('should warn on missing space before function paren', () => {
      const code = `
        function foo(){}
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'space-before-function-paren',
          message: 'Missing space before function parentheses.',
          severity: 1,
        })]));
    });
  });

  describe('new-cap', () => {
    it('should pass with new cap', () => {
      const code = `
        const foo = new Foo();
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'new-cap' }),
        ]));
    });

    it('should warn on missing new cap', () => {
      const code = `
        const foo = new foo();
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'new-cap',
          message: 'A constructor name should not start with a lowercase ' +
            'letter.',
          severity: 1,
        })]));
    });
  });

  describe('max-len', () => {
    it('should pass with max len', () => {
      const code = `
        const foo = 'foo';
        const bar = 'bar';
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'max-len' }),
        ]));
    });

    it('should not warn on max len if line is an import', () => {
      /* eslint-disable max-len */
      const code = `import { foo } from 'some-module-that-has-a-really-long-name/that-should-not-trigger-the-max-len-warning';`;
      /* eslint-enable max-len */

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'max-len' }),
        ]));
    });

    it('should warn on max len', () => {
      /* eslint-disable max-len */
      const code = `
        const foo = 'this is a really long line of code that should trigger the max len warning'; const bar = 'bar';
      `;
      /* eslint-enable max-len */

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'max-len',
          message: 'This line has a length of 116. Maximum allowed is 80.',
          severity: 1,
        })]));
    });
  });

  describe('object-curly-newline', () => {
    it('should pass with object curly newline', () => {
      const code = `
        const foo = {
          bar: 1,
        };
        const bar = { bar: 1 };
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'object-curly-newline' }),
        ]));
    });
  });

  describe('object-property-newline', () => {
    it('should pass with object property newline', () => {
      const code = `
        const foo = { foo: 1, bar: 1 };
        const bar = { bar: 1 };
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'object-property-newline' }),
        ]));
    });
  });

  describe('no-empty', () => {
    it('should pass if block not empty', () => {
      const code = `
        if(true) {
          console.log('foo');
        }
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'no-empty' }),
        ]));
    });

    it('should pass with empty catch', () => {
      const code = `
        try {
          throw new Error();
        } catch (e) {}
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'no-empty' }),
        ]));
    });

    it('should error on empty if block', () => {
      const code = `
        if (true) {

        }
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'no-empty',
          message: 'Empty block statement.',
          severity: 2,
        })]));
    });
  });

  describe('arrow-parens', () => {
    it('should pass with arrow parens', () => {
      const code = `
        const foo = (bar, stuff = false) => bar;
        const bar = foo => foo;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'arrow-parens' }),
        ]));
    });

    it('should warn on missing too much parens', () => {
      const code = `
        const foo = (bar) => bar;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'arrow-parens',
          message: 'Unexpected parentheses around single function argument.',
          severity: 1,
        })]));
    });
  });

  describe('multiline-ternary', () => {
    it('should pass with multiline ternary', () => {
      const code = `
        const foo = true
          ? 'foo'
          : 'bar';
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'multiline-ternary' }),
        ]));
    });
  });

  describe('default-param-last', () => {
    it('should pass with default param last', () => {
      const code = `
        function foo(bar, baz = 1) {}
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'default-param-last' }),
        ]));
    });

    it('should error on default param not last', () => {
      const code = `
        function foo(baz = 1, bar) {}
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'default-param-last',
          message: 'Default parameters should be last.',
          severity: 2,
        })]));
    });
  });

  describe('camelcase', () => {
    it('should pass with camelcase', () => {
      const code = `
        const fooBar = {
          fooBar: 1,
          foo_bar: 1,
        };
        const _fooBar = 1;
        const fooBar_ = 1;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'camelcase' }),
        ]));
    });

    it('should warn on missing camelcase', () => {
      const code = `
        const foo_bar = 1;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'camelcase',
          message: 'Identifier \'foo_bar\' is not in camel case.',
          severity: 2,
        })]));
    });
  });

  describe('indent', () => {
    it('should pass with indent', () => {
      const code = `
if (true) {
  console.log('foo');
}
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'indent' }),
        ]));
    });

    it('should warn on missing indent', () => {
      const code = `
      if (true) {
        console.log('foo');
      }
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'indent',
          message: 'Expected indentation of 0 spaces but found 6.',
          severity: 2,
        })]));
    });
  });

  describe('template-curly-spacing', () => {
    it('should pass with template curly spacing', () => {
      const code = `
        const foo = \`foo \${bar}\`;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'template-curly-spacing' }),
        ]));
    });

    it('should warn on wrong template curly spacing', () => {
      const code = `
        const foo = \`foo\${ bar}\`;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'template-curly-spacing',
          message: 'Unexpected space(s) after \'${\'.',
          severity: 2,
        })]));
    });
  });

  describe('@typescript-eslint/semi', () => {
    it('should pass with semi', () => {
      const code = `
        const foo = 1;
        const bar = 2;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: '@typescript-eslint/semi' }),
        ]));
    });
    it('should error on missing semi', () => {
      const code = `
        const foo = 1
        const bar = 2
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: '@typescript-eslint/semi',
          message: 'Missing semicolon.',
          severity: 2,
        })]));
    });
  });
});
