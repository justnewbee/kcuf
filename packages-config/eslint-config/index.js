import globals from 'globals';

import eslintJs from '@eslint/js';

// 相对引用必须 .js 否则 ERR_MODULE_NOT_FOUND
import configTs from './config-ts.js';
import configReact from './config-react.js';
import configImport from './config-import.js';
import configStylistic from './config-stylistic.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  eslintJs.configs.recommended,
  ...configTs,
  ...configImport,
  ...configReact,
  ...configStylistic
];
