/**
 * https://github.com/jsx-eslint/eslint-plugin-react/tree/main/docs/rules
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export default {
  'react/jsx-filename-extension': ['error', {
    extensions: ['.jsx', '.tsx'],
    allow: 'as-needed'
  }]
};
