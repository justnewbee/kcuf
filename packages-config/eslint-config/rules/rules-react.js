/**
 * https://eslint-react.xyz/docs/rules/overview
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export default {
  // recommended 为 warn，这里统一为 error
  '@eslint-react/exhaustive-deps': 'error',
  '@eslint-react/jsx-no-useless-fragment': ['error', {
    allowExpressions: true
  }]
};
