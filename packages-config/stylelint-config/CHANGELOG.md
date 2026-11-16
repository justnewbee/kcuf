# CHANGELOG

## 0.6.0 2026/11/16 @驳是

* BREAK 升级至 Stylelint 18，`peerDependencies` 要求 `stylelint >= 18.0.0`
* BREAK `@stylistic/stylelint-plugin` 6 起 `@stylistic/<rule>` 只读纯 CSS，TS/TSX 必须使用 `styled` 副本，`config/stylistic.js` 改用 `defineStylistic` / `defineStylisticOverride` 生成，否则 styled-components 文件全部报「does not read a stylesheet parsed with this syntax」
* FIX Stylelint 18 相对路径 `extends` 必须带 `.js` 扩展名，否则报 `ConfigurationError: Could not find "./config/xx"`
* FIX 关闭 `declaration-empty-line-before`，SCSS 中 `@include` 之后的声明不再报错
* FIX 关闭 `comment-empty-line-before`，核心规则没有 `inside-block` 选项，无法只放开块内注释
* FEAT `at-rule-empty-line-before` 的 `ignoreAtRules` 增加 `warn` / `error`
* FEAT `scss/double-slash-comment-empty-line-before` 移入 `*.scss`、`*.vue` 的 `overrides`，避免纯 CSS 报 `Unknown rule`
* CHORE Up `@stylistic/stylelint-config` 5 ↗ 6、`stylelint-config-standard` 40 ↗ 41、`stylelint-config-standard-less` 4 ↗ 5、`stylelint-config-standard-scss` 17 ↗ 18、`postcss-less` 7.0 ↗ 7.1

## 0.5.0 2026/10/29 @驳是

* FEAT 对 SCSS/LESS 等使用 `overrides` 进行隔离，以避免和 CSS 的规则冲突
* BREAK 一个配置搞定所有，不再需要下探引用 `config-xx`，相关文件移入 `config` 目录

## 0.3.0 2025/12/10 @驳是

* FEAT 新增 `@stylistic/stylelint-config`
