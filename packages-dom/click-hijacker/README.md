# @kcuf/click-hijacker

全局或局部的点击事件劫持器

## INSTALL

```bash
tnpm i -S  @kcuf/click-hijacker
```

```typescript
import hijackClick, {
  hijackClickInDom
} from '@kcuf/click-hijacker';

// Globally
hijackClick(hijacker);

// In a specific DOM element
hijackClickInDom(container, hijacker);
```

以上 `hijacker` 类型如下：

```ts
interface ClickHijacker<T = boolean> {
  /**
   * 判定条件，返回「真」即表示劫持成功，改返回值将作为 `callback` 的第二参数
   */
  condition(el: HTMLElement): T | void;
  /**
   * 劫持操作
   */
  callback?(result: T, el: HTMLElement): void;
  /**
   * 劫持后是否 `preventDefault`，默认对链接 `true`
   */
  shouldPreventDefault?: boolean;
  /**
   * 劫持后是否 `stopPropagation`，默认 `false`
   */
  shouldStopPropagation?: boolean;
}
```
