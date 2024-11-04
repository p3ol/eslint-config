const tseslint = require('typescript-eslint');

const pooolConfig = require('@poool/eslint-config');
const pooolReactConfig = require('@poool/eslint-config-react');

module.exports = tseslint.config(
  {
    ignores: ['node_modules', '**/dist', '.yarn', '.turbo'],
  },
  ...pooolConfig.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
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
    files: ['eslint.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 0,
    },
  },
  ...pooolReactConfig.configs.react,
);
