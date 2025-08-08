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

  describe('@stylistic/arrow-parens', () => {
    it('should pass with arrow parens', () => {
      const code = `
        const foo = (bar, stuff = false) => bar;
        const bar = foo => foo;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: '@stylistic/arrow-parens' }),
        ]));
    });

    it('should warn on missing too much parens', () => {
      const code = `
        const foo = (bar) => bar;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: '@stylistic/arrow-parens',
          message: 'Unexpected parentheses around single function argument.',
          severity: 1,
        })]));
    });
  });

  describe('@stylistic/comma-dangle', () => {
    it('should pass with trailing comma', () => {
      const code = `
        const foo = {
          bar: 1,
        };

        const baz: [string, number] = [
          'foo',
          42,
        ];
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: '@stylistic/comma-dangle' }),
        ]));

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: '@stylistic/comma-dangle' }),
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
          ruleId: '@stylistic/comma-dangle',
          message: 'Missing trailing comma.',
          severity: 1,
        })]));
    });
  });

  describe('@stylistic/eol-last', () => {
    it('should pass with eol', () => {
      // explicit bad indent to avoid having content on eof line
      const code = `
        const foo = 1;
`;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: '@stylistic/eol-last' }),
        ]));
    });

    it('should warn on missing eol', () => {
      const code = `
        const foo = 1;`;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: '@stylistic/eol-last',
          message: 'Newline required at end of file but not found.',
          severity: 1,
        })]));
    });
  });

  describe('@stylistic/indent', () => {
    it('should pass with indent', () => {
      const code = `
if (true) {
  console.log('foo');
}

const notif = await Notification
  .find()
  .populate<{
    app: Pick<App, 'name'>;
  }>('app', 'name');

const bar = {
  foo: 1,
};

export interface ServerEvents {
  [SERVER_EVENT_REMOTE_PLAYER_ACCESSORY_UPDATED]:
    ServerEventRemotePlayerAccessoryUpdated,
};
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: '@stylistic/indent' }),
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
          ruleId: '@stylistic/indent',
          message: 'Expected indentation of 0 spaces but found 6.',
          severity: 2,
        })]));
    });
  });

  describe('@stylistic/max-len', () => {
    it('should pass with max len', () => {
      const code = `
        const foo = 'foo';
        const bar = 'bar';
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: '@stylistic/max-len' }),
        ]));
    });

    it('should not warn on max len if line is an import', () => {
      const code = `import { foo } from 'some-module-that-has-a-really-` +
        `long-name/that-should-not-trigger-the-max-len-warning';`;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: '@stylistic/max-len' }),
        ]));
    });

    it('should warn on max len', () => {
      const code = `
        const foo = 'this is a really long line of code that should trigger ` +
        `the max len warning'; const bar = 'bar';
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: '@stylistic/max-len',
          message: 'This line has a length of 116. Maximum allowed is 80.',
          severity: 1,
        })]));
    });
  });

  describe('@stylistic/multiline-ternary', () => {
    it('should pass with multiline ternary', () => {
      const code = `
        const foo = true
          ? 'foo'
          : 'bar';
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: '@stylistic/multiline-ternary',
          }),
        ]));
    });
  });

  describe('@stylistic/no-multiple-empty-lines', () => {
    it('should pass with no multiple empty lines', () => {
      const code = `
        const foo = 1;

        const bar = 2;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: '@stylistic/no-multiple-empty-lines',
          }),
        ]));
    });

    it('should warn on multiple empty lines', () => {
      const code = `
        const foo = 1;


        const bar = 2;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: '@stylistic/no-multiple-empty-lines',
          message: 'More than 1 blank line not allowed.',
          severity: 1,
        })]));
    });
  });

  describe('@stylistic/no-trailing-spaces', () => {
    it('should pass with no trailing spaces', () => {
      const code = `const foo = 1;`;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: '@stylistic/no-trailing-spaces' }),
        ]));
    });

    it('should warn on trailing spaces', () => {
      const code = `const foo = 1;  `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: '@stylistic/no-trailing-spaces',
          message: 'Trailing spaces not allowed.',
          severity: 1,
        })]));
    });
  });

  describe('@stylistic/object-curly-newline', () => {
    it('should pass with object curly newline', () => {
      const code = `
        const foo = {
          bar: 1,
        };
        const bar = { bar: 1 };
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: '@stylistic/object-curly-newline',
          }),
        ]));
    });
  });

  describe('@stylistic/object-property-newline', () => {
    it('should pass with object property newline', () => {
      const code = `
        const foo = { foo: 1, bar: 1 };
        const bar = { bar: 1 };
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: '@stylistic/object-property-newline',
          }),
        ]));
    });
  });

  describe('@stylistic/padded-blocks', () => {
    it('should pass with non-padded blocks', () => {
      const code = `
        if (true) {
          console.log('foo');
        }
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: '@stylistic/padded-blocks' }),
        ]));
    });
  });

  describe('@stylistic/padding-line-between-statements', () => {
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
            ruleId: '@stylistic/padding-line-between-statements',
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
          ruleId: '@stylistic/padding-line-between-statements',
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
          ruleId: '@stylistic/padding-line-between-statements',
          message: 'Expected blank line before this statement.',
          severity: 1,
        })]));
    });
  });

  describe('@stylistic/semi', () => {
    it('should pass with semi', () => {
      const code = `
        const foo = 1;
        const bar = 2;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: '@stylistic/semi' }),
        ]));
    });
    it('should error on missing semi', () => {
      const code = `
        const foo = 1
        const bar = 2
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: '@stylistic/semi',
          message: 'Missing semicolon.',
          severity: 2,
        })]));
    });
  });

  describe('@stylistic/space-before-function-paren', () => {
    it('should pass with space before function paren', () => {
      const code = `
        function foo (){}
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: '@stylistic/space-before-function-paren',
          }),
        ]));
    });

    it('should warn on missing space before function paren', () => {
      const code = `
        function foo(){}
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: '@stylistic/space-before-function-paren',
          message: 'Missing space before function parentheses.',
          severity: 1,
        })]));
    });
  });

  describe('@stylistic/spaced-comment', () => {
    it('should pass with spaced comments', () => {
      const code = `
        // foo
        // bar
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: '@stylistic/spaced-comment' }),
        ]));
    });

    it('should warn on missing spaced comments', () => {
      const code = `
        //foo
        //bar
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: '@stylistic/spaced-comment',
          message: 'Expected space or tab after \'//\' in comment.',
          severity: 1,
        })]));
    });
  });

  describe('@stylistic/template-curly-spacing', () => {
    it('should pass with template curly spacing', () => {
      const code = `
        const foo = \`foo \${bar}\`;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: '@stylistic/template-curly-spacing',
          }),
        ]));
    });

    it('should warn on wrong template curly spacing', () => {
      const code = `
        const foo = \`foo\${ bar}\`;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: '@stylistic/template-curly-spacing',
          message: 'Unexpected space(s) after \'${\'.',
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
          ruleId: '@typescript-eslint/default-param-last',
          message: 'Default parameters should be last.',
          severity: 2,
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
          message: expect.stringContaining('Unexpected console statement.'),
          severity: 1,
        })]));
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
          ruleId: '@typescript-eslint/no-unused-vars',
          message: expect
            .stringContaining('\'bar\' is assigned a value but never used.'),
          severity: 1,
        })]));
    });
  });

  describe('import/newline-after-import', () => {
    it('should pass with newline after import', () => {
      const code = `
        import { foo } from 'foo';

        const bar = 1;
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'import/newline-after-import' }),
        ]));
    });

    it('should warn on missing newline after import', () => {
      const code = `
        import * as foo from 'foo';
        const FOO = 'BAR';
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'import/newline-after-import',
          message: 'Expected 1 empty line after import statement not ' +
            'followed by another import.',
          severity: 1,
        })]));
    });
  });

  describe('import/order', () => {
    it('should pass when imports respect order and newlines', () => {
      const code = `
        import fs from 'node:fs';
        import path from 'path';

        import { subDays } from 'date-fns';

        import foo from '~/src/foo';
        import tests from '~/tests/foo';

        import bar from '../bar';
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'import/order' }),
        ]));
    });

    it('should warn on missing newline between import groups', () => {
      const code = `
        import fs from 'fs';
        import foo from 'src/foo';
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'import/order',
          message: 'There should be at least one empty line between ' +
            'import groups',
          severity: 1,
        })]));
    });

    it('should warn on wrong import order', () => {
      const code = `
        import foo from 'src/foo';

        import fs from 'fs';
      `;

      expect(linter.verify(code, config, 'index.ts'))
        .toEqual(expect.arrayContaining([expect.objectContaining({
          ruleId: 'import/order',
          message: '`fs` import should occur before import of `src/foo`',
          severity: 1,
        })]));
    });
  });
});
