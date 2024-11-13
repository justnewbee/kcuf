import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';

// https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules
// https://react.dev/reference/rules/rules-of-hooks
// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main/docs/rules

/** @type {import('eslint').Linter.Config[]} */
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
    plugins: {
      'react-hooks': pluginReactHooks
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'error'
    }
  },
  pluginJsxA11y.flatConfigs.recommended
];
