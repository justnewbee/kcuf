# @kcuf/fetcher

## Base

* `@kcuf/fetcher-fetch`
* `@kcuf/fetcher-json`

## Interceptors

* [x] `@kcuf/fetcher-interceptor-biz` 剥离业务数据，抛出业务错误
* [x] `@kcuf/fetcher-interceptor-cache-local` 本地缓存
* [x] `@kcuf/fetcher-interceptor-merging` 相同接口同一时间调用合并
* [ ]  `@kcuf/fetcher-interceptor-retry` 重试 n 次
* [x]  `@kcuf/fetcher-interceptor-sls` SLS 日志
* [x]  `@kcuf/fetcher-interceptor-login` 登录，若多个请求同时需要登录，不会唤起多个