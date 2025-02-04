module.exports = {
  displayName: '@poool/eslint-config',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
