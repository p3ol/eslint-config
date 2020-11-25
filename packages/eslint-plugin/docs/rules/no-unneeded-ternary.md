# Disallow ternary operators when simpler alternatives exist (`@poool/no-unneeded-ternary`)

Ensures there are no unneeded ternary expressions where you can just use plain if/else statements.
Adds a twist to the default `no-unneeded-ternary` that also enforces the rule for ExpressionStatements.

## Rule Details

The rule has exactly the same behavior as `no-unneeded-ternary` except for ExpressionStatements.

#### Valid

```javascript
const fooBar = x === 2 ? 'foo' : 'bar';
const fooBar = x === 2
  ? 'foo'
  : 'bar';
const fooBar = x === 2 ? 'foo' : x === 3 ? 'bar' : 'test';
const fooBar = x === 2 ? <Loader /> : <Component />;

return x === 2 ? <Loader /> : <Component />;
```

#### Invalid

```javascript
const fooBar = x === 2 ? true : false;

x === 2 ? cb() : x = 3;

x === 2 ? ReactDOM.render(<Loader />) : ReactDOM.render(<Component />);
```
