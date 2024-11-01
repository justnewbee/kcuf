# 一些设计体系的色盘参考

## 大原则

关于颜色的大原则：**Do not depend on color to communicate meaning**。

## UI 库

| UI 库 | 色盘 | 自定义工具 | 参考价值 |
| --- | --- | --- | --- |
| [Radix](https://www.radix-ui.com) | [Radix 色盘](https://www.radix-ui.com/colors) | [Radix Custom Palette](https://www.radix-ui.com/colors/custom) | ★★★★ |
| [Spectrum](https://spectrum.adobe.com) | [Spectrum 色盘](https://spectrum.adobe.com/page/color-palette/) | - | ★★★ |
| [Mantine](https://mantine.dev) | [Mantine 色盘](https://mantine.dev/theming/colors) | [Mantine Colors Generator](https://mantine.dev/colors-generator) | ★★★ |
| [Material UI](https://mui.com) | [Material UI 色盘](https://mui.com/material-ui/customization/color) | [Material UI Color Config](https://m2.material.io/inline-tools/color) | ★★ |
| [Shadcn](https://ui.shadcn.com) | [Shadcn 色盘](https://ui.shadcn.com/colors) | - | ★★ |
| [Fluent2](https://fluent2.microsoft.design) | [Fluent2 色盘](https://fluent2.microsoft.design/color) | - | ★★ |
| [Garden](https://garden.zendesk.com) | [Garden 色盘](https://garden.zendesk.com/design/color) | - | ★★ |
| [EUI](https://eui.elastic.co) | [EUI 色盘](https://eui.elastic.co/#/theming/colors/values) | - | ★ |
| [Vuetify](https://vuetifyjs.com) | [Vuetify 色盘](https://vuetifyjs.com/en/styles/colors/#material-colors) | - | ★ |
| [Blueprint](https://blueprintjs.com) | [Blueprint 色盘](https://blueprintjs.com/docs/#core/colors) | - | ★ |
| [Pluralsight](https://design-system.pluralsight.com) | [Pluralsight 色盘](https://design-system.pluralsight.com/core/color) | - | ★ |
| [Primer](https://primer.style) | [Primer 色盘](https://primer.style/foundations/color/base-scales) | - | ★ |

## 一些文章

* [A beginner's Guide to Applying Color in UI Design](https://dev.to/georgedoescode/a-beginner-s-guide-to-applying-color-in-ui-design-3904)
* [Building Your Color Palette](https://www.refactoringui.com/previews/building-your-color-palette)

## 准则参考

* [Contrast (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
* [Contrast (Enhanced) (Level AAA)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html)
* [WebAIM - Contrast and Color Accessibility](https://webaim.org/articles/contrast)
* [The American Printing House for the Blind Guidelines for Large Printing](https://www.aph.org/app/uploads/2022/04/Research-Based-Large-Print-Guidelines.pdf) 对印刷中的字体、大小、标点、行高、行间距、颜色等很有指导意义

## 工具

针对颜色的 [A11Y](https://developer.mozilla.org/en-US/docs/Web/Accessibility)，有很多有用的工具。

### Web 应用

* [Adobe Color Contrast Analyzer](https://color.adobe.com/zh/create/color-contrast-analyzer) ★★★★★
* [Adobe Color Tools](https://color.adobe.com) ★★★★
* [Colour Contrast Check](https://snook.ca/technical/colour_contrast/colour.html) ★★★★
* [ContrastRatioCalculator](https://www.msfw.com/Services/ContrastRatioCalculator) ★★
* [WebAim Contrast Checker](https://webaim.org/resources/contrastchecker/)

### APP

* [Sim Daltonism](https://michelf.ca/projects/sim-daltonism/) ★★★★★ 模拟色盲
* [Colour Contrast Analyzer (CCA)](https://www.tpgi.com/color-contrast-checker/) ★★

### NPM 包

* [polished](https://polished.js.org)
  - `meetsContrastGuidelines(color1: string, color2: string): ContrastScores`
  - `readableColor(color: string, returnIfLightColor?: string, returnIfDarkColor?: string, strict?: boolean): string`

### 浏览器及插件

* Firefox DevTools 的 Accessibility 可以检查 Contrast
* [插件 WCAG Contrast checker](https://addons.mozilla.org/en-US/firefox/addon/wcag-contrast-checker/)
* [插件 NoCoffee Vision Simulator](https://addons.mozilla.org/en-US/firefox/addon/nocoffee)

## 一些评论

> As my vision declines, there is not one single day that goes by that I don't curse asshole web-designers who use grey type.
> — Son of an asylum seeker, father of an immigrant (@doctorow) September 15, 2017