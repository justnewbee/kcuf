# @kcuf-hook/use-click-away

## Installation

```shell
npm install @kcuf-hook/use-click-away


## Usage

```tsx
import {
  ReactElement
} from 'react';

import useClickAway from '@kcuf-hook/use-click-away';

export default function SomeComponent(): ReactElement {
  const refClickAway = useClickAway(() => {
    console.info('clicked away');
  });
  
  return <div ref={refClickAway} />;
}
```
