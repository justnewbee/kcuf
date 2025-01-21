---
title: CSS 指南
---

## 使用 `data-`

优先使用 `data-` 属性作样式变体的钩子。其次再考虑将属性传入 `styled-component`，将自定属性传入 DOM 时，使用 [$transient-props](https://styled-components.com/docs/api#transient-props) 可避免警告。

## 使用新 CSS API

:::info
凡是在 [MDN](https://developer.mozilla.org) 上标记 **Baseline Widely available**，都可以使用。
:::

### `*-top/right/left/top` → `*-block/inline`

| 旧 | 新 |
| --- | --- |
| `top/bottom/right/left` | `inset` |
| `top/bottom` | `inset-block`、`inset-block-start/end` |
| `right/left` | `inset-inline`、`inset-inline-start/end` |
| `margin-right/left` | `margin-inline`、`margin-inline-start/end` |
| `padding-top/bottom` | `padding-block`、`padding-block-start/end` |
| `padding-right/left` | `padding-inline`、`padding-inline-start/end` |
| `scroll-padding-top/bottom` | `scroll-padding-block`、`scroll-padding-block-start/end` |
| `scroll-padding-right/left` | `scroll-padding-inline`、`scroll-padding-inline-start/end` |
| `border-top/bottom` | `border-block`、`border-block-start/end` |
| `border-right/left` | `border-inline`、`border-inline-start/end` |

### `margin` → `gap`

Flex 等内部优先使用 [gap](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)
