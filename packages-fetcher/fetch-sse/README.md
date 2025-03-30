# @kcuf/fetch-sse

> `EventSource` 能力的 `fetch` 实现 - 不是 Polyfill

🎈 为什么写这个，而为什么不用 `EventSource` 或 `EventSourcePolyfill`？

1. 原生 `EventSource` 只有一个 `withCredentials` 参数，不接收 `headers`
2. `Polyfill` 有个会循环启动的 BUG
3. `Polyfill` 版本代码臃肿，有较多过时的逻辑

## 参考

* [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
* [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
* [EventSourcePolyfill](https://github.com/Yaffle/EventSource)
