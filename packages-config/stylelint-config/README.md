# @kcuf/stylelint-config

> The Kcuf shareable stylelint config.

* <https://stylelint.io/awesome-stylelint>

## 安装

```bash
pnpm add -D stylelint @kcuf/stylelint-config
```

## React 项目配置

`.stylelintrc` 内容:

```json
{
  "extends": "@kcuf/stylelint-config"
}
```

此配置适用于使用了 styled-components 或 emotion 的 React 项目（JS 或 TS）。

注意，如果项目还用了 Less/Sass，可以这么这样：

```json
{
  "extends": [
    "@kcuf/stylelint-config",
    "@kcuf/stylelint-config/config-less",
    "@kcuf/stylelint-config/config-scss"
  ]
}
```

之所以不在 `@kcuf/stylelint-config` 默认加上 Less/Sass，是希望项目的样式解决方案更纯粹一些。

## Vue 项目配置

`.stylelintrc` 内容（`index-vue` 默认带了 `config-scss`）:

```json
{
  "extends": "@kcuf/stylelint-config/index-vue"
}
```

## 使用

### Terminal

在 Terminal 下进行测试，查看效果：

```bash
npx stylelint ./path/to/some-css.css
npx stylelint ./path/to/some-less.less
```

### npm-scripts

添加 NPM Script：

```bash
npm pkg set scripts.lint:style="stylelint \"**/src/**/*.{css,less}\""
```

## 集成 `lint-staged`

在 `.lintstagedrc` 中添加，可视情况增减文件后缀：

```json
{
  "*.{css,less,ts,tsx}": "stylelint"
}
```