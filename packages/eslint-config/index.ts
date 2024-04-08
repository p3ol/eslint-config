import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

export const configs = {
  recommended: tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
      files: ['*.js'],
      ...tseslint.configs.disableTypeChecked,
    },
    {
      rules: {
        'comma-dangle': [WARNING, {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'ignore',
        }],
        'no-unused-vars': [WARNING, {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        }],
        'no-multiple-empty-lines': [WARNING, { max: 1 }],
        'eol-last': [WARNING, 'always'],
        'no-trailing-spaces': WARNING,
        'no-console': [WARNING, {
          allow: ['warn', 'error', 'time', 'timeEnd', 'timeStamp'],
        }],
        'padded-blocks': OFF,
        'padding-line-between-statements': [
          WARNING,
          { blankLine: 'always', prev: '*', next: 'block' },
          { blankLine: 'always', prev: 'block', next: '*' },
          { blankLine: 'always', prev: '*', next: 'block-like' },
          { blankLine: 'always', prev: 'block-like', next: '*' },
          { blankLine: 'always', prev: '*', next: 'return' },
          { blankLine: 'any', prev: '*', next: ['case', 'default'] },
        ],
        'spaced-comment': [WARNING, 'always'],
        'space-before-function-paren': WARNING,
        'new-cap': WARNING,
        'max-len': [WARNING, {
          code: 80,
          ignorePattern: '^import .*',
        }],
        'object-curly-newline': OFF,
        'object-property-newline': OFF,
        'no-empty': [ERROR, { allowEmptyCatch: true }],
        'arrow-parens': [WARNING, 'as-needed'],
        'multiline-ternary': OFF,
        'default-param-last': ERROR,
        camelcase: [ERROR, {
          properties: 'never',
          ignoreDestructuring: true,
        }],
        indent: [ERROR, 2, {
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
        'template-curly-spacing': ERROR,

        // Typescript
        semi: OFF,
        '@typescript-eslint/semi': [ERROR, 'always'],

        // Import
        // TODO: bring back when import is compatible with v9 flat-config:
        // https://github.com/import-js/eslint-plugin-import/issues/2948
        // 'import/newline-after-import': WARNING,
        // 'import/order': [WARNING, {
        //   groups: [
        //     'builtin',
        //     'external',
        //     'internal',
        //     ['parent', 'sibling', 'index', 'unknown'],
        //   ],
        //   'newlines-between': 'always',
        // }],
      },
    },
  ),
};

export default { configs };
