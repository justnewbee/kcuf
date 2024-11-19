# @kcuf/canvas-marking

基于 `<canvas>` 的图片标注。

## How to Use

1. 准备一个 **空** 的容器节点 `dom`
2. `new CanvasMarking(dom, options)`

CanvasMarking 会在容器内部创建一个绝对定位并占满容器的 DOM，已实现大小自适应，因此会为容器添加样式 `position: relative; overflow: hidden;`。

之所以内部使用绝对定位，而非采用 `height: 100%` 是因为后者只有在容器有可计算的高度时（即在样式中明确定义 `height`）才能够生效。

推荐开发者为容器使用 Flex 布局 `flex: 1`，使其能够占满某个区域并自适应，除此之外，尽量不要附加其他样式。

## 参考

* https://github.com/wanglin2/markjs