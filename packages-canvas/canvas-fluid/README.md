# README

[Indie Goodies](https://indiegoodies.com) 首页的鼠标滑动时的炫彩流体效果。

## How to Use

### Plain JavaScript

```ts
import CanvasFluid from '@kcuf/canvas-fluid';

const canvas = document.querySelector('canvas-fluid');

if (canvas) {
  const fluid = new CanvasFluid(canvas);
  
  // 你需要在适当的实际自己做 fluid.destroy();
}
```

### React

你可以直接用 `@kcuf/canvas-fluid-react`。
