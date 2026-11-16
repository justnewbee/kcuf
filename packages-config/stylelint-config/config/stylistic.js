import stylelintConfigHtml from 'stylelint-config-html';

import {
  defineStylistic,
  defineStylisticOverride,
  rules as stylisticRules
} from '@stylistic/stylelint-config';

/** 本项目对 @stylistic 规则的定制，用短名书写，以便同时映射到各语法命名空间。 */
const CUSTOM_RULES = {
  'string-quotes': 'single',
  'no-eol-whitespace': [true, {
    ignore: ['empty-lines']
  }],
  'max-line-length': 200,
  'declaration-colon-newline-after': null
};

/** 在 css`...` 里误报、对 styled 语法要关掉的规则。 */
const STYLED_DISABLED_RULES = {
  'no-empty-first-line': null,
  'no-missing-end-of-source-newline': null,
  'no-extra-semicolons': null
};

/** postcss-html 解析的文件（.vue/.html/.svelte 等）。 */
const EMBEDDED_FILES = [
  ...new Set(stylelintConfigHtml.overrides.flatMap(override => override.files))
].filter(pattern => pattern.startsWith('*.'));

/** @type {import('stylelint').Config} */
export default {
  extends: [
    '@stylistic/stylelint-config'
  ],
  rules: {
    ...defineStylistic({
      rules: CUSTOM_RULES
    })
  },
  overrides: [
    /**
     * Stylelint 18 / @stylistic/stylelint-plugin 6 起，`@stylistic/<rule>` 只读纯 CSS。
     * TS/TSX 由 postcss-styled-syntax 解析，必须配置 `@stylistic/styled/<rule>` 副本，
     * 否则每个文件都会报「does not read a stylesheet parsed with this syntax」。
     */
    defineStylisticOverride({
      syntax: 'styled',
      files: ['*.{ts,tsx,js,jsx,cjs,cts,mjs,mts}'],
      rules: {
        ...stylisticRules,
        ...CUSTOM_RULES,
        ...STYLED_DISABLED_RULES
      }
    }),
    // @stylistic/stylelint-config 自带的 scss/less override 用默认值（no-eol-whitespace
    // 没有 ignore: ['empty-lines']），必须再覆盖一次让 CUSTOM_RULES 对 scss/less 命名空间
    // 生效（如：空行允许保留与上下文一致的缩进空格）。本 override 排在 extends 之后，同名
    // 规则以这里为准。
    {
      files: ['**/*.scss'],
      rules: defineStylistic({
        syntax: 'scss',
        rules: CUSTOM_RULES
      })
    },
    {
      files: ['**/*.less'],
      rules: defineStylistic({
        syntax: 'less',
        rules: CUSTOM_RULES
      })
    },
    {
      /**
       * postcss-html 解析的文件里 <style lang="scss|less"> 会按对应语法解析，补齐 scss/less 命名空间副本，否则同样报拒绝告警。
       * customSyntax 由 stylelint-config-html / stylelint-config-standard-vue 提供，这里不能覆盖。
       */
      files: EMBEDDED_FILES,
      rules: {
        ...defineStylistic({
          syntax: 'scss',
          rules: {
            ...stylisticRules,
            ...CUSTOM_RULES
          }
        }),
        ...defineStylistic({
          syntax: 'less',
          rules: {
            ...stylisticRules,
            ...CUSTOM_RULES
          }
        })
      }
    }
  ]
};
