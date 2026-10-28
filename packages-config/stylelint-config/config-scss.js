/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss'
  ],
  overrides: [{
    files: ['*.scss'],
    customSyntax: 'postcss-scss',
    rules: {
      // 关闭 scss 插件的空注释检查，改用核心 comment-no-empty
      'scss/comment-no-empty': null,
      'comment-no-empty': true
    }
  }]
};
