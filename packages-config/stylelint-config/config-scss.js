/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss'
  ],
  rules: {
    // scss/comment-no-empty 会误报空的 // 注释，核心规则会跳过内联注释，故用核心规则替代
    'comment-no-empty': true,
    'scss/comment-no-empty': null
  }
};
