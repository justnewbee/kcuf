/**
 * https://eslint.style/rules
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export default {
  '@stylistic/indent': ['error', 2, {
    ArrayExpression: 1,
    MemberExpression: 1,
    SwitchCase: 0,
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
  '@stylistic/object-curly-newline': ['error', {
    ObjectExpression: {
      multiline: true,
      minProperties: 1
    },
    ObjectPattern: 'always',
    ImportDeclaration: 'always',
    ExportDeclaration: {
      multiline: true,
      minProperties: 2,
      consistent: true
    }
    // TSTypeLiteral
    // TSInterfaceBody
    // TSEnumBody
  }],
  '@stylistic/padding-line-between-statements': ['error', {
    blankLine: 'always',
    prev: ['const', 'let', 'var', 'block', 'block-like'],
    next: '*'
  }, {
    blankLine: 'any',
    prev: ['const', 'let', 'var'],
    next: ['const', 'let', 'var']
  }, { // import 后必须有空行
    blankLine: 'always',
    prev: 'import',
    next: '*'
  }, { // 但 import 和 import 之间可以不用
    blankLine: 'any',
    prev: 'import',
    next: 'import'
  }, {
    blankLine: 'always',
    prev: '*',
    next: ['return', 'throw', 'break', 'continue', 'block', 'block-like', 'export']
  }, { // export 和 export 之间可以不用必须
    blankLine: 'any',
    prev: 'export',
    next: 'export'
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
  '@stylistic/quotes': ['error', 'single', {
    allowTemplateLiterals: 'never' // 默认 always
  }],
  '@stylistic/member-delimiter-style': ['error', {
    multiline: {
      delimiter: 'semi',
      requireLast: true
    },
    singleline: {
      delimiter: 'semi',
      requireLast: true
    }
  }],
  // '@stylistic/multiline-comment-style': ['error', 'starred-block'], // 不支持多种，会伤害到临时代码注释
  '@stylistic/spaced-comment': ['error', 'always'],
  '@stylistic/jsx-self-closing-comp': ['error', {
    component: true,
    html: true
  }],
  '@stylistic/jsx-closing-bracket-location': ['error', 'after-props'],
  '@stylistic/jsx-one-expression-per-line': ['error', {
    allow: 'single-line'
  }],
  '@stylistic/jsx-curly-brace-presence': ['error', {
    props: 'never',
    children: 'never'
  }],
  '@stylistic/jsx-curly-newline': ['error', 'never'], // 默认 'consistent'
  '@stylistic/jsx-curly-spacing': ['error', {
    when: 'never',
    children: {
      when: 'never'
    }
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
};
