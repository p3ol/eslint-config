import type { Linter } from 'eslint';
import tseslint from 'typescript-eslint';
import pooolint from '@poool/eslint-config';
import reactPlugin from 'eslint-plugin-react';
import { configs as reactHooksConfigs } from 'eslint-plugin-react-hooks';

// const OFF = 0;
const WARNING = 1;
const ERROR = 2;

const reactConfig: Linter.Config = {
  files: ['**/*.{jsx,tsx}'],
  ...reactPlugin.configs.flat?.recommended,
  ...reactHooksConfigs['recommended-latest'],
  ...reactPlugin.configs.flat?.['jsx-runtime'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-closing-bracket-location': [WARNING, 'line-aligned'],
    'react/jsx-closing-tag-location': WARNING,
    'react/jsx-curly-brace-presence': [WARNING, {
      props: 'never',
      children: 'never',
    }],
    'react/jsx-equals-spacing': [WARNING, 'never'],
    'react/jsx-pascal-case': WARNING,
    'react/jsx-props-no-multi-spaces': WARNING,
    'react/jsx-tag-spacing': [WARNING, {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
    'react/jsx-wrap-multilines': [WARNING, {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    }],
    'react/no-children-prop': ERROR,
    'react/no-this-in-sfc': ERROR,
    'react/self-closing-comp': [WARNING, {
      component: true,
      html: true,
    }],
    'react/void-dom-elements-no-children': ERROR,
    'jsx-quotes': [WARNING, 'prefer-double'],
  },
};

export const configs = {
  recommended: tseslint.config(
    ...pooolint.configs.recommended,
    reactConfig,
  ),
  react: tseslint.config(reactConfig),
  base: tseslint.config(...pooolint.configs.recommended),
};
