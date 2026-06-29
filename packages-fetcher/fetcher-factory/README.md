# @kcuf/fetcher-factory

注意，此 Fetcher 工厂方法，目前仅适用于 Web 端。

## 拦截器

* `@kcuf/fetcher-interceptor-biz`
* `@kcuf/fetcher-interceptor-cache-local`
* `@kcuf/fetcher-interceptor-merging` 💥 与 Login 冲突，暂不开启
* `@kcuf/fetcher-interceptor-login`
* `@kcuf/fetcher-interceptor-sls`

## How to Use

你可以封装自己的 `Fetcher` 实例：

```ts
import fetcherFactory from '@kcuf/fetcher-factory';

// 所有参数均可选
export default fetcherFactory({
  urlBase, // 建议配置
  getHeaders, // 视情况配置
  interceptorBizOptions, // 默认「业务成功」的 code 为 '200'，根据服务接口进行配置
  interceptorSlsOptions, // 希望记录 SLS 日志的，配置它
  interceptorLoginOptions // 若希望支持弹窗式登录，可配置
});
```
