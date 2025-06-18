import pluginImport from 'eslint-plugin-import';

// https://github.com/import-js/eslint-plugin-import/tree/main/docs/rules

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    settings: {
      // make aliases work, need `eslint-import-resolver-typescript`
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
          project: [
            'tsconfig.json',
            'packages*/*/tsconfig.json'
          ]
        }
      }
    }
  },
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
      }],
      'import/no-named-as-default': 'off',
      'import/no-duplicates': 'error', // 默认 warn
      'import/no-cycle': 'error',
      'import/no-self-import': 'error'
      // 'import/prefer-default-export': 'warn' // 保持 off，否则对类似 util 这种 re-export 不够友好
    }
  }
];
