import pluginVue from 'eslint-plugin-vue';

import rulesVue from '../rules/rules-vue.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: rulesVue
  }
];
