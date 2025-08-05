import type { Config } from 'jest';

const esmOnlyPackages = [
  '@stylistic/eslint-plugin',
];

const config: Config = {
  displayName: '@poool/eslint-config-react',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  transformIgnorePatterns: [
    `node_modules/(?!(?:.store/)?(${esmOnlyPackages.join('|')}))`,
  ],
};

export default config;
