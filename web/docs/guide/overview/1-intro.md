---
sidebar_position: 1
title: 简介
---

## 背景

如果你是阿里云的用户，且用阿里云的控制台。如果你观察仔细一些，会发现产品与产品之间，控制台的长相与交互都会有细微的差别。

原因是控制台由业务团队纵向维护，跟团队成员能力、对代码质量及用户体验细节的重视程度等都有关系。你之所以知道这是「阿里云」的控制台，因为它们有统一的顶栏，这使得原本零散的控制台有了统一的心智。

这个顶栏是一个成为「ConsoleBase」的业务框架的一小部分，而作为业务框架，首要考虑的是以下两点：

1. 干扰：避免对业务的样式干扰
2. 性能：避免拖累业务的加载

出于以上考虑，首先便无法使用 UI 库，太重了不说（业务上用不到那么多组件），还有可能造成样式干扰，尤其是像 [Fusion](https://fusion.design) 这样用 `class` 的。所以小到一个按钮，大到帮助文档浏览器这样复杂的业务组件，ConsoleBase 慢慢有了自己的组件库。

随着 ConsoleBase 的发展，组件库也在不断地扩展，有很大一部分也在非控制台项目中应用了起来。

## Motivation

## Prior art

We strongly believe in open source and the power of open collaboration. In the past, we've been inspired by other meaningful projects and amazing people who have inspire(d) us to keep improving our ideas.

Some of the projects we've been inspired by include:

* [Chakra UI](https://chakra-ui.com)
* [Radix UI](https://www.radix-ui.com)
* [Material Web Components](https://github.com/material-components/material-components-web)
* [React Aria](https://react-spectrum.adobe.com/react-aria)
* [Goldman Sachs Design System](https://design.gs.com)
* [Reakit](https://reakit.io)
* [Fast](https://fast.design)
