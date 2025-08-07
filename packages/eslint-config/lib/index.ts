import eslint from '@eslint/js';
import * as importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import jest from 'eslint-plugin-jest';

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
      files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
      ...tseslint.configs.disableTypeChecked,
      rules: {
        ...tseslint.configs.disableTypeChecked.rules,
        '@typescript-eslint/no-require-imports': OFF,
        '@typescript-eslint/prefer-nullish-coalescing': OFF,
        '@typescript-eslint/no-unused-vars': OFF,
      },
    },
    {
      ...importPlugin.flatConfigs.recommended,
      ...importPlugin.flatConfigs.typescript,
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
      files: ['**/*.js', '**/*.cjs'],
      languageOptions: {
        globals: {
          require: 'readonly',
          module: 'readonly',
          global: 'readonly',
          __dirname: 'readonly',
        },
      },
      rules: {
        'no-unused-vars': [WARNING, {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        }],
      },
    },
    {
      plugins: {
        '@stylistic': stylistic,
      },
      languageOptions: {
        globals: {
          process: 'readonly',
          console: 'readonly',
          fetch: 'readonly',
          Buffer: 'readonly',
        },
      },
      rules: {
        '@stylistic/arrow-parens': [WARNING, 'as-needed'],
        '@stylistic/comma-dangle': [WARNING, {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          enums: 'always-multiline',
          generics: 'always-multiline',
          tuples: 'always-multiline',
          functions: 'ignore',
        }],
        '@stylistic/eol-last': [WARNING, 'always'],
        '@stylistic/indent': [ERROR, 2, {
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
          ignoredNodes: ['TemplateLiteral', 'TSTypeParameterInstantiation'],
          offsetTernaryExpressions: false,
        }],
        '@stylistic/max-len': [WARNING, {
          code: 80,
          ignorePattern: '^import .*',
        }],
        '@stylistic/quotes': [WARNING, 'single', {
          avoidEscape: true,
          allowTemplateLiterals: 'always',
        }],
        '@stylistic/multiline-ternary': OFF,
        '@stylistic/no-multiple-empty-lines': [WARNING, { max: 1 }],
        '@stylistic/no-trailing-spaces': WARNING,
        '@stylistic/object-curly-newline': OFF,
        '@stylistic/object-property-newline': OFF,
        '@stylistic/padded-blocks': OFF,
        '@stylistic/padding-line-between-statements': [
          WARNING,
          { blankLine: 'always', prev: '*', next: 'block' },
          { blankLine: 'always', prev: 'block', next: '*' },
          { blankLine: 'always', prev: '*', next: 'block-like' },
          { blankLine: 'always', prev: 'block-like', next: '*' },
          { blankLine: 'always', prev: '*', next: 'return' },
          { blankLine: 'any', prev: '*', next: ['case', 'default'] },
        ],
        '@stylistic/semi': ERROR,
        '@stylistic/space-before-function-paren': WARNING,
        '@stylistic/spaced-comment': [WARNING, 'always'],
        '@stylistic/template-curly-spacing': ERROR,

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
          pathGroups: [{
            pattern: '~/**',
            group: 'internal',
          }],
        }],
        'import/no-named-as-default': OFF,
        'import/no-named-as-default-member': OFF,
      },
    },
    // Typescript
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@stylistic/ts/semi': OFF,
        'no-unused-vars': OFF,
        'default-param-last': OFF,
        'no-undef': OFF,
        '@typescript-eslint/no-unused-vars': [WARNING, {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        }],
        '@typescript-eslint/default-param-last': ERROR,
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/prefer-nullish-coalescing': OFF,
        '@typescript-eslint/no-inferrable-types': OFF,
        '@typescript-eslint/no-unsafe-return': OFF,
        '@typescript-eslint/unbound-method': OFF,
        '@typescript-eslint/no-unsafe-argument': OFF,
        '@typescript-eslint/no-unsafe-member-access': OFF,
        '@typescript-eslint/no-base-to-string': OFF,
        '@typescript-eslint/restrict-template-expressions': OFF,
        '@typescript-eslint/no-empty-function': OFF,
        '@typescript-eslint/no-floating-promises': OFF,
        '@typescript-eslint/no-unsafe-call': OFF,
        '@typescript-eslint/no-unsafe-assignment': OFF,
        '@typescript-eslint/no-duplicate-type-constituents': OFF,
        '@typescript-eslint/no-empty-object-type': OFF,
        '@typescript-eslint/no-empty-wrapper-types': OFF,
        '@typescript-eslint/no-misused-promises': [ERROR, {
          checksVoidReturn: false,
        }],
      },
    },
    // Jest
    {
      files: [
        '**/*.test.js',
        '**/*.test.ts',
        '**/*.test.tsx',
        'tests/**',
      ],
      plugins: { jest },
      languageOptions: {
        globals: jest.environments.globals.globals,
      },
    },
  ),
};

export default { configs };
