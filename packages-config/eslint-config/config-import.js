import pluginImport from 'eslint-plugin-import';

import rules from './rules/rules-import.js';

/**
 * @type {import('eslint').Linter.Config[]}
 */
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
    rules
  }
];
