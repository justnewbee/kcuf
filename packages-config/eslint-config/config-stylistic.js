import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  stylistic.configs.customize({
    // indent: 2, // default 2
    // quotes: 'single', // default single
    semi: true,
    // jsx: true, // default true
    commaDangle: 'never'
  }), {
    rules: {
      '@stylistic/indent': ['error', 2, {
        ArrayExpression: 1,
        MemberExpression: 1,
        CallExpression: {
          arguments: 2
        },
        FunctionExpression: {
          body: 1,
          parameters: 2
        },
        FunctionDeclaration: {
          body: 1,
          parameters: 2
        }
      }],
      '@stylistic/no-trailing-spaces': ['error', {
        skipBlankLines: true,
        ignoreComments: true
      }],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/multiline-ternary': ['error', 'never'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/jsx-wrap-multilines': 'off', // 没法 never
      '@stylistic/jsx-closing-bracket-location': ['error', 'after-props'],
      '@stylistic/jsx-function-call-newline': 'off', // 没法 never
      '@stylistic/jsx-closing-tag-location': ['error', 'line-aligned'], // 没法 never
      '@stylistic/jsx-one-expression-per-line': ['error', {
        allow: 'non-jsx'
      }]
    }
  }
];
