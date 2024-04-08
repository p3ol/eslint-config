import { Linter } from 'eslint';

declare module 'eslint-plugin-react' {
  const _default: Linter.Plugin;

  export default _default;
}
