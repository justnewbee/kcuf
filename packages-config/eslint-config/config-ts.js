import eslintTs from 'typescript-eslint';

// https://typescript-eslint.io/rules/

/** @type {import('eslint').Linter.Config[]} */
export default eslintTs.config(
    ...eslintTs.configs.strict, // eslint-disable-line import/no-named-as-default-member
    ...eslintTs.configs.stylistic, // eslint-disable-line import/no-named-as-default-member
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
