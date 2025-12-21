# @kcuf-ui/error-boundary

An `ErrorBoundary` component to display detailed error info for developers.

## Props

* `children: ReactNode;`
* `fallback?: ReactNode | ((error: unknown, errorInfo?: ErrorInfo) => ReactNode);`
* `resetSignal?: unknown;`
* `onErrorCaught?(error: unknown, errorInfo: ErrorInfo): void;`

## FAQ

### When wrapping react-router component, the route won't refresh after one has failed, even after route has changed?

Use the route path as `resetSignal` prop, see the example below:

```tsx
import {
  ReactElement
} from 'react';
import {
  Outlet,
  useLocation
} from 'react-router';

import ErrorBoundary from '@kcuf-ui/error-boundary';

export default function Main(): ReactElement {
  const {
    pathname
  } = useLocation();
  
  return <main>
    <ErrorBoundary resetSignal={pathname}>
      <Outlet />
    </ErrorBoundary>
  </main>;
}

```
