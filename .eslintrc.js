module.exports = {
  extends: ['./packages/eslint-config'],
  overrides: [{
    files: ['**/tests/**/*.test.js'],
    env: {
      jest: true,
    },
  }],
};
