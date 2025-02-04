declare module '@eslint/eslintrc/universal';
declare module 'eslint-plugin-import' {
  import type { Linter } from "eslint";

    export const flatConfigs: {
      recommended: Linter.Config,
      errors: Linter.Config,
      warnings: Linter.Config,
      react: Linter.Config,
      'react-native': Linter.Config,
      electron: Linter.Config,
      typescript: Linter.Config,
    };
};
