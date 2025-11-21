/**
 * https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export default {
  'react/jsx-filename-extension': ['error', {
    extensions: ['.jsx', '.tsx'],
    allow: 'as-needed'
  }],
  'react/jsx-no-useless-fragment': ['error', {
    allowExpressions: true
  }]
};
