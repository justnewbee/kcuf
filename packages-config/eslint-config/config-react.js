import pluginReact from 'eslint-plugin-react';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  pluginJsxA11y.flatConfigs.recommended,
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
