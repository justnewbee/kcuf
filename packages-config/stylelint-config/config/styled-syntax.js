/** @type {import('stylelint').Config} */
export default {
  overrides: [{
    files: ['*.{ts,tsx,js,jsx,cjs,cts,mjs,mts}'],
    customSyntax: 'postcss-styled-syntax',
    rules: {
      'no-invalid-double-slash-comments': null,
      'nesting-selector-no-missing-scoping-root': null,
      '@stylistic/no-empty-first-line': null,
      '@stylistic/no-missing-end-of-source-newline': null,
      '@stylistic/no-extra-semicolons': null // 在 css`...` 里一直报错
    }
  }]
};
