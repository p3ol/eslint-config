# Poool ESLint Config - React

> Common ESLint rules we share between React projects at Poool

## Installation

```bash
yarn add @poool/eslint-config-react --dev
```

## Usage

```ts
import tseslint from 'typescript-eslint';
import pooolint from '@poool/eslint-config-react';

export default tseslint.config(
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...pooolint.configs.recommended,
);
```

If you need to restrict the files for which the rules apply, you can use the config directly:

```ts
import tseslint from 'typescript-eslint';
import pooolint from '@poool/eslint-config-react';

export default tseslint.config(
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...pooolint.configs.base,
  {
    files: ['**/*.tsx'],
    ...pooolint.configs.react,
  },
);
```
