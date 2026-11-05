# @kcuf/canvas-fluid-react

The React wrapper for `@kcuf/canvas-fluid`.

## How to Use

```tsx
import CanvasFluid from '@kcuf/canvas-fluid-react';

export default function HomePage() {
  return <>
    <CanvasFluid />
    ...
  </>;
}
```

## Notes

* You may only want to use it on the home page.
* The component renders a full screen `<canvas>` and creates the fluid simulation on mount, calling `destroy` on unmount.
* The simulation binds its pointer listeners to `window`, so the effect follows the cursor anywhere on the page.
* `CanvasFluid` assigns its own `style`, so `style` / `className` from props have no visible effect.
