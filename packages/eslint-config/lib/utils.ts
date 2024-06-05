import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc/universal';
import eslintJs from '@eslint/js';

export const legacyPlugin = (name: string, alias: string) => {
  const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: eslintJs.configs.recommended,
  });

  const plugin = compat.plugins(name)[0]?.plugins?.[alias];

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
  }

  return fixupPluginRules(plugin);
}
