# @kcuf/fetcher-interceptor-delay

## How to Use

```ts
import interceptDelay from '@kcuf/fetcher-interceptor-delay';

interceptDelay(fetcher);
```

Then, when you test some page for loading effect, open the developer tool console, and execute `__FETCHER_DELAY = 1000`, this will delay every fetcher call for 1000ms.