import path from 'node:path';

import eslint, { type Linter } from 'eslint';

import { configs } from './index';

const config = [
  ...configs.recommended as Linter.FlatConfig[],
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: path.resolve(__dirname),
      },
    },
  } as Linter.FlatConfig,
];

describe('@poool/eslint-config-react', () => {
  const linter = new eslint.Linter();

  describe('react/display-name', () => {
    it('should ignore missing display name', () => {
      const code = `
        const Component = () => <div />;
      `;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({ fatal: true }),
      ]));
      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({ ruleId: 'react/display-name' }),
      ]));
    });
  });

  describe('react/no-children-prop', () => {
    it('should ignore children prop', () => {
      const code = `
        const Component = () => <div children="foo" />;
      `;

      expect(linter.verify(code, config, 'index.tsx'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'react/no-children-prop' }),
        ]));
    });
  });
});
