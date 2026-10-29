/** @type {import('stylelint').Config} */
export default {
  extends: [
    './config/lang-css',
    './config/lang-less',
    './config/lang-scss',
    './config/lang-html',
    './config/stylistic',
    './config/order',
    './config/vue',
    './config/styled-syntax'
  ],
  rules: {
    'hue-degree-notation': 'number',
    /**
     * 保证以下 SCSS 不报错：
     *
     * ```scss
     * .pricing-cards {
     *   display: flex;
     *   @include M.gap-m;
     *   padding: 32px 24px;      // 不再报错
     * }
     * ```
     */
    'declaration-empty-line-before': null,
    'at-rule-empty-line-before': ['always', {
      except: [
        'first-nested',
        'blockless-after-same-name-blockless'
      ],
      ignore: [
        'after-comment'
      ],
      ignoreAtRules: [
        // scss
        'else',
        'include',
        'extend',
        'warn',
        'error',
        'debug'
      ]
    }]
  }
};
