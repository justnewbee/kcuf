/**
 * https://github.com/un-ts/eslint-plugin-import-x/tree/master/docs/rules
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export default {
  'import-x/first': 'error',
  'import-x/order': ['error', {
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
  // 'import-x/prefer-default-export': 'warn' // 保持 off，否则对类似 util 这种 re-export 不够友好
  'import-x/no-named-as-default': 'off',
  'import-x/no-duplicates': 'error', // 默认 warn
  'import-x/no-cycle': 'error',
  'import-x/no-self-import': 'error'
};
