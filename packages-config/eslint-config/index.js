import globals from 'globals';

// 相对引用必须 .js 否则 ERR_MODULE_NOT_FOUND
import configEs from './config/config-es.js';
import configTs from './config/config-ts-type-aware.js';
import configReact from './config/config-react.js';
import configReactHooks from './config/config-react-hooks.js';
import configImport from './config/config-import.js';
import configStylistic from './config/config-stylistic.js';

/**
 * Web 端 React 项目可用
 *
 * 为何分两个 `index`？这个跟 typescript-eslint 有关，见 https://typescript-eslint.io/getting-started/typed-linting#shared-configurations
 *
 * ```diff
 * - configs.strict,
 * - configs.stylistic,
 * + configs.strictTypeChecked,
 * + configs.stylisticTypeChecked,
 * ```
 *
 * 启用 Typed Checking 有可能因此报错，可以看 https://typescript-eslint.io/troubleshooting/typed-linting，当报错时，可用 index-type-unaware
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
  ...configReactHooks,
  ...configStylistic
];
