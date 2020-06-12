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

Finally enable all the rules you would like to use (don't forget to disable to core rule!):

```json
{
  "rules": {
    "no-extra-parens": "off",
    "@poool/no-extra-parens": "error"
  }
}
```

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
