import {
  configs
} from 'eslint-plugin-react-hooks';

/**
 * https://react.dev/reference/rules/rules-of-hooks
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export default {
  ...configs.recommended.rules,
  'react-hooks/exhaustive-deps': 'error'
};
