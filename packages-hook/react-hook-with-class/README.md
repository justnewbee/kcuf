# @kcuf/react-hook-with-class

> 利用 MutationObserver 动态监听元素是否有 className

## INSTALL

```shell
tnpm i @kcuf/react-hook-with-class -S
```

## Usage

```tsx
import {
  ReactElement,
  useState,
  useCallback
} from 'react';

import useWithClass from '@kcuf/react-hook-with-class';

export default function SomeComponent(): ReactElement {
  const withClassXx = useWithClass(document.body, 'xx');
  
  console.info(withClassXx);
};
```
