# @kcuf/fetcher-fetch

> `@kcuf/fetcher` 底层 fetch 封装

原生 fetch 特点：

1. 不支持 `timeout`（这里模拟掉了）
2. HTTP 错误状态（400、500 等），仍然 resolve
3. 默认不携带 cookie，必须 `{ credentials: 'include' }`
4. 不支持 progress 事件，因此上传需要感知进度的还得用 XHR