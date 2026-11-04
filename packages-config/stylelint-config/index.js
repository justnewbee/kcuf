/** @type {import('stylelint').Config} */
export default {
  // Stylelint 18 的配置解析改成了原生 ESM 语义，相对路径 extends 必须带扩展名，否则
  // 报错「ConfigurationError: Could not find "./config/xx"」
  extends: [
    './config/lang-css.js',
    './config/lang-less.js',
    './config/lang-scss.js',
    './config/lang-html.js',
    './config/stylistic.js',
    './config/order.js',
    './config/vue.js',
    './config/styled-syntax.js'
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
    /**
     * 块内注释（含注释掉的代码）前后不强制空行：
     *
     * ```scss
     * .button-login {
     *   height: 92px;
     *   // @include M.bg-brand;
     *   border: none;
     * }
     * ```
     *
     * 核心规则没有 inside-block 选项，只能整体关闭。
     */
    'comment-empty-line-before': null,
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
  },
  overrides: [{
    files: ['*.scss', '*.vue'],
    rules: {
      // scss 插件规则不能放顶层，纯 CSS 会报 Unknown rule；块内注释前后不强制空行
      'scss/double-slash-comment-empty-line-before': ['always', {
        except: ['first-nested'],
        ignore: ['between-comments', 'stylelint-commands', 'inside-block']
      }]
    }
  }]
};
