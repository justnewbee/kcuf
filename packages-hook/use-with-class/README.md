# @kcuf-hook/use-with-class

> 利用 MutationObserver 动态监听元素是否有 className

## Usage

```tsx
import {
  ReactElement,
  useState,
  useCallback
} from 'react';

import useWithClass from '@kcuf-hook/use-with-class';

export default function SomeComponent(): ReactElement {
  const withClassXx = useWithClass(document.body, 'xx');
  
  console.info(withClassXx);
};
```
