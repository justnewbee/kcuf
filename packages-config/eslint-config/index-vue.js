import globals from 'globals';

// 相对引用必须 .js 否则 ERR_MODULE_NOT_FOUND
import configEs from './config/config-es.js';
import configTs from './config/config-ts-type-aware.js';
import configImport from './config/config-import.js';
import configStylistic from './config/config-stylistic.js';
import configVue from './config/config-vue.js';

/**
 * Vue 项目专用
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  ...configEs,
  ...configTs,
  ...configImport,
  ...configStylistic,
  ...configVue
];
