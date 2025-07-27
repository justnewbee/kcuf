import stylistic from '@stylistic/eslint-plugin';

import rules from './rules/rules-stylistic.js';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  stylistic.configs.customize({
    // indent: 2, // default 2
    // quotes: 'single', // default single
    // jsx: true, // default true
    semi: true,
    commaDangle: 'never',
    // https://eslint.style/rules/default/brace-style
    braceStyle: '1tbs' // 文档骗人说默认 1tbs，其实是 stroustrup
  }), {
    rules
  }
];
