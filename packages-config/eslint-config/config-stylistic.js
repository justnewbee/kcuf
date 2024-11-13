import stylistic from '@stylistic/eslint-plugin';

// https://eslint.style/rules

/** @type {import('eslint').Linter.Config[]} */
export default [
  stylistic.configs.customize({
    // indent: 2, // default 2
    // quotes: 'single', // default single
    // jsx: true, // default true
    semi: true,
    commaDangle: 'never',
    // https://eslint.style/rules/default/brace-style
    braceStyle: '1tbs' // 文档骗人说默认 1tbs，其实是 stroustrup
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
