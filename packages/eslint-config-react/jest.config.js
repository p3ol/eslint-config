module.exports = {
  displayName: '@poool/eslint-config-react',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
