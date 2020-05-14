# Poool ESLint Config

> Common ESLint rules we share between projects at Poool

## Installation

```bash
yarn add @poool/eslint-config --dev
npx install-peerdeps -Y @poool/eslint-config
```

## Usage

```json
extends: ["@poool/eslint-config"]
```

Available subconfigs:
- `common` -> For basic Javascript project, ES2020 enabled
- `frontend` -> Common, but with React & browser globals
- `backend` -> Common, but for node globals

Example:
```json
extends: ["@poool/eslint-config/frontend"]
```
