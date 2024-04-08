import type { Linter } from 'eslint';

import tseslint from 'typescript-eslint';
import pooolint from '@poool/eslint-config';
import reactlint from 'eslint-plugin-react';

// const OFF = 0;
const WARNING = 1;
const ERROR = 2;

const reactConfig: Linter.FlatConfig = {
  plugins: { react: reactlint },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/display-name': ERROR,
    'react/no-children-prop': ERROR,
    'react/no-this-in-sfc': ERROR,
    'react/self-closing-comp': [WARNING, {
      component: true,
      html: true,
    }],
    'react/void-dom-elements-no-children': ERROR,
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

    'jsx-quotes': [WARNING, 'prefer-double'],

    // import
    // 'import/order': [WARNING, {
    //   groups: [
    //     'builtin',
    //     'external',
    //     'internal',
    //     ['parent', 'sibling', 'index', 'unknown'],
    //   ],
    //   'newlines-between': 'always',
    //   pathGroups: [{
    //     pattern: '*.{styl,css,sass}',
    //     patternOptions: { matchBase: true, nocase: true },
    //     group: 'index',
    //     position: 'after',
    //   }, {
    //     pattern: '*.{svg,png,jpeg,jpg,gif}',
    //     patternOptions: { matchBase: true, nocase: true },
    //     group: 'index',
    //     position: 'after',
    //   }],
    // }],
  },
};

export const configs = {
  recommended: tseslint.config(
    ...pooolint.configs.recommended,
    reactConfig,
  ),
  react: reactConfig,
  base: pooolint.configs.recommended,
};
