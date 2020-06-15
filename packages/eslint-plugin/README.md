# Poool ESLint Plugin

> Custom set of ESLint rules we need and enforce at Poool

## Installation

```bash
yarn add eslint @poool/eslint-plugin --dev
```

## Usage

Load the plugin in your `.eslintrc.json` file:

```json
{
  "plugins": ["@poool/eslint-plugin"]
}
```

Finally, enable all the rules you would like to use (don't forget to disable the corresponding core rule!):

```json
{
  "rules": {
    "no-extra-parens": "off",
    "@poool/no-extra-parens": "error"
  }
}
```

## Rules

| Name | Description | Docs |
| ---- | ----------- | ------- |
| `@poool/camelcase` | [`camelcase`](https://eslint.org/docs/rules/camelcase), but doesn't complain about optional chaining | [documentation](https://github.com/p3ol/eslint-config/tree/master/packages/eslint-plugin/docs/rules/camelcase.md) |
| `@poool/no-extra-parens` | [`no-extra-parens`](https://eslint.org/docs/rules/no-extra-parens), but allows conditional spreads to be wrapped with parentheses | [documentation](https://github.com/p3ol/eslint-config/tree/master/packages/eslint-plugin/docs/rules/no-extra-parens.md) |

## Shareable configurations

### Recommended

This plugin exports a recommended configuration that enforces some of our rules.

To enable this configuration use the `extends` property in your `.eslintrc.json`
config file:

```json
{
  "extends": ["plugin:@poool/eslint-plugin/recommended"]
}
```
