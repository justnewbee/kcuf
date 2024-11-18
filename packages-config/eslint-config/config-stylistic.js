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
      '@stylistic/padding-line-between-statements': ['error', {
        blankLine: 'always',
        prev: ['const', 'let', 'var', 'block', 'block-like'],
        next: '*'
      }, {
        blankLine: 'always',
        prev: '*',
        next: ['return', 'throw', 'break', 'continue', 'block', 'block-like', 'export']
      }, {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      }, {
        blankLine: 'any',
        prev: ['export'],
        next: ['export']
      }, {
        blankLine: 'never',
        prev: '*',
        next: ['case', 'default']
      }],
      '@stylistic/no-trailing-spaces': ['error', {
        skipBlankLines: true,
        ignoreComments: true
      }],
      '@stylistic/no-extra-parens': ['error', 'all', {
        nestedBinaryExpressions: false
      }],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/multiline-ternary': ['error', 'never'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/jsx-closing-bracket-location': ['error', 'after-props'],
      '@stylistic/jsx-one-expression-per-line': ['error', {
        allow: 'single-line'
      }],
      // ----- 🔞 以下禁用 🔞 -----
      '@stylistic/jsx-wrap-multilines': 'off', // 没法 never
      '@stylistic/jsx-function-call-newline': 'off', // 没法 never
      /**
       * 禁用
       *
       * - `@stylistic/jsx-closing-tag-location`
       * - `@stylistic/jsx-first-prop-new-line`
       * - `@stylistic/jsx-max-props-per-line`
       *
       * 对喜欢析构 props 的写法不友好
       */
      '@stylistic/jsx-closing-tag-location': 'off',
      '@stylistic/jsx-first-prop-new-line': 'off',
      '@stylistic/jsx-max-props-per-line': 'off'
    }
  }
];
