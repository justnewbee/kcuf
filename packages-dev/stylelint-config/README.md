# @kcuf/stylelint-config

A shareable markdown lint config, which can be used with `stylelint`.

## Inherit

`@kcuf/stylelint-config` ← `stylelint-config-standard` ← `stylelint-config-recommended`

With plugins `stylelint-order`, more plugins can be found at [awesome-stylelint#plugins](https://github.com/stylelint/awesome-stylelint#plugins).

## Install & Setup

```bash
npm i -D stylelint @kcuf/stylelint-config
pnpm add -D stylelint @kcuf/stylelint-config
yarn add -D stylelint @kcuf/stylelint-config
```

In your `.stylelintrc`:

```json
{
  "extends": "@kcuf/stylelint-config"
}
```

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

```json
{
  "lint-staged": {
    "*.{css,less}": "stylelint"
  }
}
```