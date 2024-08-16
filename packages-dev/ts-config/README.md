# @kcuf/ts-config

Shareable tsconfig for package development.

## Install

```bash
yarn add -D @kcuf/ts-config
```

## Usage

In your `tsconfig.json`:

```json
{
  "extends": "@kcuf/ts-config/index.json",
  "include": [
    "src"
  ]
}
```

NOTE: `include/exclude/files` should always be set, see <https://www.typescriptlang.org/tsconfig#extends>.
