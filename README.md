# kcuF

## About

**kcuF** `k-kuf`，是著名的 F-word 反着写。

我写代码的时候，经常在命名上花很多时间，有的时候，在没有想好合适的名字，我便会用 `f**k`；另外，写一些临时的测试代码，或者打临时的 `console` 日志，
我也会用它。

很久很久以前，我还用 jQuery 写了一个叫作 `kcuF` 的 UI 测试小工具，就是这个仓库的前身，相关的代码被我打到 `archive` 这个 Tag 里了。

最近我想把我之前工作中写的一些非业务相关的开源代码，整理出来，一来是因为那部分代码估计别人也不会太上心继续维护得很好，二来也可以跳脱出原有的思维圈子，
以三方使用者的角度重新审视和改写之前我写的那部分代码。

## What

这是一个基于 pnpm + lerna 的 Monorepo，内容会很「杂」，当然，我期望，以后某些东西会独立出去。

## How

对 `package.json` 的 `scripts` 做一些说明：

| 命令 | 说明 |
| --- | --- |
| `boot` | 安装依赖，`git clone` 后做的第一件事情，也可以随便什么时候执行，一般 `ncu` 或 `pnpm ncu:packages` 后，需要用它 |
| `boot:packages` | 构建所有的 `packages`，`git clone` 后做的第二件事情（后续可以只需要 `boot`） |
| `clean` | 删除所有的 `node_modules` 目录 |
| `docs:build` | |
| `ncu` | 检查并更新 `packages.json` 依赖项，若有更新，最好运行 `boot` |
| `ncu:packages` | 检查并更新所有 package 的 `packages.json` 依赖项，若有更新，最好运行 `boot` |
| `depcheck` | 检查 `packages.json` 依赖项是否有遗漏或者多余 |
| `depcheck:packages` | 检查所有 package 的 `packages.json` 依赖项是否有遗漏或者多余 |
| `pub:canary` | 执行 lerna 发布金丝雀版本 |
