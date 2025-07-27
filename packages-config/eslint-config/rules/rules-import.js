/**
 * https://github.com/import-js/eslint-plugin-import/tree/main/docs/rules
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export default {
  'import/order': ['error', {
    groups: [
      'builtin',
      'external',
      'internal',
      'parent',
      'sibling',
      'index'
    ],
    pathGroups: [{
      pattern: '@?*/**',
      group: 'external',
      position: 'after'
    }, {
      pattern: '[@~:]/**',
      group: 'internal'
    }],
    pathGroupsExcludedImportTypes: [],
    'newlines-between': 'always'
  }],
  // 'import/prefer-default-export': 'warn' // 保持 off，否则对类似 util 这种 re-export 不够友好
  'import/no-named-as-default': 'off',
  'import/no-duplicates': 'error', // 默认 warn
  'import/no-cycle': 'error',
  'import/no-self-import': 'error'
};
