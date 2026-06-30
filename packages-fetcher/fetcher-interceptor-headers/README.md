# @kcuf/fetcher-interceptor-headers

## How to Use

```ts
import interceptHeaders from '@kcuf/fetcher-interceptor-headers';

interceptHeaders(fetcher);
```

Then, when you test some page for loading effect, open the developer tool console, and execute `__FETCHER_DELAY = 1000`, this will headers every fetcher call for 1000ms.