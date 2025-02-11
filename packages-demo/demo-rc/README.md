# @kcuf/demo-rc

> 切莫用于生产代码，写 Demo 的时候用。

写 demo 时专用的一些基础元素，带简单的样式，为了比如用 storybook 写 demo 的时候好看和方便。

## Components

* 特殊作用
  - `MinimalNormalize` normalize 样式，建议每个 storybook demo 都加上
  - `PackageInfo` 显示包名和版本等信息
* Typography - 一些原生 DOM 的直接替代品及扩展
  - `H1`
  - `H2`
  - `H3`
  - `H4`
  - `H5`
  - `H6`
  - `P`
  - `Hr`
  - `Blockquote`
  - `Em`
  - `Strong`
  - `Code`
  - `Kbd`
  - `HtmlText` - 将字符串以 HTML 的形式展示，方便需要展示一些带 HTML 的内容的场景
  - `RainbowText` - 彩虹字体
* Feedback
  - `Alert` 提示信息
* Form
  - `InputText`
  - `InputTextarea`
  - `InputNumber`
  - `InputRange`
  - `InputColor`
  - `InputSwitch`
  - `Button`
  - `Form`
* Data Display
  - `List`
  - `Table`
  - `Codemirror`
  - `CodeViewer`
  - `CodeViewerJson5`
  - `PromiseViewer`
* Placeholder
  - `LongArticle` 可用来撑高
