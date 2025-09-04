// @ts-check

import { defineConfig } from 'eslint/config';

import pooolConfig from '@poool/eslint-config';
import pooolReactConfig from '@poool/eslint-config-react';

const __dirname = import.meta.dirname;

export default defineConfig(
  {
    ignores: ['node_modules', '**/dist', '.yarn', '.turbo'],
  },
  pooolConfig.configs.recommended,
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
  pooolReactConfig.configs.react,
);
