---
title: 简介
---

> 说不要造轮子的，都是造不出好轮子的，或者轮子的制造者不期望被别的轮子代替的。

## 背景

之前我做过一个横向的前端业务框架。

考虑到全局样式干扰、性能拖累、适配成本等问题，不打算用市面上任何 UI 库，而我又是个造轮子~~高手~~爱好者、垃圾代码杀手，因此便开始了我的造轮子之路。

写代码的应该都知道代码分层的重要性，先写无业务属性的基础层，再一层一层堆叠业务逻辑，最终完成复杂的业务。

横向框架自身其实并不简单，该有的 UI 组件还是得有，小到图标、按钮，大到页内文档查看器。慢慢地，从工程配置、工具库、基础组件到业务组件，我的这个横向大大小小加起来可能有近百个 `package`。而这些轮子并没有局限在一个项目中，在我其他的项目中，都得到了有效的应用。

## 动机

从大厂离职后，我陆续用过好几个 UI 库，总体给人的感觉是，能用，但很多都不好用。尤其是在开发体验上，很多库的 TS 支持并不到位。拿 Fusion 举例，我曾经就写了个 `fusion-x`，专门用来修正它的类型定义。

比较幸运的是，我写的库，有一部分由于当时业务的定位，被开源了，因此即使离职了，还是能够看到。

但我也看到了一些问题：

| 问题 | 原因 |
| --- | --- |
| 跟环境耦合 | 虽说不是强耦，但总归藕住了，比如国际化就会找相关的浏览器环境变量 |
| 样式自定义性不足 | 只考虑了一个设计规范 |
| 可能已经没法继续维护 | 构建依赖了原厂的构建工具，而那个构建从我在的时候就已经懒得更新了（刚去看了，3 年不更新了已经） |
| 缺少单测 | 构建工具停止更新造成了相关依赖过时，单测跑不起来了，也就浇灭了我对单测的热情 |
| 不成系统（或品牌） | 所有组件都需要单独安装（这有好处也有坏处） |
| 组件体系不完整，部分组件的功能也不完善 | 当时仅仅是为了满足特定的需求 |
| 没有文档 | 这并不是说没有 README，而是没有一个撑得起全局的文档查看站点，这个问题可能就是因为上面说的不成系统 |
| 部分代码写的不够好 | 当时才开始写 TS，对 TS 的特性掌握得不够 |

因此，我打算把之前的代码好好打磨一下，抹除原厂的一切特殊性，使其能够简单地应用在各种环境下，同时也在工程方面提升一下能力。

## 参考

参考了很多优秀的 UI 库，从组件名称、属性，到文档是编写，都有所借鉴，按名称排序：

| Lib | JS | CSS |
| --- | :-: | :-: |
| [antd](https://ant.design) | React | Css-in-JS |
| [ark](https://ark-ui.com) | React / Vue / Svelte / Solid | |
| [atlassian](https://atlassian.design) | React | |
| [baklava](https://baklava.design) | Web Component | |
| [chakra](https://www.chakra-ui.com) | React | |
| [choco](https://choco-ui.com) | Svelte | |
| [cuicui](https://cuicui.day) | React | Tailwind |
| [dotui](https://dotui.org) | React | |
| [element+](https://element-plus.org) | Vue | |
| [fluent](https://learn.microsoft.com/en-us/fluent-ui/web-components) | Web Component | |
| [franken](https://franken-ui.dev) | - | Tailwind |
| [fusion](https://fusion.design) | React | |
| [headless](https://headlessui.com) | React / Vue | Tailwind |
| [hero](https://www.heroui.com) | React | Tailwind |
| [hyper](https://www.hyperui.dev) | - | Tailwind |
| [instructure](https://instructure.design) | React | |
| [ionic](https://ionicframework.com) | Web Component | |
| [justd](https://getjustd.com) | React | Tailwind |
| [landingpage](https://ui.nafisbd.com) | React | Tailwind |
| [mantine](https://mantine.dev) | React | |
| [materialize](https://materializecss.com) | - | CSS |
| [melt](https://www.melt-ui.com) | Svelte | |
| [mui](https://mui.com) | React | |
| [pearl](https://docs.pearl-ui.dev) | React | |
| [primereact](https://primereact.org) | React | |
| [radix](https://www.radix-ui.com) | React | |
| [reakit](https://reakit.io) | React | |
| [refine](https://refine.dev) | React | |
| [reka](https://reka-ui.com) | Vue | |
| [semantic](https://semantic-ui.com) | - | |
| [shadcn](https://ui.shadcn.com) | React | |
| [spectrum](https://react-spectrum.adobe.com) | React | |
| [tallstack](https://tallstackui.com) | Web Component | Tailwind |
| [theme](https://theme-ui.com) | React | Tailwind |
| [tremor](https://tremor.so) | React | Tailwind |
| [zag](https://zagjs.com) | React / Vue / Svelte / Solid | Tailwind |
