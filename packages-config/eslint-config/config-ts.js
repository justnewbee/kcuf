// eslint-disable-next-line import/no-unresolved
import eslintTs from 'typescript-eslint'; // TODO 它的 type 是 commonjs 这里会报错，应该是 plugin-import 配置没有配好

/** @type {import('eslint').Linter.Config[]} */
export default eslintTs.config(
    ...eslintTs.configs.strict,
    ...eslintTs.configs.stylistic,
    {
      rules: {
        '@typescript-eslint/no-empty-object-type': ['error', {
          allowInterfaces: 'with-single-extends'
        }]
      }
    }
);
