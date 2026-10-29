# @kcuf/stylelint-config

> The Kcuf shareable stylelint config.

一个配置搞定以下任意框架的项目：

* [x] 普通使用 CSS/LESS/SCSS 的项目
* [x] 在 JS/TS 中使用 `styled-components` 或 `emotion` 项目
* [x] Vue 项目（SCSS 为主）

## 安装

```bash
pnpm add -D stylelint @kcuf/stylelint-config
```

## 配置

> 注意：切不要下探引用。

`.stylelintrc` 内容:

```json
{
  "extends": "@kcuf/stylelint-config"
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
  "*.{css,less,scss,ts,tsx}": "stylelint"
}
```

## Links

* [Stylelint](https://stylelint.io/)
* [Stylelint Rules](https://stylelint.io/user-guide/rules)
* [Awesome Stylelint](https://stylelint.io/awesome-stylelint)
* [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)
* [@stylistic/stylelint-config](https://github.com/stylelint-stylistic/stylelint-config)
* [stylelint-config-standard-less](https://github.com/stylelint-less/stylelint-less)
* [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)
* [stylelint-config-html](https://github.com/ota-meshi/stylelint-config-html)
* [stylelint-config-standard-vue](https://github.com/ota-meshi/stylelint-config-standard-vue)
* [stylelint-config-recommended-vue](https://github.com/ota-meshi/stylelint-config-recommended-vue)
* [stylelint-order](https://github.com/hudochenkov/stylelint-order)
* [postcss-styled-syntax](https://github.com/hudochenkov/postcss-styled-syntax)
