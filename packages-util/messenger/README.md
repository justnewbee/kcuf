# @kcuf/messenger

封装 `postMessage`，有可以将 `postMessage` 转化成 `Promise` 的方法。

注意：需要使用者自己保证 `Promise`。

## 兼容性

`postMessage` 的 [兼容性](https://caniuse.com/#search=postMessage) 已经很好了，我们不做无谓判断。

## INSTALL

```shell
pnpm add @kcuf/messenger
```

## Usage

```ts
import messenger from '@kcuf/messenger';

messenger.emit<P>(type, payload); // 这里 P 是 `payload` 的类型定义
messenger.on<P>(type, payload => {
  // ...
});
messenger.once<P>(type, payload => {
  // ...
});

messenger.emitPromise<P>(type, payload);
messenger.onPromise<P>(type, payload => {
  // ...
});
```

## APIs

* `messenger.emit(type, payload?)` 相当于 `postMessage({ type, payload })`
* `messenger.emitPromise(type, payload?)` 也是 `postMessage`，返回 `Promise`，必须要有 `onPromise` 来承接，否则此 Promise 将永远无法结束
* `messenger.on(type, fn)` 相当于 `addEventListener('message' ...` 并判断 `e.data.type === type`
* `messenger.once(type, fn)` 相当于 `on`，调用后自动解绑
* `messenger.onPromise(type, fn)` 相当于 `on`，调用后自动解绑

## FAQ

### 如何向其他窗口（比如父 `parent` 或 `top`，甚至某个 `iframe` 的窗口）进行 `postMessage`？

给 `emit` / `emitPromise` 传第三个参数：

```ts
messenger.emit(type, payload, {
  targetWindow: 'parent' // 或 'top' 或其他 Window 对象
})
```

### 如何解绑？

之所以没有类似 `off` 之类的 API，是因为 `on`、`once`、`onPromise` 这几个方法的返回就是一个无参的解绑函数。

使用 hook 的例子

```tsx
import {
  useEffect
} from 'react';

import messenger from '@kcuf/messenger';

function useEffectOnMessengerXx(): void {
  useEffect(() => messenger.on(_MESSAGE_TYPE_ENUM_, () => {
    // ... do sth
  }), []);
}
```
