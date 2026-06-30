# @kcuf/fetcher-interceptor-headers

## How to Use

```ts
import interceptHeaders from '@kcuf/fetcher-interceptor-headers';

interceptHeaders(fetcher, {
  // some headers
});
// or if the headers need to be dynaimc
interceptHeaders(fetcher, () => ({
  // some headers
}));
```
