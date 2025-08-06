---
title: Create a Page
---

Add **Markdown or React** files to `src/pages` to create a **standalone page**:

- `src/pages/index.tsx` → `127.0.0.1:3000/`
- `src/pages/foo.md` → `127.0.0.1:3000/foo`
- `src/pages/foo/bar.tsx` → `127.0.0.1:3000/foo/bar`

## Create Your First React Page

Create a file at `src/pages/my-react-page.tsx`:

```tsx title="src/pages/my-react-page.tsx"
import {
  ReactElement
} from 'react';

import Layout from '@theme/Layout';

export default function MyReactPage(): ReactElement {
  return <Layout>
    <h1>My React page</h1>
    <p>This is a React page</p>
  </Layout>;
}
```

A new page is now available at `http://127.0.0.1:3000/my-react-page`.

## Create Your First Markdown Page

Create a file at `src/pages/my-markdown-page.md`:

```md title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

A new page is now available at `http://127.0.0.1:3000/my-markdown-page`.
