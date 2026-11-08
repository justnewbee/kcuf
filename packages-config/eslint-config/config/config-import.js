import {
  createTypeScriptImportResolver
} from 'eslint-import-resolver-typescript';
import {
  flatConfigs as flatConfigsImportX
} from 'eslint-plugin-import-x';

import rulesImport from '../rules/rules-import.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    settings: {
      // make aliases work, need `eslint-import-resolver-typescript`
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
          project: [
            'tsconfig.json',
            'packages*/*/tsconfig.json'
          ]
        })
      ]
    }
  },
  flatConfigsImportX.recommended,
  flatConfigsImportX.typescript,
  flatConfigsImportX.react,
  {
    rules: rulesImport
  }
];
