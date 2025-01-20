---
title: Design Token
---

## 何为 Design Token

> [atlassian](https://atlassian.design/components/tokens/all-tokens) → Design tokens are the **single source of truth** to name and store design decisions.
>
> [chakra](https://www.chakra-ui.com/docs/theming/tokens) → Design tokens are the **platform-agnostic** way to manage design decisions in your application
> or website.
>
> [fluent](https://fluent2.microsoft.design/design-tokens) → Design tokens are **stored values** used to assign Fluent styles like color, typography, spacing,
> or elevation, without hardcoding pixels and hex codes.
>
> [material](https://m3.material.io/foundations/design-tokens/overview) → Design tokens are the **building blocks** of all UI elements.
>
> [polaris](https://polaris.shopify.com/tokens) → Tokens are variables that **represent design decisions** such as color, typography, and spacing, in a
> consistent and reusable way.
>
> [spectrum](https://spectrum.adobe.com/page/design-tokens) → Design tokens are **design decisions, translated into data**. They act as a **"source of truth"**
> to help ensure that product experiences feel unified and cohesive.
>
> [uber](https://base.uber.com/6d2425e9f/p/33fa5e-design-tokens) → Tokens are a set of **foundational design** decisions represented as **reusable data**.

以上，可以得出 Design Token 有以下特征：

1. 形式为键值对
2. 设计决策的最小单元
3. 唯一可信源

Design Token 是记录可重复使用的设计决策的键值对，如颜色、字体、阴影、留白、甚至动画等，在设计、编码码中复用，以保障用户体验的一致性。

相关联的 Design Token 集合，便形成了我们通常所说的主题「Theme」。

## 需要哪些 Token

| Token | | 黑白 |
| --- | --- | :-: |
| `color` | `-text`、`-bg`、`-bd` | ✅ |
| `font` | `-size`、`–family`、`-weight` | |
| `shadow` | | ✅ |
| `spacing` | | |
| `radius` | | |
| `height` | | |
| `motion` | | |
| `breakpoint` | | |
| `z-index` | | |

## Categories

### Base

### Functional

### Component

## Convention breakdown

### Prefix

### Namespace

### Pattern

### Variant

### Property (Required)

### Scale

### Delimiter

## Modifiers

### Color modifiers

### Size modifiers

## 参考

| Lib | 参考值 | 备注 |
| --- | --- | --- |
| [antd](https://ant.design/docs/react/customize-theme) | ★★ | |
| [atlassian](https://atlassian.design/tokens/design-tokens) | ★★★★ | |
| [base](https://base.uber.com/6d2425e9f/p/33fa5e-design-tokens) | ★★★ | |
| [chakra](https://www.chakra-ui.com/docs/theming/tokens) | ★★★★ | |
| [dotui](https://dotui.org/docs/getting-started/design/design-tokens) | - | |
| [fluent](https://fluent2.microsoft.design/design-tokens) | ★ | |
| [fusion](https://fusion.design/pc/design/style/color) | ★★ | |
| [primer](https://primer.style/foundations/primitives/token-names) | ★★★★ | `{prefix} - {namespace} - {pattern} - {variant} - {property} - {variant} - {scale}` |
| [spectrum](https://spectrum.adobe.com/page/design-tokens) | ★★★★ | `value → global token → alias token → component specific token` |
