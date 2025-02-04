# Poool ESLint Config - React

> Common ESLint rules we share between React projects at Poool

## Installation

```bash
yarn add @poool/eslint-config-react --dev
```

## Usage

```ts
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pooolint from '@poool/eslint-config-react';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pooolint.configs.recommended,
);
```

If you need to restrict the files for which the rules apply, you can use the config directly:

```ts
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pooolint from '@poool/eslint-config-react';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pooolint.configs.base,
  {
    files: ['**/*.tsx'],
    ...pooolint.configs.react,
  },
);
```
