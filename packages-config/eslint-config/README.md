# @kcuf/eslint-config

The Kcuf shareable config For Eslint >=9.

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
* `eslint-plugin-n` 支持 Node

## 安装

```shell
pnpm add -D eslint @kcuf/eslint-config
```

## 项目配置

* `index` React Web 项目
* `index-type-unaware` React Web 项目（类型检测出错的情况用它）
* `index-vue` Vue 项目专用
* `index-node` Node 项目专用

> 纯 JS 或没有 React 亦可，用如下配置。

配置 `eslint.config.js` 即可：

```js
import kcufEslintConfig from '@kcuf/eslint-config'; // 这里可以用不同的 index-x

/** @type {import('eslint').Linter.Config[]} */
export default kcufEslintConfig;
```

建议在 `package.json` 配置 `scripts`：

```json
{
  "scripts": {
    "lint": "eslint src/ --ext js,jsx,ts,tsx",
    "lint:packages": "eslint packages*/**/src/ --ext js,jsx,ts,tsx"
  }
}
```

## FAQ

### Alias 报错怎么办？

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

### 报错「ESLint was configured to run...」怎么办？

参考 [文档](https://typescript-eslint.io/troubleshooting/typed-linting#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file)。

若还是不行，则使用 `import kcufEslintConfig from '@kcuf/eslint-config/index-type-unaware.js';` 替换 `import kcufEslintConfig from '@kcuf/eslint-config';`。

### 报错「This rule requires the `strictNullChecks` compiler option to be turned on...」怎么办？

我们默认开启了 `@typescript-eslint/prefer-nullish-coalescing`，你需要配置你的 TSConfig 为 `strict: true`，或至少 `strictNullChecks: true`。

你可以：

1. 使用 `index-type-unaware`，但那会丢掉所有的类型有关的规则
2. 单独禁用，`'@typescript-eslint/prefer-nullish-coalescing': off`
3. 修改 TSConfig，设置 `compilerOptions.strict` 为 `true` ← 推荐

### `@typescript-eslint/no-unnecessary-condition` 误报怎么办？

比如以下代码，有误报：

```ts
function handleChange(selected: Something[]): void {
  const [record] = selected;
  
  if (record) { // ← 此处误报
    updateData({
      selected: record
    });
  }
}
```

需确保 TSConfig 中设置了 `noUncheckedIndexedAccess: true`，参考 [Possibly-undefined indexed access](https://typescript-eslint.io/rules/no-unnecessary-condition#possibly-undefined-indexed-access)。
