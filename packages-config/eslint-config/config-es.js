import eslintJs from '@eslint/js';

import rules from './rules/rules-es.js';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  eslintJs.configs.recommended, {
    rules
  }
];
