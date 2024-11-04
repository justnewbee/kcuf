/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard'
  ],
  overrides: [{
    files: ['*.sass'],
    customSyntax: 'postcss-sass'
  }, {
    files: ['*.scss'],
    customSyntax: 'postcss-scss'
  }]
};
