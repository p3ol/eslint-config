# Disallow extra parentheses (`@poool/no-extra-parens`)

Ensures there are no extra parentheses wrapping code.
Add a twist to the default `no-extra-parens` that allows conditional spreads to be wrapper around parentheses, for better clarity.

## Rule Details

The rule has exactly the same behavior as `no-extra-parens` except for conditional spreads.

#### Valid

```javascript
(() => {})();

() => ({ ...(true ? { foo: "bar" } : { bar: "foo" }) })

() => ({
  ...(true ? {
    foo: 'bar',
  } : { bar: 'foo' }),
})

const a = (1 + 1) * 2;
```

#### Invalid

```javascript
() => { return (true); }

() => ({ ...({ foo: "bar" }) })

() => ({
  ...((true) ? { // <- extra parentheses around true
    foo: 'bar',
  } : { bar: 'foo' }),
})

const a = (1 * 1) + 1;
```
