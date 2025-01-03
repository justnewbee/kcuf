# @kcuf-ui/rc-backdrop-headless

## 关于名字

从功能上，`Backdrop` 和 `Overlay` 有相同点，都是为了遮罩，避免误操，但前者是为了突出在其上方的部分，而后者则仅仅是为了遮罩。

没有上方的组件，两者「几乎」等价，区别在于 `Backdrop` 一定是全屏的，而 `Overlay` 可以仅遮罩部分。

另外，有些组件库对 `Overlay` 的理解有误，比如 [Fusion 的 Overlay](https://fusion.design/pc/component/overlay) 其实应该是 `Popover`。

虽然可能没有独立的 `Backdrop` 组件，但多数组件库对此类型的组件命名是 `Backdrop`，也有叫 `Mask` 的。

## 参考

> 不是所有的库都会单独拎一个组件。

| Lib | Component | Category | Memo |
| --- | :---: |---|---|
| [AntD] | | | | `rc-dialog` 内部的 `Mask`，不判重，不通用，会叠加 |
| [Fusion] | | | `Overlay` 其实是 `Popover`，`Backdrop` 是内部组件 `Animate.OverlayAnimate` |
| [DaisyUI] | | | |
| [MaterialUI] | [Backdrop](https://mui.com/material-ui/react-backdrop) | Feedback | |
| [ChakraUI] | | | |
| [Zag] | | | `dialog.backdrop` |
| [InstructureUI] | [Overlay](https://instructure.design/#Overlay) | | |
| [Shadcn] | | | |
| [Mantine] | [Overlay](https://mantine.dev/core/overlay) | Overlays | |
| [DotUI] | | | |
| [FrankenUI] | [Overlay](https://franken-ui.dev/docs/overlay) | - | `Backdrop` 是 `Overlay` 的其中一种形态 |
| [ThemeUI] | | | |
| [MeltUI] | | | |
| [Justd] | | | |

[AntD]: https://ant.design
[Fusion]: https://fusion.design
[DaisyUI]: https://daisyui.com
[MaterialUI]: https://mui.com
[ChakraUI]: https://www.chakra-ui.com
[Zag]: https://zagjs.com
[InstructureUI]: https://instructure.design
[Shadcn]: https://ui.shadcn.com
[Mantine]: https://mantine.dev
[DotUI]: https://dotui.org
[FrankenUI]: https://franken-ui.dev
[ThemeUI]: https://theme-ui.com
[MeltUI]: https://www.melt-ui.com
[Justd]: https://getjustd.com