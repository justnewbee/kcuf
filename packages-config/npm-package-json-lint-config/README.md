# @kcuf/npm-package-json-lint-config

## Install & Setup

```bash
pnpm add -D npm-package-json-lint @kcuf/npm-package-json-lint-config
```

In your `.npmpackagejsonlintrc.json`:

```json
{
  "extends": "@kcuf/npm-package-json-lint-config"
}
```

## Usage

### Terminal

```bash
npx npmPkgJsonLint ./package.json
```

### With `lint-staged`

```json
{
  "lint-staged": {
    "package.json": "npmPkgJsonLint"
  }
}
```

## Links

* [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
* [Shareable config](https://npmpackagejsonlint.org/docs/configuration#shareable-config)
* [Rules](https://npmpackagejsonlint.org/docs/rules)
