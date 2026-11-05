# @kcuf/canvas-fluid-react

The React wrapper for `@kcuf/canvas-fluid`.

## How to Use

```tsx
import CanvasFluid from '@kcuf/canvas-fluid-react';

export default function Page() {
  return <CanvasFluid />;
}
```

The component renders a full screen `<canvas>` and creates the fluid simulation on mount,
calling `destroy` on unmount. Pass `config` to override the simulation options, and use
`ref` to access `start()` (the loop otherwise starts on the first pointer interaction).

```tsx
import {
  useRef
} from 'react';
import CanvasFluid, {
  IFluidImperative
} from '@kcuf/canvas-fluid-react';

export default function Page() {
  const fluidRef = useRef<IFluidImperative>(null);
  
  return <CanvasFluid ref={fluidRef} config={{
    splatForce: 8000
  }} />;
}
```

Notes:

- The simulation binds its pointer listeners to `window`, so the effect follows the cursor anywhere on the page.
- `CanvasFluid` assigns its own `style`, so `style` / `className` from props have no visible effect.
- `config` is read only when the instance is created; changing it re-renders nothing.
