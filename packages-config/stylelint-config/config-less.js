/** @type {import('stylelint').Config} */
export default {
  extends: [
    './config-css'
  ],
  overrides: [{
    files: ['*.less'],
    customSyntax: 'postcss-less'
  }]
};