import pluginEslintReact from '@eslint-react/eslint-plugin';

import rulesReact from '../rules/rules-react.js';

/**
 * `@eslint-react/eslint-plugin` 已内置 Rules of Hooks 与 Exhaustive Deps，不需要再装 `eslint-plugin-react-hooks`
 *
 * `eslint-plugin-jsx-a11y` 尚未支持 ESLint 10，待其支持后再加回
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  pluginEslintReact.configs.recommended,
  {
    rules: rulesReact
  }
];
