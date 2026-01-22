import pluginNode from 'eslint-plugin-n';

import rulesNode from '../rules/rules-node.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginNode.configs['flat/recommended-script'],
  {
    rules: rulesNode
  }
];
