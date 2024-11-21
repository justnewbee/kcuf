import pluginStorybook from 'eslint-plugin-storybook';

// https://github.com/storybookjs/eslint-plugin-storybook/tree/main/docs/rules

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...pluginStorybook.configs['flat/recommended']
];
