# @kcuf-hook/use-fullscreen

A hook to use [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) in an easy way.

## API

* `useFullscreen(target?: HTMLElement): UseFullscreenResult`
* `useFullscreenRef(): UseFullscreenRefResult`

## Types

* `UseFullscreenResult`
* `UseFullscreenRefResult`

## Examples

### useFullscreen()

If you want fullscreen the full document, use `useFullscreen` without parameter.

```tsx
import {
  ReactElement
} from 'react';

import useFullscreen from '@kcuf-hook/use-fullscreen';

export default function SomeComponent(): ReactElement {
  const {
    fullscreen,
    toggle
  } = useFullscreen();
  
  return <>
    <button onClick={toggle}>{fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</button>
    <div>...</div>
  </>;
}
```

### useFullscreen(element)

If you want fullscreen part of the UI, but the DOM ref is needed somewhere, or you want to put ref and the hook in different modules, use `useFullscreen`.

```tsx
import {
  ReactElement
} from 'react';

import useFullscreen from '@kcuf-hook/use-fullscreen';

export default function SomeComponent(): ReactElement {
  const domElement = useDomElement(); // a custom hook to get the real DOM element from another module
  const {
    fullscreen,
    toggle
  } = useFullscreen(domElement);
  
  return <button onClick={toggle}>{fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</button>;
}
```

### useFullscreenRef()

If you want fullscreen part of the UI, and are putting all code inside one module, and the target has no other ref purpose, use `useFullscreenRef`.

```tsx
import {
  ReactElement
} from 'react';

import {
  useFullscreenRef
} from '@kcuf-hook/use-fullscreen';

export default function SomeComponent(): ReactElement {
  const [ref, {
    fullscreen,
    toggle
  }] = useFullscreenRef();
  
  return <>
    <div ref={ref}>...</div>
    <button onClick={toggle}>{fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</button>
  </>;
}
```
