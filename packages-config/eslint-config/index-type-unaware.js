import globals from 'globals';

// 相对引用必须 .js 否则 ERR_MODULE_NOT_FOUND
import configEs from './config-es.js';
import configTs from './config-ts-type-unaware.js'; // ← 仅此区别
import configReact from './config-react.js';
import configImport from './config-import.js';
import configStylistic from './config-stylistic.js';
import configStorybook from './config-storybook.js';

/**
 * 如果 index 使用有问题（有类型相关的规则），可以用这个
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
  ...configReact,
  ...configStylistic,
  ...configStorybook
];
