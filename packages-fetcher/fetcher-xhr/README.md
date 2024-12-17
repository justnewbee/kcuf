# @kcuf/fetcher-xhr

> `@kcuf/fetcher` 底层 xhr 封装

只有上传，且需要感知进度的时候，需要用到它。

原生 XHR 特点：

1. 不是 `Promise`（这里封装了）
2. 支持 timeout
3. 支持 progress
4. 支持 abort，但需要得到 xhr 对象，这里用 `AbortController` 做了封装
