import rulesTsTypeUnaware from './rules-ts-type-unaware.js';

/**
 * https://typescript-eslint.io/rules
 *
 * @type {import('eslint').Linter.RulesRecord}
 *
 * 这里所有的 Rule 在文档上有「💭This rule requires type information to run,
 * which comes with performance tradeoffs.」标记
 */
export default {
  ...rulesTsTypeUnaware, // config-ts-type-unaware 和 config-ts-type-aware 不可共存
  /**
   * https://typescript-eslint.io/rules/unbound-method
   *
   * 若开启，会在析构出来的方法处抛错（需要定义对应的方法 `this: void`）
   */
  '@typescript-eslint/unbound-method': 'off',
  /**
   * https://typescript-eslint.io/rules/no-unnecessary-type-parameters
   *
   * 若开启，对想限定方法参数不够友好，比如数据接口请求，期望限定参数 `fetcher<返回, 参数>` 会不让写「参数」，容易导致不安全
   */
  '@typescript-eslint/no-unnecessary-type-parameters': 'off',
  // '@typescript-eslint/strict-void-return': 'error',
  '@typescript-eslint/no-misused-promises': ['error', {
    checksVoidReturn: false
  }],
  '@typescript-eslint/no-confusing-void-expression': ['error', {
    ignoreArrowShorthand: true
  }],
  '@typescript-eslint/prefer-nullish-coalescing': ['error', {
    ignoreTernaryTests: true,
    ignoreIfStatements: true,
    ignoreMixedLogicalExpressions: true,
    ignorePrimitives: true
  }],
  '@typescript-eslint/restrict-template-expressions': ['error', {
    allowBoolean: true,
    allowNumber: true,
    allowAny: false,
    allowNever: false,
    allowNullish: false,
    allowRegExp: false
  }]
};
