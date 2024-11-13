import eslintJs from '@eslint/js';

// https://eslint.org/docs/latest/rules

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslintJs.configs.recommended,
  {
    rules: {
      eqeqeq: 'error',
      'no-console': 'error',
      'no-shadow': 'error',
      'no-throw-literal': 'error',
      'no-else-return': ['error', {
        allowElseIf: false
      }]
    }
  }
];
