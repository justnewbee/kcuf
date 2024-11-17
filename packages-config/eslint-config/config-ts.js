// eslint-disable-next-line import/no-unresolved
import eslintTs from 'typescript-eslint'; // TODO 它的 type 是 commonjs 这里会报错，应该是 plugin-import 配置没有配好

// https://typescript-eslint.io/rules/

/** @type {import('eslint').Linter.Config[]} */
export default eslintTs.config(
    ...eslintTs.configs.strict,
    ...eslintTs.configs.stylistic,
    {
      rules: {
        '@typescript-eslint/no-empty-object-type': ['error', {
          allowInterfaces: 'with-single-extends'
        }],
        '@typescript-eslint/no-unused-vars': ['error', {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }],
        '@typescript-eslint/no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTernary: true,
          enforceForJSX: true
        }]
      }
    }
);
