# Poool ESLint Config - Common

> Common ESLint/TSLint rules we share between projects at Poool

## Installation

```bash
yarn add @poool/eslint-config --dev
```

## Usage

```ts
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pooolint from '@poool/eslint-config';

export default tseslint.config(
  ...pooolint.configs.recommended,
);
```
