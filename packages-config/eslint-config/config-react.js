import pluginReact from 'eslint-plugin-react';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';

import rulesReact from './rules/rules-react.js';

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
  pluginJsxA11y.flatConfigs.recommended, // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main/docs/rules
  {
    rules: rulesReact
  }
];
