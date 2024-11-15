# @kcuf/eslint-config

A shareable stylelint config For Eslint >=9.

[可共享的 Eslint config](https://eslint.org/docs/developer-guide/shareable-configs)

* 🔞 非常严格，洁癖必备
* 💯 内置依赖与插件，安装与配置简单
* ☂️ 不多更不少写
* 💊 可自动修正的都是 Error

## 依赖

除 Eslint 需要使用者自行安装外，已内置以下依赖及插件：

* `globals` 默认浏览器环境
* `@eslint/js` JS 配置，这里使用 recommended，有一些额外的配置
* `typescript-eslint` 支持 TS
* `@stylistic/eslint-plugin` Eslint Core 把格式相关的规则差不多都移到了这里，且包含 TS、JSX 相关的配置
* `eslint-plugin-import` import/export 规范插件
  - `eslint-import-resolver-typescript` import 支持 TS
* `eslint-plugin-react` 支持 React
  - `eslint-plugin-react-hooks` React Hooks 插件
  - `eslint-plugin-jsx-a11y` React JSX A11Y 插件

## How to Use

### Install

```shell
pnpm add -D eslint @kcuf/eslint-config
```

### 配置 TypeScript + React 项目

> 纯 JS 或没有 React 亦可，用如下配置。

配置 `eslint.config.js` 即可：

```js
import kcufEslintConfig from '@kcuf/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
export default kcufEslintConfig;
```

建议在 `package.json` 配置 `scripts`：

```json
{
  "scripts": {
    "lint": "eslint src/ --ext js,ts,tsx",
    "lint:packages": "eslint packages*/**/src/ --ext js,ts,tsx"
  }
}
```

### 配置 TypeScript + Vue 项目

TODO

## 关于 Alias

你可能会碰到报错 `import/no-unresolved`，因为应用使用了类似 `@/`、`~/`、`:/` 等 Alias。

由于 Alias 跟应用有关，因此不在此包范围处理，可以使用相关插件，比如 `eslint-import-resolver-custom-alias`，如下操作：

```shell
pnpm add -D eslint-import-resolver-custom-alias
```

修改 `eslint.config.js`（不建议设置超过 1 个 Alias）：

```js
import kcufEslintConfig from '@kcuf/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...kcufEslintConfig,
  {
    settings: {
      'import/resolver': {
        'custom-alias': {
          alias: {
            '@': './src'
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  }
];
```
