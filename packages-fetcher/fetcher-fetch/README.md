# @kcuf/fetcher-fetch

> `@kcuf/fetcher` 底层 fetch 封装

原生 fetch 特点：

1. 不支持 `timeout`（这里模拟掉了）
2. HTTP 错误状态（400、500 等），仍然 resolve
3. 默认不携带 cookie，必须 `{ credentials: 'include' }`
4. 不支持 progress 事件，因此上传需要感知进度的还得用 XHR
5. 当 `body` 和 `headers` 类型有耦合
   - `body` 为 `URLSearchParams` | `FormData` | `Blob`，`headers` 中不可有 `'Content-Type'`
   - `headers` `Content-Type` 为 `'application/json'`，用 `JSON.stringify` 处理 `body`
   - `headers` `Content-Type` 为 `'application/x-www-form-urlencoded'`，用 `qs` 或 `URLSearchParams` 处理 `body`
