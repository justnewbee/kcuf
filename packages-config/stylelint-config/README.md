# @kcuf/stylelint-config

A shareable stylelint config.

* <https://stylelint.io/awesome-stylelint>

## Install & Setup

```bash
pnpm add -D stylelint @kcuf/stylelint-config
```

In your `.stylelintrc`:

```json
{
  "extends": "@kcuf/stylelint-config"
}
```

According to your project type, you can choose to extend:

* `@kcuf/stylelint-config` - React projects using css, less & styled-components (no scss)
* `@kcuf/stylelint-config/config-css` - projects using only css
* `@kcuf/stylelint-config/config-less` - projects using css & less
* `@kcuf/stylelint-config/config-scss` - projects using css & scss
* `@kcuf/stylelint-config/config-vue` - Vue projects using css, less & scss

## Usage

### Terminal

```bash
npx stylelint ./path/to/some-css.css
npx stylelint ./path/to/some-less.less
```

### npm-scripts

```bash
npm pkg set scripts.lint:style="stylelint \"**/src/**/*.{css,less}\""
```

## With `lint-staged`

`.lintstagedrc`

```json
{
  "*.{css,less,ts,tsx}": "stylelint"
}
```