# CHANGELOG

## 0.7.0 2026/11/08 @驳是

* FEAT 升级至 ESLint 10，`peerDependencies` 要求 `eslint >= 10.0.0`
  - FEAT `eslint-plugin-import` 换成 `eslint-plugin-import-x`，规则前缀由 `import/` 变为 `import-x/`
  - FEAT `eslint-plugin-react` 与 `eslint-plugin-react-hooks` 换成 `@eslint-react/eslint-plugin`，后者已内置 Rules of Hooks 与 Exhaustive Deps，仅需把等级统一为 error；同时去掉 `react/jsx-filename-extension`
  - FEAT Resolver 改用 `import-x/resolver-next` 配合 `createTypeScriptImportResolver` 工厂，旧写法 `import-x/resolver` 不再生效
  - FIX 暂时移除 `eslint-plugin-jsx-a11y`，因它尚未支持 ESLint 10，待其支持后再加回
  - FIX `tsconfigRootDir` 改用使用者的 `process.cwd()`，此前指向本包目录，会让 TS 类型规则静默失效

## 0.6.6 2026/06/02 @驳是

* FIX Disabled `@typescript-eslint/no-unnecessary-type-arguments`

## 0.6.4 2026/04/03 @驳是

* FIX Disable `@typescript-eslint/no-unnecessary-type-parameters`

## 0.6.3 2026/01/22 @驳是

* FIX Removed `@typescript-eslint/strict-void-return` and enabled `@typescript-eslint/no-floating-promises`

## 0.6.1 2026/01/22 @驳是

* FIX Disable import rules on Node, for the import plugin handles the task better

## 0.6.0 2026/01/22 @驳是

* FEAT Add support for Node projects with `eslint-plugin-n`
* FEAT Add support for Vue projects with `eslint-plugin-vue`

## 0.5.3 2026/01/13 @驳是

* FEAT Add `@typescript-eslint/strict-void-return: error`

## 0.5.2 2025/12/21 @驳是

* FIX Allow `trailingUnderscore` for variables and enum members

## 0.5.0 2025/12/03 @驳是

* FEAT 去掉 `eslint-plugin-storybook`，因它 peer storybook，会导致云端安装失败

## 0.4.2 2025/11/27 @驳是

* FEAT Add `@stylistic/spaced-comment`

## 0.4.0 2025/10/09 @驳是

* CHORE Upgrade eslint-plugin-react-hooks 6 → 7
