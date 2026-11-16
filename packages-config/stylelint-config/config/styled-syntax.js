/** @type {import('stylelint').Config} */
export default {
  overrides: [{
    files: ['*.{ts,tsx,js,jsx,cjs,cts,mjs,mts}'],
    customSyntax: 'postcss-styled-syntax',
    rules: {
      'no-invalid-double-slash-comments': null,
      'nesting-selector-no-missing-scoping-root': null,
      // styled 副本已在 stylistic.js 中关闭，但核心副本仍会运行并拒绝该语法，需一并关闭
      '@stylistic/no-empty-first-line': null,
      '@stylistic/no-missing-end-of-source-newline': null,
      '@stylistic/no-extra-semicolons': null // 在 css`...` 里一直报错
    }
  }]
};
