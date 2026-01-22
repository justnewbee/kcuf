/**
 * https://eslint.vuejs.org/rules/
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export default {
  'vue/multi-word-component-names': 'off',
  'vue/singleline-html-element-content-newline': 'off',
  'vue/max-attributes-per-line': 'off',
  'vue/block-order': ['error', {
    order: ['template', 'script', 'style']
  }],
  'vue/html-self-closing': ['error', {
    html: {
      void: 'always',
      normal: 'always',
      component: 'always'
    },
    svg: 'always',
    math: 'always'
  }]
};
