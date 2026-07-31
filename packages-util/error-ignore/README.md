# @kcuf/error-ignore

## Usage

```ts
import errorIgnore from '@kcuf/error-ignore';

somePromise().catch(errorIgnore);

try {
  // whatever you do
} catch (err: unknown) {
  errorIgnore(err);
}
```

## Why

1. 避免创建空方法
2. 避免引 `lodash/noop`
3. 全然忽略对开发不友好，无法在开发期间快速定位问题，导致消耗大量 debug 时间
