# README

[Indie Goodies](https://indiegoodies.com) 首页的鼠标滑动时的炫彩流体效果。

## How to Use

### Plain JavaScript

```ts
import canvasFluid from '@kcuf/canvas-fluid';

const canvas = document.querySelector('canvas-fluid');

if (canvas) {
  const fluid = canvasFluid(document.querySelector('canvas'));
  
  // 你需要在适当的实际自己做 fluid.destroy();
}
```

### React

```tsx
import {
  ReactElement,
  useRef,
  useEffect
} from 'react';

import canvasFluid from '@kcuf/canvas-fluid';

export default function StoryDefault(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    
    const fluid = canvasFluid(canvasRef.current);
    
    return (): void => fluid.destroy();
  }, []);
  
  return <canvas ref={canvasRef} />;
}
```
