import globals from 'globals';
// eslint-disable-next-line import/no-unresolved
import eslintTs from 'typescript-eslint'; // TODO 它的 type 是 commonjs 这里会报错，应该是 plugin-import 配置没有配好

import eslintJs from '@eslint/js';

// 相对引用必须 .js 否则 ERR_MODULE_NOT_FOUND
import configImport from './config-import.js';
import configReact from './config-react.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  ...configImport,
  ...configReact
];
