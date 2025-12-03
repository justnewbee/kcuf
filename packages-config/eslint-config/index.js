import globals from 'globals';

// 相对引用必须 .js 否则 ERR_MODULE_NOT_FOUND
import configEs from './config-es.js';
import configTs from './config-ts-type-aware.js';
import configReact from './config-react.js';
import configReactHooks from './config-react-hooks.js';
import configImport from './config-import.js';
import configStylistic from './config-stylistic.js';

/**
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
