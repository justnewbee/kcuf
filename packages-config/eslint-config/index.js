import globals from 'globals';
import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    plugins: {
      'react-hooks': pluginReactHooks
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'error'
    }
  }
];
