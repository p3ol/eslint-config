# Require CamelCase (`@poool/camelcase`)

Ensures that _almost_ everything is in camelcase.

## Rule Details

The rule has exactly the same behavior as `camelcase` except that it allows optional chaining (`const foo = bar?.foo;`).
The difference with `babel/camelcase` is that it uses exactly the same options as the native rule, whereas `babel/camelcase` uses custom or old options.

#### Valid

```javascript
const fooBar = {};

const bar = {}; const foo = bar?.fooBar;
```

#### Invalid

```javascript
const foo_bar = {};

const foo = { a_b: true };
```
