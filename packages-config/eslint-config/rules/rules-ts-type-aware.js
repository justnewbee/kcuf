import rulesTsTypeUnaware from './rules-ts-type-unaware.js';

/**
 * https://typescript-eslint.io/rules
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export default {
  ...rulesTsTypeUnaware, // config-ts-type-unaware 和 config-ts-type-aware 不可共存
  '@typescript-eslint/no-confusing-void-expression': ['error', {
    ignoreArrowShorthand: true
  }],
  '@typescript-eslint/restrict-template-expressions': ['error', {
    allowAny: false,
    allowBoolean: false,
    allowNever: false,
    allowNullish: false,
    allowNumber: true,
    allowRegExp: false
  }],
  '@typescript-eslint/unbound-method': 'off',
  '@typescript-eslint/no-floating-promises': 'off'
};
