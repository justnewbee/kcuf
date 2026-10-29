/** @type {import('stylelint').Config} */
export default {
  overrides: [{
    files: ['*.scss'],
    extends: [
      'stylelint-config-standard-scss' // 自带 customSyntax 'postcss-scss' ← stylelint-config-recommended-scss
    ]
  }]
};
