const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:@poool/eslint-plugin/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    requireConfigFile: false,
  },
  plugins: [
    '@babel',
    '@poool/eslint-plugin',
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
    'eol-last': [WARNING, 'always'],
    'no-trailing-spaces': WARNING,
    'no-console': [WARNING, {
      allow: ['warn', 'error', 'time', 'timeEnd', 'timeStamp'],
    }],
    'padded-blocks': OFF,
    'padding-line-between-statements': [
      WARNING,
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'any', prev: '*', next: ['case', 'default'] },
    ],
    'spaced-comment': OFF,
    'space-before-function-paren': WARNING,
    'new-cap': OFF,
    'max-len': WARNING,
    'object-curly-newline': OFF,
    'object-property-newline': OFF,
    'no-empty': [ERROR, { allowEmptyCatch: true }],
    'arrow-parens': [WARNING, 'as-needed'],
    'multiline-ternary': OFF,
    'default-param-last': OFF,
    camelcase: OFF,
    indent: [ERROR, 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: { parameters: 1, body: 1 },
      FunctionExpression: { parameters: 1, body: 1 },
      CallExpression: { arguments: 1 },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      ignoreComments: false,
      ignoredNodes: ['TemplateLiteral'],
      offsetTernaryExpressions: false,
    }],
    'template-curly-spacing': OFF,

    // ES6 fixes
    'no-unused-expressions': OFF,
    '@babel/no-unused-expressions': [WARNING, {
      allowShortCircuit: true,
      allowTernary: true,
    }],

    // Standard
    'standard/no-callback-literal': OFF,

    // Import
    'import/newline-after-import': WARNING,
    'import/order': [WARNING, {
      groups: [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling', 'index', 'unknown'],
      ],
      'newlines-between': 'always',
    }],

    // Custom rules
    '@poool/no-extra-parens': [WARNING, 'all', {
      ignoreJSX: 'all',
      nestedBinaryExpressions: false,
      enforceForNewInMemberExpressions: false,
      enforceForSequenceExpressions: false,
    }],
    '@poool/camelcase': [ERROR, {
      properties: 'never',
    }],
    '@poool/no-unneeded-ternary': ERROR,
  },
};
