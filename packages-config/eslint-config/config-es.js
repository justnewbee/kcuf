import eslintJs from '@eslint/js';

// https://eslint.org/docs/latest/rules

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslintJs.configs.recommended,
  {
    rules: {
      // 以下在 recommend 里没有，但很重要
      eqeqeq: 'error',
      curly: ['error', 'all'],
      'object-shorthand': 'error',
      'no-console': 'error',
      'no-shadow': 'error',
      'no-throw-literal': 'error',
      'no-else-return': ['error', {
        allowElseIf: false
      }],
      'no-promise-executor-return': 'error',
      'no-alert': 'error',
      'no-use-before-define': 'error',
      'no-useless-assignment': 'warn',
      'no-return-assign': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-spread': 'error',
      'prefer-regex-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error'
    }
  }
];
