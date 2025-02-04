import { flatConfigs } from 'eslint-plugin-import';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticTs from '@stylistic/eslint-plugin-ts';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

export const configs = {
  recommended: tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.eslintRecommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      ...tseslint.configs.disableTypeChecked,
    },
    {
      ...flatConfigs.recommended,
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: true,
          node: true,
        },
      },
    },
    {
      plugins: {
        '@stylistic/js': stylisticJs,
        '@stylistic/ts': stylisticTs,
      },
      languageOptions: {
        globals: {
          process: 'readonly',
          console: 'readonly',
          fetch: 'readonly',
        },
      },
      rules: {
        '@stylistic/js/arrow-parens': [WARNING, 'as-needed'],
        '@stylistic/js/comma-dangle': [WARNING, {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'ignore',
        }],
        '@stylistic/js/eol-last': [WARNING, 'always'],
        '@stylistic/js/indent': [ERROR, 2, {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          MemberExpression: 1,
          FunctionDeclaration: { parameters: 1, body: 1 },
          FunctionExpression: { parameters: 1, body: 1 },
          CallExpression: { arguments: 1 },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          ignoreComments: false,
          ignoredNodes: ['TemplateLiteral'],
          offsetTernaryExpressions: false,
        }],
        '@stylistic/js/max-len': [WARNING, {
          code: 80,
          ignorePattern: '^import .*',
        }],
        '@stylistic/js/quotes': [WARNING, 'single', {
          avoidEscape: true,
          allowTemplateLiterals: 'always',
        }],
        '@stylistic/js/multiline-ternary': OFF,
        '@stylistic/js/no-multiple-empty-lines': [WARNING, { max: 1 }],
        '@stylistic/js/no-trailing-spaces': WARNING,
        '@stylistic/js/object-curly-newline': OFF,
        '@stylistic/js/object-property-newline': OFF,
        '@stylistic/js/padded-blocks': OFF,
        '@stylistic/js/padding-line-between-statements': [
          WARNING,
          { blankLine: 'always', prev: '*', next: 'block' },
          { blankLine: 'always', prev: 'block', next: '*' },
          { blankLine: 'always', prev: '*', next: 'block-like' },
          { blankLine: 'always', prev: 'block-like', next: '*' },
          { blankLine: 'always', prev: '*', next: 'return' },
          { blankLine: 'any', prev: '*', next: ['case', 'default'] },
        ],
        '@stylistic/js/semi': ERROR,
        '@stylistic/js/space-before-function-paren': WARNING,
        '@stylistic/js/spaced-comment': [WARNING, 'always'],
        '@stylistic/js/template-curly-spacing': ERROR,

        // ESLint Built-in
        'camelcase': [ERROR, {
          properties: 'never',
          ignoreDestructuring: true,
        }],
        'default-param-last': ERROR,
        'new-cap': WARNING,
        'no-console': [WARNING, {
          allow: ['warn', 'error', 'time', 'timeEnd', 'timeStamp'],
        }],
        'no-empty': [ERROR, { allowEmptyCatch: true }],
        'no-unused-vars': [WARNING, {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        }],

        // Typescript
        '@stylistic/ts/semi': OFF,
        '@typescript-eslint/no-unused-vars': OFF,

        // Import
        'import/newline-after-import': WARNING,
        'import/order': [WARNING, {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index', 'unknown'],
          ],
          'newlines-between': 'always',
        }],
        'import/no-named-as-default-member': OFF,
      },
    }
  ),
};

export default { configs };
