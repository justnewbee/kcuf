# @kcuf-ui/file-picker

A pure file selector.

## How to Use

```tsx
import {
  ReactElement
} from 'react';

import FilePicker from '@kcuf-ui/file-picker';

export default function App(): ReactElement {
  return <>
    <FilePicker />
    <FilePicker accept="image/*">
      <button>Select images</button>
    </FilePicker>
  </>;
}
```
