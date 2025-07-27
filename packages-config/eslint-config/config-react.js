import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks'; // eslint-disable-line import/default
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';

import rulesReact from './rules/rules-react.js';
import rulesReactHooks from './rules/rules-react-hooks.js';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  {
    settings: {
      react: {
        version: 'detect',
        defaultVersion: '18'
      }
    }
  },
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    rules: rulesReact
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks
    },
    rules: rulesReactHooks
  },
  pluginJsxA11y.flatConfigs.recommended // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main/docs/rules
];
