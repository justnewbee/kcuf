/** @type {import('stylelint').Config} */
export default {
  extends: [
    './config-less',
    './config-scss',
    'stylelint-config-recommended-vue'
  ],
  overrides: [{
    files: ['*.scss', '*.vue'],
    customSyntax: 'postcss-scss'
  }, {
    files: ['*.vue', '*.html'],
    customSyntax: 'postcss-html'
  }]
};