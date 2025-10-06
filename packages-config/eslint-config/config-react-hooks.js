import {
  defineConfig
} from 'eslint/config';
// eslint-disable-next-line import/default
import pluginReactHooks from 'eslint-plugin-react-hooks';

import rulesReactHooks from './rules/rules-react-hooks.js';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default defineConfig([
  {
    plugins: {
      'react-hooks': pluginReactHooks
    },
    extends: ['react-hooks/recommended'],
    rules: rulesReactHooks
  }
]);
