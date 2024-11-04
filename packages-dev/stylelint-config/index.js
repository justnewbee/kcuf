/** @type {import('stylelint').Config} */
export default {
  extends: [
    './config-less'
  ],
  overrides: [{
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    customSyntax: 'postcss-styled-syntax'
  }]
};
