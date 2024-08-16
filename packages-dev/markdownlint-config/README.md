# @kcuf/markdownlint-config

A shareable markdown lint config, which can be used with `markdownlint-cli` or `markdownlint-cli2`.

## Inherit

`@kcuf/markdownlint-config` ← _BASE_

## Install & Setup

```bash
pnpm add -D markdownlint-cli2 @kcuf/markdownlint-config
npm i -D markdownlint-cli2 @kcuf/markdownlint-config
yarn add -D markdownlint-cli2 @kcuf/markdownlint-config
```

In your `.markdownlint.yaml`:

```yml
extends: "@kcuf/markdownlint-config"
```

## Usage

### Terminal

### With `lint-staged` (Recommended 💎)

```json
{
  "*.md": "markdownlint-cli2"
}
```

```bash
npx markdownlint-cli2 ./README.md
```

### npm-scripts

```bash
npm pkg set scripts.lint:md="markdownlint-cli2 **/*.md #node_modules"
```
