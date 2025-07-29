import rulesTsTypeUnaware from './rules-ts-type-unaware.js';

/**
 * https://typescript-eslint.io/rules
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export default {
  ...rulesTsTypeUnaware, // config-ts-type-unaware 和 config-ts-type-aware 不可共存
  '@typescript-eslint/unbound-method': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-misused-promises': ['error', {
    checksVoidReturn: false
  }],
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
  }]
};
