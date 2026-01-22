/**
 * https://github.com/eslint-community/eslint-plugin-n/tree/master/docs/rules
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export default {
  // 禁用 node 插件的路径校验，用 import 插件，后者完美支持 TS 的后缀及目录
  'n/no-unpublished-import': 'off',
  'n/no-missing-import': 'off',
  'n/no-missing-export': 'off'
};
