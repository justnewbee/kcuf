import pluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginImport.flatConfigs.recommended,
  pluginImport.flatConfigs.typescript,
  pluginImport.flatConfigs.react,
  {
    rules: {
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
      }]
    }
  }
];
