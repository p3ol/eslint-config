import type { Config } from 'jest';

const config: Config = {
  displayName: '@poool/eslint-config-react',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

export default config;
