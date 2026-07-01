# @kcuf/fetcher-interceptor-sls-core

SLS logger interceptor for `@kcuf/fetcher`, which can log success and error, plus duration.

Platform independent. For web use `@kcuf/fetcher-interceptor-sls`。

## How to Use

```ts
import interceptSlsCore from '@kcuf/fetcher-interceptor-sls-core';

interceptSlsCore(fetcher, transport, { // suppose you have the fetcher by createFetcher
  project: 'my-sls-project',
  endpoint: '<region>.log.aliyuncs.com',
  logstore: 'my-logstore',
  defaultParams: getDefaultParams
});
```