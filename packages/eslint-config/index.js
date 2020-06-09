const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ['eslint:recommended', 'standard'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'babel',
  ],
  rules: {
    'comma-dangle': [WARNING, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    semi: [ERROR, 'always'],
    'no-unused-vars': [WARNING, {
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
    }],
    'no-multiple-empty-lines': WARNING,
    'eol-last': OFF,
    'no-trailing-spaces': [WARNING, { skipBlankLines: true }],
    'no-console': [WARNING, {
      allow: ['warn', 'error', 'time', 'timeEnd', 'timeStamp'],
    }],
    'padded-blocks': OFF,
    'spaced-comment': OFF,
    'space-before-function-paren': WARNING,
    'new-cap': OFF,
    'max-len': WARNING,
    'object-curly-newline': OFF,
    'object-property-newline': OFF,
    'no-empty': [ERROR, { allowEmptyCatch: true }],

    // ES6 fixes
    'no-unused-expressions': OFF,
    'babel/no-unused-expressions': [WARNING, { allowShortCircuit: true }],

    // Standard
    'standard/no-callback-literal': OFF,
  },
};
