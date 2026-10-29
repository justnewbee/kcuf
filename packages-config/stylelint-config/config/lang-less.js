/** @type {import('stylelint').Config} */
export default {
  overrides: [{
    files: ['*.less'],
    extends: [
      'stylelint-config-standard-less' // 自带 customSyntax 'postcss-less' ← stylelint-config-recommended-less
    ]
  }]
};
