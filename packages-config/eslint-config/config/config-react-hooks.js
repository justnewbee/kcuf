import {
  defineConfig
} from 'eslint/config';
import pluginReactHooks from 'eslint-plugin-react-hooks';

import rulesReactHooks from '../rules/rules-react-hooks.js';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  pluginReactHooks.configs.flat.recommended,
  {
    rules: rulesReactHooks
  }
]);
