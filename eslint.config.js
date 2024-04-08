const tseslint = require('typescript-eslint');

const pooolConfig = require('./packages/eslint-config/dist/index.js');
const pooolReactConfig =
  require('./packages/eslint-config-react/dist/index.js');

module.exports = tseslint.config(
  {
    ignores: ['node_modules', '**/dist', '.yarn', '.turbo'],
  },
  ...pooolConfig.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 0,
    },
  },
  {
    files: ['*.ts', '**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 0,
    },
  },
  {
    files: ['*.tsx', '**/*.tsx'],
    ...pooolReactConfig.configs.react,
  },
);
