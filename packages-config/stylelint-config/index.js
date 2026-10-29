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
        'debug'
      ]
    }]
  }
};
